import { IDictionary, IDictionaryAction } from '../types';

const initialState: IDictionary = {
  words: [],
  wordsActual: [],
  wordsDifficult: [],
  wordsLearned: [],
};

export default function dictionaryReducer(state: IDictionary = initialState,
  action: IDictionaryAction) {
  switch (action.type) {
    case 'FETCH_DICTIONARY_START':
      return { ...state, isLoading: true };
    case 'FETCH_DICTIONARY_SUCCESS':
      return { ...state, isLoading: false, words: action.payload.words };
    case 'FETCH_DICTIONARY_ERROR':
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
}
