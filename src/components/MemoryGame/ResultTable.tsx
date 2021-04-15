import React from 'react';
import { useSelector } from 'react-redux';
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Clear, Done } from '@material-ui/icons';
import { getClickedWordsAsArray, updateClickedWords } from '../../store/actions/memoryGameActions';
import { IAppState } from '../../store/types';
import { IMemoryGameCard } from '../../store/reducers/memoryGameReducer/types';
import { IResultTableProps } from './types';
import useStyles from './styles';

const ResultTable: React.FC<IResultTableProps> = (props: IResultTableProps) => {
  const classes = useStyles();
  const field = useSelector((state: IAppState) => state.memoryGame.field);
  const isLoggedIn = useSelector((state: IAppState) => state.user.isLoggedIn);
  const userName = useSelector((state: IAppState) => state.user.data.name);
  const isFail = props.isFail ? 'Сожалеем, вы проиграли...' : 'Поздравляем, вы выиграли!!!';

  const renderAnswers = (element: IMemoryGameCard) => {
    return (
      <TableRow key={element.id}>
        <TableCell>
          {element.isClicked && (
            <Typography variant="subtitle1" gutterBottom>
              {element.value}
            </Typography>
          )}
          {!element.isClicked && (
            <Typography variant="caption" gutterBottom>
              {element.value}
            </Typography>
          )}
        </TableCell>
        <TableCell align="right">
          {!element.disabled && element.isClicked && <Clear className={classes.incorrectAnswer} />}
          {element.disabled && <Done className={classes.correctAnswer} />}
          {!element.disabled && !element.isClicked && <></>}
        </TableCell>
      </TableRow>
    );
  };

  const getWordsFromGameField = (currentField: Array<IMemoryGameCard>) => {
    return updateClickedWords(currentField).map((card) => renderAnswers(card));
  };

  return (
    <>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Typography variant="subtitle1" gutterBottom>
          {isFail}
        </Typography>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>Слово</TableCell>
              <TableCell align="right">Ответ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{getWordsFromGameField(field)}</TableBody>
        </Table>
        {isLoggedIn && (
          <>
            <Typography variant="subtitle1" gutterBottom>
              {`${userName}, cлова`}
            </Typography>
            {getClickedWordsAsArray(field).map((word) => {
              return (
                <Typography key={word} variant="subtitle1" gutterBottom>
                  {word}
                </Typography>
              );
            })}
            <Typography variant="subtitle1" gutterBottom>
              вы найдете в вашем словаре
            </Typography>
          </>
        )}
      </TableContainer>
    </>
  );
};

export default ResultTable;
