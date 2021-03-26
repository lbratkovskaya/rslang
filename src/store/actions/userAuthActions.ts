import { Dispatch } from 'redux';
import backendUrl from '../../consts';
import { IUserData, UserActionTypes } from '../types';

export const setFailedAttempt = (failedAttempt: boolean) => ({
  type: UserActionTypes.SET_FAILED_ATTEMPT,
  failedAttempt,
});

export const setIsLoggedIn = (isLoggedIn: boolean) => ({
  type: UserActionTypes.SET_IS_LOGGED_IN,
  isLoggedIn,
});

export const setIsUserLoading = (isLoading: boolean) => ({
  type: UserActionTypes.SET_IS_LOADING,
  isLoading,
});

export const setUserData = (data: IUserData) => ({
  type: UserActionTypes.SET_USER_DATA,
  data,
});

export const setIsRegistred = (isRegistred: boolean) => ({
  type: UserActionTypes.SET_IS_REGISTRED,
  isRegistred,
});

export const signInUser = (email: string, password: string) => (dispatch: Dispatch) => {
  dispatch(setIsUserLoading(true));
  fetch(`${backendUrl}/signin`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((response) => {
    if (response.status === 200) {
      dispatch(setIsLoggedIn(true));
      dispatch(setIsUserLoading(false));
      response.json().then((result) => {
        setUserData(result);
      });
    } else {
      dispatch(setFailedAttempt(true));
      dispatch(setIsUserLoading(false));
    }
  });
};

export const signUpUser = (
  name: string,
  email: string,
  password: string,
  image: ArrayBuffer | string | undefined
) => (dispatch: Dispatch) => {
  dispatch(setIsUserLoading(true));
  fetch(`${backendUrl}/users`, {
    method: 'POST',
    cache: 'no-cache',
    body: JSON.stringify({
      name,
      email,
      password,
      image: image?.toString(),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((response) => {
    if (response.status === 200) {
      dispatch(setIsRegistred(true));
      dispatch(setIsUserLoading(false));
    } else if (response.status === 417) {
      dispatch(setFailedAttempt(true));
      dispatch(setIsUserLoading(false));
    } else {
      dispatch(setIsRegistred(true));
      dispatch(setIsUserLoading(false));
    }
  });
};
