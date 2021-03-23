import React, { useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Theme,
  createStyles,
  makeStyles,
  IconButton,
} from '@material-ui/core';
import { ArrowDropDown, MoreVert } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import NavSubMenu from './NavSubMenu';
import { ISubMenuItem } from './types';
import MobileNavMenu from './MobileNavMenu';

const useStyles = makeStyles((theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  navMenuItem: {
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
}));

const NavigationMenu: React.FC = () => {
  const [subMenuOpenId, setSubMenuOpenId] = useState<string>('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const refsObject = useRef<{ [key: string]: HTMLDivElement }>({});
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const classes = useStyles();

  // const handleMobileMenuClose = () => {
  //   setMobileMenuOpen(false);
  // };

  const handleMenuClose = () => {
    setTimeout(() => setSubMenuOpenId('none'), 0);
  };

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(true);
  };

  const gamesItems: ISubMenuItem[] = [
    {
      label: 'Savanna',
      withLink: true,
      linkAddress: '/games/savanna',
    },
    {
      label: 'AudioCall',
      withLink: true,
      linkAddress: '/games/audio',
    },
    {
      label: 'Sprint',
      withLink: true,
      linkAddress: '/games/sprint',
    },
    {
      label: 'Memory Game',
      withLink: true,
      linkAddress: '/games/memory',
    },
  ];

  const sectionsItems: ISubMenuItem[] = [
    {
      label: 'Red Section',
      withLink: true,
      linkAddress: '/sections/red',
    },
    {
      label: 'Yellow Section',
      withLink: true,
      linkAddress: '/sections/yellow',
    },
    {
      label: 'Orange Section',
      withLink: true,
      linkAddress: '/sections/orange',
    },
    {
      label: 'Green Section',
      withLink: true,
      linkAddress: '/sections/green',
    },
    {
      label: 'Blue Section',
      withLink: true,
      linkAddress: '/sections/blue',
    },
    {
      label: 'Purple Section',
      withLink: true,
      linkAddress: '/sections/purple',
    },
  ];

  const teamsItems: ISubMenuItem[] = [
    {
      label: 'Larisa Arkaeva',
      withLink: true,
      linkAddress: 'https://github.com/lbratkovskaya',
    },
  ];

  const gamesId = 'miniGames';
  const sectionsId = 'sections';
  const teamsId = 'teams';
  const mobileMenuId = '';

  const menuItems = [
    {
      id: 'study',
      linkAddress: '/study',
      label: 'Time to Study',
      withSubMenu: false,
    },
    {
      id: 'games',
      linkAddress: '/games',
      label: 'Mini-games',
      withSubMenu: true,
      ariaControlsId: gamesId,
      subMenuId: 'gamesMenu',
      subMenuItems: gamesItems,
    },

    {
      id: 'sections',
      linkAddress: '/sections',
      label: 'Sections',
      withSubMenu: true,
      ariaControlsId: sectionsId,
      subMenuId: 'sectionsMenu',
      subMenuItems: sectionsItems,
    },
    {
      id: 'statistics',
      linkAddress: '/statistics',
      label: 'Statistics',
      withSubMenu: false,
    },
    {
      id: 'settings',
      linkAddress: '/settings',
      label: 'Settings',
      withSubMenu: false,
    },
    {
      id: 'teams',
      linkAddress: '/teams',
      label: 'Teams',
      withSubMenu: true,
      ariaControlsId: teamsId,
      subMenuId: 'teamsMenu',
      subMenuItems: teamsItems,
    },
  ];

  const renderMenuItems = () => menuItems.map((menuItem) => {
    const getRef = (element: HTMLDivElement) => Object.assign(
      refsObject.current,
      { [menuItem.id]: element },
    );
    return (
      <div key={menuItem.id} className={classes.navMenuItem} ref={getRef}>
        <Link to={menuItem.linkAddress}>{menuItem.label}</Link>
        {
          menuItem.withSubMenu && (
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
          )
        }
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
                onMenuClose={() => setMobileMenuOpen(false)}
              />
            )}
        </div>
      </Toolbar>
    </AppBar>

  );
};

export default NavigationMenu;
