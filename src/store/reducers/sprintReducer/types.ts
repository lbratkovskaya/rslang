import { ISprintWords } from '../../types';

export enum SprintActionTypes {
  SPRINT_SELECT_LEVELS = 'SPRINT/SELECT_LEVELS',
  SPRINT_SELECT_ROUNDS = 'SPRINT/SELECT_ROUNDS',
  SPRINT_SWITCH_LANG = 'SPRINT/SWITCH_LANG',
  SPRINT_START_GAME = 'SPRINT/START_GAME',
  SPRINT_CHANGE_TIMER = 'SPRINT/SPRINT_CHANGE_TIMER',
  SPRINT_REDUCE_ARR = 'SPRINT/REDUCE_ARR',
  SPRINT_ANSWER = 'SPRINT/SPRINT_ANSWER',
}

export interface ISprintActions {
  type: SprintActionTypes;
  payload: {
    level?: number;
    round?: number;
    isEng?: boolean;
    isStartGame?: boolean;
    changeTimer?: number;
    words?: Array<ISprintWords>;
  };
}
