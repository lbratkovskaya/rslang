import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFullScreenHandle } from 'react-full-screen';
import { CircularProgress, CssBaseline, Typography } from '@material-ui/core';
import { FullScreenBtn, FullScreenWrapper } from '../commonComponents';
import ControlPanel from './ControlPanel';
import Header from '../Header';
import GameCard from './GameCard';
import { IAppState } from '../../store/types';
import {
  clearClickedCards,
  disableClickedCards,
  hideClickedCards,
} from '../../store/actions/memoryGameActions';
import { fetchDictionary } from '../../store/actions/dictionaryActions';
import { IMemoryGameCard } from '../../store/reducers/memoryGameReducer/types';
import useStyles from './styles';
import { MEMORY } from '../../constants';

const MemoryGame: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: IAppState) => state.memoryGame.isStarted);
  const field = useSelector((state: IAppState) => state.memoryGame.field);
  const clickedCards = useSelector((state: IAppState) => state.memoryGame.clickedCards);
  const handleFullScreenWrapper = useFullScreenHandle();
  const [fullSize, setFullSize] = useState(false);
  const isLoading = useSelector((state: IAppState) => state.memoryGame.isLoading);
  const userData = useSelector((state: IAppState) => state.user?.data);
  const getUserDictionary = () => dispatch(fetchDictionary(userData));

  const handleFullSizeMemoryGame = () => {
    setFullSize(!fullSize);
    return fullSize ? handleFullScreenWrapper.exit() : handleFullScreenWrapper.enter();
  };

  useEffect(() => {
    if (clickedCards.length === 2) {
      dispatch(clearClickedCards());
      const [previousCard, currentCard] = clickedCards;
      if (previousCard.id === currentCard.id) {
        dispatch(disableClickedCards([previousCard, currentCard]));
      } else {
        setTimeout(
          () => dispatch(hideClickedCards([previousCard, currentCard])),
          MEMORY.timeShowingCard
        );
      }
    }
  }, [JSON.stringify(field)]);

  useEffect(() => {
    getUserDictionary();
  }, []);

  const gameComponent = (
    <>
      <Header />
      <div className={classes.gameWrapper}>
        <CssBaseline />
        <ControlPanel />
        <div className={classes.cardsWrapper}>
          {isGameStarted && isLoading && <CircularProgress />}
          {isGameStarted &&
            !isLoading &&
            field.map((card: IMemoryGameCard) => {
              return (
                <GameCard
                  type={card.type}
                  value={card.value}
                  key={`${card.id}_${card.type}`}
                  id={`${card.id}_${card.type}`}
                  isOpen={card.isOpen}
                  disabled={card.disabled}
                  audio={card.audio}
                  gameSize={card.gameSize}
                />
              );
            })}
          {!isGameStarted && (
            <div>
              <Typography variant="h1" component="h2" gutterBottom className={classes.title}>
                Найди пару
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Развивает внимание и память.
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Пополняет словарный запас.
              </Typography>
            </div>
          )}
          <FullScreenBtn changeScreen={handleFullSizeMemoryGame} />
        </div>
      </div>
    </>
  );

  return (
    <div>
      <FullScreenWrapper component={gameComponent} handle={handleFullScreenWrapper} />
    </div>
  );
};

export default MemoryGame;
