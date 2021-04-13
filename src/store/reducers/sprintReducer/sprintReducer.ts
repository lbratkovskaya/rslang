import { ISprintState } from '../../types';
import { SprintActionTypes, ISprintActions } from './types';

const initialState: ISprintState = {
  level: 0,
  round: 0,
  isEng: true,
  isStartGame: false,
  changeTimer: 0,
  wordsData: [],
  seriesCounter: 0,
  series: [0],
};

export default function sprintReducer(state: ISprintState = initialState, action: ISprintActions) {
  switch (action.type) {
    case SprintActionTypes.SPRINT_SELECT_LEVELS:
      return { ...state, level: action.payload.level };
    case SprintActionTypes.SPRINT_SELECT_ROUNDS:
      return { ...state, round: action.payload.round };
    case SprintActionTypes.SPRINT_SWITCH_LANG:
      return { ...state, isEng: action.payload.isEng };
    case SprintActionTypes.SPRINT_START_GAME:
      return {
        ...state,
        isStartGame: action.payload.isStartGame,
        seriesCounter: action.payload.isStartGame ? state.seriesCounter : 0,
        series: action.payload.isStartGame ? state.series : [0],
      };
    case SprintActionTypes.SPRINT_CHANGE_TIMER:
      return { ...state, changeTimer: action.payload.changeTimer };
    case SprintActionTypes.SPRINT_REDUCE_ARR:
      return { ...state, wordsData: action.payload };
    case SprintActionTypes.SPRINT_ANSWER:
      return {
        ...state,
        wordsData: action.payload.wordData,
        seriesCounter: action.payload.correct ? state.seriesCounter + 1 : 0,
        series: action.payload.correct ? state.series : state.series.concat([state.seriesCounter]),
      };
    default:
      return state;
  }
}
