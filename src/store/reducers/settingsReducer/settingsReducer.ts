import { MAX_VOLUME } from '../../../constants';
import { ISettingsState } from '../../types';
import { ISettingsAction, SettingsActionTypes } from './types';

const initialState: ISettingsState = {
  soundsVolume: MAX_VOLUME,
  gameMode: 'easy',
};

export default function settingsReducer(
  state: ISettingsState = initialState,
  action: ISettingsAction
) {
  switch (action.type) {
    case SettingsActionTypes.CHANGE_VOLUME:
      return { ...state, soundsVolume: action.payload.soundsVolume };
    case SettingsActionTypes.CHANGE_GAME_MODE:
      return { ...state, gameMode: action.payload.gameMode };
    default:
      return state;
  }
}
