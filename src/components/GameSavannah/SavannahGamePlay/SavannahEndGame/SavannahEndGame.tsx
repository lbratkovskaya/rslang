import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Clear, Done } from '@material-ui/icons';
import SavannahGamePlay from '../SavannahGamePlay';
import {
  reduceArrayWords,
  selectLevel,
  selectRound,
} from '../../../../store/actions/savannahActions';
import { fetchWords } from '../../../../store/actions/wordBookActions';
import { SELECT_LEVELS, SELECT_ROUNDS } from '../../constants';
import { IAppState, ISavannahWord, IWord } from '../../../../store/types';
import useStyles from '../../styles';

const SavannahEndGame: React.FC = () => {
  const dispatch = useDispatch();
  const savannahData = useSelector((state: IAppState) => state.savannah);
  const dictionaryWords = useSelector((state: IAppState) => state.wordBook);
  const onRandomLevel = (level: number) => dispatch(selectLevel(level));
  const onRandomRound = (round: number) => dispatch(selectRound(round));
  const getDictionary = (group: number, page: number) => dispatch(fetchWords(group, page));
  const onReduceArrayWords = (wordsArray: IWord[]) => dispatch(reduceArrayWords(wordsArray));

  const [isRestart, setIsRestart] = useState(false);

  const group: number = Math.floor(Math.random() * SELECT_LEVELS.amount);
  const page: number = Math.floor(Math.random() * SELECT_ROUNDS.amount);

  useEffect(() => {
    getDictionary(group, page);
  }, []);

  const handleNewGame = () => {
    onRandomLevel(group);
    onRandomRound(page);
    setIsRestart(true);
    onReduceArrayWords(dictionaryWords?.words);
  };

  const classes = useStyles();

  const renderAnswers = (element: ISavannahWord, condition: boolean, i: number) => {
    return (
      <TableRow key={i}>
        <TableCell>{element?.word}</TableCell>
        <TableCell align="right">
          {condition ? (
            <Done className={classes.trueAnswer} />
          ) : (
            <Clear className={classes.falsAnswer} />
          )}
        </TableCell>
      </TableRow>
    );
  };

  if (!isRestart) {
    return (
      <div className="end-game-wrapper">
        <TableContainer className={classes.tableContainer} component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Слово</TableCell>
                <TableCell align="right">Ответ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {savannahData.words.map((el: ISavannahWord, i: number) =>
                renderAnswers(el, el.isCorrect, i)
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" color="secondary" onClick={handleNewGame}>
          Новая игра
        </Button>
      </div>
    );
  }

  return <SavannahGamePlay />;
};

export default SavannahEndGame;
