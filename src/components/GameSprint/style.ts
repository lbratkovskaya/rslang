import {
  createMuiTheme,
  createStyles,
  makeStyles,
  TableCell,
  TableRow,
  withStyles,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { SPRINT } from '../../constants';

const useStyles = makeStyles(() =>
  createStyles({
    sprintWrapper: {
      height: '100vh',
      background: `url(${SPRINT.background}) #858181 no-repeat`,
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
      color: '#fff',
    },
    sprintMenuSettings: {
      display: 'flex',
      width: '350px',
      flexWrap: 'wrap',
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
        width: '15rem',
        fontSize: '1.3rem',
        margin: '0 2rem',
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

    answerDefault: {
      margin: 'auto auto',
      background: '#fff !important',
      width: '70%',
      opacity: '0.7',
      border: '2px solid #0048fc',
      borderRadius: '0.5rem',
    },
    answerWrong: {
      margin: 'auto auto',
      background: '#FF6347 !important',
      width: '70%',
      opacity: '0.7',
      border: '2px solid #0048fc',
      borderRadius: '0.5rem',
    },
    answerTrue: {
      margin: 'auto auto',
      background: '#2bff7f !important',
      width: '70%',
      opacity: '0.7',
      border: '2px solid #0048fc',
      borderRadius: '0.5rem',
    },
    sprintSpan: {
      fontSize: '3rem',
      fontWeight: 600,
      color: '#0048fc',
      textTransform: 'capitalize',
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
      margin: '3rem auto',
      background: 'scroll',
      '&::-webkit-scrollbar': {
        width: '24px',
        height: '8px',
        backgroundColor: '#143861',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#843465',
        borderRadius: '9em',
        boxShadow: 'inset 1px 1px 10px #f3faf7',
      },
    },
    tableSpanCorrectly: {
      background: '#0dff2a',
    },
    tableSpanUnCorrectly: {
      background: '#f51400',
    },
    buttonMain: {
      margin: '20px',
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
    color: '#ffff00',
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
