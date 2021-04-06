import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Button, Typography } from '@material-ui/core/index';
import SprintGameEnd from './SprintGameEnd';
import Timer from '../../commonComponents/Timer';
import { GameExitBtn } from '../../commonComponents';
import { clickStartGame, onAnswer } from '../../../store/actions/sprintAction';
import { modalTimeout, SPRINT } from '../../../constants';
import { TIME_OUT_DELAY } from '../constants';
import { IAppState, ISprintWords } from '../../../store/types';
import useStyles from '../style';

const SprintGamePlay: React.FC = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const answer = (wordsArray: ISprintWords[], word: string, isAnswer: boolean) =>
    dispatch(onAnswer(wordsArray, word, isAnswer));
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const sprintInfo = useSelector((state: IAppState) => state?.sprint);
  const [randomWord, setRandomWord] = useState('');
  const [classAnswer, setClassAnswer] = useState(classes.answerDefault);
  const [currentWord, setCurrentWord] = useState('');
  const [translateWord, setTranslateWord] = useState('');
  const [timer, setTimer] = useState(SPRINT.timeOutDelay);
  const [selectWord, setSelectWord] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const timeDaleyWord = (): void => {
    setCurrentWord(sprintInfo?.words?.[selectWord]?.word);
    setTranslateWord(sprintInfo?.words?.[selectWord]?.translate);
    setClassAnswer(classes.answerDefault);
    const getRandomTranslate: string =
      sprintInfo?.words?.[Math.floor(Math.random() * sprintInfo.words.length)]?.translate;
    const getCurrentWordTranslate: string = sprintInfo?.words?.[selectWord]?.translate;
    const getRandomArray: Array<string> = [getRandomTranslate, getCurrentWordTranslate];
    const getRandomWord = getRandomArray[Math.floor(Math.random() * getRandomArray.length)];
    setRandomWord(getRandomWord);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (selectWord >= sprintInfo.words.length) {
      setIsEndGame(true);
    }
    const timerClass = setTimeout(() => timeDaleyWord(), TIME_OUT_DELAY);
    return () => clearTimeout(timerClass);
  }, [selectWord]);

  useEffect(() => {
    if (timer === 0) {
      setIsEndGame(true);
    }
    const timeout = setTimeout(() => setTimer(timer - 1), modalTimeout);
    return () => clearTimeout(timeout);
  }, [timer]);

  useEffect(() => {
    return () => startGame(false);
  }, []);

  const onAudioPlay = (url: string): void => {
    const audio = new Audio(url);
    audio.play();
  };

  const handleCheckWord = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { name } = e.currentTarget;
    const isCorrectAnswer: boolean =
      (name === 'false' && translateWord !== randomWord) ||
      (name === 'true' && translateWord === randomWord);
    if (isCorrectAnswer) {
      onAudioPlay(SPRINT.audioTrue);
      setClassAnswer(classes.answerTrue);
      answer(sprintInfo.words, translateWord, true);
    } else {
      onAudioPlay(SPRINT.audioFalse);
      setClassAnswer(classes.answerWrong);
    }
    setIsDisabled(true);
    setSelectWord(selectWord + 1);
  };

  const handleExitGame = () => startGame(false);

  const handleEndGame = (): void => {
    if (timer === 0) setIsEndGame(true);
  };

  const btnComponent = (selectName: string) => {
    return (
      <Button disabled={isDisabled} name={selectName} variant="contained" onClick={handleCheckWord}>
        {selectName === 'true' ? 'ВЕРНО' : 'НЕВЕРНО'}
      </Button>
    );
  };

  if (!isEndGame) {
    return (
      <>
        <div>
          <div className={classes.sprintHeader}>
            <Timer gameTime={timer} handleOnComplite={handleEndGame} size={60} />
            <GameExitBtn clickBtn={handleExitGame} />
          </div>
          <Card className={classAnswer}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom className={classes.sprintSpan}>
                {currentWord}
              </Typography>
              <Typography color="textSecondary" className={classes.sprintSpan}>
                {randomWord}
              </Typography>
            </CardContent>
          </Card>
          <div className={classes.sprintChooseWrapper}>
            {btnComponent('true')}
            {btnComponent('false')}
          </div>
        </div>
      </>
    );
  }
  return <SprintGameEnd />;
};

export default SprintGamePlay;
