export enum SettingsActionTypes {
  CHANGE_VOLUME = 'SETTINGS/CHANGE_VOLUME',
  CHANGE_GAME_MODE = 'SETTINGS/CHANGE_GAME_MODE',
}

export interface ISettingsAction {
  type: SettingsActionTypes;
  payload: {
    soundsVolume: number | Array<number>;
    gameMode: string;
  };
}
