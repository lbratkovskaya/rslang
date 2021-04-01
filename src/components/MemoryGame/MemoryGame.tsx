import React, { useEffect, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useFullScreenHandle } from 'react-full-screen';
import useStyles from './styles';
import { IAppState } from '../../store/types';
import { stopGame } from '../../store/actions/memoryGameActions';
import GameCard from './GameCard';
import Header from '../Header';
import ModalWindow from '../ModalWindow';
import ControlPanel from './ControlPanel';
import { FullScreenBtn, FullScreenWrapper } from '../commonComponents';

const MemoryGame: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: IAppState) => state.memoryGame.isStarted);
  const field = useSelector((state: IAppState) => state.memoryGame.field);
  const [open, setOpen] = React.useState(false);
  const handleFullScreenWrapper = useFullScreenHandle();
  const [fullSize, setFullSize] = useState(false);

  const handleShowModalWindow = () => setOpen(true);
  const handleCloseModalWindow = () => setOpen(false);

  useEffect(() => {
    if (field && field.length && isGameStarted) {
      const allCardsAreDisabled = field.every((card) => card.disabled === true);
      if (allCardsAreDisabled === true) {
        dispatch(stopGame());
        handleShowModalWindow();
      }
    }
  }, [JSON.stringify(field)]);

  const handleFullSizeMemoryGame = () => {
    setFullSize(!fullSize);
    return fullSize ? handleFullScreenWrapper.exit() : handleFullScreenWrapper.enter();
  };

  const FullScreenBtnComponent = <FullScreenBtn changeScreen={handleFullSizeMemoryGame} />;

  return (
    <div>
      <Header />
      <ModalWindow
        text="Congratulations! You won!!!"
        open={open}
        handleClose={handleCloseModalWindow}
      />
      <div className={styles.gameWrapper}>
        <CssBaseline />
        <ControlPanel />
        <div className={styles.cardsWrapper}>
          {isGameStarted &&
            field.map((card) => {
              /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
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
        </div>
      </div>
      <FullScreenWrapper component={FullScreenBtnComponent} handle={handleFullScreenWrapper} />
    </div>
  );
};

export default MemoryGame;
