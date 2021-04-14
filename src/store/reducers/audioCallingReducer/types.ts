import { IWord } from '../../types';

export enum AudioCallingActionTypes {
  CHANGE_END_GAME = 'CHANGE_END_GAME',
  PUT_INCORRECT = 'PUT_INCORRECT',
  PUT_CORRECT = 'PUT_CORRECT',
  AUDIO_CALLING_START_GAME = 'AUDIO_CALLING_START_GAME',
  RESET = 'RESET',
  AUDIO_CALLING_SELECT_LEVELS = 'AUDIO_CALLING_SELECT_LEVELS',
  AUDIO_CALLING_SELECT_ROUNDS = 'AUDIO_CALLING_SELECT_ROUNDS',
  AUDIOCALLING_CREATE_ARR = 'AUDIOCALLING_CREATE_ARR',
}

export interface IAudioCallingGameAction {
  type: AudioCallingActionTypes;
  payload: ConcatArray<IWord> | number;
  level: number;
  round: number;
  isEnd: boolean;
  startArray: IWord[];
}

export interface IAudioCallingWords {
  word: IWord;
  isCorrect: boolean;
}

export interface IAudioCallingState {
  startArray: IWord[];
  level: number;
  round: number;
  lang: string;
  words: IAudioCallingWords[];
  isStart: boolean;
  isEnd: boolean;
  levelsQuantity: number;
  roundsQuantity: number;
  wordQuantity: number;
  seriesCounter: number;
  series: number[];
}
