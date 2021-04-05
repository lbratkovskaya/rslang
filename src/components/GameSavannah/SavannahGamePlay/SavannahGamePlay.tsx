import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Favorite } from '@material-ui/icons';
import SavannahEndGame from './SavannahEndGame';
import { GameExitBtn } from '../../commonComponents';
import { clickStartGame, onAnswer } from '../../../store/actions/savannahActions';
import { SAVANNAH, VOLUME_DIVIDER } from '../../../constants';
import { IAppState, ISavannahWord } from '../../../store/types';
import useStyles from '../styles';

const SavannahGamePlay: React.FC = () => {
  const savannahData = useSelector((state: IAppState) => state?.savannah);
  const soundsVolume = useSelector((state: IAppState) => state.settings.soundsVolume);

  const dispatch = useDispatch();
  const answer = (wordsArray: Array<ISavannahWord>, word: string, isAnswer: boolean) =>
    dispatch(onAnswer(wordsArray, word, isAnswer));
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));

  const [animate, setAnimate] = useState(false);
  const [isEndGame, setIsEndGame] = useState(false);
  const [filteredArr, setFilteredArr] = useState([] as Array<ISavannahWord>);
  const [startWord, setStartWord] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [health, setHealth] = useState(SAVANNAH.health);
  const currentWord = savannahData.isEng
    ? savannahData?.words?.[startWord]?.word
    : savannahData?.words?.[startWord]?.translate;

  const classes = useStyles();

  const timeOutFunc = (): void => {
    const answersArray: Array<ISavannahWord> = savannahData?.words
      .filter((el) => (savannahData.isEng ? el?.word : el?.translate) !== currentWord)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .concat([savannahData?.words?.[startWord]])
      .sort(() => Math.random() - 0.5);
    setAnimate(false);
    setFilteredArr(answersArray);
  };

  useEffect(() => {
    const checkEndGame = (startWord >= savannahData?.words.length && !isEndGame) || health === 0;
    if (checkEndGame) {
      setIsEndGame(true);
      setAnimate(true);
    }
    const timeout = setTimeout(() => timeOutFunc(), SAVANNAH.timeOutDelay);
    return () => clearTimeout(timeout);
  }, [startWord]);

  const onAudioPlay = (url: string): void => {
    const audio = new Audio(url);
    audio.volume = soundsVolume / VOLUME_DIVIDER;
    audio.play();
  };

  const handleAnimationEnd = (): void => {
    onAudioPlay(SAVANNAH.audioIncorrect);
    setAnimate(true);
    setIsCorrectAnswer(false);
    setStartWord(startWord + 1);
    setHealth(health - 1);
  };

  const handleCheckAnswer = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const { name } = e.currentTarget;
    const matchCheck = currentWord.toLocaleLowerCase() === name.toLocaleLowerCase();
    if (matchCheck) {
      onAudioPlay(SAVANNAH.audioCorrect);
      setIsCorrectAnswer(true);
      answer(savannahData.words, currentWord, true);
    } else {
      onAudioPlay(SAVANNAH.audioIncorrect);
      setIsCorrectAnswer(false);
      setHealth(health - 1);
    }
    setStartWord(startWord + 1);
    setAnimate(true);
  };

  const handleStyleSpan = (el: ISavannahWord): string => {
    const matchCheck = savannahData?.words?.[startWord - 1]?.word === el?.word;
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

  const renderChooseWord = (
    <div className={classes.savannahChooseWrapper}>
      {filteredArr?.map((el: ISavannahWord) => (
        <button
          type="button"
          onClick={handleCheckAnswer}
          name={savannahData.isEng ? el?.word : el?.translate}
          key={el?.word}
          className={animate ? handleStyleSpan(el) : ''}
          disabled={animate}>
          {savannahData.isEng ? el?.translate : el?.word}
        </button>
      ))}
    </div>
  );

  const renderFallingWords = () => {
    const classAnimate = !animate ? ` ${classes.savannahWordFall}` : '';
    return (
      <span className={`${classes.fallenWord}${classAnimate}`} onAnimationEnd={handleAnimationEnd}>
        {savannahData.isEng
          ? savannahData?.words?.[startWord]?.word
          : savannahData?.words?.[startWord]?.translate}
      </span>
    );
  };

  if (!isEndGame) {
    const isRenderingFallingWords =
      savannahData.words && savannahData.words.length - 1 > 0 && !animate;
    const isFooterImgAnimation = !animate ? ` ${classes.footerImgAnimate}` : '';
    return (
      <>
        <div className={classes.savannahHeader}>
          {renderHealth}
          {savannahData.isStartGame && <GameExitBtn clickBtn={handleExitGame} />}
        </div>
        {isRenderingFallingWords && renderFallingWords()}
        {renderChooseWord}
        <div className={classes.savannahFooter}>
          <img
            className={`${classes.footerImg}${isFooterImgAnimation}`}
            src={!isCorrectAnswer ? SAVANNAH.sadImg : SAVANNAH.winkImg}
            alt=""
          />
        </div>
      </>
    );
  }
  return <SavannahEndGame />;
};

export default SavannahGamePlay;
