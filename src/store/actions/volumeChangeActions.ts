import { VolumeActionTypes } from '../types';

const changeVol = (volume: number) => {
  return {
    type: VolumeActionTypes.CHANGE_VOLUME,
    volume,
  };
};

export default changeVol;
