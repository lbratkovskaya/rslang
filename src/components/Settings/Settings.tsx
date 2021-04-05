import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton, Slider, Typography } from '@material-ui/core';
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import Footer from '../Footer';
import Header from '../Header';
import { changeVolumeSounds } from '../../store/actions/settingsActions';
import { MAX_VOLUME, MIN_VOLUME } from '../../constants';
import { IAppState } from '../../store/types';
import useStyles from './styles';
import { ISettingsAction } from '../../store/reducers/settingsReducer/types';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector((state: IAppState) => state.settings);
  const changeVolume = (volume: number | Array<number>): ISettingsAction =>
    dispatch(changeVolumeSounds(volume));
  const handleChange = (e: React.ChangeEvent<{}>, value: number | Array<number>): void => {
    changeVolume(value);
  };
  const handleVolumeUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    return name === 'volumeUp' ? changeVolume(MAX_VOLUME) : changeVolume(MIN_VOLUME);
  };
  const classes = useStyles();
  return (
    <div className={classes.settingsWrapper}>
      <Header />
      <div className={classes.settings}>
        <Typography variant="h2">Настройки</Typography>
        <div className={classes.volumeSettings}>
          <Typography id="continuous-slider" gutterBottom>
            Звуки игр
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton name="volumeOff" onClick={handleVolumeUp}>
                <VolumeOff />
              </IconButton>
            </Grid>
            <Grid item xs>
              <Slider
                value={settingsState.soundsVolume}
                onChange={handleChange}
                aria-labelledby="continuous-slider"
              />
            </Grid>
            <Grid item>
              <IconButton name="volumeUp" onClick={handleVolumeUp}>
                <VolumeUp />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
