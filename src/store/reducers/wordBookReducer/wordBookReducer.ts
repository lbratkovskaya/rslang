import { WordBookActionTypes, IWordBookState, IWordBookAction } from '../../types';

const initialState: IWordBookState = {
  isLoading: false,
  words: [],
  group: 0,
  page: 0,
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
      return { ...state, group: action.payload.group };
    case WordBookActionTypes.SET_PAGE:
      return { ...state, page: action.payload.page };
    default:
      return state;
  }
};

export default wordBookReducer;
