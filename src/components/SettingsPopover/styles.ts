import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      padding: '0.5rem 0',
    },
    typography: {
      padding: '0 0.5rem',
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
