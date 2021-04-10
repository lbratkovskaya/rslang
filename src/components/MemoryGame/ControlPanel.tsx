import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, withRouter } from 'react-router-dom';
import { Button, FormGroup, Grid, Switch, Typography } from '@material-ui/core';
import GameExitBtn from '../commonComponents/GameExitBtn';
import { GameSelect } from '../commonComponents';
import ModalWindow from '../ModalWindow';
import ResultTable from './ResultTable';
import Timer from '../commonComponents/Timer';
import {
  gameFailed,
  initiateGameField,
  startGame,
  stopGame,
} from '../../store/actions/memoryGameActions';
import { GAMES, MEMORY, WORDBOOK_GROUPS } from '../../constants';
import { SELECT_ROUNDS } from '../GameSavannah/constants';
import { IAppState } from '../../store/types';
import { IMemoryGameCard } from '../../store/reducers/memoryGameReducer/types';
import useStyles from './styles';

const ControlPanel: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: IAppState) => state.memoryGame.isStarted);
  const [gameSize, setGameSize] = React.useState(GAMES.memory.difficulty.easy.value);
  const isLoading = useSelector((state: IAppState) => state.memoryGame.isLoading);

  const location = useLocation();
  const isCameFromWordbook = location.state?.fromWordbook;

  const [wordsCategory, setWordsCategory] = React.useState(0);

  const page: number = Math.floor(Math.random() * SELECT_ROUNDS.amount);

  const actualWords = useSelector((state: IAppState) => state.games.actualWords);
  const field = useSelector((state: IAppState) => state.memoryGame.field);

  const [allCardsAreDisabled, setAllCardsAreDisabled] = React.useState(false);

  const [gameMode, setMode] = React.useState('image');
  const handleChangeGameMode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.checked? 'image': 'translation');
  };
  
  const handleStartGame = () => {
    dispatch(
      initiateGameField(gameSize, gameMode, isCameFromWordbook, wordsCategory, page, actualWords)
    );
    dispatch(startGame());
  };

  const handleStopGame = () => {
    dispatch(stopGame());
  };

  const handleSelectLevel = (value: string | number) => {
    setWordsCategory(Number(value));
  };

  const gameTime = gameSize * MEMORY.gameTimePerCard;

  const handleSelectSize = (value: string | number) => {
    switch (value) {
      case GAMES.memory.difficulty.easy.label: {
        setGameSize(GAMES.memory.difficulty.easy.value);
        break;
      }
      case GAMES.memory.difficulty.normal.label: {
        setGameSize(GAMES.memory.difficulty.normal.value);
        break;
      }
      case GAMES.memory.difficulty.hard.label: {
        setGameSize(GAMES.memory.difficulty.hard.value);
        break;
      }
      default:
        setGameSize(GAMES.memory.difficulty.easy.value);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleShowModalWindow = () => setOpen(true);
  const handleCloseModalWindow = () => {
    dispatch(stopGame());
    setOpen(false);
  };

  const handleGameOver = () => {
    if (isGameStarted) {
      dispatch(gameFailed());
      handleShowModalWindow();
    }
  };

  useEffect(() => {
    if (field && field.length && isGameStarted) {
      const cardsAreDisabled = field.every((card: IMemoryGameCard) => card.disabled === true);
      if (cardsAreDisabled === true) {
        handleShowModalWindow();
      }
      setAllCardsAreDisabled(cardsAreDisabled);
    }
  }, [JSON.stringify(field)]);

  useEffect(() => {
    return () => {
      dispatch(stopGame());
    };
  }, []);

  return (
    <>
      {isGameStarted && !allCardsAreDisabled && !isLoading && (
        <div className={classes.controlsWrapper}>
          <Timer gameTime={gameTime} handleOnComplite={handleGameOver} size={60} />
          <div className={classes.canselBtnWrapper}>
            <GameExitBtn clickBtn={handleStopGame} />
          </div>
          <ModalWindow
            open={open}
            handleClose={handleCloseModalWindow}
            isText={false}
            table={<ResultTable isFail={!allCardsAreDisabled} />}
          />
        </div>
      )}
      {isGameStarted && allCardsAreDisabled && (
        <div className={classes.controlsWrapper}>
          <div className={classes.empty} />
          <ModalWindow
            open={open}
            handleClose={handleCloseModalWindow}
            isText={false}
            table={<ResultTable isFail={!allCardsAreDisabled} />}
          />
        </div>
      )}
      {!isGameStarted && (
        <div className={classes.controlsWrapper}>
          <div className={classes.leftWrapper}>
            <div className={classes.selectorsWrapper}>
              {!isCameFromWordbook && (
                <GameSelect
                  selectName="Раздел учебника"
                  selectData={WORDBOOK_GROUPS}
                  changeSelectFc={handleSelectLevel}
                />
              )}
              <GameSelect
                selectName="Сложность"
                selectData={MEMORY.sizes}
                changeSelectFc={handleSelectSize}
              />
            </div>
            <div className={classes.switcherWrapper}>
              {gameMode === 'translation' && (
                <Typography
                  variant="subtitle1"
                  component="p"
                  color="inherit"
                  className={classes.gameSelect}>
                  Перевод
                </Typography>
              )}
              {gameMode === 'image' && (
                <Typography
                  variant="subtitle1"
                  component="p"
                  color="inherit"
                  className={classes.gameSelect}>
                  Изображение
                </Typography>
              )}
              <FormGroup>
                <Typography component="div">
                  <Grid component="label" container alignItems="center" spacing={1}>
                    <Grid item>
                      <Switch
                        checked={(gameMode === 'image')}
                        onChange={handleChangeGameMode}
                        name="setMode"
                        color="primary"
                        className={classes.switcher}
                      />
                    </Grid>
                  </Grid>
                </Typography>
              </FormGroup>
            </div>
          </div>
          <Button
            className={classes.button}
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

export default withRouter(ControlPanel);
