import { IWord } from '../../types';

export interface IMemoryGameState {
  isStarted: boolean;
  words: Array<IWord>;
  size: number;
  isLoading: boolean;
  error: boolean;
}

export interface IMemoryGameAction {
  type: MemoryGameTypes;
  isStarted?: boolean;
  words?: Array<IWord>;
  size?: number;
  isLoading: boolean;
  error: boolean;
}

export enum MemoryGameTypes {
  START_GAME = 'MEMORY_GAME/START_GAME',
  SET_WORDS = 'MEMORY_GAME/SET_WORDS',
  SET_GAME_SIZE = 'MEMORY_GAME/SET_GAME_SIZE',
  SET_IS_LOADING = 'MEMORY_GAME/SET_IS_LOADING',
  SET_ERROR = 'MEMORY_GAME/SET_ERROR',
}
