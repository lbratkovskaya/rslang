import { IAudioCallingState } from './reducers/audioCallingReducer/types';
import { IMemoryGameState } from './reducers/memoryGameReducer/types';

export interface IAppState {
  wordBook: IWordBookState;
  savannah: ISavannahState;
  user: IUserState;
  audioCalling: IAudioCallingState;
  userDictionary: IDictionaryState;
  games: IGamesState;
  volumeHandler: IVolumeState;
  settings: ISettingsState;
  memoryGame: IMemoryGameState;
  sprint: ISprintState;
  statistics: IStatisticsState;
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
  SET_SHOW_BUTTONS = 'SET_SHOW_BUTTON',
}

export interface ISavannahWord {
  word: string;
  wordObj: IWord;
  translate: string;
  isCorrect: boolean;
}

export interface ISavannahState {
  level: number;
  round: number;
  isEng: boolean;
  isStartGame: boolean;
  mode: string;
  wordsData: Array<ISavannahWord>;
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
    showButtons: boolean;
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
  learningWords: Array<IUserWord>;
  difficultWords: Array<IUserWord>;
  deletedWords: Array<IUserWord>;
}

export enum DictionaryActionTypes {
  DICT_IS_LOADING = 'DICT_IS_LOADING',
  FETCH_SUCCESS = 'FETCH_DICT_SUCCESS',
  FETCH_ERROR = 'FETCH_DICT_ERROR',
  SET_WORD_EASY = 'SET_WORD_EASY',
  SET_WORD_HARD = 'SET_WORD_HARD',
  SET_WORD_DELETED = 'SET_WORD_DELETED',
  SEND_WORDS = 'SEND_WORDS',
}

export interface IDictionaryAction {
  type: DictionaryActionTypes;
  payload: {
    isLoading: boolean;
    allWords: Array<IWord>;
    learningWords: Array<IWord>;
    difficultWords: Array<IWord>;
    deletedWords: Array<IWord>;
    error: Error;
  };
}

export interface IGamesState {
  actualWords: Array<IWord>;
  gameWords: Array<IWord>;
  extraWords: Array<IWord>;
  isLoading: boolean;
  isCountDown: boolean;
}

export interface IVolumeAction {
  type: VolumeActionTypes;
  volume: string;
}

export interface IVolumeState {
  volume: number;
}

export enum VolumeActionTypes {
  CHANGE_VOLUME = 'CHANGE_VOLUME',
}

export enum GamesActionTypes {
  ADD_WORD = 'ADD_WORD',
  DELETE_WORD = 'DELETE_WORD',
  COUNTDOWN = 'COUNTDOWN',
  EXTRA_WORDS = 'EXTRA_WORDS',
  FETCH_EXTRA_START = 'FETCH_EXTRA_START',
  FETCH_EXTRA_SUCCESS = 'FETCH_EXTRA_SUCCESS',
  FETCH_EXTRA_ERROR = 'FETCH_EXTRA_ERROR',
  FETCH_GAME_WORDS_START = 'FETCH_GAME_WORDS_START',
  FETCH_GAME_WORDS_SUCCESS = 'FETCH_GAME_WORDS_SUCCESS',
  FETCH_GAME_WORDS_ERROR = 'FETCH_GAME_WORDS_ERROR',
}

export interface IGamesAction {
  type: GamesActionTypes;
  payload: {
    actualWords: Array<IWord>;
    gameWords: Array<IWord>;
    extraWords: Array<IWord>;
    isCountDown: boolean;
    isLoading: boolean;
    error: Error;
  };
}

export interface ISettingsState {
  soundsVolume: number;
  gameMode: string;
}

export enum IGameName {
  SAVANNAH = 'savannah',
  AUDIO = 'audio',
  SPRINT = 'sprint',
  MEMORY = 'memory',
}

export type IGameStatistics = {
  wordsLearned: number;
  wordsTotal: number;
  correctTotal: number;
  correctSeries: number;
};

export type IDateStatistics = IGameStatistics & {
  dateTime: number;
  gameName: string;
};

export type IStatistics = {
  [key: string]: IDateStatistics;
};

export interface IStatisticsState {
  isLoading: boolean;
  statistics: IStatistics;
}

export enum StatisticsActionTypes {
  STATS_IS_LOADING = 'STATS_IS_LOADING',
  STATS_FETCH_SUCCESS = 'STATS_FETCH_SUCCESS',
  STATS_FETCH_ERROR = 'STATS_FETCH_ERROR',
  SET_DAY_STATS = 'SET_DAY_STATS',
  ADD_GAME_STATS = 'ADD_GAME_STATS',
}

export interface IStatisticsAction {
  type: StatisticsActionTypes;
  payload: {
    error?: Error;
    gameName?: string;
    wordsLearned?: number;
    correctTotal?: number;
    correctSeries?: number;
  };
}
export interface ISprintState {
  level: number;
  round: number;
  isEng: boolean;
  isStartGame: boolean;
  changeTimer: number;
  wordsData: Array<ISprintWords>;
}

export interface ISprintWords {
  isCorrect: boolean;
  word: IWord;
}
