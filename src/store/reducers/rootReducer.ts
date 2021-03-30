import { combineReducers } from 'redux';
import wordBookReducer from './wordBookReducer/wordBookReducer';
import userReducer from './userReducer/userReducer';
import dictionaryReducer from './dictionaryReducer/dictionaryReducer';

export default combineReducers({
  wordBook: wordBookReducer,
  user: userReducer,
  userDictionary: dictionaryReducer,
});
