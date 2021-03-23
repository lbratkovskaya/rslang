import { AudioCallingActionTypes, IAudioCallingState, IAudioCallingGameAction } from './types';

const initialState: IAudioCallingState = {
  level: 0,
  round: 0,
  lang: 'en',
  words: [],
  isStart: false,
  isEnd: false,
  levelsQuantity: 6,
  roundsQuantity: 30,
  wordQuantity: 5,
  startArray: [],
};

const audioCallingReducer = (
  state: IAudioCallingState = initialState,
  action: IAudioCallingGameAction
) => {
  switch (action.type) {
    case AudioCallingActionTypes.CHANGE_END_GAME:
      return { ...state, isEnd: action.isEnd };
    case AudioCallingActionTypes.PUT_INCORRECT:
      return { ...state, words: [...state.words, action.payload] };
    case AudioCallingActionTypes.PUT_CORRECT:
      return { ...state, words: [...state.words, action.payload] };
    case AudioCallingActionTypes.AUDIO_CALLING_START_GAME:
      return { ...state, isStart: action.payload };
    case AudioCallingActionTypes.AUDIOCALLING_CREATE_ARR:
      return { ...state, startArray: action.startArray };
    case AudioCallingActionTypes.AUDIO_CALLING_SELECT_LEVELS:
      return { ...state, level: action.level };
    case AudioCallingActionTypes.AUDIO_CALLING_SELECT_ROUNDS:
      return { ...state, round: action.round };
    case AudioCallingActionTypes.RESET:
      return { ...state, words: action.payload };
    default:
      return state;
  }
};

export default audioCallingReducer;
