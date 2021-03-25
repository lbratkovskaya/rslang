import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar, IconButton } from '@material-ui/core';
import CurrentUserSubMenu from './CurrentUserSubMenu';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const CurrentUserMenuItem: React.FC = () => {
  const isLoggedIn = useSelector((state: IAppState) => state.user.isLoggedIn);
  const userName = useSelector((state: IAppState) => state.user.data.name);
  const userImage = useSelector((state: IAppState) => state.user.data.image);
  const userAuthMenuRef = useRef<HTMLDivElement>(null);

  const classes = useStyles();

  const avatarSymbol = userName ? userName[0] : 'A';
  const userAvatar = userImage ? (
    <Avatar className={classes.circle} src={userImage} />
  ) : (
    <Avatar className={classes.circle}>{avatarSymbol}</Avatar>
  );

  const avatarElement = !isLoggedIn ? (
    <Avatar className={classes.circle} src="/assets/avatar.ico" />
  ) : (
    userAvatar
  );

  const authId = !isLoggedIn ? 'menu-auth' : 'menu-logOut';

  const [isUserSubMenuOpen, setUserSubMenuOpen] = useState(false);
  const handleUserAuthMenuOpen = () => {
    setUserSubMenuOpen(true);
  };
  const handleUserAuthMenuClose = () => {
    setUserSubMenuOpen(false);
  };

  return (
    <div className={classes.navMenuItemInner} ref={userAuthMenuRef} style={{ width: 'auto' }}>
      <IconButton
        edge="end"
        aria-label="account of current user"
        aria-controls={authId}
        aria-haspopup="true"
        onClick={handleUserAuthMenuOpen}
        color="inherit">
        {avatarElement}
      </IconButton>
      <CurrentUserSubMenu
        anchor={userAuthMenuRef.current!}
        isOpen={isUserSubMenuOpen}
        menuId={authId}
        handleMenuClose={handleUserAuthMenuClose}
      />
    </div>
  );
};

export default CurrentUserMenuItem;
