import { IWord, ISavannahWord } from '../types';
import { SavannahActionTypes } from '../reducers/savannahReducer/types';

export function selectLevel(level: number) {
  return {
    type: SavannahActionTypes.SAVANNAH_SELECT_LEVELS,
    payload: { level },
  };
}

export function selectRound(round: number) {
  return {
    type: SavannahActionTypes.SAVANNAH_SELECT_ROUNDS,
    payload: { round },
  };
}

export function switchLang(isEng: boolean) {
  return {
    type: SavannahActionTypes.SAVANNAH_SWITCH_LANG,
    payload: { isEng },
  };
}

export function changeGameMode(mode: string) {
  return {
    type: SavannahActionTypes.SAVANNAH_GAME_MODE,
    payload: { mode },
  };
}

export function clickStartGame(isStart: boolean) {
  return {
    type: SavannahActionTypes.SAVANNAH_START_GAME,
    payload: isStart,
  };
}

export function reduceArrayWords(wordsArray: Array<IWord>) {
  return {
    type: SavannahActionTypes.SAVANNAH_REDUCE_ARR,
    payload: wordsArray
      .sort(() => Math.random() - 0.5)
      .map((el) => {
        return {
          word: el.word,
          wordObj: el,
          translate: el.wordTranslate,
          isCorrect: undefined,
        };
      }),
  };
}

export function onAnswer(wordsArray: Array<ISavannahWord>, word: string, answer: boolean) {
  return {
    type: SavannahActionTypes.SAVANNAH_ANSWER,
    payload: wordsArray.map((el) => {
      if (el.word === word || el.word === word) {
        return {
          ...el,
          word: el.word,
          isCorrect: answer,
        };
      }
      return el;
    }),
  };
}
