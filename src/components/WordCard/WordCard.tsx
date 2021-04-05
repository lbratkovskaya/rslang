import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, TransitionStatus } from 'react-transition-group';
import Parser from 'html-react-parser';
import { Typography, Card, Chip, useTheme } from '@material-ui/core';
import { Done, VolumeUpRounded, StopRounded } from '@material-ui/icons';
import {
  setUserWordDeleted,
  setUserWordEasy,
  setUserWordHard,
} from '../../store/actions/dictionaryActions';
import { deleteWordFromGamesStore } from '../../store/actions/gamesActions';
import backendUrl, {
  APPEAR_DURATION,
  APPEAR_STYLE,
  WORDBOOK_GROUPS,
  WORDCARD_APPEAR_GAP,
} from '../../constants';
import { IAppState } from '../../store/types';
import { IWordCardButton, IWordCardProps } from './types';
import useStyles, { defaultImageSize, transitionStyles } from './styles';

const WordCard: React.FC<IWordCardProps> = ({
  word,
  index,
  activeGroup,
  isLoading,
  showDeleted,
}: IWordCardProps) => {
  const classes = useStyles();
  const [isMounted, setIsMounted] = useState(false);
  const { data: userData } = useSelector((state: IAppState) => state.user);
  const userDifficultWords = useSelector((state: IAppState) =>
    state.userDictionary.difficultWords.map((el) => el.word)
  );
  const userDeletedWords = useSelector((state: IAppState) =>
    state.userDictionary.deletedWords.map((el) => el.word)
  );
  const { showTranslate, showButtons } = useSelector((state: IAppState) => state.wordBook);
  const [isImageReady, setImageIsReady] = useState(false);
  const audio = useMemo(() => new Audio(), []);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingAudioIndex, setPlayingAudioIndex] = useState(-1);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDifficult, setIsDifficult] = useState(false);
  const { color } = WORDBOOK_GROUPS[activeGroup] || 'rgb(255, 0, 0)';
  const highlightStyle = { color };
  const theme = useTheme();
  const colorOfDifficult = theme.palette.secondary.main;
  const dispatch = useDispatch();

  const textStyle = {
    word: playingAudioIndex === 0 ? highlightStyle : {},
    meaning: playingAudioIndex === 1 ? highlightStyle : {},
    example: playingAudioIndex === 2 ? highlightStyle : {},
  };

  const difficultStyle = {
    filter: isDifficult ? `drop-shadow(0 0 3px ${colorOfDifficult})` : '',
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

  const renderButton = ({ label, altLabel, onClick, param }: IWordCardButton) => (
    <Chip
      className={classes.button}
      variant={param ? 'default' : 'outlined'}
      color={param ? 'secondary' : 'default'}
      size="small"
      deleteIcon={param ? <Done /> : <></>}
      clickable
      label={param ? altLabel : label}
      onClick={onClick}
      onDelete={onClick} // necessary for deleteIcon to be rendered
    />
  );

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

  const handleAddToDifficult = () => {
    if (isDifficult) {
      dispatch(setUserWordEasy(word, userData));
      setIsDifficult(false);
    } else {
      dispatch(setUserWordHard(word, userData));
      setIsDifficult(true);
    }
  };

  const handleDelete = () => {
    dispatch(setUserWordDeleted(word, userData));
    dispatch(deleteWordFromGamesStore(word));

    setIsMounted(false);
    setTimeout(() => {
      setIsDeleted(true);
    }, APPEAR_DURATION);
  };

  const renderMainParagraph = (title: string, content: string, className: {}) => (
    <Typography variant="body2">
      {title}: <span style={className}>{Parser(content)}</span>
    </Typography>
  );

  const renderParagraph = (title: string, content: string) => (
    <Typography variant="body2" color="textSecondary" className={classes.secondary}>
      {title}: {Parser(content)}
    </Typography>
  );

  const renderWordTranslate = showTranslate && (
    <span className={classes.wordTranslate}>{` — ${word.wordTranslate}`}</span>
  );

  useEffect(() => {
    const delay = WORDCARD_APPEAR_GAP * index;
    const cardAppearTimeout = setTimeout(() => setIsMounted(true), delay);
    preloadImage();

    if (userDifficultWords.includes(word.word)) setIsDifficult(true);
    if (userDeletedWords.includes(word.word)) setIsDeleted(true);

    return () => {
      clearTimeout(cardAppearTimeout);
      setIsMounted(false);
      handleStopClick();
    };
  }, []);

  return (
    <Transition in={isMounted && !isLoading} timeout={APPEAR_DURATION} unmountOnExit>
      {(state: TransitionStatus) => (
        <>
          {(!isDeleted || showDeleted) && (
            <Card
              className={classes.card}
              style={{ ...APPEAR_STYLE, ...difficultStyle, ...transitionStyles[state] }}>
              <img
                src={`${backendUrl}/${word.image}`}
                alt={word.word}
                width={defaultImageSize.width}
                height={defaultImageSize.height}
                className={classes.image}
                style={isImageReady ? { opacity: 1 } : {}}
              />
              <Typography className={classes.word}>
                <span style={textStyle.word}>{word.word}</span>
                {renderWordTranslate}
              </Typography>
              <Typography className={classes.transcription}>
                {` ${word.transcription} `}
                <VolumeUpRounded
                  onClick={handleAudioClick}
                  color={isAudioPlaying ? 'disabled' : 'action'}
                  className={classes.icon}
                />
                {isAudioPlaying && (
                  <StopRounded
                    onClick={handleStopClick}
                    color="secondary"
                    className={classes.icon}
                  />
                )}
              </Typography>
              {renderMainParagraph('Meaning', word.textMeaning, textStyle.meaning)}
              {showTranslate && renderParagraph('Значение', word.textMeaningTranslate)}
              {renderMainParagraph('Example', word.textExample, textStyle.example)}
              {showTranslate && renderParagraph('Пример', word.textExampleTranslate)}
              {showButtons &&
                renderButton({
                  label: 'Добавить в сложные',
                  altLabel: 'Добавлено в сложные',
                  onClick: handleAddToDifficult,
                  param: isDifficult,
                })}
              {showButtons &&
                renderButton({
                  label: 'В удалённые',
                  altLabel: 'Удалено',
                  onClick: handleDelete,
                  param: isDeleted,
                })}
            </Card>
          )}
        </>
      )}
    </Transition>
  );
};

export default WordCard;
