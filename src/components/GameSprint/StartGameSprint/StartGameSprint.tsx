import { Button, ThemeProvider, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clickStartGame,
  reduceArrayWords,
  selectLevel,
  selectRound,
} from '../../../store/actions/sprintAction';
import { fetchWords } from '../../../store/actions/wordBookActions';
import useStyles, { theme } from '../style';
import { SELECT_ROUNDS } from '../constants';
import { IAppState, IWord } from '../../../store/types';
import { GameSelect } from '../../commonComponents';
import { WORDBOOK_GROUPS } from '../../../constants';

const StartGameSprint: React.FC = () => {
  const dispatch = useDispatch();
  const setLevel = (level: number) => dispatch(selectLevel(level));
  const setRound = (round: number) => dispatch(selectRound(round));
  const getDictionary = (group: number, page: number) => dispatch(fetchWords(group, page));
  const getDictionaryWords = useSelector((state: IAppState) => state.wordBook);
  const sprintInfo = useSelector((state: IAppState) => state.sprint);
  const onClickStartGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const onReduceArrayWords = (wordsArray: IWord[]) => dispatch(reduceArrayWords(wordsArray));

  const page: number = sprintInfo.round;
  const group: number = sprintInfo.level;

  useEffect(() => {
    getDictionary(group, page);
  }, [group, page]);

  const handleChange = (value: string | number) => {
    setLevel(Number(value));
  };

  const handleStartGame = () => {
    const randomPage = Math.floor(Math.random() * SELECT_ROUNDS.amount) % SELECT_ROUNDS.amount;
    setRound(randomPage);
    onReduceArrayWords(getDictionaryWords?.words);
    onClickStartGame(true);
  };

  const classes = useStyles();

  return (
    <>
      <div>
        <div>
          <GameSelect
            changeSelectFc={handleChange}
            selectData={WORDBOOK_GROUPS}
            selectName="Уровень"
          />
        </div>
      </div>
      <div className={classes.sprintRules}>
        <Typography variant="h1" component="h2" gutterBottom>
          Спринт
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Тренировка Спринт помогает укрепить изученный материал.
        </Typography>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="primary" size="large" onClick={handleStartGame}>
            Начать пробежку
          </Button>
        </ThemeProvider>
      </div>
    </>
  );
};

export default StartGameSprint;
