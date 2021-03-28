import React from 'react';
import {
  Card,
  Typography,
} from '@material-ui/core';
import useStyles from './styles';
import { fetchMemoryGameWords } from '../../store/actions/memoryGameActions';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../store/types';
import { ICardProps } from './types';

const GameCard: React.FC<ICardProps> = (props: ICardProps) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      {props.type === "image" ? (
        <Card className={styles.card}>
          <div className={styles.imageWrapper}>
            <img className={styles.image} src={props.image} alt={props.word}/>
          </div>
        </Card>
      ) : (
        <Card className={styles.cardWithText}>
          <Typography className={styles.text} component="div">
            {props.word}
          </Typography>
        </Card>
      )}
    </>  
  );
};

export default GameCard;
