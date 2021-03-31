import React, { useEffect } from 'react';
import { Button, CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { IAppState } from '../../store/types';
import { initiateGameField, startGame, stopGame } from '../../store/actions/memoryGameActions';
import GameCard from './GameCard';
import Header from '../Header';
import ModalWindow from '../ModalWindow';

const MemoryGame: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const isGameStarted = useSelector((state: IAppState) => state.memoryGame.isStarted);
  const field = useSelector((state: IAppState) => state.memoryGame.field);
  const [open, setOpen] = React.useState(false);

  const handleStartGame = () => {
    dispatch(initiateGameField(1, 'image')); //image or translation
    dispatch(startGame());
  };

  useEffect(() => {
    if (field && field.length && isGameStarted) {
      const allCardsAreDisabled = field.every((card) => card.disabled === true);
      if (allCardsAreDisabled === true) {
        dispatch(stopGame());
        handleShowModalWindow();
      }
    }
  }, [ JSON.stringify(field)] );

  const handleShowModalWindow = () => setOpen(true)
  const handleCloseModalWindow = () => setOpen(false)

  //const failPlayer: HTMLAudioElement = new Audio('./assets/sounds/fail_sound.mp3');
  

  return (
    <div>
      <Header />
      <ModalWindow text={'Congratulations! You won!!!'} open={open} handleClose={handleCloseModalWindow}/>
      <div className={styles.gameWrapper}>
        <CssBaseline />
        <div className={styles.controlsWrapper}>
          <Button type="button" variant="contained" color="primary" onClick={handleStartGame}>
            Старт
          </Button>
        </div>
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
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
