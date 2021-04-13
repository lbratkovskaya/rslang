import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListItem, List, ListSubheader } from '@material-ui/core';
import {
  resetEndGame,
  clickStartGame,
  resetWordsToStartNewGame,
} from '../../../store/actions/audioCallingActions';
import backendUrl, { playIcon } from '../../../constants';
import { addWordsToUserDictionary } from '../../../store/actions/dictionaryActions';
import { IAppState, IWord } from '../../../store/types';
import { IAudioCallingWords } from '../../../store/reducers/audioCallingReducer/types';
import useStyles from './styles';

const FinishGame: React.FC = () => {
  const dispatch = useDispatch();
  const styles = useStyles();
  const audioCallingData = useSelector((state: IAppState) => state.audioCalling);
  const userData = useSelector((state: IAppState) => state.user.data);
  const toggleResetEndGame = () => dispatch(resetEndGame());
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const reset = () => dispatch(resetWordsToStartNewGame());
  const sendWords = (array: Array<{ word: IWord; correct: boolean }>) =>
    dispatch(addWordsToUserDictionary(array, userData));

  const handleExitGame = () => {
    startGame(false);
    toggleResetEndGame();
    reset();
  };

  useEffect(() => {
    const copy = audioCallingData.words.map((el) => ({ word: el.word, correct: el.isCorrect }));
    sendWords(copy);
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
