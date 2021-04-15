import { IWord } from '../../types';

export interface IMemoryGameCard {
  id: string;
  value: string;
  type: string;
  isOpen: boolean;
  disabled: boolean;
  audio: string;
  gameSize: number;
  isClicked: boolean;
}

export interface IMemoryGameState {
  cardId: string;
  isStarted: boolean;
  words: Array<IWord>;
  field: Array<IMemoryGameCard>;
  isLoading: boolean;
  error: boolean;
  clickedCards: Array<IMemoryGameCard>;
  isFailed: boolean;
  learnedWords?: Array<string>;
  unExploredWords?: Array<string>;
  wordsVolume: number;
  serieCounter: number;
  series: Array<number>;
}

export interface IMemoryGameAction {
  cardId?: string;
  type: MemoryGameTypes;
  isStarted?: boolean;
  words?: Array<IWord>;
  field?: Array<IMemoryGameCard>;
  isLoading: boolean;
  error: boolean;
  newCard: IMemoryGameCard;
  prevCard: IMemoryGameCard;
  wordsVolume: number;
  processCards: Array<IMemoryGameCard>;
}

export enum MemoryGameTypes {
  START_GAME = 'MEMORY_GAME/START_GAME',
  STOP_GAME = 'MEMORY_GAME/STOP_GAME',
  FAILED_GAME = 'MEMORY_GAME/FAILED_GAME',
  SET_GAME_FIELD = 'MEMORY_GAME/SET_GAME_FIELD',
  UPDATE_GAME_CARD = 'MEMORY_GAME/UPDATE_GAME_FIELD',
  HIDE_CLICKED_CARDS = 'MEMORY_GAME/HIDE_CLICKED_CARDS',
  CLEAR_CLICKED_CARDS = 'MEMORY_GAME/CLEAR_CLICKED_CARDS',
  DISABLE_CLICKED_CARDS = 'MEMORY_GAME/DISABLE_CLICKED_CARDS',
  SET_IS_LOADING = 'MEMORY_GAME/SET_IS_LOADING',
  SET_ERROR = 'MEMORY_GAME/SET_ERROR',
  SET_CARD_ID = 'MEMORY_GAME/SET_CARD_ID',
  SET_WORDS_VOLUME = 'MEMORY_GAME/SET_WORDS_VOLUME',
  RESET_SERIE_COUNTER = 'MEMORY_GAME/RESET_SERIE_COUNTER',
  INCREASE_SERIE_COUNTER = 'MEMORY_GAME/INCREASE_SERIE_COUNTER',
}
