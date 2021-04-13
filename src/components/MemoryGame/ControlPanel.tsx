import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import GameExitBtn from '../commonComponents/GameExitBtn';
import Timer from '../commonComponents/Timer';
import ModalWindow from '../ModalWindow';
import ResultTable from './ResultTable';
import SideMenu from './SideMenu';
import { gameFailed, startGame, stopGame } from '../../store/actions/memoryGameActions';
import { addWordsToUserDictionary } from '../../store/actions/dictionaryActions';
import { addGameStatistics } from '../../store/actions/statisticsActions';
import { MEMORY } from '../../constants';
import { IAppState, IGameName, IWordWithResult } from '../../store/types';
import { IMemoryGameCard } from '../../store/reducers/memoryGameReducer/types';
import useStyles from './styles';

const ControlPanel: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: IAppState) => state.memoryGame.isStarted);
  const isLoading = useSelector((state: IAppState) => state.memoryGame.isLoading);
  const memoryGame = useSelector((state: IAppState) => state.memoryGame);
  const gameWords = useSelector((state: IAppState) => state.memoryGame.words);
  const isLoggedIn = useSelector((state: IAppState) => state.user.isLoggedIn);
  const userData = useSelector((state: IAppState) => state.user.data);
  const volume = useSelector((state: IAppState) => state.settings.soundsVolume);
  const userDictionary = useSelector((state: IAppState) => state.userDictionary);

  const field = useSelector((state: IAppState) => state.memoryGame.field);

  const userWords = [...userDictionary.learningWords, ...userDictionary.deletedWords];
  const userWordsWords = userWords.map((uw) => uw.word);

  const [allCardsAreDisabled, setAllCardsAreDisabled] = useState(false);
  const [isGameWon, setGameWon] = useState(false);

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

  const sendWordsToUserDictionary = (words: Array<IWordWithResult>) =>
    dispatch(addWordsToUserDictionary(words, userDictionary, userData));

  const saveGameStatistics = (wordsCards: Array<IWordWithResult>, maxSuccessSeries: number) => {
    const correctTotal = wordsCards.filter((card) => card.correct).length;
    const newLearned = wordsCards.filter((card) => userWordsWords.indexOf(card.word.word) === -1);
    dispatch(
      addGameStatistics(
        userData,
        IGameName.MEMORY,
        newLearned.length,
        wordsCards.length,
        correctTotal,
        maxSuccessSeries
      )
    );
  };

  function playSound(audio: string) {
    const player = new Audio(audio);
    player.volume = volume / 100;
    player.play();
  }

  const handleWordsAfterGame = () => {
    if (isLoggedIn) {
      const filteredWords = field.reduce(
        (acc, card) => {
          const word = gameWords.find((gw) => gw.id === card.id);
          const existingWord = acc.words.find((gw) => gw.word.id === card.id);
          if (word && !existingWord) {
            acc.words.push({ word, correct: card.disabled });
          }
          return acc;
        },
        { words: [] as Array<IWordWithResult> }
      );

      sendWordsToUserDictionary(filteredWords.words);
      saveGameStatistics(
        filteredWords.words,
        [...memoryGame.series, memoryGame.serieCounter].sort((a, b) => b - a)[0]
      );
    }
  };

  const handleGameOver = () => {
    handleWordsAfterGame();
    if (isGameStarted && !isGameWon) {
      dispatch(gameFailed());
      handleShowModalWindow();
      playSound('./assets/audio/fail-sound.mp3');
    }
  };

  useEffect(() => {
    if (field && field.length && isGameStarted) {
      const cardsAreDisabled = field.every((card: IMemoryGameCard) => card.disabled === true);
      setAllCardsAreDisabled(cardsAreDisabled);
      if (cardsAreDisabled === true) {
        handleShowModalWindow();
        playSound('./assets/audio/win-sound.mp3');
        setGameWon(true);
        handleWordsAfterGame();
      }
    }
  }, [JSON.stringify(field)]);

  useEffect(() => {
    return () => {
      setAllCardsAreDisabled(false);
      handleStopGame();
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
