import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core';
import { Transition, TransitionStatus } from 'react-transition-group';
import WordCard from '../WordCard';
import { APPEAR_DURATION, APPEAR_STYLE, WORDCARD_APPEAR_GAP } from '../../constants';
import { IUserWordCardProps } from './types';
import useStyles from './styles';
import { transitionStyles } from '../WordCard/styles';

const UserWordCard: React.FC<IUserWordCardProps> = ({
  word,
  index,
  removeOnDifficultyChange,
}: IUserWordCardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const colorOfDifficult = theme.palette.secondary.main;

  const difficultStyle = {
    filter: word.userWord?.difficulty === 'hard' ? `drop-shadow(0 0 3px ${colorOfDifficult})` : '',
  };

  useEffect(() => {
    const delay = WORDCARD_APPEAR_GAP * index;
    const cardAppearTimeout = setTimeout(() => setIsMounted(true), delay);

    return () => {
      clearTimeout(cardAppearTimeout);
      setIsMounted(false);
    };
  }, []);

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
            removeOnDifficultyChange={removeOnDifficultyChange}
          />
        </div>
      )}
    </Transition>
  );
};

export default UserWordCard;
