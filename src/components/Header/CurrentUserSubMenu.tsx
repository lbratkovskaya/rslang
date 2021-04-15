import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, MenuItem } from '@material-ui/core';
import { setIsLoggedIn } from '../../store/actions/userAuthActions';
import { ROUTES } from '../../constants';
import { IAppState } from '../../store/types';
import { CurrentUserSubMenuProps } from './types';
import useStyles from './styles';

const CurrentUserSubMenu: React.FC<CurrentUserSubMenuProps> = (props: CurrentUserSubMenuProps) => {
  const { anchor, isOpen, menuId, handleMenuClose } = props;
  const isLoggedIn = useSelector((state: IAppState) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const location = useLocation();
  const backUrl = location.pathname === ROUTES.signUp ? null : location.pathname;

  const authClasses = useStyles();

  const logOutMenuItems = (
    <MenuItem
      className={authClasses.navSubMenuItem}
      onClick={() => {
        dispatch(setIsLoggedIn(false));
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
      <Link to={{ pathname: ROUTES.signIn, state: { backUrl } }}>Вход</Link>
    </MenuItem>,
    <MenuItem
      key="signUp"
      className={authClasses.navSubMenuItem}
      onClick={() => {
        handleMenuClose();
      }}>
      <Link to={ROUTES.signUp}>Регистрация</Link>
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
