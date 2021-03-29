import { Dispatch } from 'redux';
import backendUrl from '../../constants';
import { DictionaryActionTypes, IUserData, IUserWord, IWord } from '../types';

const splitDictionaryWords = (loadedWords: { paginatedResults: Array<IUserWord> }[]) => {
  const acc = {
    easyWords: [] as Array<IUserWord>,
    difficultWords: [] as Array<IUserWord>,
    deletedWords: [] as Array<IUserWord>,
  };
  loadedWords[0].paginatedResults.reduce((accum, word) => {
    if (word.userWord?.optional.deleted) {
      accum.deletedWords.push(word);
    } else if (word.userWord?.difficulty === 'hard') {
      accum.difficultWords.push(word);
    } else {
      accum.easyWords.push(word);
    }
    return accum;
  }, acc);
  return acc;
};

const startDictLoading = () => ({
  type: DictionaryActionTypes.DICT_IS_LOADING,
  payload: { isLoading: true },
});

export const fetchDictSuccess = (words: { paginatedResults: Array<IUserWord> }[]) => ({
  type: DictionaryActionTypes.FETCH_SUCCESS,
  payload: { ...splitDictionaryWords(words), isLoading: false },
});

export const fetchDictError = (error: Error) => ({
  type: DictionaryActionTypes.FETCH_ERROR,
  payload: { error, isLoading: false },
});

export const fetchDictionary = (userData: IUserData) => async (dispatch: Dispatch) => {
  const fetchUserId = userData.userId;
  // eslint-disable-next-line max-len
  const url = `${backendUrl}/users/${fetchUserId}/aggregatedWords?filter={"userWord":{"$exists": true}}`;
  const userToken = userData.token;

  dispatch(startDictLoading());
  try {
    const res = await fetch(url, {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
      },
    });
    const words = await res.json();
    dispatch(fetchDictSuccess(words));
  } catch (e) {
    dispatch(fetchDictError(e));
  }
};

export const saveUserWord = (
  word: IWord,
  userData: IUserData,
  difficulty: string,
  deleted: boolean
) => async (dispatch: Dispatch) => {
  const fetchUserId = userData.userId;
  const url = `${backendUrl}/users/${fetchUserId}/words/${word.id}`;
  const userToken = userData.token;
  dispatch(startDictLoading());
  try {
    const res = await fetch(url, {
      method: 'POST',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty,
        optional: { deleted },
      }),
    });
    const words = await res.json();
    dispatch(fetchDictSuccess(words));
  } catch (e) {
    dispatch(fetchDictError(e));
  }
};

export const setUserWordData = (
  word: IUserWord,
  userData: IUserData,
  difficulty: string,
  deleted: boolean
) => async (dispatch: Dispatch) => {
  const fetchUserId = userData.userId;
  // eslint-disable-next-line no-underscore-dangle
  const url = `${backendUrl}/users/${fetchUserId}/words/${word.id || word._id}`;
  const userToken = userData.token;
  dispatch(startDictLoading());
  try {
    const res = await fetch(url, {
      method: 'PUT',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty,
        optional: { deleted },
      }),
    });
    const words = await res.json();
    dispatch(fetchDictSuccess(words));
  } catch (e) {
    dispatch(fetchDictError(e));
  }
};

export const setUserWordEasy = (word: IWord, userData: IUserData) => async (dispatch: Dispatch) => {
  const deleted =
    ((<IUserWord>word).userWord && (<IUserWord>word).userWord?.optional.deleted) || false;
  if ((<IUserWord>word).userWord === undefined) {
    saveUserWord(word, userData, 'easy', deleted)(dispatch);
  } else {
    setUserWordData(word, userData, 'easy', deleted)(dispatch);
  }
};

export const setUserWordHard = (word: IWord, userData: IUserData) => async (dispatch: Dispatch) => {
  const deleted =
    ((<IUserWord>word).userWord && (<IUserWord>word).userWord?.optional.deleted) || false;
  if ((<IUserWord>word).userWord === undefined) {
    saveUserWord(word, userData, 'hard', deleted)(dispatch);
  } else {
    setUserWordData(word, userData, 'hard', deleted)(dispatch);
  }
};

export const setUserWordDeleted = (word: IWord, userData: IUserData, deleted: boolean) => async (
  dispatch: Dispatch
) => {
  const difficulty =
    ((<IUserWord>word).userWord && (<IUserWord>word).userWord?.difficulty) || 'easy';
  if ((<IUserWord>word).userWord === undefined) {
    saveUserWord(word, userData, difficulty, deleted)(dispatch);
  } else {
    setUserWordData(word, userData, difficulty, deleted)(dispatch);
  }
};
