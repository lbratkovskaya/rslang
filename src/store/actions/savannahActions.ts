import { IWord, ISavannahWord, IUserWord } from '../types';
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

export function clickStartGame(isStart: boolean) {
  return {
    type: SavannahActionTypes.SAVANNAH_START_GAME,
    payload: isStart,
  };
}

export function reduceArrayWords(wordsArray: Array<IWord>, userWords: Array<IUserWord>) {
  return {
    type: SavannahActionTypes.SAVANNAH_REDUCE_ARR,
    payload: wordsArray
      .sort(() => Math.random() - 0.5)
      .map((el) => {
        // eslint-disable-next-line no-underscore-dangle
        const userWord = userWords.find((uw) => (uw.id || uw._id) === el.id);
        return {
          word: el.word,
          wordObj: userWord || el,
          translate: el.wordTranslate,
          isCorrect: false,
        };
      }),
  };
}

export function onAnswer(wordsArray: Array<ISavannahWord>, word: string, answer: boolean) {
  return {
    type: SavannahActionTypes.SAVANNAH_ANSWER,
    payload: wordsArray.map((el) => {
      if (el.word === word || el.translate === word) {
        return {
          ...el,
          isCorrect: answer,
        };
      }
      return el;
    }),
  };
}
