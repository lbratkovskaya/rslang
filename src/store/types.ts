export interface IAppState {
  wordBook: IWordBookState;
  savannah: ISavannahState;
  user: IUserState;
  userDictionary: IDictionaryState;
  games: IGamesState;
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
  SET_IS_REGISTERED = 'USER/SET_IS_REGISTERED',
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
  words: Array<IWord>;
  activeGroup: number;
  activePage: number;
  showTranslate: boolean;
  showButtons: boolean;
}

export enum WordBookActionTypes {
  FETCH_START = 'FETCH_WORDS_START',
  FETCH_SUCCESS = 'FETCH_WORDS_SUCCESS',
  FETCH_ERROR = 'FETCH_WORDS_ERROR',
  SET_GROUP = 'SET_GROUP',
  SET_PAGE = 'SET_PAGE',
  SET_SHOW_TRANSLATE = 'SET_SHOW_TRANSLATE',
}

export interface ISavannahWord {
  word: string;
  translate: string;
  isCorrect: boolean;
}

export interface ISavannahState {
  level: number;
  round: number;
  isEng: boolean;
  isStartGame: boolean;
  words: Array<ISavannahWord>;
}

export interface IOptions {
  name: string;
  amount: number;
}

export interface IWordBookAction {
  type: WordBookActionTypes;
  payload: {
    words: Array<IWord>;
    isLoading: boolean;
    error: Error;
    activeGroup: number;
    activePage: number;
    showTranslate: boolean;
  };
}

export interface IUserWord extends IWord {
  _id?: string;
  userWord?: {
    difficulty: string;
    optional: {
      deleted: boolean;
      successHeats: number;
      errorHeats: number;
      [key: string]: any;
    };
  };
}

export interface IDictionaryState {
  isLoading: boolean;
  easyWords: Array<IWord>;
  difficultWords: Array<IWord>;
  deletedWords: Array<IWord>;
}

export enum DictionaryActionTypes {
  DICT_IS_LOADING = 'DICT_IS_LOADING',
  FETCH_SUCCESS = 'FETCH_DICT_SUCCESS',
  FETCH_ERROR = 'FETCH_DICT_ERROR',
  SET_WORD_EASY = 'SET_WORD_EASY',
  SET_WORD_HARD = 'SET_WORD_HARD',
  SET_WORD_DELETED = 'SET_WORD_DELETED',
}

export interface IDictionaryAction {
  type: DictionaryActionTypes;
  payload: {
    allWords: Array<IWord>;
    easyWords: Array<IWord>;
    difficultWords: Array<IWord>;
    deletedWords: Array<IWord>;
    error: Error;
  };
}

export interface IGamesState {
  actualWords: Array<IWord>;
  games: {
    // savannah: ISavannahState,
    // audioCalling: IAudioCallingState;
  };
}

export enum GamesActionTypes {
  ADD_WORD = 'ADD_WORD',
  DELETE_WORD = 'DELETE_WORD',
}

export interface IGamesAction {
  type: GamesActionTypes;
  payload: {
    actualWords: Array<IWord>;
  };
}
