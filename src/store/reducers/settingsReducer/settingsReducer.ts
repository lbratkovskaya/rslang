import { MAX_VOLUME } from '../../../constants';
import { ISettingsState } from '../../types';
import { ISettingsAction, SettingsActionTypes } from './types';

const initialState: ISettingsState = {
  soundsVolume: MAX_VOLUME,
};

export default function settingsReducer(
  state: ISettingsState = initialState,
  action: ISettingsAction
) {
  switch (action.type) {
    case SettingsActionTypes.CHANGE_VOLUME:
      return { ...state, soundsVolume: action.payload };
    default:
      return state;
  }
}
