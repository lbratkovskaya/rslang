import { ISprintState } from '../../types';
import { SprintActionTypes, ISprintActions } from './types';

const initialState: ISprintState = {
  level: 0,
  round: 0,
  isStartGame: false,
  words: [],
};

export default function sprintReducer(state: ISprintState = initialState, action: ISprintActions) {
  switch (action.type) {
    case SprintActionTypes.SPRINT_SELECT_LEVELS:
      return { ...state, level: action.payload.level };
    case SprintActionTypes.SPRINT_SELECT_ROUNDS:
      return { ...state, round: action.payload.round };
    case SprintActionTypes.SPRINT_START_GAME:
      return { ...state, isStartGame: action.payload };
    case SprintActionTypes.SPRINT_REDUCE_ARR:
      return { ...state, words: action.payload };
    case SprintActionTypes.SPRINT_ANSWER:
      return { ...state, words: action.payload };
    default:
      return state;
  }
}
