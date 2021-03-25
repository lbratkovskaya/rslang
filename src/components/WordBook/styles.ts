import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      minHeight: '95vh',
      padding: theme.spacing(2),
      borderLeft: 'dashed 6px darkgray',
      transition: 'background 0.5s, border 0.5s',
    },
    sectionName: {},
    welcome: {
      maxWidth: '100%',
      width: '50vw',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      flex: '5% 95%',
      alignItems: 'center',
    },
    welcomeText: {
      lineHeight: 4,
      whiteSpace: 'nowrap',
    },
    welcomeImg: {
      width: '50vw',
      maxWidth: 600,
      minWidth: 300,
      background: 'url(../../assets/wordBook_welcome.svg) center no-repeat',
      backgroundSize: 'contain',
      flexGrow: 1,
    },
    words: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      flexWrap: 'wrap',
      justifyContent: 'center',
      transition: 'opacity 0.25s',
    },
    text: {},
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

export default useStyles;
