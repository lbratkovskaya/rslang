import React from 'react';
import { ButtonBase } from '@material-ui/core';
import { playIcon } from '../../../../constants';
import IQuestionsProps from './types';
import useStyles from './styles';

const GameQuestion: React.FC<IQuestionsProps> = ({ play }: IQuestionsProps) => {
  const styles = useStyles();

  return (
    <ButtonBase className={styles.MuiButton} onClick={play}>
      <img src={playIcon} alt="play" />
    </ButtonBase>
  );
};

export default GameQuestion;
