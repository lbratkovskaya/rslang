import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, ThemeProvider, Typography } from '@material-ui/core';
import { GameSelect, LangSwitcher } from '../../commonComponents';
import {
  selectLevel,
  selectRound,
  clickStartGame,
  reduceArrayWords,
  switchLang,
} from '../../../store/actions/savannahActions';
import { fetchWords } from '../../../store/actions/wordBookActions';
import { fetchDictionary } from '../../../store/actions/dictionaryActions';
import { MAX_LENGTH_GAME_ARR, SELECT_ROUNDS } from '../constants';
import { WORDBOOK_GROUPS } from '../../../constants';
import { IAppState, IWord } from '../../../store/types';
import useStyles, { theme } from '../styles';

const SavannahStartWindow: React.FC = () => {
  const userData = useSelector((state: IAppState) => state.user?.data);
  const savannahData = useSelector((state: IAppState) => state.savannah);
  const wordBook = useSelector((state: IAppState) => state.wordBook);
  const userWords = useSelector((state: IAppState) => [
    ...state.userDictionary.learningWords,
    ...state.userDictionary.deletedWords,
  ]);
  const { actualWords } = useSelector((state: IAppState) => state.games);

  const dispatch = useDispatch();
  const setSelectLevel = (level: number) => dispatch(selectLevel(level));
  const setSelectRound = (round: number) => dispatch(selectRound(round));
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const getWords = (groups: number, pages: number) => dispatch(fetchWords(groups, pages));

  const getDictionaryWords = () => dispatch(fetchDictionary(userData));
  const onReduceArrayWords = (wordsArray: Array<IWord>) =>
    dispatch(reduceArrayWords(wordsArray, userWords));
  const switchLanguage = (isLang: boolean) => dispatch(switchLang(isLang));

  const location = useLocation();
  const isCameFromWordbook = location.state?.fromWordbook;

  const page: number = savannahData.round;
  const group: number = savannahData.level;

  const classes = useStyles();

  const handleChange = (value: string | number): void => {
    setSelectLevel(Number(value));
  };
  const handleStartGame = (): void => {
    if (isCameFromWordbook) {
      const cutActualWords = actualWords.slice(-MAX_LENGTH_GAME_ARR);
      onReduceArrayWords(cutActualWords);
    } else {
      const randomPage = Math.floor(Math.random() * SELECT_ROUNDS.amount) % SELECT_ROUNDS.amount;
      setSelectRound(randomPage);
      onReduceArrayWords(wordBook?.words);
    }
    getWords(group, page);
    startGame(true);
  };

  const handleSwitchLang = (checked: boolean): void => {
    switchLanguage(checked);
  };

  useEffect(() => {
    getWords(group, page);
  }, [group, page]);

  useEffect(() => {
    getDictionaryWords();
  }, []);

  return (
    <>
      <div className={classes.savannahHeader}>
        <div className={classes.savannahMenuSettings}>
          <GameSelect
            changeSelectFc={handleChange}
            selectData={WORDBOOK_GROUPS}
            selectName="Уровень"
            disabled={isCameFromWordbook}
            value={group}
          />
          <LangSwitcher isLang={savannahData.isEng} handleSwitch={handleSwitchLang} />
        </div>
      </div>
      <div className={classes.savannahRules}>
        <Typography variant="h1" component="h2" gutterBottom>
          Саванна
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Тренировка Саванна развивает словарный запас.
        </Typography>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" size="large" onClick={handleStartGame}>
            Начать игру
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
};

export default SavannahStartWindow;
