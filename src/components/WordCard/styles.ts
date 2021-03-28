import { createStyles, makeStyles, Theme } from '@material-ui/core';

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
      opacity: 0,
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
