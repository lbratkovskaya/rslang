import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      margin: '5vh 5vw',
    },
    video: {
      marginBottom: '5vh',
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
      marginBottom: '2vw',
    },
    cardsWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    card: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '90vw',
      maxHeight: 250,
      minHeight: 250,
      marginBottom: '5vh',
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    },
    info: {
      marginBottom: '5px',
    },
    name: {
      fontSize: '34px',
    },
    contribution: {
      fontSize: '28px',
    },
    contributionInfo: {
      fontSize: '16px',
    },

    '@media (max-width: 800px)': {
      name: {
        fontSize: '24px !important',
      },
      contribution: {
        fontSize: '20px !important',
      },
      cover: {
        minWidth: 100,
        maxWidth: 100,
        maxHeight: 122,
        minHeight: 122,
        marginRight: '1vw',
      },
      info: {
        fontSize: '14px',
        lineHeight: '22px',
      },
    },
  })
);

export default useStyles;
