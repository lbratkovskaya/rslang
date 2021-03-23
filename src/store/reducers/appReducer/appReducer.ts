import { SET_IS_LOADING } from '../../actionTypes';
import { IAppAction, IAppState } from './types';

const initialState: IAppState = {
  isLoading: false,
};

export default function appReducer(state: IAppState = initialState, action: IAppAction) {
  switch (action.type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    default:
      return state;
  }
}
