import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import Footer from '../Footer';
import Header from '../Header';
import { signInUser, setFailedAttempt } from '../../store/actions/userAuthActions';
import { IAppState } from '../../store/types';
import useStyles from './styles';
import { ROUTES } from '../../constants';

const SignInPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

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
    if (history.action === 'POP') {
      history.push(ROUTES.dictionary);
    } else {
      history.go(-1);
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
      <div className={classes.signInPageWrapper}>
        <Container className={classes.container} component="main" maxWidth="xs">
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
                id="пароль"
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
                  Вход
                </Button>
              )}
              <Grid container justify="flex-end">
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
      </div>
      <Footer />
    </div>
  );
};

export default SignInPage;
