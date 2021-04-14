import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Countdown from '../../commonComponents/Countdown/Countdown';
import {
  clickStartGame,
  createArrayWords,
  selectLevel,
  selectRound,
} from '../../../store/actions/audioCallingActions';
import { fetchDictionary } from '../../../store/actions/dictionaryActions';
import {
  changeCountDown,
  fetchExtraWords,
  fetchGameWords,
} from '../../../store/actions/gamesActions';
import GameSelect from '../../commonComponents/GameSelect/GameSelect';
import gameMode, { WORDS_QUANTITY } from './constants';
import { SELECT_ROUNDS } from '../constants';
import { WORDBOOK_GROUPS } from '../../../constants';
import { IAppState, IWord } from '../../../store/types';
import useStyles from './styles';

const AudioCallingStartGame: React.FC = () => {
  const audioCallingData = useSelector((state: IAppState) => state.audioCalling);
  const { gameWords } = useSelector((state: IAppState) => state.games);
  const page = audioCallingData.round;
  const group = audioCallingData.level;
  const isCountdown = useSelector((state: IAppState) => state.games.isCountDown);
  const difficulty = useSelector((state: IAppState) => state.settings.gameMode);
  const wordBookCurGroup = useSelector((state: IAppState) => state.wordBook.activeGroup);
  const array = useSelector((state: IAppState) => state.audioCalling.startArray);
  const userData = useSelector((state: IAppState) => state.user?.data);
  const { extraWords, actualWords } = useSelector((state: IAppState) => state.games);
  const location = useLocation();
  const isCameFromWordbook = location.state?.fromWordbook;
  const styles = useStyles();

  const dispatch = useDispatch();
  const createStartArray = (wordsArray: Array<IWord>) => dispatch(createArrayWords(wordsArray));
  const setSelectRound = (round: number) => dispatch(selectRound(round));
  const setSelectLevel = (level: number) => dispatch(selectLevel(level));
  const countDown = (isCountEnd: boolean) => dispatch(changeCountDown(isCountEnd));
  const onClickStartGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const getUserDictionary = () => dispatch(fetchDictionary(userData));
  const getWords = (grp: number, pg: number) => {
    dispatch(fetchGameWords(grp, pg));
  };
  const getExtraWords = (value: number) => {
    dispatch(fetchExtraWords(value));
  };

  const handleChange = (value: string | number): void => {
    setSelectLevel(Number(value));
    setSelectRound(Number(value));
  };

  const handlerStartGame = () => {
    if (isCameFromWordbook) {
      const cutActualWords = actualWords.concat(extraWords).slice(-gameMode[difficulty]);
      createStartArray(cutActualWords);
    } else {
      const randomPage = Math.floor(Math.random() * SELECT_ROUNDS.amount) % SELECT_ROUNDS.amount;
      const wordsForGame =
        difficulty === 'hard'
          ? extraWords.concat(array).slice(-gameMode[difficulty])
          : gameWords.slice(-gameMode[difficulty]);
      setSelectRound(randomPage);
      createStartArray(wordsForGame);
    }
    countDown(true);
    onClickStartGame(true);
  };

  useEffect(() => {
    getExtraWords(WORDS_QUANTITY);
    if (isCameFromWordbook) {
      setSelectLevel(wordBookCurGroup);
    }
  }, []);

  useEffect(() => {
    getWords(group, page);
  }, [group, page]);

  useEffect(() => {
    getUserDictionary();
  }, []);

  if (isCountdown) {
    return <Countdown />;
  }
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Начать игру &quot;Аудиовызов&quot;</h2>
      <p className={styles.par}>
        В данной игре будут звучать слова на английском языке, вам необходимо нажимать на кнопку
        содержащую правильный перевод звучащего слова. Для ответа можно использовать мышь, либо
        горячие клавиши соотвествующие номерам кнопок.
      </p>
      <p className={styles.par}>Выберите уровень и раунд для начала игры.</p>
      <div className={styles.subwrapper}>
        <GameSelect
          changeSelectFc={handleChange}
          selectData={WORDBOOK_GROUPS}
          selectName="Уровень"
          disabled={isCameFromWordbook}
          value={group}
        />
      </div>
      <Button variant="contained" color="secondary" onClick={handlerStartGame}>
        Начать
      </Button>
    </div>
  );
};

export default AudioCallingStartGame;
