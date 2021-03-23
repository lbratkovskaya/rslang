import { IAppState } from './reducers/appReducer/types';
import { IUserState } from './reducers/userReducer/types';

export interface ICombinedState {
  dictionary: IDictionaryState;
  user: IUserState;
  app: IAppState;
}

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IDictionaryState {
  words: IWord[];
  wordsActual: IWord[];
  wordsDifficult: IWord[];
  wordsLearned: IWord[];
}

export enum DictionaryActionTypes {
  FETCH_START = 'FETCH_DICTIONARY_START',
  FETCH_SUCCESS = 'FETCH_DICTIONARY_SUCCESS',
  FETCH_ERROR = 'FETCH_DICTIONARY_ERROR',
}

export interface IDictionaryAction {
  type: DictionaryActionTypes;
  payload: {
    words: IWord[];
    isLoading: boolean;
    error: Error;
  };
}
