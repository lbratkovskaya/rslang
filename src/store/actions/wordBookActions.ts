import { Dispatch } from 'redux';
import backendUrl from '../../consts';
import { WordBookActionTypes, IWord } from '../types';

export const fetchWordsStart = () => ({
  type: WordBookActionTypes.FETCH_START,
  payload: { isLoading: true },
});

export const fetchWordsSuccess = (words: Array<IWord>) => ({
  type: WordBookActionTypes.FETCH_SUCCESS,
  payload: { words, isLoading: false },
});

export const fetchWordsError = (error: Error) => ({
  type: WordBookActionTypes.FETCH_ERROR,
  payload: { error, isLoading: false },
});

export const fetchWords = () => async (dispatch: Dispatch) => {
  dispatch(fetchWordsStart());
  try {
    const res = await fetch(`${backendUrl}/words`);
    const words = await res.json();
    dispatch(fetchWordsSuccess(words));
  } catch (e) {
    dispatch(fetchWordsError(e));
  }
};
