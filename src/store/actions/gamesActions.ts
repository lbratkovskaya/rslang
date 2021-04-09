import { Dispatch } from 'redux';
import store from '../index';
import { GAMES_WORDS_MAX_AMOUNT, backendUrl } from '../../constants';
import { GamesActionTypes, IWord } from '../types';

export const addWordToGamesStore = (word: IWord) => {
  const { actualWords } = store.getState().games;
  const isMaxAmount = actualWords.length > GAMES_WORDS_MAX_AMOUNT * 2;
  const isAddedBefore = actualWords.find((el) => el.word === word.word);

  if (!isAddedBefore) actualWords.push(word);
  if (isMaxAmount) actualWords.shift();

  return {
    type: GamesActionTypes.ADD_WORD,
    payload: { actualWords },
  };
};

export const deleteWordFromGamesStore = ({ word }: IWord) => {
  const actualWords = store.getState().games.actualWords.filter((el) => el.word !== word);

  return {
    type: GamesActionTypes.DELETE_WORD,
    payload: { actualWords },
  };
};

export const changeCountDown = (value: boolean) => {
  return {
    type: GamesActionTypes.COUNTDOWN,
    payload: { isCountDown: value },
  };
};

export const fetchGameWordsStart = () => ({
  type: GamesActionTypes.FETCH_GAME_WORDS_START,
  payload: { isLoading: true },
});

export const fetchGameWordsSuccess = (gameWords: Array<IWord>) => ({
  type: GamesActionTypes.FETCH_GAME_WORDS_SUCCESS,
  payload: { gameWords },
});

export const fetchGameWordsError = (error: Error) => ({
  type: GamesActionTypes.FETCH_GAME_WORDS_ERROR,
  payload: { error },
});

export const fetchExtraWordsSuccess = (extraWords: Array<IWord>) => ({
  type: GamesActionTypes.FETCH_EXTRA_SUCCESS,
  payload: { extraWords },
});

export const fetchExtraWordsError = (error: Error) => ({
  type: GamesActionTypes.FETCH_EXTRA_ERROR,
  payload: { error },
});

export const fetchGameWords = (group: number = 0, page: number = 0) => async (
  dispatch: Dispatch
) => {
  const url = `${backendUrl}/words/?group=${group}&page=${page}`;

  dispatch(fetchGameWordsStart());
  try {
    const res = await fetch(url);
    const words = await res.json();
    dispatch(fetchGameWordsSuccess(words));
  } catch (e) {
    dispatch(fetchGameWordsError(e));
  }
};

export const fetchExtraWords = (value: number = 0) => async (dispatch: Dispatch) => {
  const url = `${backendUrl}/words?random=true&count=${value}`;

  try {
    const res = await fetch(url);
    const words = await res.json();
    dispatch(fetchExtraWordsSuccess(words));
  } catch (e) {
    dispatch(fetchExtraWordsError(e));
  }
};
