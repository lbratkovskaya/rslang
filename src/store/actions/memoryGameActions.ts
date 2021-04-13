import { Dispatch } from 'redux';
import backendUrl from '../../constants';
import { IWord } from '../types';
import { IMemoryGameCard, MemoryGameTypes } from '../reducers/memoryGameReducer/types';

export const startGame = () => ({
  type: MemoryGameTypes.START_GAME,
});

export const stopGame = () => ({
  type: MemoryGameTypes.STOP_GAME,
});

export const gameFailed = () => ({
  type: MemoryGameTypes.FAILED_GAME,
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

export const hideClickedCards = (processCards: Array<IMemoryGameCard>) => ({
  type: MemoryGameTypes.HIDE_CLICKED_CARDS,
  processCards,
});

export const disableClickedCards = (processCards: Array<IMemoryGameCard>) => ({
  type: MemoryGameTypes.DISABLE_CLICKED_CARDS,
  processCards,
});

export const clearClickedCards = () => ({
  type: MemoryGameTypes.CLEAR_CLICKED_CARDS,
});

export const setWordsVolumeLevel = (value: number) => ({
  type: MemoryGameTypes.SET_WORDS_VOLUME,
  wordsVolume: value,
});

const createCards = (words: Array<IWord>, gameMode: string, gameSize: number) => {
  let result: Array<IMemoryGameCard> = [];
  if (words && words.length) {
    const row = words.map((element) => {
      const mapResult = [
        {
          type: 'text',
          isOpen: false,
          disabled: false,
          value: element.word,
          gameSize,
          id: element.id,
          audio: `${backendUrl}/${element.audio}`,
          isClicked: false,
        },
      ];
      if (gameMode === 'image') {
        mapResult.push({
          type: 'image',
          isOpen: false,
          disabled: false,
          value: element.image,
          id: element.id,
          gameSize,
          audio: `${backendUrl}/${element.audio}`,
          isClicked: false,
        });
      } else {
        mapResult.push({
          type: 'translation',
          isOpen: false,
          disabled: false,
          value: element.wordTranslate,
          gameSize,
          id: element.id,
          audio: `${backendUrl}/${element.audio}`,
          isClicked: false,
        });
      }
      return mapResult;
    });
    result = row.reduce((a, b) => a.concat(b)).sort(() => Math.random() - 0.5);
  }
  return result;
};

export const initiateGameField = (
  gameSize: number,
  gameMode: string,
  isCameFromWordBook: boolean | undefined,
  group: number,
  page: number,
  actualWords: Array<IWord>
) => (dispatch: Dispatch) => {
  dispatch(setIsLoading(true));
  const url = `${backendUrl}/words/?group=${group}&page=${page}`;
  if (!isCameFromWordBook) {
    fetch(url).then((res) => {
      try {
        if (res.status === 200) {
          res.json().then((body) => {
            dispatch(
              setGameField(
                createCards(
                  body.sort(() => Math.random() - 0.5).slice(-gameSize),
                  gameMode,
                  gameSize
                )
              )
            );
          });
        }
        dispatch(setIsLoading(false));
      } catch (e) {
        dispatch(setError(true));
        dispatch(setIsLoading(false));
      }
    });
  } else {
    dispatch(setIsLoading(false));
    const gameWords = actualWords
      .slice(-20)
      .sort(() => Math.random() - 0.5)
      .slice(-gameSize);
    dispatch(setGameField(createCards(gameWords, gameMode, gameSize)));
  }
};

export const updateClickedWords = (currentField: Array<IMemoryGameCard>) => {
  const nonWords = currentField.filter((card) => {
    if (card.type !== 'text') {
      return true;
    }
    return false;
  });

  const words = currentField.filter((card) => {
    if (card.type === 'text') {
      return true;
    }
    return false;
  });

  return words.map((element) => {
    const card = element;
    nonWords.forEach((nonWordCard) => {
      if (card.id === nonWordCard.id && nonWordCard.isClicked === true) {
        card.isClicked = true;
      }
    });
    return card;
  });
};

export const getClickedWordsAsArray = (currentField: Array<IMemoryGameCard>) => {
  const result: Array<string> = [];
  updateClickedWords(currentField).forEach((card) => {
    if (card.isClicked) {
      result.push(card.value);
    }
  });
  return result;
};

export const sendGameStatistic = (
  field: Array<IMemoryGameCard>,
  series: Array<number>,
  token: string,
  userId: string
) => {
  const url = `${backendUrl}/users/${userId}/statistics`;
  const learnedWords = getClickedWordsAsArray(field).length;
  fetch(url, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      learnedWords,
      optional: {
        dateTime: Date.now(),
        miniGame: 'memoryGame',
        wordsCount: field.length / 2,
        totalCorrect: learnedWords,
        seriesCorrect: series.sort((a, b) => b - a)[0],
      },
    }),
  });
};
