import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      minHeight: '95vh',
      padding: theme.spacing(2),
      boxSizing: 'border-box',
      borderLeft: 'dashed 6px darkgray',
      transition: 'background 0.5s, border 0.5s',
    },
    welcome: {
      maxWidth: '100%',
      width: '60vw',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    welcomeText: {
      margin: '1rem 0 3rem 0',
      whiteSpace: 'nowrap',
    },
    welcomeImg: {
      width: '60vw',
      height: '40vw',
      maxWidth: 600,
      minWidth: 300,
      maxHeight: 400,
      background: 'url(../../assets/wordBook_welcome.svg) center no-repeat',
      backgroundSize: 'contain',
      marginBottom: theme.spacing(12),
    },
    words: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    breadcrumbs: {
      margin: theme.spacing(1),
      color: 'black',
      '& >ol': {
        display: 'flex',
        justifyContent: 'center',
      },
    },
    breadcrumb: {
      textDecoration: 'none',
    },
    chip: {
      margin: '0 -4px 4px -4px',
    },
    red: {
      color: 'red',
    },
    pagination: {
      margin: theme.spacing(2),
    },
  })
);

export const transitionStyles: { [key: string]: {} } = {
  entering: { opacity: 0, transform: 'translateY(20%)' },
  entered: { opacity: 1, transform: 'translateY(0)' },
};

export default useStyles;
