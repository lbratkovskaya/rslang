import { createStyles, makeStyles, Theme } from '@material-ui/core';

const bgColor = '#212229';
const linkColor = '#fafafa';
const linkStyle = {
  color: linkColor,
  transition: 'opacity 100ms',
  '&:hover': {
    opacity: 0.75,
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      background: bgColor,
      display: 'flex',
    },
    menu: {
      width: '100%',
      margin: '0 auto',
    },
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
      justifyContent: 'flex-end',
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
      padding: 0,
      marginRight: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      fontSize: '1rem',
      '& a': {
        width: '100%',
        padding: '6px',
        textDecoration: 'none',
        ...linkStyle,
      },
    },
    navMenuItemInner: {
      display: 'flex',
      padding: 0,
      alignItems: 'center',
      width: '100%',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
      },
      '& > a, & > span': {
        width: '100%',
        padding: '12px 22px',
        textDecoration: 'none',
        color: '#333333',
      },
    },
    navSubMenuItem: {
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      fontSize: '1rem',
      '& a': {
        textDecoration: 'none',
        color: '#333333',
        padding: '10px',
        width: '100%',
      },
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    mainLogo: {
      width: 'fit-content',
      height: '80px',
      marginRight: 'auto',
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.75rem',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      ...linkStyle,
    },
    mainLogoPic: {
      width: 64,
      height: 64,
      marginRight: '0.5rem',
      borderRadius: '0',
      filter: 'invert(1)',
      '& svg': {
        color: 'aqua',
      },
    },
    mobileMenuButton: {
      ...linkStyle,
    },
    circle: {
      height: '25px',
      width: '25px',
      ...linkStyle,
    },
    arrow: {
      padding: 0,
      ...linkStyle,
    },
  })
);

export default useStyles;
