import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState, ISprintWords } from '../../../store/types';
import { modalTimeout, SPRINT } from '../../../constants';
import { clickStartGame, onAnswer } from '../../../store/actions/sprintAction';
import useStyles from '../style';
import SprintGameEnd from './SprintGameEnd';
import { TIME_OUT_DELAY } from '../constants';
import { GameExitBtn } from '../../commonComponents';

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
  const [timer, setTimer] = useState(1000);
  // SPRINT.timeOutDelay
  const [selectWord, setSelectWord] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const timeDaleyWord = () => {
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

  const onAudioPlay = (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const handleCheckWord = (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleExitGame = () => {
    startGame(false);
  };

  if (!isEndGame) {
    return (
      <>
        <div>
          <div className={classes.sprintHeader}>
            {timer}
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
            <Button
              disabled={isDisabled ? true : isDisabled}
              name="true"
              variant="contained"
              onClick={handleCheckWord}>
              Верно
            </Button>
            <Button
              disabled={isDisabled ? true : isDisabled}
              name="false"
              variant="contained"
              onClick={handleCheckWord}>
              Неверно
            </Button>
          </div>
        </div>
      </>
    );
  }
  return <SprintGameEnd />;
};

export default SprintGamePlay;
