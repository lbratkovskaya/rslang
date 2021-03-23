import { IAppState } from './reducers/appReducer/types';
import { IUserState } from './reducers/userReducer/types';

export interface ICombinedState {
  wordBook: IWordBookState;
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

export interface IWordBookState {
  isLoading: boolean;
  words: IWord[];
}

export enum WordBookActionTypes {
  FETCH_START = 'FETCH_WORDS_START',
  FETCH_SUCCESS = 'FETCH_WORDS_SUCCESS',
  FETCH_ERROR = 'FETCH_WORDS_ERROR',
}

export interface IWordBookAction {
  type: WordBookActionTypes;
  payload: {
    words: IWord[];
    isLoading: boolean;
    error: Error;
  };
}
