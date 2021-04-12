import { createMuiTheme, createStyles, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { GAMES } from '../../constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    headerWrapper: {
      position: 'relative',
      zIndex: 2,
    },
    savannahWrapper: {
      position: 'relative',
      background: `${GAMES.savannah.background}`,
      backgroundBlendMode: 'multiply',
      backgroundSize: 'cover',
      padding: '0 2rem',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      opacity: 0,
      transition: 'opacity 1s',
      [theme.breakpoints.down('sm')]: {
        padding: '0 1rem',
      },
    },
    wrapperFull: {
      height: '100vh',
    },
    wrapperNotFull: {
      height: 'calc(100vh - 80px)',
    },
    savannahHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '2rem 0',
      [theme.breakpoints.down('sm')]: {
        padding: '1rem 0',
      },
    },
    savannahMenuSettings: {
      display: 'flex',
      width: '350px',
      flexWrap: 'wrap',
    },
    savannahRules: {
      color: '#fff',
      margin: 'auto auto',
    },
    fallenWord: {
      position: 'absolute',
      zIndex: 0,
      top: '-100px',
      left: '50%',
      transform: 'translate(-50%)',
      color: '#fff',
      textTransform: 'capitalize',
      fontSize: '2rem',
    },
    savannahChooseWrapper: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: 'auto',
      color: '#fff',
      textTransform: 'capitalize',
      '& button': {
        position: 'relative',
        zIndex: '100',
        opacity: '0.7',
        fontSize: '1.3rem',
        textTransform: 'capitalize',
        margin: '0 1rem',
        padding: '0.5rem 0.5rem',
        border: '2px solid #fff',
        borderRadius: '0.5rem',
        cursor: 'pointer',
        outline: 'none',
        background: 'transparent',
        color: '#fff',
        '&:hover': {
          opacity: '1',
        },
      },
      [theme.breakpoints.down('sm')]: {
        '& button': {
          margin: '0 0.5rem',
          fontSize: '1rem',
        },
      },
    },
    endGameWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    answerWrong: {
      background: 'red !important',
    },
    answerTrue: {
      background: 'green !important',
    },
    savannahFooter: {
      marginTop: 'auto',
      padding: '2rem 0',
    },

    footerImg: {
      width: '80px',
    },

    footerImgAnimate: {
      animation: `$smile 2s linear forwards`,
    },
    savannahSwitcher: {
      padding: '1rem',
    },
    savannahWordFall: {
      animation: `$fallen 5s linear`,
    },

    switchLabel: {
      color: '#fff',
    },

    savannahEndGameExit: {
      position: 'absolute',
      top: '10px',
      right: '10px',
    },

    '@keyframes fallen': {
      from: {
        top: '-100px',
      },
      to: {
        top: '50%',
      },
    },

    '@keyframes smile': {
      from: {
        transform: 'scale(1)',
      },
      to: {
        transform: 'scale(1.5)',
      },
    },
    '@keyframes arrowAimate': {
      '0%': {
        top: 0,
      },
      '50%': {
        top: '10px',
      },
      '100%': {
        top: 0,
      },
    },
  })
);

export const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default useStyles;
