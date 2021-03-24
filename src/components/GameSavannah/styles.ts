import { createMuiTheme, createStyles, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { SAVANNAH } from '../../constants';

const useStyles = makeStyles((theme) =>
  createStyles({
    headerWrapper: {
      position: 'absolute',
      width: '100%',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: '0.5s linear',
      '& svg': {
        marginTop: '0.5rem',
        fill: '#fff',
      },
    },
    headerArrowBtn: {
      transform: 'rotate(90deg)',
      position: 'relative',
      animation: `$arrowAimate 1s linear infinite`,
      cursor: 'pointer',
    },

    arrowDown: {
      transform: 'rotate(90deg)',
    },

    arrowUp: {
      transform: 'rotate(-90deg)',
    },

    headerHide: {
      top: '-80px',
    },
    headerShow: {
      top: '0',
    },
    savannahWrapper: {
      background: `url(${SAVANNAH.background})
        rgb(133, 129, 129) no-repeat`,
      backgroundBlendMode: 'multiply',
      backgroundSize: 'cover',
      padding: '0 2rem',
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
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
      top: '-100px',
      left: '50%',
      transform: 'translate(-50%)',
      color: '#fff',
      textTransform: 'capitalize',
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
      width: '50px',
    },

    footerImgAnimate: {
      animation: `$smile 2s linear forwards`,
    },

    savannahSwitcher: {
      padding: '1rem',
    },
    tableContainer: {
      maxWidth: 350,
      height: 350,
      margin: '10px auto',
    },
    table: {
      maxWidth: 350,
      paddingLeft: 20,
      paddingRight: 20,
    },
    falsAnswer: {
      color: 'red',
    },
    trueAnswer: {
      color: 'green',
    },
    savannahWordFall: {
      animation: `$fallen 5s linear`,
    },

    switchLabel: {
      color: '#fff',
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
