import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@material-ui/core';
import { NavSubMenuProps } from './types';
import useStyles, { importantStyle } from './styles';

const NavSubMenu: React.FC<NavSubMenuProps> = (props: NavSubMenuProps) => {
  const { anchor, id, isOpen, items, onMenuClose } = props;

  const subMenuClasses = useStyles();

  const renderItems = (): JSX.Element[] =>
    items?.map((item) => (
      <MenuItem
        className={subMenuClasses.navSubMenuItem}
        key={item.label}
        onClick={onMenuClose}
        style={item.important ? importantStyle : {}}>
        {item.withLink ? <Link to={item.linkAddress}>{item.label}</Link> : item.label}
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
      onClose={onMenuClose}>
      {items && renderItems()}
    </Menu>
  );
};

export default NavSubMenu;
