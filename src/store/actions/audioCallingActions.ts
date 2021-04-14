import { IWord } from '../types';
import { AudioCallingActionTypes } from '../reducers/audioCallingReducer/types';

export function selectLevel(value: number) {
  return {
    type: AudioCallingActionTypes.AUDIO_CALLING_SELECT_LEVELS,
    level: value,
  };
}

export function selectRound(value: number) {
  return {
    type: AudioCallingActionTypes.AUDIO_CALLING_SELECT_ROUNDS,
    round: value,
  };
}

export const putIncorrectToStore = (word: IWord) => ({
  type: AudioCallingActionTypes.PUT_INCORRECT,
  payload: { wordObj: word, isCorrect: false, translate: word.wordTranslate, word: word.word },
});

export const putCorrectToStore = (word: IWord) => ({
  type: AudioCallingActionTypes.PUT_CORRECT,
  payload: { wordObj: word, isCorrect: true, translate: word.wordTranslate, word: word.word },
});

export const resetWordsToStartNewGame = () => ({
  type: AudioCallingActionTypes.RESET,
  payload: { word: [] },
});

export const endGame = () => ({
  type: AudioCallingActionTypes.CHANGE_END_GAME,
  isEnd: true,
});

export const resetEndGame = () => ({
  type: AudioCallingActionTypes.CHANGE_END_GAME,
  isEnd: false,
});

export function clickStartGame(isStart: boolean) {
  return {
    type: AudioCallingActionTypes.AUDIO_CALLING_START_GAME,
    payload: isStart,
  };
}

export function createArrayWords(wordsArray: Array<IWord>) {
  return {
    type: AudioCallingActionTypes.AUDIOCALLING_CREATE_ARR,
    startArray: wordsArray.slice().sort(() => Math.random() - 0.5),
  };
}
