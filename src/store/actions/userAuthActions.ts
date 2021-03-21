import { Dispatch } from 'redux';
import backendUrl from '../../consts';
import {
  SET_FAILED_ATTEMPT,
  SET_IS_LOADING,
  SET_IS_LOGGED_IN,
  SET_IS_REGISTRED,
  SET_USER_DATA,
} from '../actionTypes';

export const signInUser = (email: string, password: string) => (dispatch: Dispatch) => {
  dispatch({ type: SET_IS_LOADING, isLoading: true });
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
      dispatch({ type: SET_IS_LOGGED_IN, isLoggedIn: true });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
      response.json().then((result) => {
        dispatch({ type: SET_USER_DATA, data: result });
      });
    } else {
      dispatch({ type: SET_FAILED_ATTEMPT, failedAttempt: true });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    }
  });
};

export const signUpUser = (
  name: string,
  email: string,
  password: string,
  image: ArrayBuffer | string | undefined
) => (dispatch: Dispatch) => {
  dispatch({ type: SET_IS_LOADING, isLoading: true });
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
      dispatch({ type: SET_IS_REGISTRED, isRegistred: true });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    } else {
      dispatch({ type: SET_FAILED_ATTEMPT, failedAttempt: true });
      dispatch({ type: SET_IS_LOADING, isLoading: false });
    }
  });
};
