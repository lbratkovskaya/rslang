import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import WordCard from '../WordCard';
import { IUserWordCardProps } from './types';
import { IAppState } from '../../store/types';
import useStyles from './styles';
import { APPEAR_DURATION, APPEAR_STYLE, WORDCARD_APPEAR_GAP } from '../../constants';
import { Transition, TransitionStatus } from 'react-transition-group';
import { transitionStyles } from '../WordCard/styles';

const UserWordCard: React.FC<IUserWordCardProps> = ({ word, index }: IUserWordCardProps) => {
  const isLoading = useSelector((state: IAppState) => state.userDictionary.isLoading);
  const [isMounted, setIsMounted] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const delay = WORDCARD_APPEAR_GAP * index;
    const cardAppearTimeout = setTimeout(() => setIsMounted(true), delay);

    return () => {
      clearTimeout(cardAppearTimeout);
      setIsMounted(false);
    };
  }, []);

  return (
    <Transition in={isMounted && !isLoading} timeout={APPEAR_DURATION} unmountOnExit>
      {(state: TransitionStatus) => (
        <div className={classes.wordCard} style={{ ...APPEAR_STYLE, ...transitionStyles[state] }}>
          <WordCard word={word} index={index} activeGroup={word.group} isLoading={isLoading} />
          <div className={classes.heatsPanel}>
            <Typography className={classes.successHeats}>
              Success: {word.userWord?.optional.successHeats || 0}
            </Typography>
            <Typography className={classes.errorHeats}>
              Errors: {word.userWord?.optional.errorHeats || 0}
            </Typography>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default UserWordCard;
