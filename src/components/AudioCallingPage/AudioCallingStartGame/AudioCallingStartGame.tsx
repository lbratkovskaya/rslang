import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import {
  clickStartGame,
  selectLevel,
  selectRound,
  createArrayWords,
} from '../../../store/actions/audioCallingActions';
import { fetchWords, setGroup, setPage } from '../../../store/actions/wordBookActions';
import GameSelect from '../../commonComponents/GameSelect/GameSelect';
import { MAX_LENGTH_GAME_ARR, SELECT_ROUNDS } from '../constants';
import { WORDBOOK_GROUPS } from '../../../constants';
import gameMode from './constants';
import { IAppState, IWord } from '../../../store/types';
import useStyles from './styles';

const AudioCallingStartGame: React.FC = () => {
  const dispatch = useDispatch();
  const createStartArray = (wordsArray: Array<IWord>) => dispatch(createArrayWords(wordsArray));
  const setSelectRound = (round: number) => dispatch(selectRound(round));
  const setSelectLevel = (level: number) => dispatch(selectLevel(level));
  const [page, setCurPage] = useState(0);
  const [group, setCurGroup] = useState(0);
  const acGroup = useSelector((state: IAppState) => state.audioCalling.level);
  const acPage = useSelector((state: IAppState) => state.audioCalling.round);
  const wbGroup = useSelector((state: IAppState) => state.wordBook.activeGroup);
  const wbPage = useSelector((state: IAppState) => state.wordBook.activePage);
  const difficulty = useSelector((state: IAppState) => state.settings.gameMode);
  const { actualWords } = useSelector((state: IAppState) => state.games);
  const location = useLocation();
  const isCameFromWordbook = location.state?.fromWordbook;
  const styles = useStyles();
  const onClickStartGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const sendActiveGroup = (value: number) => dispatch(setGroup(value));
  const sendActivePage = (value: number) => dispatch(setPage(value));
  const getWords = (grp: number, pg: number) => {
    dispatch(fetchWords(grp, pg));
  };

  const handleChange = (value: string | number): void => {
    setSelectLevel(Number(value));
    sendActiveGroup(Number(value));
  };

  const handlerStartGame = () => {
    if (isCameFromWordbook) {
      const cutActualWords = actualWords.slice(-MAX_LENGTH_GAME_ARR);
      createStartArray(cutActualWords.slice(0, gameMode[difficulty]));
      getWords(group, page);
      setTimeout(() => {
        onClickStartGame(true);
      }, 3000);
    } else {
      const randomPage = Math.floor(Math.random() * SELECT_ROUNDS.amount) % SELECT_ROUNDS.amount;
      setSelectRound(randomPage);
      sendActivePage(randomPage);
      getWords(group, page);
      setTimeout(() => {
        onClickStartGame(true);
      }, 3000);
    }
  };

  useEffect(() => {
    if (isCameFromWordbook) {
      setCurPage(wbPage);
      setCurGroup(wbGroup);
    } else {
      setCurPage(acPage);
      setCurGroup(acGroup);
    }
    getWords(group, page);
  }, [group, page]);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Начать игру &quot;Аудиовызов&quot;</h2>
      <p className={styles.par}>
        В данной игре будут звучать слова на английском языке, вам необходимо нажимать на кнопку
        содержащую правильный перевод звучащего слова.
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
