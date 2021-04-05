import React, { useEffect, useState } from 'react';
import { Typography, Card, useTheme } from '@material-ui/core';
import { Transition, TransitionStatus } from 'react-transition-group';
import WordCard from '../WordCard';
import { APPEAR_DURATION, APPEAR_STYLE, WORDCARD_APPEAR_GAP } from '../../constants';
import { IUserWordCardProps } from './types';
import useStyles from './styles';
import { transitionStyles } from '../WordCard/styles';

const UserWordCard: React.FC<IUserWordCardProps> = ({ word, index }: IUserWordCardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const colorOfDifficult = theme.palette.secondary.main;

  useEffect(() => {
    const delay = WORDCARD_APPEAR_GAP * index;
    const cardAppearTimeout = setTimeout(() => setIsMounted(true), delay);

    return () => {
      clearTimeout(cardAppearTimeout);
      setIsMounted(false);
    };
  }, []);

  const difficultStyle = {
    filter: word.userWord?.difficulty === 'hard' ? `drop-shadow(0 0 3px ${colorOfDifficult})` : '',
  };

  return (
    <Transition in={isMounted} timeout={APPEAR_DURATION} unmountOnExit>
      {(state: TransitionStatus) => (
        <div
          className={classes.wordCard}
          style={{ ...APPEAR_STYLE, ...difficultStyle, ...transitionStyles[state] }}>
          <WordCard
            word={word}
            index={index}
            activeGroup={word.group}
            isLoading={false}
            showDeleted
          />
          <Card
            className={classes.heatsPanel}
            style={{ ...APPEAR_STYLE, ...transitionStyles[state] }}>
            <Typography className={classes.successHeats}>
              Success: {word.userWord?.optional.successHeats || 0}
            </Typography>
            <Typography className={classes.errorHeats}>
              Errors: {word.userWord?.optional.errorHeats || 0}
            </Typography>
          </Card>
        </div>
      )}
    </Transition>
  );
};

export default UserWordCard;
