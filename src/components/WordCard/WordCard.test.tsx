import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow, ShallowWrapper } from 'enzyme';
import WordCard from './WordCard';
import { IWord } from '../../store/types';
import store from '../../store';

const mockStore = configureStore([]);

describe('<WordCard /> testing:', () => {
  let wrapper: ShallowWrapper<typeof WordCard>;

  const testStore = mockStore(store);

  beforeEach(() => {
    wrapper = shallow<typeof WordCard>(
      <Provider store={testStore}>
        <WordCard
          word={{} as IWord}
          index={0}
          activeGroup={0}
          isLoading={false}
          showDeleted
          removeOnDifficultyChange={false}
        />
      </Provider>
    );
  });

  it('Must have a correct snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('Should render a single element named WordCard', () => {
    expect(wrapper.find('WordCard')).toHaveLength(1);
  });
});
