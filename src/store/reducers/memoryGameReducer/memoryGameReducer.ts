import { IMemoryGameState, IMemoryGameAction, MemoryGameTypes, IMemoryGameCard } from './types';

const initialState: IMemoryGameState = {
  cardId: '',
  isStarted: false,
  size: 8,
  isLoading: false,
  words: [],
  field: [],
  error: false,
  clickedCards: [],
};

const showCardInField = (currentField: Array<IMemoryGameCard>, newCard: IMemoryGameCard) => {
  return currentField.map((card) => {
    if (card.id === newCard.id && card.type === newCard.type) {
      card.isOpen = true;
      return card;
    }
    return card;
  });
};

const hideClickedCards = (
  currentField: Array<IMemoryGameCard>,
  clickedCards: Array<IMemoryGameCard>
) => {
  return currentField.map((card) => {
    for (const clickedCard of clickedCards) {
      if (card.id === clickedCard.id && card.type === clickedCard.type) {
        card.isOpen = false;
        return card;
      }
    }
    return card;
  });
};

const disableClickedCards = (
  currentField: Array<IMemoryGameCard>,
  clickedCards: Array<IMemoryGameCard>
) => {
  return currentField.map((card) => {
    for (const clickedCard of clickedCards) {
      if (card.id === clickedCard.id && card.type === clickedCard.type) {
        card.disabled = true;
        return card;
      }
    }
    return card;
  });
};

export default function memoryGameReducer(
  state: IMemoryGameState = initialState,
  action: IMemoryGameAction
) {
  switch (action.type) {
    case MemoryGameTypes.START_GAME:
      return { ...state, cardId: '', isStarted: true };
    case MemoryGameTypes.STOP_GAME:
      return { ...state, cardId: '', isStarted: false };
    case MemoryGameTypes.SET_GAME_FIELD:
      return { ...state, field: action.field };
    case MemoryGameTypes.UPDATE_GAME_CARD:
      return {
        ...state,
        field: showCardInField(state.field, action.newCard),
        clickedCards: state.clickedCards.concat(action.newCard),
      };
    case MemoryGameTypes.HIDE_CLICKED_CARDS:
      return {
        ...state,
        field: hideClickedCards(state.field, state.clickedCards),
        clickedCards: [],
      };
    case MemoryGameTypes.DISABLE_CLICKED_CARDS:
      return {
        ...state,
        field: disableClickedCards(state.field, state.clickedCards),
        clickedCards: [],
      };
    case MemoryGameTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case MemoryGameTypes.SET_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
