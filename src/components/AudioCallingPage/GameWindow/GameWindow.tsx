import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import GameAnswer from './GameAnswer';
import GameExitBtn from '../../commonComponents/GameExitBtn/GameExitBtn';
import GameQuestion from './GameQuestion';
import GameTracker from '../../commonComponents/GameTracker/GameTracker';
import VolumeRange from '../../commonComponents/VolumeRange/VolumeRange';
import backendURL, { correctUrl, skipUrl, incorrectUrl, MAX_VOLUME } from '../../../constants';
import {
  putIncorrectToStore,
  putCorrectToStore,
  endGame,
  resetEndGame,
  clickStartGame,
} from '../../../store/actions/audioCallingActions';
import gameMode from '../AudioCallingStartGame/constants';
import { IAppState, IWord } from '../../../store/types';
import useStyles from './styles';

const AudioCallingStartGame: React.FC = () => {
  const btnGrp = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [isAnswer, setIsAnswer] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentArray, setCurrentArray] = useState<IWord[]>([]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentFive, setCurrentFive] = useState<IWord[]>([]);
  const [currentIncorrect, setCurrentIncorrect] = useState('');
  const [animate, setAnimate] = useState(false);
  const location = useLocation();
  const isCameFromWordbook = location.state?.fromWordbook;
  const dispatch = useDispatch();
  const wordBook = useSelector((state: IAppState) => state.wordBook);
  const volume = useSelector((state: IAppState) => state.volumeHandler.volume);
  const audioCallingArray = useSelector((state: IAppState) => state.audioCalling.startArray);
  const soundVolume = useSelector((state: IAppState) => state.settings.soundsVolume);
  const difficulty = useSelector((state: IAppState) => state.settings.gameMode);
  const audio = new Audio();
  const sendCorrect = (words: IWord) => dispatch(putCorrectToStore(words));
  const sendIncorrect = (words: IWord) => dispatch(putIncorrectToStore(words));
  const toggleEndGame = () => dispatch(endGame());
  const toggleResetEndGame = () => dispatch(resetEndGame());
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));
  const sound = new Audio();
  const styles = useStyles();
  const callFinish = () => {
    toggleEndGame();
  };

  const initArray = () => {
    if (isCameFromWordbook) {
      setCurrentArray(audioCallingArray);
    } else {
      setCurrentArray(wordBook.words.slice(0, gameMode[difficulty]));
    }
  };

  const handleExitGame = () => {
    startGame(false);
    toggleResetEndGame();
  };

  const startAnimation = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  const playClickEffect = (url: string) => {
    sound.src = url;
    sound.volume = soundVolume / MAX_VOLUME;
    sound.play();
  };

  const randomizeFiveWords = (): void => {
    setCurrentFive([]);
    const newArr: IWord[] = currentArray
      .slice()
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    if (newArr.find((el) => el.word === currentArray[wordIndex].word)) {
      return setCurrentFive(newArr);
    }
    return randomizeFiveWords();
  };

  const incrementIndex = () => {
    if (wordIndex + 1 !== currentArray.length) {
      audio.pause();
      setWordIndex(wordIndex + 1);
      setIsAnswer(false);
    } else {
      callFinish();
    }
  };

  const clickDontKnow = () => {
    setIsAnswer(true);
    playClickEffect(skipUrl);
    sendIncorrect(currentArray[wordIndex]);
    setCurrentWord(currentArray[wordIndex].word.toLowerCase());
  };

  const getAnswer = (targetVal: string, target: HTMLButtonElement) => {
    const str = targetVal.slice(3, targetVal.length).toLowerCase();
    const find = currentArray?.find((el) => {
      return el.wordTranslate.toLowerCase() === str;
    });
    if (find && find.word === currentArray[wordIndex].word) {
      sendCorrect(currentArray[wordIndex]);
      setCurrentWord(currentArray[wordIndex].word.toLowerCase());
      playClickEffect(correctUrl);
      setIsAnswer(true);
    } else {
      const incorBlock = target;
      incorBlock.className = styles.incorrect;
      sendIncorrect(currentArray[wordIndex]);
      playClickEffect(incorrectUrl);
      setCurrentWord(currentArray[wordIndex].word.toLowerCase());
      setCurrentIncorrect(targetVal.toLowerCase());
      setIsAnswer(true);
    }
  };

  const playSound = () => {
    if (wordIndex !== currentArray.length) {
      audio.src = `${backendURL}/${currentArray[wordIndex].audio}`;
    }
    audio.volume = parseFloat(String(volume));
    audio.play();
  };

  const pressKey = (event: KeyboardEvent) => {
    const truest: any = document.getElementById(event.key);
    const str = truest.innerText;
    getAnswer(str, truest);
  };

  const fix = () => {
    const audioPromise = audio.play();
    if (audioPromise !== undefined) {
      audioPromise.then(() => {
        audio.pause();
        audio.currentTime = 0;
      });
    }
    const soundPromise = sound.play();
    if (soundPromise !== undefined) {
      soundPromise.then(() => {
        sound.pause();
        audio.currentTime = 0;
      });
    }
    window.removeEventListener('keypress', (event: KeyboardEvent) => pressKey(event));
    if (btnGrp.current) {
      Array.from(btnGrp.current.children)?.forEach((el: Element) => {
        el?.setAttribute('class', styles.primary);
      });
    }
  };

  useEffect(() => {
    initArray();
  }, []);

  useEffect(() => {
    if (currentArray.length > 0) {
      randomizeFiveWords();
      window.addEventListener('keypress', (event: KeyboardEvent) => pressKey(event), {
        once: true,
      });
    }
    startAnimation();
    playSound();
    return () => fix();
  }, [wordIndex, currentArray]);

  return (
    <>
      <div className={styles.exitBtn}>
        <VolumeRange />
        <GameExitBtn clickBtn={handleExitGame} />
      </div>
      <div className={styles.gameField}>
        <GameTracker index={(wordIndex + 1) as number} end={currentArray.length as number} />
        {isAnswer ? (
          <GameAnswer
            index={wordIndex}
            increment={incrementIndex}
            track={audio}
            words={currentArray}
          />
        ) : (
          <GameQuestion play={playSound} track={audio} />
        )}
        <div className={animate ? styles.btnHide : styles.btn} ref={btnGrp}>
          {currentFive.map((el: IWord, index: number) => (
            <button
              type="button"
              key={el.word}
              id={String(index + 1)}
              className={
                isAnswer &&
                el.word.toLowerCase() === currentWord &&
                currentIncorrect !== currentWord
                  ? styles.secondary
                  : styles.primary
              }
              onClick={(event) => getAnswer(event.currentTarget.innerText, event.currentTarget)}
              disabled={isAnswer}>
              {`${index + 1}. ${el.wordTranslate}`}
            </button>
          ))}
        </div>
        <Button
          className={styles.MuiSkip}
          variant="contained"
          color="secondary"
          onClick={clickDontKnow}>
          Не знаю
        </Button>
      </div>
    </>
  );
};

export default AudioCallingStartGame;
