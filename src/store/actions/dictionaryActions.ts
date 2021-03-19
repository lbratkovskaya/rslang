import { Dispatch } from 'redux';
import { DictionaryActionTypes, IWord } from '../types';

export function fetchDictionaryStart() {
  return {
    type: DictionaryActionTypes.FETCH_START,
  };
}

export function fetchDictionarySuccess(words: IWord[]) {
  return {
    type: DictionaryActionTypes.FETCH_SUCCESS,
    payload: { words },
  };
}

export function fetchDictionaryError(error: Error) {
  return {
    type: DictionaryActionTypes.FETCH_ERROR,
    payload: { error },
  };
}

export function fetchDictionary() {
  return async (dispatch: Dispatch) => {
    const apiURL = 'https://react-learnwords-example.herokuapp.com/words';
    dispatch(fetchDictionaryStart());
    try {
      const res = await fetch(apiURL);
      const words = await res.json();
      dispatch(fetchDictionarySuccess(words));
    } catch (e) {
      dispatch(fetchDictionaryError(e));
    }
  };
}
