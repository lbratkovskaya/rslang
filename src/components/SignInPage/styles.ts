import { makeStyles } from '@material-ui/core';
import { HEADER_HEIGHT, REGFORMS } from '../../constants';

const useStyles = makeStyles(() => ({
  signInPageWrapper: {
    display: 'flex',
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
    height: `calc(100vh - ${HEADER_HEIGHT}px)`,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px 0',
  },
  form: {
    width: '100%',
    marginTop: '8px',
  },
  image: {
    background: REGFORMS.sign_in.background,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    filter: 'brightness(0.7)',
    height: '100%',
    width: '100%',
  },
  submit: {
    margin: '24px 0 16px 0',
    width: 'auto',
  },
  link: {
    color: 'blue',
    textDecoration: 'none',
    marginLeft: '8px',
    '&:hover': {
      border: 'none',
      outline: 'none',
      textDecoration: 'underline',
    },
  },
  spinner: {
    margin: '15px 0px',
  },
  button_wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancel: {
    marginRight: '15px',
    marginTop: '8px',
  },
  link_button: {
    textDecoration: 'none',
  },
  '@media (max-width: 601px)': {
    signInPageWrapper: {
      height: 'calc(100vh - 297px)',
    },
  },
}));

export default useStyles;
