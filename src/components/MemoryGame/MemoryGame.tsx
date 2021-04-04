import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFullScreenHandle } from 'react-full-screen';
import { CssBaseline, Typography } from '@material-ui/core';
import { FullScreenBtn, FullScreenWrapper } from '../commonComponents';
import ControlPanel from './ControlPanel';
import Header from '../Header';
import GameCard from './GameCard';
import { IAppState } from '../../store/types';
import { IMemoryGameCard } from '../../store/reducers/memoryGameReducer/types';
import useStyles from './styles';

const MemoryGame: React.FC = () => {
  const classes = useStyles();
  const isGameStarted = useSelector((state: IAppState) => state.memoryGame.isStarted);
  const field = useSelector((state: IAppState) => state.memoryGame.field);
  const handleFullScreenWrapper = useFullScreenHandle();
  const [fullSize, setFullSize] = useState(false);

  const handleFullSizeMemoryGame = () => {
    setFullSize(!fullSize);
    return fullSize ? handleFullScreenWrapper.exit() : handleFullScreenWrapper.enter();
  };

  const gameComponent = (
    <>
      <Header />
      <div className={classes.gameWrapper}>
        <CssBaseline />
        <ControlPanel />
        <div className={classes.cardsWrapper}>
          {isGameStarted &&
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
