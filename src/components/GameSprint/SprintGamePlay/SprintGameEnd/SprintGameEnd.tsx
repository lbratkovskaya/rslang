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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reduceArrayWords, selectLevel, selectRound } from '../../../../store/actions/sprintAction';
import { fetchWords } from '../../../../store/actions/wordBookActions';
import { IAppState, ISprintWords, IWord } from '../../../../store/types';
import { SELECT_LEVELS, SELECT_ROUNDS } from '../../constants';
import useStyles, { StyledTableCell, StyledTableRow } from '../../style';
import SprintGamePlay from '../SprintGamePlay';

const SprintGameEnd: React.FC = () => {
  const wordBook = useSelector((state: IAppState) => state.wordBook);
  const springInfo = useSelector((state: IAppState) => state?.sprint);
  const dispatch = useDispatch();
  const randomLevel = (level: number) => dispatch(selectLevel(level));
  const randomRound = (round: number) => dispatch(selectRound(round));
  const getWords = (group: number, page: number) => dispatch(fetchWords(group, page));
  const onReduceArrayWords = (wordsArray: Array<IWord>) => dispatch(reduceArrayWords(wordsArray));

  const [isRestGame, setIsRestGame] = useState(false);

  const group: number = Math.floor(Math.random() * SELECT_LEVELS.amount);
  const page: number = Math.floor(Math.random() * SELECT_ROUNDS.amount);

  useEffect(() => {
    getWords(group, page);
  }, []);

  const handleRestGame = () => {
    randomLevel(group);
    randomRound(page);
    setIsRestGame(true);
    onReduceArrayWords(wordBook?.words);
  };

  const classes = useStyles();

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
          {springInfo.words
            .filter((el: ISprintWords) => el.isCorrect === isAnswer)
            .map((el: ISprintWords) => (
              <StyledTableRow key={el.word}>
                <StyledTableCell align="left">{el.word}</StyledTableCell>
                <StyledTableCell align="right">{el.translate}</StyledTableCell>
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
