import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import {
  disableClickedCards,
  hideClickedCards,
  showGameCard,
} from '../../store/actions/memoryGameActions';
import { IAppState } from '../../store/types';
import { ICardProps } from './types';
import backendUrl from '../../constants';
import { IMemoryGameCard } from '../../store/reducers/memoryGameReducer/types';

const GameCard: React.FC<ICardProps> = (props: ICardProps) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const clickedCards = useSelector((state: IAppState) => state.memoryGame.clickedCards);

  const handleGameMove = (event: React.SyntheticEvent) => {
    const [currentCardId, cardType] = event.currentTarget.id.split('_');

    const newCard: IMemoryGameCard = {
      id: currentCardId,
      type: cardType,
      value: '',
      isOpen: false,
      disabled: false,
    };

    // Клик по превой карточке
    if (!clickedCards.length) {
      // Переворачиваем
      dispatch(showGameCard(newCard));
    } else {
      // Клик по второй карточке
      dispatch(showGameCard(newCard));
      const [previousCard, _] = clickedCards;
      if (previousCard.id === currentCardId) {
        // обе карточки делаем disabled ...
        setTimeout(() => dispatch(disableClickedCards()), 500);
      } else {
        // Переворачиваем карточки обратно рубашкой вверх
        setTimeout(() => dispatch(hideClickedCards()), 500);
      }
    }
  };

  return (
    <>
      {props.type === 'image' ? (
        <Card
          className={props.isOpen ? styles.card : styles.sheet}
          id={props.id}
          onClick={handleGameMove}>
          <div className={styles.imageWrapper}>
            <img
              className={props.isOpen ? styles.image : styles.imageNone}
              src={`${backendUrl}/${props.value}`}
            />
          </div>
        </Card>
      ) : (
        <Card
          className={props.isOpen ? styles.cardWithText : styles.sheet}
          id={props.id}
          onClick={handleGameMove}>
          <Typography className={props.isOpen ? styles.text : styles.textNone} component="div">
            {props.value}
          </Typography>
        </Card>
      )}
    </>
  );
};

export default GameCard;
