import React from 'react';
import { shallow } from 'enzyme';
import { Link, Typography } from '@material-ui/core';
import Footer from './Footer';

// configure({ adapter: new Adapter() });
const copyright = <Typography className="copy">&copy; 2021</Typography>;
const rsSchoolLink = (
  <a className="rsschool" href="https://rs.school/" target="_blank" rel="noreferrer">
    {' '}
  </a>
);

describe('<Footer />', () => {
  const wrapper = shallow(<Footer />);

  it('Should render RS School link', () => {
    expect(wrapper.contains(rsSchoolLink)).toEqual(true);
  });

  it('Should render 6 github links', () => {
    expect(wrapper.find(Link)).toHaveLength(6);
  });

  it('Should render copyright', () => {
    expect(wrapper.contains(copyright)).toEqual(true);
  });
});
