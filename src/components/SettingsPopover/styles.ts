import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'inline-flex',
      width: '2rem',
      justifyContent: 'center',
    },
    title: {
      padding: '0.5rem 1rem',
    },
    typography: {
      padding: '0 0 0 0.5rem',
      textAlign: 'right',
    },
    settingsButton: {
      cursor: 'pointer',
      transition: 'color 0.2s',
      '&:hover, &:active': {
        color: 'rgba(0, 0, 0, 1)',
      },
    },
  })
);

export default useStyles;
