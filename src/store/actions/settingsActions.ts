import { SettingsActionTypes } from '../reducers/settingsReducer/types';

export function changeVolumeSounds(value: number | Array<number>) {
  return {
    type: SettingsActionTypes.CHANGE_VOLUME,
    payload: { soundsVolume: value },
  };
}
