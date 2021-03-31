import { combineReducers } from 'redux';

import wordBookReducer from './wordBookReducer/wordBookReducer';
import userReducer from './userReducer/userReducer';
import dictionaryReducer from './dictionaryReducer/dictionaryReducer';
import gamesReducer from './gamesReducer/gamesReducer';
import savannahReducer from './savannahReducer/savannahReducer';

export default combineReducers({
  wordBook: wordBookReducer,
  user: userReducer,
  userDictionary: dictionaryReducer,
  games: gamesReducer,
  savannah: savannahReducer,
});
