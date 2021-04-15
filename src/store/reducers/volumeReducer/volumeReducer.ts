import { IVolumeState, IVolumeAction, VolumeActionTypes } from '../../types';

const initialState: IVolumeState = {
  volume: 1,
};

export default function volumeReducer(state: IVolumeState = initialState, action: IVolumeAction) {
  switch (action.type) {
    case VolumeActionTypes.CHANGE_VOLUME:
      return { ...state, volume: action.volume };
    default:
      return state;
  }
}
