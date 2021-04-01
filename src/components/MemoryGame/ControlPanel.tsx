import React from 'react';
import { Button, FormGroup, Grid, Switch, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { IAppState } from '../../store/types';
import { initiateGameField, startGame, stopGame } from '../../store/actions/memoryGameActions';
import GameExitBtn from '../commonComponents/GameExitBtn/GameExitBtn';
import { GameSelect } from '../commonComponents';
import { WORDBOOK_GROUPS, MEMORY } from '../../constants';

const ControlPanel: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: IAppState) => state.memoryGame.isStarted);
  const [mode, setMode] = React.useState(true);
  const [gameSize, setGameSize] = React.useState(MEMORY.Easy);

  const gameMode = mode ? 'image' : 'translation';
  const handleStartGame = () => {
    dispatch(initiateGameField(gameSize, gameMode));
    dispatch(startGame());
  };

  const handleChangeGameMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked);
  };

  const handleStopGame = () => {
    dispatch(stopGame());
  };

  const handleSelectLevel = () => {};

  const handleSelectSize = (value: string | number) => {
    switch (value) {
      case 'Легко': {
        setGameSize(MEMORY.Easy);
        break;
      }
      case 'Нормально': {
        setGameSize(MEMORY.Normal);
        break;
      }
      case 'Сложно': {
        setGameSize(MEMORY.Hard);
        break;
      }
      default:
        setGameSize(MEMORY.Easy);
    }
  };

  return (
    <>
      {isGameStarted && 
        <div className={styles.controlsWrapper}>
          <div className={styles.canselBtnWrapper}>
            <GameExitBtn clickBtn={handleStopGame} />
          </div>
        </div>
      }
      {!isGameStarted && (
        <div className={styles.controlsWrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.selectorsWrapper}>
              <GameSelect
                selectName="Уровень"
                selectData={WORDBOOK_GROUPS}
                changeSelectFc={handleSelectLevel}
              />
              <GameSelect
                selectName="Сложность"
                selectData={MEMORY.sizes}
                changeSelectFc={handleSelectSize}
              />
            </div>  
            <div className={styles.switcherWrapper}>
              <Typography variant="h6" component="p" color="inherit">
                Перевод
              </Typography>
              <FormGroup>
                <Typography component="div">
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>Вкл</Grid>
                    <Grid item>
                      <Switch
                        checked={mode}
                        onChange={handleChangeGameMode}
                        name="setMode"
                        color="primary"
                        className={styles.switcher}
                      />
                    </Grid>
                    <Grid item>Выкл</Grid>
                  </Grid>
                </Typography>
              </FormGroup>
            </div>
          </div>
          <Button
            className={styles.button}
            type="button"
            variant="contained"
            color="primary"
            onClick={handleStartGame}>
            Старт
          </Button>
        </div>
      )}
    </>
  );
};

export default ControlPanel;
