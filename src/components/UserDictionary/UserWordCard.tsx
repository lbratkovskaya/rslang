import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Chip, Typography } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import {
  setUserWordDeleted,
  setUserWordEasy,
  setUserWordHard,
} from '../../store/actions/dictionaryActions';
import backendUrl from '../../constants';
import { IUserWordCardProps } from './types';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const UserWordCard: React.FC<IUserWordCardProps> = ({ word }: IUserWordCardProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IAppState) => state.user);

  return (
    <Card className={classes.card}>
      <img
        src={`${backendUrl}/${word.image}`}
        alt={word.word}
        width={240}
        height={160}
        className={classes.image}
      />
      <Typography className={classes.word}>
        {`${word.word} — `}
        <span className={classes.wordTranslate}>{word.wordTranslate}</span>
      </Typography>
      <Chip
        className={classes.button}
        variant="outlined"
        size="small"
        deleteIcon={<Done />}
        clickable
        onClick={() => dispatch(setUserWordHard(word, currentUser.data))}
        label="В сложные"
      />
      <Chip
        className={classes.button}
        variant="outlined"
        size="small"
        deleteIcon={<Done />}
        clickable
        onClick={() => dispatch(setUserWordDeleted(word, currentUser.data, true))}
        label="В удалённые"
      />
      <Chip
        className={classes.button}
        variant="outlined"
        size="small"
        deleteIcon={<Done />}
        clickable
        onClick={() => dispatch(setUserWordEasy(word, currentUser.data))}
        label="В изученные"
      />
    </Card>
  );
};

export default UserWordCard;
