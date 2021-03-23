import { WordBookActionTypes, IWordBookState, IWordBookAction } from '../../types';

const initialState: IWordBookState = {
  isLoading: false,
  words: [],
};

const wordBookReducer = (state: IWordBookState = initialState, action: IWordBookAction) => {
  switch (action.type) {
    case WordBookActionTypes.FETCH_START:
      return { ...state, isLoading: true };
    case WordBookActionTypes.FETCH_SUCCESS:
      return { ...state, isLoading: false, words: action.payload.words };
    case WordBookActionTypes.FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default wordBookReducer;
