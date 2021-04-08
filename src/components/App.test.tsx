import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from './App';

describe('<App /> testing', () => {
  const wrapper: ShallowWrapper<typeof App> = shallow(<App />);

  it('Must have a correct snapshot', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('Should use HashRouter', () => {
    expect(wrapper.find('HashRouter')).toHaveLength(1);
  });
});
