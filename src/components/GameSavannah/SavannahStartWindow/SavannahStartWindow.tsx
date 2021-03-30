import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { SELECT_ROUNDS } from '../constants';
import { WORDBOOK_GROUPS } from '../../../constants';
import { IAppState, IWord } from '../../../store/types';
import useStyles, { theme } from '../styles';

const SavannahStartWindow: React.FC = () => {
  const dispatch = useDispatch();
  const setSelectLevel = (level: number) => dispatch(selectLevel(level));
  const setSelectRound = (round: number) => dispatch(selectRound(round));
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const getWords = (groups: number, pages: number) => dispatch(fetchWords(groups, pages));
  const onReduceArrayWords = (wordsArray: Array<IWord>) => dispatch(reduceArrayWords(wordsArray));
  const switchLanguage = (isLang: boolean) => dispatch(switchLang(isLang));
  const savannahData = useSelector((state: IAppState) => state.savannah);
  const wordBook = useSelector((state: IAppState) => state.wordBook);

  const page: number = savannahData.round;
  const group: number = savannahData.level;

  const classes = useStyles();

  useEffect(() => {
    getWords(group, page);
  }, [group, page]);

  const handleChange = (value: string | number) => {
    setSelectLevel(Number(value));
  };
  const handleStartGame = () => {
    const randomPage = Math.floor(Math.random() * SELECT_ROUNDS.amount + 1) % SELECT_ROUNDS.amount;
    setSelectRound(randomPage);
    onReduceArrayWords(wordBook?.words);
    startGame(true);
  };

  const handleSwitchLang = (checked: boolean) => {
    switchLanguage(checked);
  };

  return (
    <>
      <div className={classes.savannahHeader}>
        <div className={classes.savannahMenuSettings}>
          <GameSelect
            changeSelectFc={handleChange}
            selectData={WORDBOOK_GROUPS}
            selectName="Уровень"
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
