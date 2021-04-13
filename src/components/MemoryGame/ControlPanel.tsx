import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import GameExitBtn from '../commonComponents/GameExitBtn';
import Timer from '../commonComponents/Timer';
import ModalWindow from '../ModalWindow';
import ResultTable from './ResultTable';
import SideMenu from './SideMenu';
import { gameFailed, startGame, stopGame } from '../../store/actions/memoryGameActions';
import { addGameStatistics } from '../../store/actions/statisticsActions';
import { MEMORY } from '../../constants';
import { IAppState, IGameName } from '../../store/types';
import { IMemoryGameCard } from '../../store/reducers/memoryGameReducer/types';
import useStyles from './styles';

const ControlPanel: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: IAppState) => state.memoryGame.isStarted);
  const isLoading = useSelector((state: IAppState) => state.memoryGame.isLoading);
  const series = useSelector((state: IAppState) => state.memoryGame.series);
  const isLoggedIn = useSelector((state: IAppState) => state.user.isLoggedIn);
  const userData = useSelector((state: IAppState) => state.user.data);
  const volume = useSelector((state: IAppState) => state.settings.soundsVolume);

  const field = useSelector((state: IAppState) => state.memoryGame.field);

  const userWords = useSelector((state: IAppState) => [
    ...state.userDictionary.learningWords,
    ...state.userDictionary.deletedWords,
  ]);
  const userWordsWords = userWords.map((uw) => uw.word);

  const [allCardsAreDisabled, setAllCardsAreDisabled] = React.useState(false);

  const handleStartGame = () => {
    dispatch(startGame());
  };

  const handleStopGame = () => {
    dispatch(stopGame());
  };

  const gameTime = (field.length / 2) * MEMORY.gameTimePerCard;
  const [open, setOpen] = React.useState(false);
  const handleShowModalWindow = () => setOpen(true);
  const handleCloseModalWindow = () => {
    dispatch(stopGame());
    setOpen(false);
  };

  function playSound(audio: string) {
    const player = new Audio(audio);
    player.volume = volume / 100;
    player.play();
  }

  const handleGameOver = () => {
    if (isGameStarted) {
      dispatch(gameFailed());
      handleShowModalWindow();
      playSound('./assets/audio/fail-sound.mp3');
    }
  };

  const saveGameStatistics = (wordsCards: Array<IMemoryGameCard>, maxSuccessSeries: number) => {
    const correctTotal = wordsCards.filter((card) => card.disabled).length / 2;
    const newLearned = wordsCards.filter((card) => userWordsWords.indexOf(card.value) === -1);
    dispatch(
      addGameStatistics(
        userData,
        IGameName.MEMORY,
        newLearned.length / 2,
        wordsCards.length / 2,
        correctTotal,
        maxSuccessSeries
      )
    );
  };

  useEffect(() => {
    if (field && field.length && isGameStarted) {
      const cardsAreDisabled = field.every((card: IMemoryGameCard) => card.disabled === true);
      setAllCardsAreDisabled(cardsAreDisabled);
      if (cardsAreDisabled === true) {
        handleShowModalWindow();
        playSound('./assets/audio/win-sound.mp3');
        if (isLoggedIn) {
          saveGameStatistics(field, series.sort((a, b) => b - a)[0]);
        }
        setAllCardsAreDisabled(false);
      }
    }
  }, [JSON.stringify(field)]);

  useEffect(() => {
    return () => {
      setAllCardsAreDisabled(false);
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
          <SideMenu />
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

export default ControlPanel;
