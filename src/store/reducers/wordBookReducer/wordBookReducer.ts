import { WordBookActionTypes, IWordBookState, IWordBookAction } from '../../types';

const initialState: IWordBookState = {
  isLoading: false,
  words: [],
  activeGroup: -1,
  activePage: -1,
};

const wordBookReducer = (state: IWordBookState = initialState, action: IWordBookAction) => {
  switch (action.type) {
    case WordBookActionTypes.FETCH_START:
      return { ...state, isLoading: true };
    case WordBookActionTypes.FETCH_SUCCESS:
      return { ...state, isLoading: false, words: action.payload.words };
    case WordBookActionTypes.FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    case WordBookActionTypes.SET_GROUP:
      return { ...state, activeGroup: action.payload.activeGroup };
    case WordBookActionTypes.SET_PAGE:
      return { ...state, activePage: action.payload.activePage };
    default:
      return state;
  }
};

export default wordBookReducer;
