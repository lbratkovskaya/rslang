import { createMuiTheme, createStyles, makeStyles } from '@material-ui/core';
import { purple, green, red } from '@material-ui/core/colors';
import { buildStyles } from 'react-circular-progressbar';

export const useStyles = makeStyles((theme) =>
  createStyles({
    fullScreenBtn: {
      position: 'absolute',
      bottom: '30px',
      right: '30px',
      cursor: 'pointer',
      '& span': {
        pointerEvents: 'none',
        '& svg': {
          fill: '#FFFFFF',
        },
      },
    },
    savannahMenuLevel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '1.5rem',
      marginRight: '1rem',
      '& > div::before': {
        borderColor: '#FFFFFF !important',
      },
      '& > div::after': {
        borderColor: '#FFFFFF !important',
      },
      '& select': {
        color: '#FFFFFF !important',
        '&[disabled]': {
          opacity: 0.6,
        },
      },
      '& option': {
        color: '#000000 !important',
      },
      '& svg': {
        color: '#FFFFFF !important',
      },
    },
    savannahSelectorName: {
      margin: '0 1rem',
      color: '#FFFFFF',
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
      color: '#FFFFFF',
      '& h6': {
        margin: '0 0.5rem',
      },
    },
    timer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontSize: '1.5rem',
    },
    value: {
      fontSize: '1.5rem',
    },
    gameOver: {
      fontSize: '1.2rem',
      color: '#FFFFFF',
    },
    exitBtnColor: {
      color: '#FFFFFF !important',
      '&:hover': {
        opacity: 0.7,
      },
    },
    countDown: {
      width: '60px',
      height: '60px',
      margin: 'auto',
    },
    tableContainer: {
      maxWidth: '80%',
      height: 350,
      margin: '10px auto',
      background: 'scroll',
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
        backgroundColor: '#43444496',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#20208596',
        borderRadius: '9em',
        boxShadow: ' inset 1px 1px 10px #f3faf7',
      },
    },
    table: {
      borderCollapse: 'collapse',
    },
    incorrectAnswer: {
      color: '#d41212',
    },
    correctAnswer: {
      color: '#3cac26',
    },
    tableWordStyle: {
      textTransform: 'capitalize',
      color: '#FFFFFF !important',
    },
    tableHeadCorrect: {
      background: '#3cac26 !important',
    },
    tableHeadInCorrect: {
      background: '#d41212 !important',
    },
    tableHeadUnUsed: {
      background: '#1f12d4 !important',
    },
    tableHeadDefault: {
      background: '#000000 !important',
      '& th': {
        backgroundColor: '#000000 !important',
      },
    },
    gameModeWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    gameModeTitle: {
      color: '#ffffff',
      width: '100%',
      padding: '0.5rem 0.5rem',
      textAlign: 'left',
    },
    modeBtnStyle: {
      color: '#ffffff',
      margin: '0 5px',
      '&[disabled]': {
        color: '#ffffff',
      },
    },
    easyMode: {
      background: '#000000',
    },
    normalMode: {
      background: '#000000',
    },
    hardMode: {
      background: '#000000',
    },
    countDown: {
      width: '60px',
      height: '60px',
      margin: 'auto',
    },
    tableContainer: {
      maxWidth: '80%',
      height: 350,
      margin: '10px auto',
      background: 'scroll',
      '&::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
        backgroundColor: '#43444496',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#20208596',
        borderRadius: '9em',
        boxShadow: ' inset 1px 1px 10px #f3faf7',
      },
    },
    table: {
      borderCollapse: 'collapse',
    },
    incorrectAnswer: {
      color: '#d41212',
    },
    correctAnswer: {
      color: '#3cac26',
    },
    tableWordStyle: {
      textTransform: 'capitalize',
      color: '#FFFFFF !important',
    },
    tableHeadCorrect: {
      background: '#3cac26 !important',
    },
    tableHeadInCorrect: {
      background: '#d41212 !important',
    },
    tableHeadUnUsed: {
      background: '#1f12d4 !important',
    },
    tableHeadDefault: {
      background: '#000000 !important',
      '& th': {
        backgroundColor: '#000000 !important',
      },
    },
    gameModeWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    gameModeTitle: {
      color: '#ffffff',
      width: '100%',
      padding: '0.5rem 0.5rem',
      textAlign: 'left',
    },
    modeBtnStyle: {
      color: '#ffffff',
      margin: '0 5px',
      '&[disabled]': {
        color: '#ffffff',
      },
    },
    easyMode: {
      background: '#000000',
    },
    normalMode: {
      background: '#000000',
    },
    hardMode: {
      background: '#000000',
    },
  })
);

export const themeModeBtn = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
    error: {
      main: red[500],
    },
  },
});

export const circularStyle = buildStyles({
  strokeLinecap: 'butt',
  trailColor: 'transparent',
  pathColor: '#52cc00',
  textColor: '#FFFFFF',
  textSize: '50px',
});
