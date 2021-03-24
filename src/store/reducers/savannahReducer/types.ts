import { ISavannahWord } from '../../types';

export enum SavannahActionTypes {
  SAVANNAH_SELECT_LEVELS = 'SAVANNAH/SELECT_LEVELS',
  SAVANNAH_SELECT_ROUNDS = 'SAVANNAH/SELECT_ROUNDS',
  SAVANNAH_SWITCH_LANG = 'SAVANNAH/SWITCH_LANG',
  SAVANNAH_START_GAME = 'SAVANNAH/START_GAME',
  SAVANNAH_REDUCE_ARR = 'SAVANNAH/REDUCE_ARR',
  SAVANNAH_ANSWER = 'SAVANNAH/SAVANNAH_ANSWER',
}

export interface ISavannahActions {
  type: SavannahActionTypes;
  payload: {
    level: number;
    round: number;
    isEng: boolean;
    isStartGame: boolean;
    words: Array<ISavannahWord>;
  };
}
