import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      marginLeft: '20px',
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
      fontSize: '1.7rem',
      '& a': {
        textDecoration: 'none',
        color: '#333333',
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
    },
    navSubMenuItem: {
      padding: '10px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.2rem',
      '& a': {
        textDecoration: 'none',
        color: '#333333',
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    mainLogo: {
      width: '80px',
      minWidth: '80px',
      height: '80px',
      marginRight: 'auto',
    },
    mainLogoPic: {
      width: '100%',
      height: '100%',
      borderRadius: '0',
      '& svg': {
        color: 'aqua',
      },
    },
    mobileMenuButton: {
      color: '#333333',
    },
    circle: {
      height: '25px',
      width: '25px',
    },
  })
);

export default useStyles;
