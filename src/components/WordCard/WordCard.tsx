import React, { useEffect, useMemo, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import Parser from 'html-react-parser';
import { Typography, Card, Chip } from '@material-ui/core';
import { Done, VolumeUpRounded, StopRounded } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import backendUrl, {
  APPEAR_DURATION,
  APPEAR_STYLE,
  WORDBOOK_GROUPS,
  WORDCARD_APPEAR_GAP,
} from '../../constants';
import { IWordCardProps } from './types';
import useStyles from './styles';
import { IAppState } from '../../store/types';

const WordCard: React.FC<IWordCardProps> = ({ word, index }: IWordCardProps) => {
  const classes = useStyles();
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading } = useSelector((state: IAppState) => state.wordBook);
  const [isImageReady, setImageIsReady] = useState(false);
  const audio = useMemo(() => new Audio(), []);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingAudioIndex, setPlayingAudioIndex] = useState(-1);
  const activeGroup = useSelector((state: IAppState) => state.wordBook.activeGroup);
  const highlightStyle = { color: WORDBOOK_GROUPS[activeGroup].color };

  const transitionStyles: { [key: string]: {} } = {
    entering: { opacity: 0 },
    entered: { opacity: 1 },
    exiting: { opacity: 1 },
    exited: { opacity: 0 },
  };

  const preloadImage = (): void => {
    const img = new Image();
    img.onload = (): void => setImageIsReady(true);
    img.src = `${backendUrl}/${word.image}`;
  };

  const playAudio = (src: string, audioIndex: number) => {
    setIsAudioPlaying(true);
    setPlayingAudioIndex(audioIndex);
    audio.src = `${backendUrl}/${src}`;
    audio.play();
  };

  const handleAudioClick = () => {
    playAudio(word.audio, 0);
    audio.onended = () => {
      playAudio(word.audioMeaning, 1);
      audio.onended = () => {
        playAudio(word.audioExample, 2);
        audio.onended = () => {
          setIsAudioPlaying(false);
          setPlayingAudioIndex(-1);
        };
      };
    };
  };

  const handleStopClick = () => {
    audio.pause();
    setIsAudioPlaying(false);
    setPlayingAudioIndex(-1);
  };

  useEffect(() => {
    const delay = WORDCARD_APPEAR_GAP * index + 250;
    const cardAppearTimeout = setTimeout(() => setIsMounted(true), delay);
    preloadImage();

    return () => {
      clearTimeout(cardAppearTimeout);
      setIsMounted(false);
      handleStopClick();
    };
  }, []);

  const textStyle = {
    word: playingAudioIndex === 0 ? highlightStyle : {},
    meaning: playingAudioIndex === 1 ? highlightStyle : {},
    example: playingAudioIndex === 2 ? highlightStyle : {},
  };

  return (
    <Transition in={isMounted && !isLoading} timeout={APPEAR_DURATION}>
      {(state: TransitionStatus) => (
        <Card className={classes.card} style={{ ...APPEAR_STYLE, ...transitionStyles[state] }}>
          <img
            src={`${backendUrl}/${word.image}`}
            alt={word.word}
            width={240}
            height={160}
            className={classes.image}
            style={isImageReady ? { opacity: 1 } : {}}
          />
          <Typography className={classes.word}>
            <span style={textStyle.word}>{word.word}</span>
            {' — '}
            <span className={classes.wordTranslate}>{word.wordTranslate}</span>
          </Typography>
          <Typography className={classes.transcription}>
            {` ${word.transcription} `}
            <VolumeUpRounded
              onClick={handleAudioClick}
              color={isAudioPlaying ? 'disabled' : 'action'}
              className={classes.icon}
            />
            {isAudioPlaying && (
              <StopRounded onClick={handleStopClick} color="error" className={classes.icon} />
            )}
          </Typography>
          <Typography variant="body2">
            Meaning: <span style={textStyle.meaning}>{Parser(word.textMeaning)}</span>
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.secondary}>
            (Значение: {Parser(word.textMeaningTranslate)})
          </Typography>
          <Typography variant="body2">
            Example: <span style={textStyle.example}>{Parser(word.textExample)}</span>
          </Typography>
          <Typography variant="body2" color="textSecondary" className={classes.secondary}>
            (Пример: {Parser(word.textExampleTranslate)})
          </Typography>
          <Chip
            className={classes.button}
            variant="outlined"
            size="small"
            deleteIcon={<Done />}
            clickable
            label="В сложные"
          />
          <Chip
            className={classes.button}
            variant="outlined"
            size="small"
            deleteIcon={<Done />}
            clickable
            label="В изученные"
          />
        </Card>
      )}
    </Transition>
  );
};

export default WordCard;
