import { Dispatch } from 'redux';
import backendUrl from '../../consts';
import { DictionaryActionTypes, IWord } from '../types';

export const fetchDictionaryStart = () => ({
  type: DictionaryActionTypes.FETCH_START,
});

export const fetchDictionarySuccess = (words: IWord[]) => ({
  type: DictionaryActionTypes.FETCH_SUCCESS,
  payload: { words },
});

export const fetchDictionaryError = (error: Error) => ({
  type: DictionaryActionTypes.FETCH_ERROR,
  payload: { error },
});

export const fetchDictionary = () => async (dispatch: Dispatch) => {
  dispatch(fetchDictionaryStart());
  try {
    const res = await fetch(`${backendUrl}/words`);
    const words = await res.json();
    dispatch(fetchDictionarySuccess(words));
  } catch (e) {
    dispatch(fetchDictionaryError(e));
  }
};
