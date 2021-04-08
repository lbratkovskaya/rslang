import { SettingsActionTypes } from '../reducers/settingsReducer/types';

export function changeVolumeSounds(value: number | Array<number>) {
  return {
    type: SettingsActionTypes.CHANGE_VOLUME,
    payload: { soundsVolume: value },
  };
}

export function changeGameModeAction(value: string) {
  return {
    type: SettingsActionTypes.CHANGE_GAME_MODE,
    payload: { gameMode: value },
  };
}
