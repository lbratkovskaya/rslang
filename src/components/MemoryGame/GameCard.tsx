import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { Card, Typography } from '@material-ui/core';
import {
  disableClickedCards,
  hideClickedCards,
  showGameCard,
} from '../../store/actions/memoryGameActions';
import backendUrl, { GAMES, MEMORY } from '../../constants';
import { IAppState } from '../../store/types';
import { ICardProps } from './types';
import { IMemoryGameCard } from '../../store/reducers/memoryGameReducer/types';
import useStyles from './styles';

const GameCard: React.FC<ICardProps> = (props: ICardProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const clickedCards = useSelector((state: IAppState) => state.memoryGame.clickedCards);
  const isGameStared = useSelector((state: IAppState) => state.memoryGame.isStarted);
  const volume = useSelector((state: IAppState) => state.memoryGame.wordsVolume);

  const handleGameMove = (event: React.SyntheticEvent) => {
    if (!props.disabled && isGameStared) {
      const [currentCardId, cardType] = event.currentTarget.id.split('_');

      const newCard: IMemoryGameCard = {
        id: currentCardId,
        type: cardType,
        value: '',
        isOpen: false,
        disabled: false,
        audio: '',
        gameSize: GAMES.memory.difficulty.easy.value,
        isClicked: false,
      };

      if (!clickedCards.length) {
        dispatch(showGameCard(newCard));
      } else {
        dispatch(showGameCard(newCard));
        const [previousCard] = clickedCards;
        if (previousCard.id === currentCardId) {
          dispatch(disableClickedCards());
        } else {
          setTimeout(() => dispatch(hideClickedCards()), MEMORY.timeShowingCard);
        }
      }
    }
  };

  function handleAutoplay(audio: string) {
    const failPlayer = new Audio(audio);
    failPlayer.volume = volume / 100;
    failPlayer.play();
  }

  const cardStyle = get(classes, `card${props.gameSize}`);
  const cardWithTextStyle = get(classes, `cardWithText${props.gameSize}`);
  const sheetStyle = get(classes, `sheet${props.gameSize}`);

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
          <div className={classes.imageWrapper}>
            <img
              className={props.isOpen ? classes.image : classes.imageNone}
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
          <Typography className={props.isOpen ? classes.text : classes.textNone} component="div">
            {props.value}
          </Typography>
        </Card>
      )}
    </>
  );
};

export default GameCard;
