import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import SavannahGamePlay from '../SavannahGamePlay';
import { GameExitBtn, TableEndGame } from '../../../commonComponents';
import {
  clickStartGame,
  reduceArrayWords,
  selectLevel,
  selectRound,
} from '../../../../store/actions/savannahActions';
import { addWordsToUserDictionary } from '../../../../store/actions/dictionaryActions';
import { fetchGameWords } from '../../../../store/actions/gamesActions';
import { SELECT_LEVELS, SELECT_ROUNDS } from '../../constants';
import { IAppState, IUserData, IWord } from '../../../../store/types';
import useStyles from '../../styles';

const SavannahEndGame: React.FC = () => {
  const dispatch = useDispatch();
  const savannahData = useSelector((state: IAppState) => state.savannah);
  const userWords = useSelector((state: IAppState) => [
    ...state.userDictionary.learningWords,
    ...state.userDictionary.deletedWords,
  ]);
  const onReduceArrayWords = (wordsArray: Array<IWord>) =>
    dispatch(reduceArrayWords(wordsArray, userWords));
  const user = useSelector((state: IAppState) => state.user.data);
  const { gameWords } = useSelector((state: IAppState) => state.games);
  const onRandomLevel = (level: number) => dispatch(selectLevel(level));
  const onRandomRound = (round: number) => dispatch(selectRound(round));
  const getGameWords = (groups: number, pages: number) => dispatch(fetchGameWords(groups, pages));
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const sendWordsToUserDictionary = (
    words: Array<{ word: IWord; correct: boolean }>,
    userData: IUserData
  ) => dispatch(addWordsToUserDictionary(words, userData));

  const [isRestart, setIsRestart] = useState(false);

  const group: number = Math.floor(Math.random() * SELECT_LEVELS.amount);
  const page: number = Math.floor(Math.random() * SELECT_ROUNDS.amount);

  useEffect(() => {
    getGameWords(group, page);
  }, []);

  useEffect(() => {
    const arrayForUserDictionary = savannahData.wordsData.map((el) => {
      return {
        word: el.wordObj,
        correct: el.isCorrect,
      };
    });
    return () => {
      if (user.userId) sendWordsToUserDictionary(arrayForUserDictionary, user);
    };
  }, []);

  const handleNewGame = () => {
    onRandomLevel(group);
    onRandomRound(page);
    setIsRestart(true);
    onReduceArrayWords(gameWords);
  };

  const handleExitGame = (): void => {
    startGame(false);
  };

  const classes = useStyles();

  if (!isRestart) {
    return (
      <div>
        <div className={classes.savannahEndGameExit}>
          <GameExitBtn clickBtn={handleExitGame} />
        </div>
        <TableEndGame words={savannahData.wordsData} />
        <Button variant="contained" color="secondary" onClick={handleNewGame}>
          Новая игра
        </Button>
      </div>
    );
  }

  return <SavannahGamePlay />;
};

export default SavannahEndGame;
