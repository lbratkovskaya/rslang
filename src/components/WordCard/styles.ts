import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { APPEAR_DURATION } from '../../constants';

const COLORS = {
  secondaryText: 'rgba(0, 0, 0, 0.35)',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: 450,
      textAlign: 'left',
      position: 'relative',
      height: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        maxWidth: 600,
      },
    },
    word: {
      textTransform: 'capitalize',
      fontWeight: 500,
    },
    transcription: {
      marginBottom: theme.spacing(1),
      display: 'flex',
      color: COLORS.secondaryText,
      lineHeight: 2,
      fontSize: 14,
      fontWeight: 400,
      letterSpacing: 1,
    },
    icon: {
      cursor: 'pointer',
      transition: 'color 0.2s',
      '&:hover': {
        color: 'black',
      },
    },
    button: {
      marginRight: theme.spacing(1),
      transition: 'background 0.5s, color 0.5s',
    },
    wordTranslate: {
      textTransform: 'capitalize',
      fontWeight: 400,
    },
    secondary: {
      marginBottom: theme.spacing(1),
    },
    image: {
      float: 'right',
      marginLeft: theme.spacing(1),
      borderRadius: theme.spacing(1) / 2,
      opacity: 0,
      transition: `opacity ${APPEAR_DURATION}ms`,
    },
    heatsPanel: {
      position: 'absolute',
      display: 'flex',
      minWidth: '130px',
      minHeight: '100%',
      padding: '8px',
      paddingLeft: '30px',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '30px',
      right: 0,
      top: 0,
      background: 'rgba(255, 255, 255, .8)',
      transition: 'transform .3s',
      transform: 'translateX(calc(100% - 30px))',
      '&:hover': {
        transform: 'translateX(0)',
      },
    },
    chevron: {
      position: 'absolute',
      left: 0,
      transform: 'scale(1.3)',
      color: 'rgba(0, 0, 0, 0.47)',
    },
    successHeats: {
      fontSize: '1.3rem',
      fontWeight: 500,
      color: '#1b861b',
    },
    errorHeats: {
      fontSize: '1.3rem',
      fontWeight: 500,
      color: '#c01818',
    },
  })
);

export const transitionStyles: { [key: string]: {} } = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0, transform: 'scale(0)' },
  exited: { opacity: 0 },
};

export const defaultImageSize = {
  width: 240,
  height: 160,
};

export default useStyles;
