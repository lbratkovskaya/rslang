import store from '../index';
import { GAMES_WORDS_MAX_AMOUNT } from '../../constants';
import { GamesActionTypes, IWord } from '../types';

export const addWordToGamesStore = (word: IWord) => {
  const { actualWords } = store.getState().games;
  const isMaxAmount = actualWords.length > GAMES_WORDS_MAX_AMOUNT * 2;
  const isAddedBefore = actualWords.find((el) => el.word === word.word);

  if (!isAddedBefore) actualWords.push(word);
  if (isMaxAmount) actualWords.shift();

  return {
    type: GamesActionTypes.ADD_WORD,
    payload: { actualWords },
  };
};

export const deleteWordFromGamesStore = ({ word }: IWord) => {
  const actualWords = store.getState().games.actualWords.filter((el) => el.word !== word);

  return {
    type: GamesActionTypes.DELETE_WORD,
    payload: { actualWords },
  };
};
