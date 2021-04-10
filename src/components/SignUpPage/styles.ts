import { makeStyles } from '@material-ui/core';
import { HEADER_HEIGHT, REGFORMS } from '../../constants';

const useStyles = makeStyles(() => ({
  signUpPageWrapper: {
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
  avatar: {
    marginBottom: '8px',
    cursor: 'pointer',
    transition: '0.5s ease',
    '&:hover': {
      transform: 'scale(1.2)',
      transition: '0.5s ease',
    },
  },
  pointer: {
    cursor: 'pointer',
  },
  userImage: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    cursor: 'pointer',
  },
  form: {
    width: '100%',
    marginTop: '24px',
  },
  image: {
    background: REGFORMS.sign_up.background,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    filter: 'brightness(0.7)',
    height: '100%',
    width: '100%',
  },
  submit: {
    margin: '24px 0 16px 0',
  },
  link: {
    color: 'blue',
    marginLeft: '8px',
    textDecoration: 'none',
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
    justifyContent: 'center',
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
    signUpPageWrapper: {
      height: 'calc(100vh - 297px)',
    },
  },
}));

export default useStyles;
