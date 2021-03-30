import { GamesActionTypes, IGamesAction, IGamesState } from '../../types';

const initialState: IGamesState = {
  actualWords: [],
  games: {},
};

const gamesReducer = (state: IGamesState = initialState, action: IGamesAction) => {
  switch (action.type) {
    case GamesActionTypes.ADD_WORD:
      return { ...state, actualWords: action.payload.actualWords };
    case GamesActionTypes.DELETE_WORD:
      return { ...state, actualWords: action.payload.actualWords };
    default:
      return state;
  }
};

export default gamesReducer;
