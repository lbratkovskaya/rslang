import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button, ThemeProvider, Typography } from '@material-ui/core';
import { GameSelect, LangSwitcher } from '../../commonComponents';
import {
  checkChangeTimer,
  clickStartGame,
  reduceArrayWords,
  selectLevel,
  selectRound,
  switchLang,
} from '../../../store/actions/sprintAction';
import { fetchDictionary } from '../../../store/actions/dictionaryActions';
import { fetchWords } from '../../../store/actions/wordBookActions';
import { MAX_LENGTH_GAME_ARR, SELECT_ROUNDS } from '../constants';
import { GAMES, WORDBOOK_GROUPS } from '../../../constants';
import { IAppState, IWord } from '../../../store/types';
import useStyles, { theme } from '../style';

const StartGameSprint: React.FC = () => {
  const wordBook = useSelector((state: IAppState) => state.wordBook);
  const sprintInfo = useSelector((state: IAppState) => state.sprint);
  const userData = useSelector((state: IAppState) => state.user.data);
  const { actualWords } = useSelector((state: IAppState) => state.games);
  const { gameMode } = useSelector((state: IAppState) => state.settings);

  const dispatch = useDispatch();
  const setLevel = (level: number) => dispatch(selectLevel(level));
  const setRound = (round: number) => dispatch(selectRound(round));
  const setTimer = (changeTimer: number) => dispatch(checkChangeTimer(changeTimer));
  const getWords = (group: number, page: number) => dispatch(fetchWords(group, page));
  const onClickStartGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const onReduceArrayWords = (wordsArray: IWord[]) => dispatch(reduceArrayWords(wordsArray));
  const switchLanguage = (isEng: boolean) => dispatch(switchLang(isEng));
  const getDictionaryWords = () => dispatch(fetchDictionary(userData));

  const location = useLocation();
  const isCameFromWordbook = location.state?.fromWordbook;

  const page: number = sprintInfo.round;
  const group: number = sprintInfo.level;

  useEffect(() => {
    getWords(group, page);
    switch (gameMode) {
      case 'easy': {
        setTimer(GAMES.sprint.difficulty.easy.value);
        break;
      }
      case 'normal': {
        setTimer(GAMES.sprint.difficulty.normal.value);
        break;
      }
      case 'hard': {
        setTimer(GAMES.sprint.difficulty.hard.value);
        break;
      }
      default: {
        setTimer(GAMES.sprint.difficulty.easy.value);
      }
    }
  }, [group, page]);

  const handleChange = (value: string | number): void => {
    setLevel(Number(value));
  };

  const handleStartGame = (): void => {
    if (isCameFromWordbook) {
      const lastActualWords = actualWords.slice(-MAX_LENGTH_GAME_ARR);
      onReduceArrayWords(lastActualWords);
    } else {
      const randomPage = Math.floor(Math.random() * SELECT_ROUNDS.amount) % SELECT_ROUNDS.amount;
      setRound(randomPage);
      onReduceArrayWords(wordBook?.words);
    }
    onClickStartGame(true);
  };

  const handleSwitchLang = (check: boolean): void => {
    switchLanguage(check);
  };

  const classes = useStyles();

  useEffect(() => {
    getDictionaryWords();
  }, []);

  return (
    <>
      <div className={classes.sprintHeader}>
        <div className={classes.sprintMenuSettings}>
          <GameSelect
            changeSelectFc={handleChange}
            selectData={WORDBOOK_GROUPS}
            selectName="Уровень"
            disabled={isCameFromWordbook}
            value={sprintInfo.level}
          />
          <LangSwitcher isLang={sprintInfo.isEng} handleSwitch={handleSwitchLang} />
        </div>
      </div>
      <div className={classes.sprintRules}>
        <Typography variant="h1" component="h2" gutterBottom>
          {GAMES.sprint.title}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Тренировка &laquo;Спринт&raquo; помогает укрепить изученный материал.
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          Чтобы выбрать ответ используйте клавиши &#8592; &#8594; или клик мыши
        </Typography>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStartGame}
            className={classes.buttonMain}>
            Начать пробежку
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
};

export default StartGameSprint;
