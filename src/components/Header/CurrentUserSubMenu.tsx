import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';
import { ICombinedState } from '../../store/types';
import { CurrentUserSubMenuProps } from './types';
import useStyles from './styles';

const CurrentUserSubMenu: React.FC<CurrentUserSubMenuProps> = (props: CurrentUserSubMenuProps) => {
  const { anchor, isOpen, menuId, handleMenuClose } = props;
  const isLoggedIn = useSelector((state: ICombinedState) => state.user.isLoggedIn);
  const dispatch = useDispatch();

  const authClasses = useStyles();

  const logOutMenuItems = (
    <MenuItem
      className={authClasses.navSubMenuItem}
      onClick={() => {
        dispatch({ type: 'LOGGED_IN', payload: { isLoggedIn: false } });
        handleMenuClose();
      }}>
      Выход
    </MenuItem>
  );

  const authMenuItems = Array.of(
    <MenuItem
      key="signIn"
      className={authClasses.navSubMenuItem}
      onClick={() => {
        handleMenuClose();
      }}>
      <Link to="/sign-in">Вход</Link>
    </MenuItem>,
    <MenuItem
      key="signUp"
      className={authClasses.navSubMenuItem}
      onClick={() => {
        handleMenuClose();
      }}>
      <Link to="/sign-up">Регистрация</Link>
    </MenuItem>
  );

  return (
    <Menu
      anchorEl={anchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isOpen}
      onClose={handleMenuClose}>
      {isLoggedIn ? logOutMenuItems : authMenuItems}
    </Menu>
  );
};

export default CurrentUserSubMenu;
