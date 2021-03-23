import React from 'react';
import {
  Menu,
  MenuItem,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { NavSubMenuProps } from './types';

const NavSubMenu: React.FC<NavSubMenuProps> = (props: NavSubMenuProps) => {
  const {
    anchor,
    id,
    isOpen,
    items,
    onMenuClose,
  } = props;

  const renderItems = () => items?.map((item) => (
    <MenuItem
      key={item.label}
      onClick={onMenuClose}
    >
      {
        item.withLink
          ? <Link to={item.linkAddress}>{item.label}</Link>
          : item.label
      }
    </MenuItem>
  ));

  return (
    <Menu
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={id}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isOpen}
      onClose={onMenuClose}
    >
      {items && renderItems()}
    </Menu>
  );
};

export default NavSubMenu;
