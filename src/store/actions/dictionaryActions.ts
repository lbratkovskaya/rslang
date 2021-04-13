import { Dispatch } from 'redux';
import backendUrl from '../../constants';
import {
  DictionaryActionTypes,
  IDictionaryState,
  IUserData,
  IUserWord,
  IWord,
  IWordWithResult,
} from '../types';

const splitDictionaryWords = (loadedWords: { paginatedResults: Array<IUserWord> }[]) => {
  const acc = {
    learningWords: [] as Array<IUserWord>,
    difficultWords: [] as Array<IUserWord>,
    deletedWords: [] as Array<IUserWord>,
  };
  loadedWords[0].paginatedResults.reduce((accum, word) => {
    const uWord = { ...word };
    if (!uWord.id) {
      // eslint-disable-next-line no-underscore-dangle
      Object.assign(uWord, { id: uWord._id });
    }
    if (uWord.userWord?.optional.deleted) {
      accum.deletedWords.push(uWord);
    } else {
      if (uWord.userWord?.difficulty === 'hard') {
        accum.difficultWords.push(uWord);
      }
      accum.learningWords.push(uWord);
    }
    return accum;
  }, acc);
  return acc;
};

const getSuccessHeats = (word: IWord): number => {
  return ((<IUserWord>word).userWord && (<IUserWord>word).userWord?.optional.successHeats) || 0;
};

const getErrorHeats = (word: IWord): number => {
  return ((<IUserWord>word).userWord && (<IUserWord>word).userWord?.optional.errorHeats) || 0;
};

const getDifficulty = (word: IWord): string => {
  return ((<IUserWord>word).userWord && (<IUserWord>word).userWord?.difficulty) || 'easy';
};

const getDeleted = (word: IWord): boolean => {
  return ((<IUserWord>word).userWord && (<IUserWord>word).userWord?.optional.deleted) || false;
};

const startDictLoading = () => ({
  type: DictionaryActionTypes.DICT_IS_LOADING,
  payload: { isLoading: true },
});

const fetchDictSuccess = (words: { paginatedResults: Array<IUserWord> }[]) => ({
  type: DictionaryActionTypes.FETCH_SUCCESS,
  payload: { ...splitDictionaryWords(words), isLoading: false },
});

const setEmptyDictionary = () => ({
  type: DictionaryActionTypes.FETCH_SUCCESS,
  payload: {
    learningWords: [] as Array<IUserWord>,
    easyWords: [] as Array<IUserWord>,
    difficultWords: [] as Array<IUserWord>,
    deletedWords: [] as Array<IUserWord>,
    isLoading: false,
  },
});

const fetchDictError = (error: Error) => ({
  type: DictionaryActionTypes.FETCH_ERROR,
  payload: { error, isLoading: false },
});

export const fetchDictionary = (userData: IUserData) => async (dispatch: Dispatch) => {
  const fetchUserId = userData.userId;
  // eslint-disable-next-line max-len
  const url = `${backendUrl}/users/${fetchUserId}/aggregatedWords?wordsPerPage=3600&filter={"userWord":{"$exists": true}}`;
  const userToken = userData.token;

  if (!userToken) {
    dispatch(setEmptyDictionary());
    return;
  }
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

const sendUserWord = (
  word: IWord,
  userData: IUserData,
  difficulty: string,
  deleted: boolean,
  addSuccess: number,
  addFail: number,
  isNew: boolean
) => async (dispatch: Dispatch) => {
  const fetchUserId = userData.userId;
  const userToken = userData.token;
  const url = `${backendUrl}/users/${fetchUserId}/words/${word.id}`;
  const method = isNew ? 'POST' : 'PUT';

  const successHeats = getSuccessHeats(word) + addSuccess;
  const errorHeats = getErrorHeats(word) + addFail;

  try {
    await fetch(url, {
      method,
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty,
        optional: { deleted, successHeats, errorHeats },
      }),
    });
  } catch (e) {
    dispatch(fetchDictError(e));
  }
};

const saveUserWord = (
  word: IWord,
  userData: IUserData,
  difficulty: string,
  deleted: boolean,
  success: number,
  fail: number
) => async (dispatch: Dispatch) => {
  await sendUserWord(word, userData, difficulty, deleted, success, fail, true)(dispatch);
};

const setUserWordData = (
  word: IUserWord,
  userData: IUserData,
  difficulty: string,
  deleted: boolean,
  success: number,
  fail: number
) => async (dispatch: Dispatch) => {
  await sendUserWord(word, userData, difficulty, deleted, success, fail, false)(dispatch);
};

export const setUserWordEasy = (word: IWord, userData: IUserData) => async (dispatch: Dispatch) => {
  if ((<IUserWord>word).userWord === undefined) {
    await saveUserWord(word, userData, 'easy', false, 0, 0)(dispatch);
  } else {
    await setUserWordData(word, userData, 'easy', false, 0, 0)(dispatch);
  }
};

export const setUserWordHard = (word: IWord, userData: IUserData) => async (dispatch: Dispatch) => {
  if ((<IUserWord>word).userWord === undefined) {
    await saveUserWord(word, userData, 'hard', false, 0, 0)(dispatch);
  } else {
    await setUserWordData(word, userData, 'hard', false, 0, 0)(dispatch);
  }
  fetchDictionary(userData)(dispatch);
};

export const setUserWordDeleted = (word: IWord, userData: IUserData, deleted: boolean) => async (
  dispatch: Dispatch
) => {
  const difficulty = getDifficulty(word);

  if ((<IUserWord>word).userWord === undefined) {
    await saveUserWord(word, userData, difficulty, deleted, 0, 0)(dispatch);
  } else {
    await setUserWordData(word, userData, difficulty, deleted, 0, 0)(dispatch);
  }
  fetchDictionary(userData)(dispatch);
};

export const addWordsToUserDictionary = (
  words: Array<IWordWithResult>,
  userDictionary: IDictionaryState,
  userData: IUserData
) => async (dispatch: Dispatch) => {
  const userWords = [...userDictionary.learningWords, ...userDictionary.deletedWords];
  await words.forEach((word) => {
    const success = word.correct ? 1 : 0;
    const fail = word.correct ? 0 : 1;
    const uWord = userWords.find((uw) => uw.id === word.word?.id);
    if (uWord) {
      setUserWordData(
        uWord,
        userData,
        getDifficulty(uWord),
        getDeleted(uWord),
        success,
        fail
      )(dispatch);
    } else {
      saveUserWord(word.word, userData, 'easy', false, success, fail)(dispatch);
    }
  });
  fetchDictionary(userData)(dispatch);
};

export const deleteUserWord = (word: IUserWord, userData: IUserData) => async (
  dispatch: Dispatch
) => {
  const fetchUserId = userData.userId;
  const userToken = userData.token;
  const url = `${backendUrl}/users/${fetchUserId}/words/${word.id}`;
  dispatch(startDictLoading());
  try {
    fetch(url, {
      method: 'DELETE',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => fetchDictionary(userData)(dispatch))
      .catch((error) => dispatch(fetchDictError(error)));
  } catch (e) {
    dispatch(fetchDictError(e));
  }
};
