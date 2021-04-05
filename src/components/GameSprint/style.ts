import {
  createMuiTheme,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  withStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { BACKGROUND_URL } from './constants';

const useStyles = makeStyles(() =>
  createStyles({
    sprintWrapper: {
      height: '100vh',
      background: `url(${BACKGROUND_URL})
         no-repeat`,
      backgroundBlendMode: 'multiply',
      backgroundSize: 'cover',
      padding: '0 2rem',
      display: 'flex',
      flexDirection: 'column',
    },
    sprintHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '2rem 0',
      color: 'white',
    },
    sprintMenuSettings: {
      width: '15em',
    },
    sprintRules: {
      color: '#fff',
      margin: 'auto auto',
    },
    sprintChooseWrapper: {
      display: 'flex',
      justifyContent: 'center',
      margin: '1rem',
      color: '#fff',
      textTransform: 'capitalize',
      '& button': {
        opacity: '0.5',
        fontSize: '1.3rem',
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
    },
    endGameWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    answerDefault: {
      margin: 'auto auto',
      background: '#fff !important',
      width: '30rem',
      opacity: '0.7',
      border: '2px solid #fff',
      borderRadius: '0.5rem',
    },
    answerWrong: {
      margin: 'auto auto',
      background: 'tomato !important',
      width: '30rem',
      opacity: '0.7',
      border: '2px solid #fff',
      borderRadius: '0.5rem',
    },
    answerTrue: {
      margin: 'auto auto',
      background: 'lime !important',
      width: '30rem',
      opacity: '0.7',
      border: '2px solid #fff',
      borderRadius: '0.5rem',
    },
    sprintSpan: {
      fontSize: '3rem',
      fontWeight: 600,
      color: 'dodgerblue',
    },
    wrapperFull: {
      height: '100vh',
    },
    wrapperNotFull: {
      height: 'calc(100vh - 80px)',
    },
    table: {
      Width: '700%',
    },
    tableContainer: {
      height: '33rem',
      margin: '2rem auto',
      background: 'scroll',
    },
    tableSpanCorrectly: {
      background: 'lime',
    },
    tableSpanUnCorrectly: {
      background: 'red',
    },
  })
);

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
    color: 'yellow',
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const theme = createMuiTheme({
  palette: {
    primary: green,
  },
});

export default useStyles;
