import { Dispatch } from 'redux';
import backendUrl from '../../constants';
import { IMemoryGameCard, MemoryGameTypes } from '../reducers/memoryGameReducer/types';
import { IWord } from '../types';

export const startGame = () => ({
  type: MemoryGameTypes.START_GAME,
});

export const stopGame = () => ({
  type: MemoryGameTypes.STOP_GAME,
});

export const setError = (error: boolean) => ({
  type: MemoryGameTypes.SET_ERROR,
  error,
});

export const setIsLoading = (isLoading: boolean) => ({
  type: MemoryGameTypes.SET_IS_LOADING,
  isLoading,
});

export const setGameField = (field: Array<IMemoryGameCard>) => ({
  type: MemoryGameTypes.SET_GAME_FIELD,
  field,
});

export const showGameCard = (newCard: IMemoryGameCard) => ({
  type: MemoryGameTypes.UPDATE_GAME_CARD,
  newCard,
});

export const hideClickedCards = () => ({
  type: MemoryGameTypes.HIDE_CLICKED_CARDS,
});

export const disableClickedCards = () => ({
  type: MemoryGameTypes.DISABLE_CLICKED_CARDS,
});

const createCards = (words: Array<IWord>, gameMode: string, gameSize: number) => {
  let result: Array<IMemoryGameCard> = [];
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  if (words && words.length) {
    const row = words.map((element) => {
      const mapResult = [
        {
          type: 'text',
          isOpen: false,
          disabled: false,
          value: element.word,
          gameSize,
          id: element._id,
          audio: `${backendUrl}/${element.audio}`,
        },
      ];
      if (gameMode === 'image') {
        mapResult.push({
          type: 'image',
          isOpen: false,
          disabled: false,
          value: element.image,
          id: element._id,
          gameSize,
          audio: `${backendUrl}/${element.audio}`,
        });
      } else {
        mapResult.push({
          type: 'translation',
          isOpen: false,
          disabled: false,
          value: element.wordTranslate,
          gameSize,
          id: element._id,
          audio: `${backendUrl}/${element.audio}`,
        });
      }
      return mapResult;
    });
    result = row.reduce((a, b) => a.concat(b)).sort(() => Math.random() - 0.5);
  }
  return result;
};

export const initiateGameField = (gameSize: number, gameMode: string) => (dispatch: Dispatch) => {
  const url = `${backendUrl}/words/?random=true&count=${gameSize}`;

  fetch(url).then((res) => {
    try {
      if (res.status === 200) {
        res.json().then((body) => {
          dispatch(setGameField(createCards(body, gameMode, gameSize)));
        });
      }
    } catch (e) {
      dispatch(setError(true));
    }
  });
};
