import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import Header from '../Header';
import Footer from '../Footer';
import { signInUser, setFailedAttempt } from '../../store/actions/userAuthActions';
import { ROUTES } from '../../constants';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userNameEmpty, setUserNameEmpty] = React.useState(false);
  const [passwordEmpty, setPasswordEmpty] = React.useState(false);
  const isLoggedIn = useSelector((state: IAppState) => state.user.isLoggedIn);
  const isFailedAttempt = useSelector((state: IAppState) => state.user.failedAttempt);
  const isLoading = useSelector((state: IAppState) => state.user.isLoading);

  const handleClose = () => {
    setPasswordEmpty(false);
    setFailedAttempt(false);
    if (location.state?.backUrl) {
      history.push(location.state.backUrl);
    } else {
      history.push(ROUTES.dictionary);
    }
  };

  const clearUserName = () => {
    setUserNameEmpty(false);
    setFailedAttempt(false);
  };

  const clearPassword = () => {
    setPasswordEmpty(false);
    setFailedAttempt(false);
  };

  let passwordHelperText = '';
  if (passwordEmpty && !isFailedAttempt) {
    passwordHelperText = 'введите пароль';
  } else if (!passwordEmpty && isFailedAttempt) {
    passwordHelperText = 'неверный email или пароль';
  }

  const emailHelperText = userNameEmpty && !isFailedAttempt ? 'введите email' : '';

  const handleSubmit = (event: React.FormEvent) => {
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
      <Header />
      <main className={classes.signInPageWrapper}>
        <Container maxWidth="xs">
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
                helperText={emailHelperText}
                onChange={(event) => {
                  setUserName(event.currentTarget.value);
                }}
                onFocus={clearUserName}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="пароль"
                label="пароль"
                type="password"
                id="password"
                autoComplete="пароль"
                error={passwordEmpty || isFailedAttempt}
                helperText={passwordHelperText}
                onChange={(event) => {
                  setPassword(event.currentTarget.value);
                }}
                onFocus={clearPassword}
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
                  Войти
                </Button>
              )}
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Еще нет аккаунта?
                    <Link to="/sign-up" className={classes.link}>
                      Зарегистрируйтесь
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
        <div className={classes.image} />
      </main>
      <Footer />
    </div>
  );
};

export default SignInPage;
