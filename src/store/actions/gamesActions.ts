import { GAMES_WORDS_MAX_AMOUNT } from '../../constants';
import store from '../index';
import { GamesActionTypes, IWord } from '../types';

export const addWordToGamesStore = (word: IWord) => {
  const { words } = store.getState().games;
  const isMaxAmount = words.length >= GAMES_WORDS_MAX_AMOUNT;
  const isAddedBefore = words.find((el) => el.word === word.word);

  if (!isAddedBefore) words.push(word);

  if (isMaxAmount) words.shift();

  return {
    type: GamesActionTypes.ADD_WORD,
    payload: { words },
  };
};

export const deleteWordFromGamesStore = (word: IWord) => {
  const words = store.getState().games.words.filter((el) => el.word !== word.word);

  return {
    type: GamesActionTypes.ADD_WORD,
    payload: { words },
  };
};
