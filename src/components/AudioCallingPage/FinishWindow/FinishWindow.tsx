import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, List, ListSubheader } from '@material-ui/core';
import {
  resetEndGame,
  clickStartGame,
  resetWordsToStartNewGame,
} from '../../../store/actions/audioCallingActions';
import { addWordsToUserDictionary } from '../../../store/actions/dictionaryActions';
import { addGameStatistics } from '../../../store/actions/statisticsActions';
import backendUrl, { playIcon } from '../../../constants';
import { IAudioCallingWords } from '../../../store/reducers/audioCallingReducer/types';
import { IAppState, IGameName, IWord, IWordWithResult } from '../../../store/types';
import useStyles from './styles';

const FinishGame: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const audio = new Audio();
  const audioCallingData = useSelector((state: IAppState) => state.audioCalling);
  const falsePart = audioCallingData.words.filter((el) => !el.isCorrect);
  const userData = useSelector((state: IAppState) => state.user.data);
  const userDictionary = useSelector((state: IAppState) => state.userDictionary);
  const userWords = [...userDictionary.learningWords, ...userDictionary.deletedWords];
  const userWordsWords = userWords.map((uw) => uw.word);

  const toggleResetEndGame = () => dispatch(resetEndGame());
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const reset = () => dispatch(resetWordsToStartNewGame());

  const sendWords = (array: Array<{ word: IWord; correct: boolean }>) =>
    dispatch(addWordsToUserDictionary(array, userDictionary, userData));

  const unmountSound = () => {
    const audioPromise = audio.play();
    if (audioPromise !== undefined) {
      audioPromise.then(() => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
  };

  const handleExitGame = () => {
    startGame(false);
    unmountSound();
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
    const copy = audioCallingData.words.map((el: IAudioCallingWords) => ({
      word: el.wordObj,
      correct: el.isCorrect,
    }));
    sendWords(copy);
    saveGameStatistics(
      copy,
      [...audioCallingData.series, audioCallingData.seriesCounter].sort((a, b) => b - a)[0]
    );
    return () => handleExitGame();
  }, []);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Статистика</h2>
      <List className={styles.root} subheader={<li />}>
        <ListSubheader>Я знаю:</ListSubheader>
        {audioCallingData.words
          .filter((el: IAudioCallingWords) => el.isCorrect === true)
          .map((el: IAudioCallingWords) => (
            <ListItem key={el.word.id} className={styles.li}>
              <button
                className={styles.play}
                type="button"
                onClick={() => new Audio(`${backendUrl}/${el.word.audio}`).play()}>
                <img className={styles.playIcon} src={playIcon} alt={el.word.word} />
              </button>
              {`${el.word.word} - ${el.word.wordTranslate}`}
            </ListItem>
          ))}
      </List>
      <List className={styles.root} subheader={<li />}>
        <ListSubheader>Я не знаю:</ListSubheader>
        {audioCallingData.words
          .filter((el: IAudioCallingWords) => el.isCorrect === false)
          .map((el: IAudioCallingWords) => (
            <ListItem className={styles.li} key={el.word.id}>
              <button
                className={styles.play}
                type="button"
                onClick={() => new Audio(`${backendUrl}/${el.word.audio}`).play()}>
                <img className={styles.playIcon} src={playIcon} alt={el.word.word} />
              </button>
              {` ${el.word.word} - ${el.word.wordTranslate}`}
            </ListItem>
          ))}
      </List>
      <button type="button" className={styles.newGame} onClick={handleExitGame}>
        НОВАЯ ИГРА
      </button>
    </div>
  );
};

export default FinishGame;
