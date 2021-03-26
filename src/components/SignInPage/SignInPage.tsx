import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { signInUser, setFailedAttempt } from '../../store/actions/userAuthActions';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const SignInPage: React.FC = () => {
  const styles = useStyles();
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
    history.push('/');
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
    <Container className={styles.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={styles.paper}>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
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
            <CircularProgress className={styles.spinner} />
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}>
              Вход
            </Button>
          )}
          <Grid container justify="flex-end">
            <Grid item>
              <Typography variant="body2" color="textSecondary" component="p">
                Еще нет аккаунта?
                <Link to="/sign-up" className={styles.link}>
                  Зарегистрируйтесь
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignInPage;
