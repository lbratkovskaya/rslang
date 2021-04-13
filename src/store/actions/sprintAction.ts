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

export function clickStartGame(isStartGame: boolean) {
  return {
    type: SprintActionTypes.SPRINT_START_GAME,
    payload: { isStartGame },
  };
}

export function checkChangeTimer(changeTimer: number) {
  return {
    type: SprintActionTypes.SPRINT_CHANGE_TIMER,
    payload: { changeTimer },
  };
}

export function reduceArrayWords(wordsArray: IWord[]) {
  return {
    type: SprintActionTypes.SPRINT_REDUCE_ARR,
    payload: wordsArray
      .sort(() => Math.random() - 0.5)
      .map((el) => {
        return {
          isCorrect: false,
          word: el,
        };
      }),
  };
}

export function onAnswer(wordsArray: ISprintWords[], word: string, answer: boolean) {
  return {
    type: SprintActionTypes.SPRINT_ANSWER,
    payload: wordsArray.map((el) => {
      if (el.word.word === word || el.word.wordTranslate === word) {
        return {
          isCorrect: answer,
          word: el.word,
        };
      }
      return el;
    }),
  };
}
