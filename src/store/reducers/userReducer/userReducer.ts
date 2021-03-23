import { IUserState, IUserAction } from './types';
import {
  SET_FAILED_ATTEMPT,
  SET_IS_LOGGED_IN,
  SET_IS_REGISTRED,
  SET_USER_DATA,
} from '../../actionTypes';

const initialState: IUserState = {
  isLoggedIn: false,
  isRegistred: false,
  failedAttempt: false,
  data: {
    userId: '',
    name: '',
    image: '',
    token: '',
    refreshToken: '',
  },
};

export default function userReducer(state: IUserState = initialState, action: IUserAction) {
  switch (action.type) {
    case SET_USER_DATA:
      return { ...state, data: action.data };
    case SET_FAILED_ATTEMPT:
      return { ...state, failedAttempt: action.failedAttempt };
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case SET_IS_REGISTRED:
      return { ...state, isRegistred: action.isRegistred };
    default:
      return state;
  }
}
