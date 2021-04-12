import { MEMORY } from '../../../constants';
import { IMemoryGameAction, IMemoryGameCard, IMemoryGameState, MemoryGameTypes } from './types';

const initialState: IMemoryGameState = {
  cardId: '',
  isStarted: false,
  size: 8,
  isLoading: false,
  words: [],
  field: [],
  error: false,
  clickedCards: [],
  isFailed: false,
  wordsVolume: MEMORY.gameWordsDefaultVolumeLevel,
};

const showCardInField = (currentField: Array<IMemoryGameCard>, newCard: IMemoryGameCard) => {
  return currentField.map((element) => {
    const card = element;
    if (card.id === newCard.id && card.type === newCard.type) {
      card.isOpen = true;
      card.isClicked = true;
      return card;
    }
    return card;
  });
};

const addInClickedCards = (clickedCards: Array<IMemoryGameCard>, newCard: IMemoryGameCard) => {
  const foundCard = clickedCards.find((card) => {
    if (card.id === newCard.id && card.type === newCard.type) {
      return true;
    }
    return false;
  });
  const res = clickedCards;

  if (foundCard === undefined) {
    res.push(newCard);
  }
  return res;
};

const hideClickedCards = (
  currentField: Array<IMemoryGameCard>,
  clickedCards: Array<IMemoryGameCard>
) => {
  // let cardsToClose = clickedCards.length === 2 ? clickedCards : clickedCards.slice(0, -1)
  return currentField.map((element) => {
    const card = element;
    clickedCards.forEach((clickedCard) => {
      if (card.id === clickedCard.id && card.type === clickedCard.type) {
        card.isOpen = false;
      }
    });
    return card;
  });
};

const disableClickedCards = (
  currentField: Array<IMemoryGameCard>,
  clickedCards: Array<IMemoryGameCard>
) => {
  return currentField.map((element) => {
    const card = element;
    clickedCards.forEach((clickedCard) => {
      if (card.id === clickedCard.id && card.type === clickedCard.type) {
        card.disabled = true;
      }
    });
    return card;
  });
};

const getLearnedWords = (currentField: Array<IMemoryGameCard>) => {
  return currentField.filter((card) => {
    if (card.type === 'text' && card.disabled) {
      return true;
    }
    return false;
  });
};

const getUnexploredWords = (currentField: Array<IMemoryGameCard>) => {
  return currentField.filter((card) => {
    if (card.type === 'text' && !card.disabled) {
      return true;
    }
    return false;
  });
};

export default function memoryGameReducer(
  state: IMemoryGameState = initialState,
  action: IMemoryGameAction
) {
  switch (action.type) {
    case MemoryGameTypes.START_GAME:
      return { ...state, isStarted: true };
    case MemoryGameTypes.STOP_GAME:
      return { ...state, isStarted: false, field: [] };
    case MemoryGameTypes.FAILED_GAME:
      return {
        ...state,
        isFailed: true,
        learnedWords: getLearnedWords(state.field),
        unExploredWords: getUnexploredWords(state.field),
      };
    case MemoryGameTypes.SET_GAME_FIELD:
      return { ...state, field: action.field };
    case MemoryGameTypes.UPDATE_GAME_CARD:
      return {
        ...state,
        field: showCardInField(state.field, action.newCard),
        clickedCards: addInClickedCards(state.clickedCards, action.newCard),
      };
    case MemoryGameTypes.HIDE_CLICKED_CARDS:
      return {
        ...state,
        field: hideClickedCards(state.field, action.processCards),
      };
    case MemoryGameTypes.DISABLE_CLICKED_CARDS:
      return {
        ...state,
        field: disableClickedCards(state.field, action.processCards),
      };
    case MemoryGameTypes.CLEAR_CLICKED_CARDS:
      return {
        ...state,
        clickedCards: [],
      };
    case MemoryGameTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.isLoading };
    case MemoryGameTypes.SET_ERROR:
      return { ...state, error: action.error };
    case MemoryGameTypes.SET_WORDS_VOLUME:
      return { ...state, wordsVolume: action.wordsVolume };
    default:
      return state;
  }
}
