import { createStyles, makeStyles, Theme } from '@material-ui/core';

export const a11yProps = (index: any) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const COLORS = {
  secondaryText: 'rgba(0, 0, 0, 0.35)',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
    card: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      minWidth: 450,
      textAlign: 'left',
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
      '&:hover': {
        color: 'black',
      },
    },
    button: {
      marginRight: theme.spacing(1),
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
    },
  })
);

export default useStyles;
