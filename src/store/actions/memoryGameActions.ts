import { Dispatch } from 'redux';
import backendUrl from '../../constants';
import { MemoryGameTypes } from '../reducers/memoryGameReducer/types';
import { IWord } from '../types';

export const setIsGameStarted = (isStarted: boolean) => ({
  type: MemoryGameTypes.START_GAME,
  isStarted,
});

// export const setLivesQuantity = (lives: number) => ({
//   type: MemoryGameTypes.SET_LIVES_QUANTITY,
//   lives: lives,
// });

export const setWords = (words: Array<IWord>) => ({
  type: MemoryGameTypes.SET_WORDS,
  words,
});

export const setGameSize = (size: number) => ({
  type: MemoryGameTypes.SET_GAME_SIZE,
  size,
});

export const setError = (error: boolean) => ({
  type: MemoryGameTypes.SET_ERROR,
  error,
});

export const setIsLoading = (isLoading: boolean) => ({
  type: MemoryGameTypes.SET_IS_LOADING,
  isLoading,
});

export const fetchMemoryGameWords = (gameSize: number = 6) => (dispatch: Dispatch) => {
  const url = `${backendUrl}/words/?random=true&count=${gameSize}`;

  fetch(url).then((res) => {
    try {
      if (res.status === 200) {
        res.json().then((body) => {
          dispatch(setWords(body));
        });
      }
    } catch(e) {
      dispatch(setError(true));
    }
  });
};
