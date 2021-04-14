import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from '@material-ui/core';
import { VolumeOff, VolumeUp } from '@material-ui/icons';
import Footer from '../Footer';
import Header from '../Header';
import { changeVolumeSounds, changeGameModeAction } from '../../store/actions/settingsActions';
import { MAX_VOLUME, MIN_VOLUME } from '../../constants';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const settingsState = useSelector((state: IAppState) => state.settings);
  const { gameMode } = settingsState;
  const changeVolume = (volume: number | Array<number>) => dispatch(changeVolumeSounds(volume));
  const changeGameMode = (mode: string) => dispatch(changeGameModeAction(mode));
  const handleChange = (e: React.ChangeEvent<{}>, value: number | Array<number>): void => {
    changeVolume(value);
  };

  const handleChangeGameMode = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.currentTarget;
    changeGameMode(value);
  };

  const handleVolumeUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    return name === 'volumeUp' ? changeVolume(MAX_VOLUME) : changeVolume(MIN_VOLUME);
  };
  const classes = useStyles();
  return (
    <div>
      <Header />
      <main className={classes.settings}>
        <Typography variant="h5" className={classes.title}>
          Настройки
        </Typography>
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
        <div>
          <Typography>Уровень сложности игр</Typography>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            className={classes.gameModeWrapper}
            value={gameMode}
            onChange={handleChangeGameMode}>
            <FormControlLabel value="easy" control={<Radio />} label="Легкий" />
            <FormControlLabel value="normal" control={<Radio />} label="Средний" />
            <FormControlLabel value="hard" control={<Radio />} label="Сложный" />
          </RadioGroup>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
