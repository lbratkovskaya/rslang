import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ICombinedState } from '../../store/types';
import { 
  SET_FAILED_ATTEMPT,
  SET_IS_REGISTRED 
} from '../../store/actionTypes';
import { signUpUser } from '../../store/actions/userAuthActions';
import ModalWindow from '../ModalWindow/ModalWindow';

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

const SignUpPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordMissmatch, setPasswordMissmatch] = React.useState(false);
  const [passwordTooShort, setPasswordTooShort] = React.useState(false);
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const [userNameEmpty, setUserNameEmpty] = React.useState(false);
  const [userEmailEmpty, setUserEmailEmpty] = React.useState(false);
  const [userImageToUpload, setUserImageToUpload] = React.useState<string | ArrayBuffer>();
  const [open, setOpen] = React.useState(false);
  const handleCloseModalWindow = () => {setOpen(false)};
  const handleShowModalWindow = () => {setOpen(true)};

  const isRegistred = useSelector((state: ICombinedState) => state.user.isRegistred);
  const isFailedAttempt = useSelector((state: ICombinedState) => state.user.failedAttempt);
  const isLoading = useSelector((state: ICombinedState) => state.app.isLoading);

  const handleClose = () => {
    setEmailInvalid(false);
    setUserEmailEmpty(false);
    setPasswordMissmatch(false);
    setUserNameEmpty(false);
    setPasswordTooShort(false);
    setUserName('');
    setUserEmail('');
    setPassword('');
    setConfirmPassword('');
    dispatch({ type: SET_FAILED_ATTEMPT, failedAttempt: false });
    dispatch({ type: SET_IS_REGISTRED, isRegistred: false });
    history.push('/sign-in');
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!userName.length) {
      setUserNameEmpty(true);
    } else if (!userEmail.length) {
      setUserEmailEmpty(true);
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      setEmailInvalid(true);
    } else if (password.length < 8) {
      setPasswordTooShort(true);
    } else if (password !== confirmPassword) {
      setPasswordMissmatch(true);
    } else {
      dispatch(signUpUser(userName, userEmail, password, userImageToUpload));
    }
  };

  React.useEffect(() => {
    if (isRegistred) {
      handleClose();
    }
  }, [isRegistred]);

  return (
    <div>
      <ModalWindow 
        text='Выбран некорректный файл. Пожалуйста, выберите изображение.' 
        open={open} 
        handleClose={handleCloseModalWindow}
      />
      <Container className={classes.container} component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              style={{ display: 'none' }}
              onChange={(event) => {
                if (
                  event.currentTarget.files &&
                  event.currentTarget.files.length &&
                  event.currentTarget.files[0].type.startsWith('image')
                ) {
                  const reader = new FileReader();
                  reader.readAsDataURL(event.currentTarget.files[0]);
                  reader.onloadend = () => {
                    if (reader.result) {
                      setUserImageToUpload(reader.result);
                    }
                  };
                } else if (event.currentTarget.files &&
                  event.currentTarget.files.length &&
                  !event.currentTarget.files[0].type.startsWith('image')) {
                    handleShowModalWindow()
                }
              }}
            />
            <label htmlFor="contained-button-file">
              {userImageToUpload === undefined ? (
                <LockOutlinedIcon className={classes.pointer} />
              ) : (
                <Avatar className={classes.userImage} src={userImageToUpload.toString()} />
              )}
            </label>
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="имя"
                  label="имя"
                  name="имя"
                  autoComplete="имя"
                  error={userNameEmpty}
                  helperText={userNameEmpty && 'введите имя'}
                  onChange={(event) => {
                    setUserName(event.currentTarget.value);
                    dispatch({ type: SET_FAILED_ATTEMPT, failedAttempt: false });
                  }}
                  onFocus={() => {
                    setUserNameEmpty(false);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  error={userEmailEmpty || emailInvalid || isFailedAttempt}
                  helperText={
                    (userEmailEmpty && 'введите email') ||
                    (emailInvalid && 'email не существует') ||
                    (isFailedAttempt && 'email занят')
                  }
                  label="email"
                  name="email"
                  autoComplete="email"
                  onChange={(event) => {
                    setUserEmail(event.currentTarget.value);
                  }}
                  onFocus={() => {
                    setEmailInvalid(false);
                    setUserEmailEmpty(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="пароль"
                  label="пароль"
                  type="password"
                  id="пароль"
                  error={passwordTooShort}
                  helperText={passwordTooShort && 'пароль должен быть длиннее 8 символов'}
                  autoComplete="пароль"
                  onChange={(event) => {
                    setPassword(event.currentTarget.value);
                  }}
                  onFocus={() => {
                    setPasswordTooShort(false);
                    setPasswordMissmatch(false);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="повторите пароль"
                  label="повторите пароль"
                  type="password"
                  error={passwordMissmatch}
                  helperText={passwordMissmatch && 'пароли не совпадают'}
                  id="повторите_пароль"
                  autoComplete="повторите пароль"
                  onChange={(event) => {
                    setConfirmPassword(event.currentTarget.value);
                  }}
                  onFocus={() => {
                    setPasswordMissmatch(false);
                  }}
                />
              </Grid>
            </Grid>
            {isLoading ? (
              <CircularProgress className={classes.spinner} />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}>
                Регистрация
              </Button>
            )}
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/sign-in" className={classes.link}>
                  Уже есть аккаунт? Войти
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default SignUpPage;
