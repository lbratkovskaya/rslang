import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Slider } from '@material-ui/core';
import { IAppState } from '../../../store/types';
import useStyles from './styles';
import { changeVolumeSounds } from '../../../store/actions/settingsActions';

const VolumeRange: React.FC = () => {
  const dispatch = useDispatch();
  const changeVolume = (value: number) => dispatch(changeVolumeSounds(value * 100));
  const { soundsVolume } = useSelector((state: IAppState) => state.settings);
  const styles = useStyles();
  const handleInputChange = (event: ChangeEvent<{}>, value: number | number[]): void => {
    changeVolume(value as number);
  };

  return (
    <div className={styles.range}>
      <img src="../../../assets/volume-speaker.svg" alt="speaker" className={styles.img} />
      <Slider
        onChange={handleInputChange}
        aria-labelledby="input-slider"
        id="volume"
        name="volume"
        min={0.1}
        max={1.0}
        step={0.1}
        value={soundsVolume / 100}
      />
    </div>
  );
};

export default VolumeRange;
