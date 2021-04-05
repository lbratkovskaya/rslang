export enum SettingsActionTypes {
  CHANGE_VOLUME = 'SETTINGS/CHANGE_VOLUME',
}

export interface ISettingsAction {
  type: SettingsActionTypes;
  payload: {
    soundsVolume: number | Array<number>;
  };
}
