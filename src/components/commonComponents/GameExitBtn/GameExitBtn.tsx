import React from 'react';
import { IconButton } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { IGameExitBtnProps } from '../types';
import useStyles from '../styles';

const GameExitBtn: React.FC<IGameExitBtnProps> = (props: IGameExitBtnProps) => {
  const handleExit = () => props.clickBtn();
  const classes = useStyles();
  return (
    <IconButton className={classes.exitBtnColor} aria-label="delete" onClick={handleExit}>
      <Cancel />
    </IconButton>
  );
};

export default GameExitBtn;
