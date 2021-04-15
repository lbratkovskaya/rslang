import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DoneOutlineTwoToneIcon from '@material-ui/icons/DoneOutlineTwoTone';
import ClearIcon from '@material-ui/icons/Clear';
import SprintGamePlay from '../SprintGamePlay';
import { reduceArrayWords, selectLevel, selectRound } from '../../../../store/actions/sprintAction';
import { addWordsToUserDictionary } from '../../../../store/actions/dictionaryActions';
import { addGameStatistics } from '../../../../store/actions/statisticsActions';
import { fetchWords } from '../../../../store/actions/wordBookActions';
import { SPRINT, timeout } from '../../../../constants';
import { SELECT_LEVELS, SELECT_ROUNDS } from '../../constants';
import {
  IAppState,
  IGameName,
  ISprintWords,
  IWord,
  IWordWithResult,
} from '../../../../store/types';
import useStyles, { StyledTableCell, StyledTableRow } from '../../style';

const SprintGameEnd: React.FC = () => {
  const wordBook = useSelector((state: IAppState) => state.wordBook);
  const springInfo = useSelector((state: IAppState) => state.sprint);
  const userData = useSelector((state: IAppState) => state.user.data);
  const userDictionary = useSelector((state: IAppState) => state.userDictionary);
  const userWords = [...userDictionary.learningWords, ...userDictionary.deletedWords];
  const userWordsWords = userWords.map((uw) => uw.word);

  const dispatch = useDispatch();
  const randomLevel = (level: number) => dispatch(selectLevel(level));
  const randomRound = (round: number) => dispatch(selectRound(round));
  const getWords = (group: number, page: number) => dispatch(fetchWords(group, page));
  const onReduceArrayWords = (wordsArray: Array<IWord>) => dispatch(reduceArrayWords(wordsArray));

  const setWordForDictionary = (wordsArray: Array<IWordWithResult>) =>
    dispatch(addWordsToUserDictionary(wordsArray, userDictionary, userData));
  const saveGameStatistics = (wordsArray: Array<IWordWithResult>, maxSuccessSeries: number) => {
    const correctTotal = wordsArray.filter((word) => word.correct).length;
    const newLearned = wordsArray.filter((word) => userWordsWords.indexOf(word.word.word) === -1);
    dispatch(
      addGameStatistics(
        userData,
        IGameName.SPRINT,
        newLearned.length,
        wordsArray.length,
        correctTotal,
        maxSuccessSeries
      )
    );
  };

  const [isRestGame, setIsRestGame] = useState(false);
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(0);

  const handleRestGame = (): void => {
    randomLevel(group);
    randomRound(page);
    setIsRestGame(true);
    onReduceArrayWords(wordBook?.words);
  };

  const onAudioPlay = (url: string): void => {
    const audio = new Audio(url);
    audio.play();
  };

  const classes = useStyles();

  useEffect(() => {
    const checkCorrectArray = springInfo.wordsData.filter((el: ISprintWords) => !el.isCorrect);
    setTimeout(() => {
      if (checkCorrectArray.length) {
        onAudioPlay(SPRINT.audioFail);
      } else {
        onAudioPlay(SPRINT.audioWin);
      }
    }, timeout);
  }, []);

  useEffect(() => {
    if (!isRestGame) {
      setGroup(Math.floor(Math.random() * SELECT_LEVELS.amount));
      setPage(Math.floor(Math.random() * SELECT_ROUNDS.amount));
    }
  }, [isRestGame]);

  useEffect(() => {
    getWords(group, page);
  }, [group, page]);

  useEffect(() => {
    const arrayForDictionary = springInfo.wordsData.map((el) => ({
      word: el.word,
      correct: el.isCorrect,
    }));
    if (userData.userId) {
      setWordForDictionary(arrayForDictionary);
      saveGameStatistics(
        arrayForDictionary,
        [...springInfo.series, springInfo.seriesCounter].sort((a, b) => b - a)[0]
      );
    }
  }, []);

  const renderTable = (isAnswer: boolean) => {
    return (
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Слово</StyledTableCell>
            <StyledTableCell align="right">Перевод</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {springInfo.wordsData
            .filter((el: ISprintWords) => el.isCorrect === isAnswer)
            .map((el: ISprintWords) => (
              <StyledTableRow key={el.word.word}>
                <StyledTableCell align="left">{el.word.word}</StyledTableCell>
                <StyledTableCell align="right">{el.word.wordTranslate}</StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    );
  };

  if (!isRestGame) {
    return (
      <div>
        <TableContainer className={classes.tableContainer} component={Paper}>
          <div className={classes.tableSpanCorrectly}>
            <DoneOutlineTwoToneIcon />
            ВЕРНЫЙ ОТВЕТ
          </div>
          {renderTable(true)}
          <div className={classes.tableSpanUnCorrectly}>
            <ClearIcon />
            НЕВЕРНЫЙ ОТВЕТ
          </div>
          {renderTable(false)}
        </TableContainer>
        <Button variant="contained" color="secondary" onClick={handleRestGame}>
          СДЕЛАТЬ КРУГ
        </Button>
      </div>
    );
  }
  return <SprintGamePlay />;
};

export default SprintGameEnd;
