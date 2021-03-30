import { GamesActionTypes, IGamesAction, IGamesState } from '../../types';

const initialState: IGamesState = {
  words: [],
  games: {},
};

const gamesReducer = (state: IGamesState = initialState, action: IGamesAction) => {
  switch (action.type) {
    case GamesActionTypes.ADD_WORD:
      return { ...state, words: action.payload.words };
    case GamesActionTypes.DELETE_WORD:
      return { ...state, words: action.payload.words };
    default:
      return state;
  }
};

export default gamesReducer;
