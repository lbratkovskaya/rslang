import { IWord, ISprintWords } from '../types';
import { SprintActionTypes } from '../reducers/sprintReducer/types';

export function selectLevel(level: number) {
  return {
    type: SprintActionTypes.SPRINT_SELECT_LEVELS,
    payload: { level },
  };
}

export function selectRound(round: number) {
  return {
    type: SprintActionTypes.SPRINT_SELECT_ROUNDS,
    payload: { round },
  };
}

export function switchLang(isEng: boolean) {
  return {
    type: SprintActionTypes.SPRINT_SWITCH_LANG,
    payload: { isEng },
  };
}

export function clickStartGame(isStart: boolean) {
  return {
    type: SprintActionTypes.SPRINT_START_GAME,
    payload: isStart,
  };
}

export function reduceArrayWords(wordsArray: IWord[]) {
  return {
    type: SprintActionTypes.SPRINT_REDUCE_ARR,
    payload: wordsArray
      .sort(() => Math.random() - 0.5)
      .map((el) => {
        return {
          word: el.word,
          translate: el.wordTranslate,
          isCorrect: false,
          wordAudio: el.audio,
        };
      }),
  };
}

export function onAnswer(wordsArray: ISprintWords[], word: string, answer: boolean) {
  return {
    type: SprintActionTypes.SPRINT_ANSWER,
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
