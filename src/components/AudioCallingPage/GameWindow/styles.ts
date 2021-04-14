import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100px',
    },
    primary: {
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      margin: '5px',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      backgroundColor: 'blue',
      transition: 'all .3s ease-in-out',
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.75)',
      '&:hover': {
        backgroundColor: '#1C2391',
        transition: 'all .2s ease-in-out',
      },
    },
    secondary: {
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      padding: '10px 20px',
      margin: '5px',
      borderRadius: '5px',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      backgroundColor: 'green',
      transition: 'all .3s ease-in-out',
      boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.75)',
      '&:hover': {
        backgroundColor: '#1C9120',
        transition: 'all .2s ease-in-out',
      },
    },
    exitBtn: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 3%',
      width: '90%',
    },
    incorrect: {
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      padding: '10px 20px',
      margin: '5px',
      borderRadius: '5px',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      backgroundColor: 'red',
      transition: 'all .3s ease-in-out',
      boxShadow: '0px 3px 5px 0px rgba(0, 0, 0, 0.75)',
      '&:hover': {
        backgroundColor: '#ED4337',
        transition: 'all .2s ease-in-out',
      },
    },
    gameField: {
      position: 'relative',
      paddingTop: '5%',
      height: '89vh',
    },
    exit: {
      display: 'block',
      position: 'absolute',
      top: '1%',
      right: '5%',
    },
    MuiSkip: {
      display: 'block',
      margin: '2% auto',
    },
    btnHide: {
      width: '80%',
      display: 'flex',
      flexWrap: 'wrap',
      animation: '$fadeOut 0.2s ease-in-out',
      margin: '0 auto',
      justifyContent: 'center',
    },
    btn: {
      width: '80%',
      display: 'flex',
      flexWrap: 'wrap',
      margin: '0 auto',
      justifyContent: 'center',
    },
    '@keyframes fadeOut': {
      '0%': {
        opacity: 0,
        transform: 'translateY(-5rem)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
        transform: 'translateY(5rem)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  })
);

export default useStyles;
