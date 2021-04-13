import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TableEndGame } from '../../commonComponents';
import {
  clickStartGame,
  resetEndGame,
  resetWordsToStartNewGame,
} from '../../../store/actions/audioCallingActions';
import { addWordsToUserDictionary } from '../../../store/actions/dictionaryActions';
import { addGameStatistics } from '../../../store/actions/statisticsActions';
import {
  IAppState,
  IAudioCallingWord,
  IGameName,
  IWord,
  IWordWithResult,
} from '../../../store/types';
import useStyles from './styles';

const FinishGame: React.FC = () => {
  const styles = useStyles();
  const audio = new Audio();
  const audioCallingData = useSelector((state: IAppState) => state.audioCalling);
  const falsePart = audioCallingData.words.filter((el) => !el.isCorrect);
  const userData = useSelector((state: IAppState) => state.user.data);
  const userDictionary = useSelector((state: IAppState) => state.userDictionary);
  const userWords = [...userDictionary.learningWords, ...userDictionary.deletedWords];
  const userWordsWords = userWords.map((uw) => uw.word);

  const dispatch = useDispatch();
  const toggleResetEndGame = () => dispatch(resetEndGame());
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const reset = () => dispatch(resetWordsToStartNewGame());
  const sendWords = (array: Array<{ word: IWord; correct: boolean }>) =>
    dispatch(addWordsToUserDictionary(array, userDictionary, userData));

  const handleExitGame = () => {
    startGame(false);
    toggleResetEndGame();
    reset();
  };

  const saveGameStatistics = (wordsArray: Array<IWordWithResult>, maxSuccessSeries: number) => {
    const correctTotal = wordsArray.filter((word) => word.correct).length;
    const newLearned = wordsArray.filter((word) => userWordsWords.indexOf(word.word.word) === -1);
    dispatch(
      addGameStatistics(
        userData,
        IGameName.AUDIO,
        newLearned.length,
        wordsArray.length,
        correctTotal,
        maxSuccessSeries
      )
    );
  };

  useEffect(() => {
    if (falsePart.length > 0) {
      audio.src = '../../../assets/audio/fail-sound.mp3';
    } else {
      audio.src = '../../../assets/audio/win-sound.mp3';
    }
    audio.play();
    const copy = audioCallingData.words.map((el: IAudioCallingWord) => ({
      word: el.wordObj,
      correct: el.isCorrect,
    }));
    if (userData.userId) {
      sendWords(copy);
      saveGameStatistics(
        copy,
        [...audioCallingData.series, audioCallingData.seriesCounter].sort((a, b) => b - a)[0]
      );
    }
    return () => handleExitGame();
  }, []);

  return (
    <>
      <TableEndGame words={audioCallingData.words} />
      <button type="button" className={styles.newGame} onClick={handleExitGame}>
        НОВАЯ ИГРА
      </button>
    </>
  );
};

export default FinishGame;
