import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Avatar } from '@material-ui/core';
import { ArrowDropDown, MoreVert } from '@material-ui/icons';
import CurrentUserMenuItem from './CurrentUserMenuItem';
import MobileNavMenu from './MobileNavMenu';
import NavSubMenu from './NavSubMenu';
import { menuItems, mobileMenuId } from './navMenuData';
import useStyles from './styles';

const NavigationMenu: React.FC = () => {
  const [subMenuOpenId, setSubMenuOpenId] = useState('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const refsObject = useRef<{ [key: string]: HTMLDivElement }>({});
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const classes = useStyles();

  const handleMenuClose = (): void => {
    setSubMenuOpenId('none');
  };

  const handleMobileMenuClose = (): void => {
    setMobileMenuOpen(false);
  };

  const handleMobileMenuOpen = (): void => {
    setMobileMenuOpen(true);
  };

  const renderMenuItems = (): JSX.Element[] =>
    menuItems.map((menuItem) => {
      const getRef = (element: HTMLDivElement) =>
        Object.assign(refsObject.current, { [menuItem.id]: element });
      return (
        <div key={menuItem.id} className={classes.navMenuItem} ref={getRef}>
          <Link to={menuItem.linkAddress}>{menuItem.label}</Link>
          {menuItem.withSubMenu && (
            <>
              <IconButton
                aria-label={menuItem.label}
                aria-controls={menuItem.subMenuId}
                aria-haspopup="true"
                className={classes.arrow}
                onClick={() => setSubMenuOpenId(menuItem.subMenuId || '')}>
                <ArrowDropDown />
              </IconButton>
              <NavSubMenu
                anchor={refsObject.current[menuItem.id]}
                id={menuItem.subMenuId!}
                isOpen={subMenuOpenId === menuItem.subMenuId}
                items={menuItem.subMenuItems!}
                onMenuClose={handleMenuClose}
              />
            </>
          )}
        </div>
      );
    });

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.mainLogo}>
          <Avatar
            src="../../assets/favicon.svg"
            title="RS Lang App"
            className={classes.mainLogoPic}
          />
          RSCoon English
        </Link>
        <div className={classes.sectionDesktop}>
          {renderMenuItems()}
          <CurrentUserMenuItem />
        </div>
        <div className={classes.sectionMobile} ref={mobileMenuRef}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            className={classes.mobileMenuButton}
            color="inherit"
            edge="end"
            onClick={handleMobileMenuOpen}>
            <MoreVert />
          </IconButton>
          {isMobileMenuOpen && (
            <MobileNavMenu
              anchor={mobileMenuRef.current}
              isOpen={isMobileMenuOpen}
              items={menuItems}
              onMenuClose={handleMobileMenuClose}
            />
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationMenu;
