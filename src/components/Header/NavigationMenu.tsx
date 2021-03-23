import React, { useRef, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Theme,
  createStyles,
  makeStyles,
  ButtonBase,
  IconButton,
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import NavSubMenu from './NavSubMenu';
import { IMenuItem } from './types';

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
}));

const NavigationMenu: React.FC = () => {
  const [subMenuOpenId, setSubMenuOpenId] = useState<string>('');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const gamesRef = useRef<HTMLSpanElement>(null);
  const sectionsRef = useRef<HTMLSpanElement>(null);
  const teamsRef = useRef<HTMLSpanElement>(null);

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

  const gamesItems: IMenuItem[] = [
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

  const sectionsItems: IMenuItem[] = [
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

  const gamesId = 'miniGames';
  const sectionsId = 'sections';
  const teamsId = 'teams';
  const mobileMenuId = '';

  return (
    <AppBar position="static">
      <Toolbar>
        <div className={classes.sectionDesktop}>
          <div>
            <Link to="/study">Time to Study</Link>
          </div>
          <ButtonBase
            aria-label="Mini-games"
            aria-controls={gamesId}
            aria-haspopup="true"
            onClick={() => setSubMenuOpenId('gamesMenu')}
          >
            <span ref={gamesRef}>Mini-Games</span>
            <NavSubMenu
              anchor={gamesRef.current}
              id={gamesId}
              isOpen={subMenuOpenId === 'gamesMenu'}
              items={gamesItems}
              onMenuClose={handleMenuClose}
            />
          </ButtonBase>
          <ButtonBase
            aria-label="Sections"
            aria-controls={sectionsId}
            aria-haspopup="true"
            onClick={() => setSubMenuOpenId('sectionsMenu')}
          >
            <span ref={sectionsRef}>Sections</span>
            <NavSubMenu
              anchor={sectionsRef.current}
              id={sectionsId}
              isOpen={subMenuOpenId === 'sectionsMenu'}
              items={sectionsItems}
              onMenuClose={handleMenuClose}
            />
          </ButtonBase>
          <div>
            <Link to="/statistics">Statistics</Link>
          </div>
          <div>
            <Link to="/settings">Settings</Link>
          </div>
          <ButtonBase
            aria-label="Teams"
            aria-controls={teamsId}
            aria-haspopup="true"
            onClick={() => setSubMenuOpenId('teamsMenu')}
          >
            <span ref={teamsRef}>Teams</span>
            <NavSubMenu
              anchor={teamsRef.current}
              id={sectionsId}
              isOpen={subMenuOpenId === 'teamsMenu'}
              items={sectionsItems}
              onMenuClose={handleMenuClose}
            />
          </ButtonBase>
        </div>
        <div className={classes.sectionMobile}>
          <IconButton
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreVert />
          </IconButton>
          {isMobileMenuOpen && <div />}
        </div>
      </Toolbar>
    </AppBar>

  );
};

export default NavigationMenu;
