import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Button, Typography } from '@material-ui/core/index';
import SprintGameEnd from './SprintGameEnd';
import Timer from '../../commonComponents/Timer';
import { GameExitBtn } from '../../commonComponents';
import { clickStartGame, onAnswer } from '../../../store/actions/sprintAction';
import { modalTimeout, SPRINT, VOLUME_DIVIDER } from '../../../constants';
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
  const { changeTimer } = useSelector((state: IAppState) => state.sprint);
  const soundsVolume = useSelector((state: IAppState) => state.settings.soundsVolume);

  const [randomWord, setRandomWord] = useState('');
  const [classAnswer, setClassAnswer] = useState(classes.answerDefault);
  const [currentWord, setCurrentWord] = useState('');
  const [translateWord, setTranslateWord] = useState('');
  const [timer, setTimer] = useState(changeTimer);
  const [selectWord, setSelectWord] = useState(0);
  const [isEndGame, setIsEndGame] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const timeDaleyWord = (): void => {
    const currentWordDependingOnLang = sprintInfo.isEng
      ? sprintInfo?.wordsData?.[selectWord]?.word.word
      : sprintInfo?.wordsData?.[selectWord]?.word.wordTranslate;
    const currentTranslateDependingOnLang = sprintInfo.isEng
      ? sprintInfo?.wordsData?.[selectWord]?.word.wordTranslate
      : sprintInfo?.wordsData?.[selectWord]?.word.word;
    setCurrentWord(currentWordDependingOnLang);
    setTranslateWord(currentTranslateDependingOnLang);
    setClassAnswer(classes.answerDefault);
    const randomIndex: number = Math.floor(Math.random() * sprintInfo.wordsData.length);
    const getRandomTranslate: string = sprintInfo.isEng
      ? sprintInfo?.wordsData?.[randomIndex]?.word.wordTranslate
      : sprintInfo?.wordsData?.[randomIndex]?.word.word;
    const getRandomArray: Array<string> = [getRandomTranslate, currentTranslateDependingOnLang];
    const getRandomWord = getRandomArray[Math.floor(Math.random() * getRandomArray.length)];
    setRandomWord(getRandomWord);
    setIsDisabled(false);
  };

  useEffect(() => {
    if (selectWord >= sprintInfo.wordsData.length) {
      setIsEndGame(true);
    }
    const timerClass = setTimeout(() => timeDaleyWord(), TIME_OUT_DELAY);
    return () => clearTimeout(timerClass);
  }, [selectWord]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let timeout: NodeJS.Timeout;
    if (timer === 0) {
      setIsEndGame(true);
    } else {
      timeout = setTimeout(() => {
        setTimer(timer - 1);
      }, modalTimeout);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [timer]);

  useEffect(() => {
    return () => {
      startGame(false);
    };
  }, []);

  const onAudioPlay = (url: string): void => {
    const audio = new Audio(url);
    audio.volume = soundsVolume / VOLUME_DIVIDER;
    audio.play();
  };

  const onCheckAnswer = (word: string): void => {
    if (!randomWord || !translateWord) return;
    const isCorrectAnswer: boolean =
      (word === 'false' && translateWord !== randomWord) ||
      (word === 'true' && translateWord === randomWord);
    if (isCorrectAnswer) {
      onAudioPlay(SPRINT.audioTrue);
      setClassAnswer(classes.answerTrue);
      answer(sprintInfo.wordsData, translateWord, true);
    } else {
      onAudioPlay(SPRINT.audioFalse);
      setClassAnswer(classes.answerWrong);
      answer(sprintInfo.wordsData, translateWord, false);
    }
    setIsDisabled(true);
    setSelectWord(selectWord + 1);
  };

  const handleCheckWord = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { name } = e.currentTarget;
    onCheckAnswer(name);
  };

  const handleExitGame = (): void => {
    startGame(false);
  };

  const handleEndGame = (): void => {
    setIsEndGame(true);
  };

  const handleKeyboardAnswer = (e: KeyboardEvent) => {
    if (isDisabled) return;
    switch (e.keyCode) {
      case 37:
        onCheckAnswer('true');
        break;
      case 39:
        onCheckAnswer('false');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardAnswer);
    return () => {
      window.removeEventListener('keydown', handleKeyboardAnswer);
    };
  }, [timer, isDisabled]);

  const btnComponent = (selectName: string) => {
    return (
      <Button disabled={isDisabled} name={selectName} variant="contained" onClick={handleCheckWord}>
        {selectName === 'true' ? 'ВЕРНО' : 'НЕВЕРНО'}
      </Button>
    );
  };

  return (
    <div>
      {!isEndGame ? (
        <>
          <div className={classes.sprintHeader}>
            <Timer gameTime={changeTimer} handleOnComplite={handleEndGame} size={60} />
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
        </>
      ) : (
        <SprintGameEnd />
      )}
    </div>
  );
};

export default SprintGamePlay;
