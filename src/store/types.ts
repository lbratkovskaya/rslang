export interface IAppState {
  wordBook: IWordBookState;
  user: IUserState;
}

export interface IUserData {
  userId: string;
  name: string;
  image: string;
  token: string;
  refreshToken: string;
}

export interface IUserState {
  isLoading: boolean;
  isLoggedIn: boolean;
  isRegistred: boolean;
  failedAttempt: boolean;
  data: IUserData;
}

export enum UserActionTypes {
  SET_USER_DATA = 'USER/SET_USER_DATA',
  SET_FAILED_ATTEMPT = 'USER/SET_FAILED_ATTEMPT',
  SET_IS_LOGGED_IN = 'USER/SET_IS_LOGGED_IN',
  SET_IS_REGISTRED = 'USER/SET_IS_REGISTRE',
  SET_IS_LOADING = 'USER/SET_IS_LOADING',
}

export interface IUserAction {
  isLoading?: boolean;
  type: UserActionTypes;
  isLoggedIn?: boolean;
  isRegistred?: boolean;
  failedAttempt?: boolean;
  data?: IUserData;
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
  activeGroup: number;
  activePage: number;
}

export enum WordBookActionTypes {
  FETCH_START = 'FETCH_WORDS_START',
  FETCH_SUCCESS = 'FETCH_WORDS_SUCCESS',
  FETCH_ERROR = 'FETCH_WORDS_ERROR',
  SET_GROUP = 'SET_GROUP',
  SET_PAGE = 'SET_PAGE',
}

export interface IWordBookAction {
  type: WordBookActionTypes;
  payload: {
    words: IWord[];
    isLoading: boolean;
    error: Error;
    activeGroup: number;
    activePage: number;
  };
}
