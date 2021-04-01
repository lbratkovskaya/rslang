import { IWord } from '../../types';

export interface IMemoryGameCard {
  id: string;
  value: string;
  type: string;
  isOpen: boolean;
  disabled: boolean;
  audio: string;
  gameSize: number;
}

export interface IMemoryGameState {
  cardId: string;
  isStarted: boolean;
  words: Array<IWord>;
  field: Array<IMemoryGameCard>;
  size: number;
  isLoading: boolean;
  error: boolean;
  clickedCards: Array<IMemoryGameCard>;
}

export interface IMemoryGameAction {
  cardId?: string;
  type: MemoryGameTypes;
  isStarted?: boolean;
  words?: Array<IWord>;
  field?: Array<IMemoryGameCard>;
  size?: number;
  isLoading: boolean;
  error: boolean;
  newCard: IMemoryGameCard;
  prevCard: IMemoryGameCard;
}

export enum MemoryGameTypes {
  START_GAME = 'MEMORY_GAME/START_GAME',
  STOP_GAME = 'MEMORY_GAME/STOP_GAME',
  SET_GAME_FIELD = 'MEMORY_GAME/SET_GAME_FIELD',
  HANDLE_FIRST_CARD = 'MEMORY_GAME/HANDLE_FIRST_CARD',
  HANDLE_SECOND_CARD = 'MEMORY_GAME/HANDLE_SECOND_CARD',
  UPDATE_GAME_CARD = 'MEMORY_GAME/UPDATE_GAME_FIELD',
  HIDE_CLICKED_CARDS = 'MEMORY_GAME/HIDE_CLICKED_CARDS',
  DISABLE_CLICKED_CARDS = 'MEMORY_GAME/DISABLE_CLICKED_CARDS',
  SET_IS_LOADING = 'MEMORY_GAME/SET_IS_LOADING',
  SET_ERROR = 'MEMORY_GAME/SET_ERROR',
  SET_CARD_ID = 'MEMORY_GAME/SET_CARD_ID',
}
