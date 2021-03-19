import { Dispatch } from 'redux';
import { IWord } from '../types';

export const testWord: IWord = {
  id: '5e9f5ee35eb9e72bc21af4b2',
  group: 0,
  page: 0,
  word: 'wine',
  image: 'files/01_0020.jpg',
  audio: 'files/01_0020.mp3',
  audioMeaning: 'files/01_0020_meaning.mp3',
  audioExample: 'files/01_0020_example.mp3',
  textMeaning: '<i>Wine</i> is an alcoholic drink made from grapes.',
  textExample: 'The store carried both red and white <b>wine</b>.',
  transcription: '[wain]',
  textExampleTranslate: 'В магазине было красное и белое вино',
  textMeaningTranslate: 'Вино - это алкогольный напиток из винограда',
  wordTranslate: 'вино',
};

export function fetchDictionaryStart() {
  return {
    type: 'FETCH_DICTIONARY_START',
  };
}

export function fetchDictionarySuccess(words: IWord[]) {
  return {
    type: 'FETCH_DICTIONARY_SUCCESS',
    payload: { words },
  };
}

export function fetchDictionaryError(error: Error) {
  return {
    type: 'FETCH_DICTIONARY_ERROR',
    payload: { error },
  };
}

export function fetchDictionary() {
  return (dispatch: Dispatch) => {
    dispatch(fetchDictionaryStart());
    try {
      const words: IWord[] = [testWord];
      dispatch(fetchDictionarySuccess(words));
    } catch (e) {
      dispatch(fetchDictionaryError(e));
    }
  };
}
