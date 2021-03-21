import { DictionaryActionTypes, IDictionary, IDictionaryAction } from '../../types';

const initialState: IDictionary = {
  words: [],
  wordsActual: [],
  wordsDifficult: [],
  wordsLearned: [],
};

export default function dictionaryReducer(
  state: IDictionary = initialState,
  action: IDictionaryAction
) {
  switch (action.type) {
    case DictionaryActionTypes.FETCH_START:
      return { ...state, isLoading: true };
    case DictionaryActionTypes.FETCH_SUCCESS:
      return { ...state, isLoading: false, words: action.payload.words };
    case DictionaryActionTypes.FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
}
