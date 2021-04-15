import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '1rem 1rem 3rem',
      boxSizing: 'border-box',
      width: '100%',
    },
    brief: {
      maxWidth: 900,
    },
    video: {
      margin: '2rem 0 4rem',
      maxWidth: 900,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    cover: {
      minWidth: 205,
      maxWidth: 205,
      maxHeight: 250,
      minHeight: 250,
      marginRight: '1vw',
    },
    title: {
      marginBottom: '1rem',
      fontWeight: 500,
      letterSpacing: '2px',
      textTransform: 'uppercase',
    },
    cardsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      maxWidth: 900,
    },
    card: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      maxHeight: 250,
      minHeight: 250,
      margin: '1rem 0',
      boxShadow: '0 6px 14px rgba(0, 0, 0, 0.25)',
    },
    info: {
      marginBottom: '5px',
      lineHeight: 1.5,
    },
    name: {
      fontSize: '34px',
    },
    contribution: {
      marginTop: '1rem',
      fontSize: '1rem',
    },
    contributionInfo: {
      fontSize: '1rem',
    },

    '@media (max-width: 800px)': {
      name: {
        fontSize: '24px !important',
      },
      cover: {
        minWidth: 100,
        maxWidth: 100,
        maxHeight: 122,
        minHeight: 122,
        margin: '0 0.25rem 0 0.75rem',
      },
      info: {
        fontSize: '14px',
        lineHeight: '22px',
      },
    },
  })
);

export default useStyles;
