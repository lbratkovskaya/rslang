import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    fullScreenBtn: {
      position: 'absolute',
      bottom: '30px',
      right: '30px',
      cursor: 'pointer',
      '& span': {
        pointerEvents: 'none',
        '& svg': {
          fill: '#fff',
        },
      },
    },
    savannahMenuLevel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.5rem',
      marginRight: '1rem',
    },
    savannahSelectorName: {
      margin: '0 1rem',
      color: '#fff',
      textTransform: 'capitalize',
      fontSize: '18px',
      [theme.breakpoints.down('sm')]: {
        margin: '0',
        marginRight: '0.5rem',
      },
    },
    switchLangWrapper: {
      display: 'flex',
      alignItems: 'center',
      color: '#fff',
      '& h6': {
        margin: '0 0.5rem',
      },
    },
    switchRoot: {
      padding: '5px',
    },
    timer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '1.5rem',
    },
    value: {
      fontSize: '1.5rem'
    },
    gameOver: {
      fontSize: '1.2rem',
      color: 'white',
    },
  })
);

export default useStyles;
