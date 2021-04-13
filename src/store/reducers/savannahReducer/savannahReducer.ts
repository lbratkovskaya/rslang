import { ISavannahState } from '../../types';
import { ISavannahActions, SavannahActionTypes } from './types';

const initialState: ISavannahState = {
  level: 0,
  round: 0,
  isEng: true,
  isStartGame: false,
  mode: 'easy',
  wordsData: [],
};

export default function savannahReducer(
  state: ISavannahState = initialState,
  action: ISavannahActions
) {
  switch (action.type) {
    case SavannahActionTypes.SAVANNAH_SELECT_LEVELS:
      return { ...state, level: action.payload.level };
    case SavannahActionTypes.SAVANNAH_SELECT_ROUNDS:
      return { ...state, round: action.payload.round };
    case SavannahActionTypes.SAVANNAH_SWITCH_LANG:
      return { ...state, isEng: action.payload.isEng };
    case SavannahActionTypes.SAVANNAH_START_GAME:
      return { ...state, isStartGame: action.payload };
    case SavannahActionTypes.SAVANNAH_GAME_MODE:
      return { ...state, mode: action.payload.mode };
    case SavannahActionTypes.SAVANNAH_REDUCE_ARR:
      return { ...state, wordsData: action.payload };
    case SavannahActionTypes.SAVANNAH_ANSWER:
      return { ...state, wordsData: action.payload };
    default:
      return state;
  }
}
