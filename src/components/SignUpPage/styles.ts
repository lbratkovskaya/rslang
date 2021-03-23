import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#fff',
  },
  paper: {
    marginTop: '64px',
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
}));

export default useStyles;
