import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      minHeight: '100vh',
      padding: theme.spacing(2),
      transition: 'background 0.5s',
    },
    welcome: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center',
    },
    words: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'center',
      opacity: 1,
      transition: 'opacity 0.25s',
    },
    text: {
      color: 'rebeccapurple',
    },
    breadcrumbs: {
      margin: theme.spacing(2),
    },
    breadcrumb: {
      textDecoration: 'none',
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
