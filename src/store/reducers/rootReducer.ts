import { combineReducers } from 'redux';
import dictionaryReducer from './dictionaryReducer';

export default combineReducers({
  dictionary: dictionaryReducer,
  // ...other reducers
});
