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
import WordCard from '../WordCard';

const UserWordCard: React.FC<IUserWordCardProps> = ({ word, index }: IUserWordCardProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IAppState) => state.user);
  const difficulty = word.userWord?.difficulty || 'easy';
  const isDeleted = word.userWord?.optional?.deleted || false;

  const renderButton = (label: string, onClickHandler: () => void) => {
    return (
      <Chip
        className={classes.button}
        variant="outlined"
        size="small"
        deleteIcon={<Done />}
        clickable
        onClick={onClickHandler}
        label={label}
      />
    );
  };

  return (
    <WordCard word={word} index={index}/>
  );
};

export default UserWordCard;
