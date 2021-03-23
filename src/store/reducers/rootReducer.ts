import { combineReducers } from 'redux';
import appReducer from './appReducer/appReducer';
import wordBookReducer from './wordBookReducer/wordBookReducer';
import userReducer from './userReducer/userReducer';

export default combineReducers({
  app: appReducer,
  wordBook: wordBookReducer,
  user: userReducer,
  // ...other reducers
});
