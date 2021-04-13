import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, ThemeProvider, Typography } from '@material-ui/core';
import { GameMode, GameSelect, LangSwitcher } from '../../commonComponents';
import {
  selectLevel,
  selectRound,
  clickStartGame,
  reduceArrayWords,
  switchLang,
  changeGameMode,
} from '../../../store/actions/savannahActions';
import {
  changeCountDown,
  fetchExtraWords,
  fetchGameWords,
} from '../../../store/actions/gamesActions';
import { fetchDictionary } from '../../../store/actions/dictionaryActions';
import { SELECT_ROUNDS } from '../constants';
import { EXTRA_WORDS_FOR_GAMES, GAMES, WORDBOOK_GROUPS } from '../../../constants';
import { IAppState, IWord } from '../../../store/types';
import useStyles, { theme } from '../styles';

const SavannahStartWindow: React.FC = () => {
  const savannahData = useSelector((state: IAppState) => state.savannah);
  const { gameWords, isLoading } = useSelector((state: IAppState) => state.games);
  const { actualWords } = useSelector((state: IAppState) => state.games);
  const { extraWords } = useSelector((state: IAppState) => state.games);
  const userData = useSelector((state: IAppState) => state.user?.data);

  const location = useLocation();
  const isCameFromWordbook = location.state?.fromWordbook;

  const dispatch = useDispatch();
  const setSelectLevel = (level: number) => dispatch(selectLevel(level));
  const setSelectRound = (round: number) => dispatch(selectRound(round));
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const getGameWords = (groups: number, pages: number) => dispatch(fetchGameWords(groups, pages));
  const getExtraWords = (value: number) => dispatch(fetchExtraWords(value));
  const onReduceArrayWords = (wordsArray: Array<IWord>) => dispatch(reduceArrayWords(wordsArray));
  const changeMode = (mode: string) => dispatch(changeGameMode(mode));
  const switchLanguage = (isLang: boolean) => dispatch(switchLang(isLang));
  const countDownStart = (isCount: boolean) => dispatch(changeCountDown(isCount));
  const getUserDictionary = () => dispatch(fetchDictionary(userData));

  const page: number = savannahData.round;
  const group: number = savannahData.level;
  const extraWordsValue: number = EXTRA_WORDS_FOR_GAMES;

  const classes = useStyles();

  const handleChange = (value: string | number): void => {
    setSelectLevel(Number(value));
  };

  const handleStartGame = (): void => {
    const currentMode = savannahData.mode;
    let wordCount = 0;
    switch (currentMode) {
      case 'easy':
        wordCount = GAMES.savannah.difficulty.easy.value;
        break;
      case 'normal':
        wordCount = GAMES.savannah.difficulty.normal.value;
        break;
      default:
        wordCount = GAMES.savannah.difficulty.hard.value;
        break;
    }
    if (isCameFromWordbook) {
      const cutActualWords = extraWords.concat(actualWords)?.slice(-wordCount);

      onReduceArrayWords(cutActualWords);
    } else {
      const randomPage = Math.floor(Math.random() * SELECT_ROUNDS.amount) % SELECT_ROUNDS.amount;
      const wordsForGame =
        currentMode === 'hard'
          ? extraWords.concat(gameWords)?.slice(-wordCount)
          : gameWords.slice(wordCount);

      setSelectRound(randomPage);
      onReduceArrayWords(wordsForGame);
    }
    countDownStart(true);
    startGame(true);
  };

  const handleSwitchLang = (checked: boolean): void => {
    switchLanguage(checked);
  };

  useEffect(() => {
    getGameWords(group, page);
  }, [group, page]);

  useEffect(() => {
    getExtraWords(extraWordsValue);
  }, [extraWordsValue]);

  useEffect(() => {
    getUserDictionary();
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
          <GameMode changeModeFc={changeMode} />
        </div>
      </div>
      <div className={classes.savannahRules}>
        <Typography variant="h1" component="h2" gutterBottom>
          {GAMES.savannah.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Тренировка Саванна развивает словарный запас.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Чтобы выбрать ответ используйте клавиши 1, 2, 3, 4 или клик мыши
        </Typography>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={isLoading}
            onClick={handleStartGame}>
            Начать игру
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
};

export default SavannahStartWindow;
