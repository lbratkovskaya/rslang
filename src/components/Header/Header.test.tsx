import React from 'react';
import { Link } from 'react-router-dom';
import { shallow, ShallowWrapper } from 'enzyme';
import Header from '.';
import { logoPath, menuItems } from './navMenuData';
import { IMenuItem } from './types';

describe('<Header /> testing:', () => {
  const wrapper: ShallowWrapper<typeof Header> = shallow(<Header />).shallow();

  const navigationLinks = menuItems.map((menuItem: IMenuItem) => (
    <Link to={menuItem.linkAddress}>{menuItem.label}</Link>
  ));

  it('Should render logo picture', () => {
    expect(wrapper.find({ src: logoPath })).toHaveLength(1);
  });

  it('Should render 4 navigation menu links', () => {
    expect(wrapper.containsAllMatchingElements(navigationLinks)).toEqual(true);
  });

  it('Should render <CurrentUserMenuItem />', () => {
    expect(wrapper.find('CurrentUserMenuItem')).toHaveLength(1);
  });
});
