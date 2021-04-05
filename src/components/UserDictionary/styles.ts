import { createStyles, makeStyles, StyleRules, Theme } from '@material-ui/core';
import { wordBookStyles } from '../WordBook/styles';

export const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme: Theme) => {
  const styles = {
    root: {
      backgroundColor: theme.palette.background.paper,
      width: '100%',
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
  } as StyleRules;

  const { pagination, words } = wordBookStyles(theme);
  Object.assign(styles, { pagination, words });
  return createStyles(styles);
});

export default useStyles;
