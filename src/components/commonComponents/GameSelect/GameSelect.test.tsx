import React from 'react';
import { render, fireEvent, screen, configure } from '@testing-library/react';
import GameSelect from './GameSelect';
import { WORDBOOK_GROUPS } from '../../../constants';

configure({ testIdAttribute: 'id' });

describe('<GameSelect /> testing:', () => {
  const mockChangeSelectFc = jest.fn((currentLevel: string | number) => currentLevel);

  render(
    <GameSelect
      changeSelectFc={mockChangeSelectFc}
      selectData={WORDBOOK_GROUPS}
      selectName="testselect"
    />
  );

  const targetSelectElement = screen.getByTestId('testselect');

  fireEvent.change(targetSelectElement, {
    target: { value: 'Синий' },
  });

  it('Should call props.changeSelectFc on change', () => {
    expect(mockChangeSelectFc).toHaveBeenCalledTimes(1);
  });

  it('Should return index of selected level on change', () => {
    expect(mockChangeSelectFc).toHaveReturnedWith(4);
  });
});
