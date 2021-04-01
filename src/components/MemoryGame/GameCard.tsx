import React from 'react';
import { Card, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import useStyles from './styles';
import {
  disableClickedCards,
  hideClickedCards,
  showGameCard,
} from '../../store/actions/memoryGameActions';
import { IAppState } from '../../store/types';
import { ICardProps } from './types';
import backendUrl, { MEMORY } from '../../constants';

import { IMemoryGameCard } from '../../store/reducers/memoryGameReducer/types';

const GameCard: React.FC<ICardProps> = (props: ICardProps) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const clickedCards = useSelector((state: IAppState) => state.memoryGame.clickedCards);

  const handleGameMove = (event: React.SyntheticEvent) => {
    if(!props.disabled) {
      const [currentCardId, cardType] = event.currentTarget.id.split('_');

      const newCard: IMemoryGameCard = {
        id: currentCardId,
        type: cardType,
        value: '',
        isOpen: false,
        disabled: false,
        audio: '',
        gameSize: MEMORY.Easy,
      };

      if (!clickedCards.length) {
        dispatch(showGameCard(newCard));
      } else {
        dispatch(showGameCard(newCard));
        const [previousCard, _] = clickedCards;
        if (previousCard.id === currentCardId) {
          setTimeout(() => dispatch(disableClickedCards()), MEMORY.timeShowingCard);
        } else {
          setTimeout(() => dispatch(hideClickedCards()), MEMORY.timeShowingCard);
        }
      }
    }
  };

  function handleAutoplay(audio: string) {
    const failPlayer = new Audio(audio);
    failPlayer.play();
  }

  let cardStyle = get(styles, `card${props.gameSize}`);
  let cardWithTextStyle = get(styles, `cardWithText${props.gameSize}`);

  const sheetStyle = get(styles, `sheet${props.gameSize}`);

  return (
    <>
      {props.type === 'image' ? (
        <Card
          className={props.isOpen ? cardStyle : sheetStyle}
          id={props.id}
          onClick={(event) => {
            handleGameMove(event);
            if (!props.disabled) {
              handleAutoplay(props.audio);
              dispatch(disableClickedCards);
            }
          }}>
          <div className={styles.imageWrapper}>
            <img
              className={props.isOpen ? styles.image : styles.imageNone}
              src={`${backendUrl}/${props.value}`}
              draggable="false"
              alt="картинка"
            />
          </div>
        </Card>
      ) : (
        <Card
          className={props.isOpen ? cardWithTextStyle : sheetStyle}
          id={props.id}
          onClick={(event) => {
            handleGameMove(event);
            if (!props.disabled) {
              handleAutoplay(props.audio);
              dispatch(disableClickedCards);
            }
          }}>
          <Typography className={props.isOpen ? styles.text : styles.textNone} component="div">
            {props.value}
          </Typography>
        </Card>
      )}
    </>
  );
};

export default GameCard;
