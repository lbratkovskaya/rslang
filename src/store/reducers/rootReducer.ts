import { combineReducers } from 'redux';
import audioCallingReducer from './audioCallingReducer/audioCallingReducer';
import wordBookReducer from './wordBookReducer/wordBookReducer';
import userReducer from './userReducer/userReducer';
import dictionaryReducer from './dictionaryReducer/dictionaryReducer';
import gamesReducer from './gamesReducer/gamesReducer';
import savannahReducer from './savannahReducer/savannahReducer';
import settingsReducer from './settingsReducer/settingsReducer';
import memoryGameReducer from './memoryGameReducer/memoryGameReducer';
import volumeReducer from './volumeReducer/volumeReducer';
import sprintReducer from './sprintReducer/sprintReducer';
import statisticsReducer from './statisticsReducer/statisticsReducer';

export default combineReducers({
  wordBook: wordBookReducer,
  user: userReducer,
  userDictionary: dictionaryReducer,
  games: gamesReducer,
  savannah: savannahReducer,
  settings: settingsReducer,
  memoryGame: memoryGameReducer,
  audioCalling: audioCallingReducer,
  volumeHandler: volumeReducer,
  sprint: sprintReducer,
  statistics: statisticsReducer,
});
