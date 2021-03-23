import { combineReducers } from 'redux';
import appReducer from './appReducer/appReducer';
import dictionaryReducer from './dictionaryReducer/dictionaryReducer';
import userReducer from './userReducer/userReducer';

export default combineReducers({
  app: appReducer,
  dictionary: dictionaryReducer,
  user: userReducer,
  // ...other reducers
});
