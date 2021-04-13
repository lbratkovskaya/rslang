import { GamesActionTypes, IGamesAction, IGamesState } from '../../types';

const initialState: IGamesState = {
  actualWords: [],
  gameWords: [],
  extraWords: [],
  isLoading: false,
  isCountDown: false,
};

const gamesReducer = (state: IGamesState = initialState, action: IGamesAction) => {
  switch (action.type) {
    case GamesActionTypes.ADD_WORD:
      return { ...state, actualWords: action.payload.actualWords };
    case GamesActionTypes.DELETE_WORD:
      return { ...state, actualWords: action.payload.actualWords };
    case GamesActionTypes.COUNTDOWN:
      return { ...state, isCountDown: action.payload.isCountDown };
    case GamesActionTypes.FETCH_EXTRA_START:
      return { ...state, isLoading: false };
    case GamesActionTypes.FETCH_EXTRA_SUCCESS:
      return { ...state, isLoading: false, extraWords: action.payload.extraWords };
    case GamesActionTypes.FETCH_EXTRA_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    case GamesActionTypes.FETCH_GAME_WORDS_START:
      return { ...state, isLoading: false };
    case GamesActionTypes.FETCH_GAME_WORDS_SUCCESS:
      return { ...state, isLoading: false, gameWords: action.payload.gameWords };
    case GamesActionTypes.FETCH_GAME_WORDS_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
};

export default gamesReducer;
