import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { ISavannahWord, IAudioCallingWord } from '../../../store/types';
import { useStyles } from '../styles';

interface ITableEndProps {
  words: Array<ISavannahWord | IAudioCallingWord>;
}

const TableEndGame: React.FC<ITableEndProps> = ({ words }: ITableEndProps) => {
  const classes = useStyles();
  console.log(words);
  const chooseTableHeadStyle = (value: boolean | undefined | string) => {
    switch (value) {
      case true:
        return classes.tableHeadCorrect;
      case false:
        return classes.tableHeadInCorrect;
      case undefined:
        return classes.tableHeadUnUsed;
      default:
        return classes.tableHeadDefault;
    }
  };

  const renderAnswers = (condition: boolean | undefined, title: string) => {
    return (
      <>
        <TableBody>
          <TableRow className={chooseTableHeadStyle(condition)}>
            <TableCell className={classes.tableWordStyle} align="center" colSpan={2}>
              {title}
            </TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          {words
            .filter((el: ISavannahWord | IAudioCallingWord) => el.isCorrect === condition)
            .map((el: ISavannahWord | IAudioCallingWord) => {
              return (
                <TableRow key={el.word}>
                  <TableCell className={classes.tableWordStyle}>{el.word}</TableCell>
                  <TableCell className={classes.tableWordStyle} align="right">
                    {el.translate}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </>
    );
  };
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table stickyHeader aria-label="sticky table" className={classes.table} size="small">
        <TableHead className={chooseTableHeadStyle('empty')}>
          <TableRow>
            <TableCell className={classes.tableWordStyle}>Слово</TableCell>
            <TableCell className={classes.tableWordStyle} align="right">
              Перевод
            </TableCell>
          </TableRow>
        </TableHead>
        {renderAnswers(true, 'Верный ответ')}
        {renderAnswers(false, 'Неверный ответ')}
        {renderAnswers(undefined, 'Неиспользованные слова')}
      </Table>
    </TableContainer>
  );
};

export default TableEndGame;
