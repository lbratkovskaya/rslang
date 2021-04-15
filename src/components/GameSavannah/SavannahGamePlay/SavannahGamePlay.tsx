import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Favorite } from '@material-ui/icons';
import SavannahEndGame from './SavannahEndGame';
import { GameExitBtn } from '../../commonComponents';
import GameTracker from '../../commonComponents/GameTracker';
import { clickStartGame, onAnswer } from '../../../store/actions/savannahActions';
import { addGameStatistics } from '../../../store/actions/statisticsActions';
import { SAVANNAH, VOLUME_DIVIDER } from '../../../constants';
import { KEYBOARD_CODE } from '../constants';
import { IAppState, IGameName, ISavannahWord } from '../../../store/types';
import useStyles from '../styles';

const SavannahGamePlay: React.FC = () => {
  const savannahData = useSelector((state: IAppState) => state?.savannah);
  const soundsVolume = useSelector((state: IAppState) => state.settings.soundsVolume);
  const userData = useSelector((state: IAppState) => state.user?.data);
  const userDictionary = useSelector((state: IAppState) => state.userDictionary);
  const userWords = [...userDictionary.learningWords, ...userDictionary.deletedWords];
  const userWordsWords = userWords.map((uw) => uw.word);

  const dispatch = useDispatch();
  const answer = (wordsArray: Array<ISavannahWord>, word: string, isAnswer: boolean) =>
    dispatch(onAnswer(wordsArray, word, isAnswer));
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));

  const saveGameStatistics = (wordsArray: Array<ISavannahWord>, maxSuccessSeries: number) => {
    const correctTotal = wordsArray.filter((word) => word.isCorrect).length;
    const newLearned = wordsArray.filter((word) => userWordsWords.indexOf(word.word) === -1);
    dispatch(
      addGameStatistics(
        userData,
        IGameName.SAVANNAH,
        newLearned.length,
        wordsArray.length,
        correctTotal,
        maxSuccessSeries
      )
    );
  };

  const [animate, setAnimate] = useState(false);
  const [isEndGame, setIsEndGame] = useState(false);
  const [filteredArr, setFilteredArr] = useState([] as Array<ISavannahWord>);
  const [startWord, setStartWord] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [health, setHealth] = useState(SAVANNAH.health);
  const currentWord = savannahData.isEng
    ? savannahData?.wordsData?.[startWord]?.word
    : savannahData?.wordsData?.[startWord]?.translate;
  const isAudioAnswer = startWord >= savannahData?.wordsData.length - 1 || health === 1;

  const classes = useStyles();

  const [currentSuccessSeries, setCurrentSuccessSeries] = useState(0);
  const [successSeriesMaxLength, setSuccessSeriesMaxLength] = useState(0);

  const timeOutFunc = (): void => {
    const answersArray: Array<ISavannahWord> = savannahData?.wordsData
      .filter((el) => (savannahData.isEng ? el?.word : el?.translate) !== currentWord)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .concat([savannahData?.wordsData?.[startWord]])
      .sort(() => Math.random() - 0.5);
    setAnimate(false);
    setFilteredArr(answersArray);
  };

  const onAudioPlay = (url: string): void => {
    const audio = new Audio(url);
    audio.volume = soundsVolume / VOLUME_DIVIDER;
    audio.play();
  };

  useEffect(() => {
    return () => {
      startGame(false);
    };
  }, []);

  useEffect(() => {
    if (isEndGame) {
      saveGameStatistics(
        savannahData?.wordsData,
        Math.max(currentSuccessSeries, successSeriesMaxLength)
      );
    }
  }, [isEndGame]);

  useEffect(() => {
    const checkEndGame =
      (startWord >= savannahData?.wordsData.length && !isEndGame) || health === 0;
    if (checkEndGame) {
      setIsEndGame(true);
      setAnimate(true);
    }
    if (health === 0) {
      onAudioPlay(SAVANNAH.finishAudioFail);
    }
    if (health > 0 && isEndGame) {
      onAudioPlay(SAVANNAH.finishAudioWin);
    }
    const timeout = setTimeout(() => timeOutFunc(), SAVANNAH.timeOutDelay);
    return () => {
      clearTimeout(timeout);
    };
  }, [startWord]);

  const handleAnimationEnd = (): void => {
    onAudioPlay(SAVANNAH.audioIncorrect);
    setAnimate(true);
    setIsCorrectAnswer(false);
    answer(savannahData.wordsData, currentWord, false);
    setStartWord(startWord + 1);
    setHealth(health - 1);
    answer(savannahData.wordsData, currentWord, false);
    setSuccessSeriesMaxLength(Math.max(currentSuccessSeries, successSeriesMaxLength));
    setCurrentSuccessSeries(0);
  };

  const checkAnswer = (word: string) => {
    if (!currentWord) return;
    const matchCheck = currentWord.toLocaleLowerCase() === word.toLocaleLowerCase();
    if (matchCheck) {
      if (!isAudioAnswer) onAudioPlay(SAVANNAH.audioCorrect);
      setIsCorrectAnswer(true);
      answer(savannahData.wordsData, currentWord, true);
      setCurrentSuccessSeries(currentSuccessSeries + 1);
    } else {
      if (!isAudioAnswer) onAudioPlay(SAVANNAH.audioIncorrect);
      answer(savannahData.wordsData, currentWord, false);
      setIsCorrectAnswer(false);
      answer(savannahData.wordsData, currentWord, false);
      setHealth(health - 1);
      setCurrentSuccessSeries(0);
      setSuccessSeriesMaxLength(Math.max(currentSuccessSeries, successSeriesMaxLength));
    }
    setStartWord(startWord + 1);
    setAnimate(true);
  };

  const handleClickCheckAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { name } = e.currentTarget;
    checkAnswer(name);
  };

  const handleKeyboardAnswer = (e: KeyboardEvent) => {
    if (Object.values(KEYBOARD_CODE).includes(e.keyCode) && !animate) {
      const codeIndex = Object.values(KEYBOARD_CODE).indexOf(e.keyCode);
      const transmittedWord = savannahData.isEng
        ? filteredArr[codeIndex].word
        : filteredArr[codeIndex].translate;
      checkAnswer(transmittedWord);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardAnswer);
    return () => {
      window.removeEventListener('keydown', handleKeyboardAnswer);
    };
  }, [filteredArr, animate]);

  const handleStyleSpan = (el: ISavannahWord): string => {
    const matchCheck = savannahData?.wordsData?.[startWord - 1]?.word === el?.word;
    return matchCheck ? classes.answerTrue : classes.answerWrong;
  };

  const handleExitGame = (): void => {
    startGame(false);
  };

  const renderHealth = (
    <div>
      {Array.from(Array(health).keys()).map((el: number) => (
        <Favorite color="secondary" key={el.toString()} />
      ))}
    </div>
  );

  const renderChooseWord = () => {
    if (startWord >= savannahData.wordsData.length || health === 0) {
      return setIsEndGame(true);
    }
    return (
      <div className={classes.savannahChooseWrapper}>
        {filteredArr?.map((el: ISavannahWord) => (
          <button
            type="button"
            onClick={handleClickCheckAnswer}
            name={savannahData.isEng ? el?.word : el?.translate}
            key={el?.word}
            className={animate ? handleStyleSpan(el) : ''}
            disabled={animate}>
            {savannahData.isEng ? el?.translate : el?.word}
          </button>
        ))}
      </div>
    );
  };

  const renderFallingWords = () => {
    const classAnimate = !animate ? ` ${classes.savannahWordFall}` : '';
    return (
      <span className={`${classes.fallenWord}${classAnimate}`} onAnimationEnd={handleAnimationEnd}>
        {savannahData.isEng
          ? savannahData?.wordsData?.[startWord]?.word
          : savannahData?.wordsData?.[startWord]?.translate}
      </span>
    );
  };

  if (!isEndGame) {
    const isRenderingFallingWords =
      savannahData.wordsData && savannahData.wordsData.length - 1 > 0 && !animate;
    const isFooterImgAnimation = !animate ? ` ${classes.footerImgAnimate}` : '';
    return (
      <>
        <div className={classes.savannahHeader}>
          {renderHealth}
          {savannahData.isStartGame && <GameExitBtn clickBtn={handleExitGame} />}
        </div>
        {isRenderingFallingWords && renderFallingWords()}
        {renderChooseWord()}
        <div className={classes.savannahFooter}>
          <GameTracker index={startWord + 1} end={savannahData.wordsData.length} />
          {startWord > 0 && (
            <img
              className={`${classes.footerImg}${isFooterImgAnimation}`}
              src={!isCorrectAnswer ? SAVANNAH.sadImg : SAVANNAH.winkImg}
              alt=""
            />
          )}
        </div>
      </>
    );
  }
  return <SavannahEndGame />;
};

export default SavannahGamePlay;
