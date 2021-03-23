import { combineReducers } from 'redux';
import wordBookReducer from './wordBookReducer/wordBookReducer';
import userReducer from './userReducer/userReducer';

export default combineReducers({
  wordBook: wordBookReducer,
  user: userReducer,
  // ...other reducers
});
