import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  makeStyles,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { ICombinedState } from '../../store/types';
import { SET_FAILED_ATTEMPT } from '../../store/actionTypes';
import { signInUser } from '../../store/actions/userAuthActions';

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
  form: {
    width: '100%',
    marginTop: '8px',
  },
  submit: {
    margin: '24px 0 16px 0',
  },
  link: {
    color: 'blue',
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

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userNameEmpty, setUserNameEmpty] = React.useState(false);
  const [passwordEmpty, setPasswordEmpty] = React.useState(false);
  const isLoggedIn = useSelector((state: ICombinedState) => state.user.isLoggedIn);
  const isFailedAttempt = useSelector((state: ICombinedState) => state.user.failedAttempt);
  const isLoading = useSelector((state: ICombinedState) => state.app.isLoading);

  const handleClose = () => {
    setPasswordEmpty(false);
    dispatch({ type: SET_FAILED_ATTEMPT, failedAttempt: false });
    history.push('/');
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!userName.length) {
      setUserNameEmpty(true);
    } else if (!password.length) {
      setPasswordEmpty(true);
    } else {
      dispatch(signInUser(userName, password));
    }
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      handleClose();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="email"
              name="email"
              autoComplete="email"
              error={userNameEmpty || isFailedAttempt}
              helperText={(userNameEmpty && 'введите email') || (isFailedAttempt && '')}
              onChange={(event) => {
                setUserName(event.currentTarget.value);
              }}
              onFocus={() => {
                setUserNameEmpty(false);
                dispatch({ type: SET_FAILED_ATTEMPT, failedAttempt: false });
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="пароль"
              label="пароль"
              type="password"
              id="пароль"
              autoComplete="пароль"
              error={passwordEmpty || isFailedAttempt}
              helperText={
                (passwordEmpty && 'введите пароль') ||
                (isFailedAttempt && 'неверный email или пароль')
              }
              onChange={(event) => {
                setPassword(event.currentTarget.value);
              }}
              onFocus={() => {
                setPasswordEmpty(false);
                dispatch({ type: SET_FAILED_ATTEMPT, failedAttempt: false });
              }}
            />
            {isLoading ? (
              <CircularProgress className={classes.spinner} />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Вход
              </Button>
            )}
            <Grid container justify="flex-end">
              <Grid item>
                <Link
                  to="/sign-up"
                  className={classes.link}
                  onClick={() => {
                    // props.handleClose();
                    // props.handleShowSignUpForm();
                  }}>
                  Еще нет аккаунта? Зарегистрируйтесь
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignInPage;
