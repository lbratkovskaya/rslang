import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core';
import { APPEAR_DURATION, HEADER_HEIGHT } from '../../constants';
import { wordBookStyles } from '../WordBook/styles';
import { wordCardStyles } from '../WordCard/styles';

export const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => {
  const styles = {
    main: {
      minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
    },
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
      height: '100%',
    },
    title: {
      margin: '1rem 0',
      textTransform: 'uppercase',
      fontWeight: 500,
    },
    dictionary: {
      display: 'flex',
      justifyContent: 'center',
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      alignItems: 'center',
      width: '100%',
      borderLeft: 'dashed 6px darkgray',
    },
    card: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: 450,
      textAlign: 'left',
    },
    wordCard: {
      position: 'relative',
      display: 'flex',
      '& > div:first-child': {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        filter: 'none !important',
      },
      '& > div:last-child': {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      },
    },
    totalResults: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      padding: '15px 30px',
      left: '16px',
    },
    warning: {
      margin: 'auto',
    },
  } as StyleRules;

  const { pagination, words } = wordBookStyles(theme);
  const { successHeats, errorHeats } = wordCardStyles(theme);
  Object.assign(styles, { pagination, words, successHeats, errorHeats });
  return createStyles(styles);
});

export default useStyles;

export const transitionStyles: { [key: string]: {} } = {
  entering: { transform: 'translateY(-300%)' },
  entered: { transform: 'translateY(0)' },
  exiting: { transform: 'translateY(0)' },
  exited: { transform: 'translateY(-300%)' },
};

export const RESULT_APPEAR_STYLE = {
  transition: `transform ${APPEAR_DURATION}ms, filter 200ms`,
};
