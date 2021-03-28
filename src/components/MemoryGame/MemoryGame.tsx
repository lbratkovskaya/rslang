import React, { useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CssBaseline,
  Container,
} from '@material-ui/core';
// import { IMemoryGameProps } from './types';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../store/types';
import { fetchMemoryGameWords, setIsGameStarted, setWords } from '../../store/actions/memoryGameActions'
import GameCard from './GameCard';
import backendUrl from '../../constants';
import Header from '../Header';
import { shuffle } from '../../controller/utils';

const MemoryGame: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const words = useSelector((state: IAppState) => state.memoryGame.words);
  const isGameStarted = useSelector((state: IAppState) => state.memoryGame.isStarted)
  const getWords = () => dispatch(fetchMemoryGameWords());
  useEffect(() => { getWords() }, []);
  shuffle(words)

  return (
    <div>
      <Header/>
      <div className={styles.gameWrapper}>
        <CssBaseline />
        <div className={styles.controlsWrapper}>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(setWords(words))
            dispatch(setIsGameStarted(true))
          }}>
          Старт
        </Button>
        </div>
        <div className={styles.cardsWrapper}>
        { isGameStarted && words.map(word => 
          <GameCard type="image" image={`${backendUrl}/${word.image}`}/> 
        ) }
        { isGameStarted && words.map(word => 
          <GameCard type="text" word={word.word}/> 
        ) }
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
