import { createStyles, makeStyles } from '@material-ui/core';
import { HEADER_HEIGHT } from '../../constants';

const useStyles = makeStyles(() =>
  createStyles({
    settingsWrapper: {
      height: '100vh',
    },
    title: {
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontWeight: 500,
    },
    settings: {
      minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      padding: '1rem',
    },
    volumeSettings: {
      margin: '3rem 0',
      width: '340px',
    },
    gameModeWrapper: {
      margin: '1rem 0',
      boxSizing: 'border-box',
      padding: '0 1rem',
      width: '340px',
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
