import React from 'react';
import { IconButton } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { IGameExitBtnProps } from '../types';

const GameExitBtn: React.FC<IGameExitBtnProps> = (props: IGameExitBtnProps) => {
  const handleExit = () => props.clickBtn();
  return (
    <IconButton aria-label="delete" onClick={handleExit}>
      <Cancel />
    </IconButton>
  );
};

export default GameExitBtn;
