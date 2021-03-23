import React, {
  RefObject,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import { ArrowDropDown, MoreVert } from '@material-ui/icons';
import { menuItems, mobileMenuId } from './navMenuData';
import {
  IMenuItem,
  MobileNavMenuProps,
  NavSubMenuProps,
} from './types';
import useStyles from './classes';

/* ===========common methods============ */
const generateRefToRefObject = (
  refsObject: RefObject<{ [key: string]: HTMLDivElement }>,
  element: HTMLDivElement,
  menuItem: IMenuItem,
) => Object.assign(
  refsObject.current,
  { [menuItem.id]: element },
);

const NavSubMenu: React.FC<NavSubMenuProps> = (props: NavSubMenuProps) => {
  const {
    anchor,
    id,
    isOpen,
    items,
    onMenuClose,
  } = props;

  const subMenuClasses = useStyles();

  const renderItems = () => items?.map((item) => (
    <MenuItem
      className={subMenuClasses.navSubMenuItem}
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

const renderMenuItem = (
  refsObject: RefObject<{ [key: string]: HTMLDivElement }> = { current: {} = {} },
  menuItem: IMenuItem,
  itemClassName: string,
  subMenuOpenId: string,
  setSubMenuOpenId: (id: string) => void,
  handleMenuClose: () => void,
) => {
  const buttonClickEventHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSubMenuOpenId(menuItem.subMenuId || '');
  };

  return (<div
    key={menuItem.id}
    className={itemClassName}
    ref={(element: HTMLDivElement) =>
      generateRefToRefObject(refsObject, element, menuItem)}
  >
    <Link to={{ pathname: menuItem.linkAddress }}>{menuItem.label}</Link>
    {menuItem.withSubMenu && (
      <>
        <IconButton
          aria-label={menuItem.label}
          aria-controls={menuItem.subMenuId}
          aria-haspopup="true"
          onClick={buttonClickEventHandler}
        >
          <ArrowDropDown />
        </IconButton>
        <NavSubMenu
          anchor={refsObject.current![menuItem.id]}
          id={menuItem.subMenuId!}
          isOpen={subMenuOpenId === menuItem.subMenuId}
          items={menuItem.subMenuItems!}
          onMenuClose={handleMenuClose}
        />
      </>
    )
    }
  </div >);
}

export const NavigationMenu: React.FC = () => {
  const [subMenuOpenId, setSubMenuOpenId] = useState<string>('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const refsObject = useRef<{ [key: string]: HTMLDivElement }>({});
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const classes = useStyles();

  const handleMenuClose = () => {
    setSubMenuOpenId('none');
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const renderMenuItems = () => menuItems.map((menuItem) => {
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
              onClick={() => setSubMenuOpenId(menuItem.subMenuId || '')}
            >
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
    <AppBar position="static">
      <Toolbar>
        <div className={classes.sectionDesktop}>
          {renderMenuItems()}
        </div>
        <div className={classes.sectionMobile} ref={mobileMenuRef}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreVert />
          </IconButton>
          {isMobileMenuOpen
            && (
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

export const MobileNavMenu: React.FC<MobileNavMenuProps> = (props: MobileNavMenuProps) => {
  const [subMenuOpenId, setSubMenuOpenId] = useState<string>('');

  const refsObject = useRef<{ [key: string]: HTMLDivElement }>({});

  const handleSubMenuClose = () => {
    setTimeout(() => setSubMenuOpenId('none'), 0);
  };

  const {
    anchor,
    isOpen,
    items,
    onMenuClose,
  } = props;

  const mobileClasses = useStyles();

  const renderItems = () => items?.map((menuItem: IMenuItem) => {
    return (
      <MenuItem
        key={menuItem.id}
        onClick={onMenuClose}
      >
        {renderMenuItem(
          refsObject,
          menuItem,
          mobileClasses.navMenuItem,
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
      onClose={onMenuClose}
    >
      {items && renderItems()}
    </Menu>
  );
};
