import { Dispatch } from 'redux';
import backendUrl from '../../constants';
import { WordBookActionTypes, IWord } from '../types';

export const fetchWordsStart = () => ({
  type: WordBookActionTypes.FETCH_START,
  payload: { isLoading: true },
});

export const fetchWordsSuccess = (words: Array<IWord>) => ({
  type: WordBookActionTypes.FETCH_SUCCESS,
  payload: { words },
});

export const fetchWordsError = (error: Error) => ({
  type: WordBookActionTypes.FETCH_ERROR,
  payload: { error },
});

export const setGroup = (group: number) => ({
  type: WordBookActionTypes.SET_GROUP,
  payload: { activeGroup: group },
});

export const setPage = (page: number) => ({
  type: WordBookActionTypes.SET_PAGE,
  payload: { activePage: page },
});

export const setShowTranslate = (show: boolean) => ({
  type: WordBookActionTypes.SET_SHOW_TRANSLATE,
  payload: { showTranslate: show },
});

export const setShowButtons = (show: boolean) => ({
  type: WordBookActionTypes.SET_SHOW_BUTTONS,
  payload: { showButtons: show },
});

export const fetchWords = (group: number = 0, page: number = 0) => async (dispatch: Dispatch) => {
  const url = `${backendUrl}/words/?group=${group}&page=${page}`;

  dispatch(fetchWordsStart());
  try {
    const res = await fetch(url);
    const words = await res.json();
    dispatch(fetchWordsSuccess(words));
  } catch (e) {
    dispatch(fetchWordsError(e));
  }
};
