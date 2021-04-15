import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  TextField,
  Grid,
  Tooltip,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Header from '../Header';
import ModalWindow from '../ModalWindow';
import Footer from '../Footer';
import { signUpUser, setFailedAttempt, setIsRegistred } from '../../store/actions/userAuthActions';
import { ROUTES } from '../../constants';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const SignUpPage: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [passwordMismatch, setPasswordMismatch] = React.useState(false);
  const [passwordTooShort, setPasswordTooShort] = React.useState(false);
  const [emailInvalid, setEmailInvalid] = React.useState(false);
  const [userNameEmpty, setUserNameEmpty] = React.useState(false);
  const [userEmailEmpty, setUserEmailEmpty] = React.useState(false);
  const [userImageToUpload, setUserImageToUpload] = React.useState<string | ArrayBuffer>();
  const [open, setOpen] = React.useState(false);
  const handleCloseModalWindow = () => setOpen(false);
  const handleShowModalWindow = () => setOpen(true);

  const isRegistred = useSelector((state: IAppState) => state.user.isRegistred);
  const isFailedAttempt = useSelector((state: IAppState) => state.user.failedAttempt);
  const isLoading = useSelector((state: IAppState) => state.user.isLoading);

  const handleClose = () => {
    setEmailInvalid(false);
    setUserEmailEmpty(false);
    setPasswordMismatch(false);
    setUserNameEmpty(false);
    setPasswordTooShort(false);
    setUserName('');
    setUserEmail('');
    setPassword('');
    setConfirmPassword('');
    dispatch(setFailedAttempt(false));
    dispatch(setIsRegistred(false));
    history.push(ROUTES.signIn);
  };

  const handleSubmit = (event: React.FormEvent) => {
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
      setPasswordMismatch(true);
    } else {
      dispatch(signUpUser(userName, userEmail, password, userImageToUpload));
    }
  };

  const setUserImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    const isFileReceived = files && files.length;
    const isImage = files![0].type.startsWith('image');

    if (isFileReceived && isImage) {
      const reader = new FileReader();
      reader.readAsDataURL(files![0]);
      reader.onloadend = () => (reader.result ? setUserImageToUpload(reader.result) : null);
    }

    if (isFileReceived && !isImage) {
      handleShowModalWindow();
    }
  };

  React.useEffect(() => {
    if (isRegistred) {
      handleClose();
    }
  }, [isRegistred]);

  return (
    <div>
      <Header />
      <ModalWindow
        text="Выбран некорректный файл. Пожалуйста, выберите изображение."
        open={open}
        handleClose={handleCloseModalWindow}
        isText
      />
      <main className={classes.signUpPageWrapper}>
        <Container maxWidth="xs">
          <div className={classes.paper}>
            <Tooltip title="Загрузить аватар" placement="right">
              <Avatar className={classes.avatar}>
                <input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  style={{ display: 'none' }}
                  onChange={setUserImage}
                />
                <label htmlFor="contained-button-file">
                  {userImageToUpload === undefined ? (
                    <LockOutlinedIcon className={classes.pointer} />
                  ) : (
                    <Avatar className={classes.userImage} src={userImageToUpload.toString()} />
                  )}
                </label>
              </Avatar>
            </Tooltip>
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
                    id="name"
                    label="имя"
                    name="имя"
                    autoComplete="имя"
                    error={userNameEmpty}
                    helperText={userNameEmpty && 'введите имя'}
                    onChange={(event) => {
                      setUserName(event.currentTarget.value);
                      dispatch(setFailedAttempt(false));
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
                    id="password"
                    error={passwordTooShort}
                    helperText={passwordTooShort && 'пароль должен быть длиннее 8 символов'}
                    autoComplete="пароль"
                    onChange={(event) => {
                      setPassword(event.currentTarget.value);
                    }}
                    onFocus={() => {
                      setPasswordTooShort(false);
                      setPasswordMismatch(false);
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
                    error={passwordMismatch}
                    helperText={passwordMismatch && 'пароли не совпадают'}
                    id="confirm_password"
                    autoComplete="повторите пароль"
                    onChange={(event) => {
                      setConfirmPassword(event.currentTarget.value);
                    }}
                    onFocus={() => {
                      setPasswordMismatch(false);
                    }}
                  />
                </Grid>
              </Grid>
              {isLoading ? (
                <CircularProgress className={classes.spinner} />
              ) : (
                <div className={classes.button_wrapper}>
                  <Link to="/" className={classes.link_button}>
                    <Button
                      type="button"
                      variant="contained"
                      color="default"
                      className={classes.cancel}>
                      Отмена
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    className={classes.submit}>
                    Регистрация
                  </Button>
                </div>
              )}
              <Grid container justify="center">
                <Grid item>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Уже есть аккаунт?
                    <Link to="/sign-in" className={classes.link}>
                      Войти
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

export default SignUpPage;
