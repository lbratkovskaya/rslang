import { IUserState, IUserAction, UserActionTypes } from '../../types';

const initialState: IUserState = {
  isLoading: false,
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
    case UserActionTypes.SET_USER_DATA:
      return { ...state, data: action.data };
    case UserActionTypes.SET_FAILED_ATTEMPT:
      return { ...state, failedAttempt: action.failedAttempt };
    case UserActionTypes.SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: action.isLoggedIn };
    case UserActionTypes.SET_IS_REGISTRED:
      return { ...state, isRegistred: action.isRegistred };
    case UserActionTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
