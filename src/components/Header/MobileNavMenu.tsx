import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import CurrentUserSubMenu from './CurrentUserSubMenu';
import { renderMenuItem } from './commonMethods';
import { IAppState } from '../../store/types';
import { IMenuItem, MobileNavMenuProps } from './types';
import useStyles from './styles';

const MobileNavMenu: React.FC<MobileNavMenuProps> = (props: MobileNavMenuProps) => {
  const { anchor, isOpen, items, onMenuClose } = props;
  const isLoggedIn = useSelector((state: IAppState) => state.user.isLoggedIn);
  const authId = !isLoggedIn ? 'menu-auth' : 'menu-logOut';
  const [subMenuOpenId, setSubMenuOpenId] = useState('');

  const refsObject = useRef<{ [key: string]: HTMLDivElement }>({});
  const authRef = useRef<HTMLDivElement>(null);

  const handleSubMenuClose = (): void => {
    setTimeout(() => setSubMenuOpenId('none'), 0);
  };

  const mobileClasses = useStyles();

  const renderItems = (): JSX.Element[] =>
    items?.map((menuItem: IMenuItem) => {
      return (
        <MenuItem key={menuItem.id} onClick={onMenuClose} className={mobileClasses.navMenuItem}>
          {renderMenuItem(
            refsObject,
            menuItem,
            mobileClasses.navMenuItemInner,
            subMenuOpenId,
            setSubMenuOpenId,
            handleSubMenuClose
          )}
        </MenuItem>
      );
    });

  return (
    <Menu
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id="menu-auth"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isOpen}
      onClose={onMenuClose}>
      {items && renderItems()}

      <MenuItem key="userAuth" className={mobileClasses.navMenuItem}>
        <div key={authId} className={mobileClasses.navMenuItemInner} ref={authRef}>
          <span>Вход/Регистрация</span>
          <IconButton
            aria-label="Вход/Регистрация"
            aria-controls={authId}
            aria-haspopup="true"
            onClick={() => setSubMenuOpenId(authId)}>
            <ArrowDropDown />
          </IconButton>
          <CurrentUserSubMenu
            anchor={authRef.current!}
            isOpen={subMenuOpenId === authId}
            menuId={authId}
            handleMenuClose={onMenuClose}
          />
        </div>
      </MenuItem>
    </Menu>
  );
};

export default MobileNavMenu;
