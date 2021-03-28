import { IMemoryGameState, IMemoryGameAction, MemoryGameTypes } from './types';

const initialState: IMemoryGameState = {
  isStarted: false,
  size: 8,
  isLoading: false,
  words: [],
  error: false,
};

export default function memoryGameReducer(
  state: IMemoryGameState = initialState,
  action: IMemoryGameAction
) {
  switch (action.type) {
    case MemoryGameTypes.START_GAME:
      return { ...state, isStarted: action.isStarted };
    case MemoryGameTypes.SET_WORDS:
      return { ...state, words: action.words };
    case MemoryGameTypes.SET_GAME_SIZE:
      return { ...state, size: action.size };
    case MemoryGameTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case MemoryGameTypes.SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
