import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    settingsWrapper: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    settings: {
      margin: '0 auto auto',
      padding: '1rem',
    },
    volumeSettings: {
      margin: '1rem 0',
    },
    gameModeWrapper: {
      margin: '1rem 0',
      flexDirection: 'row',
      justifyContent: 'space-between',
      '& > label': {
        margin: '0',
        flexDirection: 'column-reverse',
      },
    },
  })
);

export default useStyles;
