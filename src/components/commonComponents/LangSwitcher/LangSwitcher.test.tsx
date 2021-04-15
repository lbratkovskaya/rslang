import React from 'react';
import { render, fireEvent, screen, configure } from '@testing-library/react';
import LangSwitcher from '.';

configure({ testIdAttribute: 'type' });

describe('<GameSelect /> testing:', () => {
  const mockHandleSwitchLang = jest.fn((checked: boolean) => checked);

  render(<LangSwitcher handleSwitch={mockHandleSwitchLang} isLang />);

  const targetControlElement = screen.getByTestId('checkbox');
  fireEvent.click(targetControlElement, { button: 1 });

  it('Should call props.handleSwitch on change', () => {
    expect(mockHandleSwitchLang).toHaveBeenCalledTimes(1);
  });

  it('Should change props.isLang on click', () => {
    expect(mockHandleSwitchLang).toHaveReturnedWith(false);
  });
});
