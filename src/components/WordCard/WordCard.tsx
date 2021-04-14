import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, TransitionStatus } from 'react-transition-group';
import Parser from 'html-react-parser';
import { Typography, Card, Chip, useTheme, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { Done, VolumeUpRounded, StopRounded, ChevronLeft } from '@material-ui/icons';
import {
  setUserWordDeleted,
  setUserWordEasy,
  setUserWordHard,
  deleteUserWord,
} from '../../store/actions/dictionaryActions';
import { deleteWordFromGamesStore } from '../../store/actions/gamesActions';
import backendUrl, {
  APPEAR_DURATION,
  APPEAR_STYLE,
  WORDBOOK_GROUPS,
  WORDCARD_APPEAR_GAP,
} from '../../constants';
import { IAppState, IUserWord, IWord } from '../../store/types';
import { IWordCardButton, IWordCardProps } from './types';
import useStyles, { defaultImageSize, transitionStyles } from './styles';

const WordCard: React.FC<IWordCardProps> = ({
  word,
  index,
  activeGroup,
  isLoading,
  showDeleted,
  removeOnDifficultyChange,
}: IWordCardProps) => {
  const classes = useStyles();
  const [isMounted, setIsMounted] = useState(false);
  const { data: userData } = useSelector((state: IAppState) => state.user);
  const isUserLoggedIn = useSelector((state: IAppState) => state.user.isLoggedIn);
  const userDifficultWords = useSelector((state: IAppState) =>
    state.userDictionary.difficultWords.map((el) => el.word)
  );
  const userDeletedWords = useSelector((state: IAppState) =>
    state.userDictionary.deletedWords.map((el) => el.word)
  );
  const userWords =
    useSelector((state: IAppState) =>
      state.userDictionary.learningWords?.reduce((acc, el) => {
        Object.assign(acc, { [el.word]: el });
        return acc;
      }, {} as { [key: string]: IUserWord })
    ) || {};
  const { showTranslate, showButtons } = useSelector((state: IAppState) => state.wordBook);
  const [isImageReady, setImageIsReady] = useState(false);
  const audio = useMemo(() => new Audio(), []);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [playingAudioIndex, setPlayingAudioIndex] = useState(-1);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isDifficult, setIsDifficult] = useState(false);
  const [restoreAnchor, setRestoreAnchor] = useState<null | HTMLElement>(null);
  const { color } = WORDBOOK_GROUPS[activeGroup] || 'rgb(255, 0, 0)';
  const highlightStyle = { color };
  const theme = useTheme();
  const colorOfDifficult = theme.palette.secondary.main;
  const dispatch = useDispatch();

  const { deletedWords } = useSelector((state: IAppState) => state.userDictionary);
  const isInDeletedWords = deletedWords.map((el: IWord) => el.word).includes(word.word);

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

  const playAudio = (src: string, audioIndex: number): void => {
    setIsAudioPlaying(true);
    setPlayingAudioIndex(audioIndex);
    audio.src = `${backendUrl}/${src}`;
    audio.play();
  };

  const renderButton = ({
    label,
    altLabel,
    title,
    altTitle,
    clickable,
    onClick,
    param,
  }: IWordCardButton): JSX.Element => {
    const userTitle = param ? altTitle : title;
    const chipTitle = isUserLoggedIn ? userTitle : 'Авторизуйтесь, чтобы воспользоваться функцией';
    return (
      <>
        <Tooltip title={chipTitle} placement="bottom">
          <Chip
            className={`${classes.button} ${!isUserLoggedIn && classes.buttonInactive}`}
            variant={param ? 'default' : 'outlined'}
            color={param ? 'secondary' : 'default'}
            size="small"
            deleteIcon={param ? <Done /> : <></>}
            clickable={clickable}
            label={param ? altLabel : label}
            onClick={clickable ? onClick : undefined}
            onDelete={clickable ? onClick : undefined} // necessary for deleteIcon to be rendered
          />
        </Tooltip>
      </>
    );
  };

  const handleAudioClick = (): void => {
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

  const handleStopClick = (): void => {
    audio.pause();
    setIsAudioPlaying(false);
    setPlayingAudioIndex(-1);
  };

  const handleAddToDifficult = (): void => {
    if (isDifficult) {
      dispatch(setUserWordEasy(word, userData));
      setIsDifficult(false);
    } else {
      dispatch(setUserWordHard(word, userData));
      setIsDifficult(true);
    }
    if (removeOnDifficultyChange) {
      setIsMounted(false);
    }
  };

  const handleDelete = (): void => {
    if (isDeleted) {
      return;
    }
    dispatch(setUserWordDeleted(word, userData, !isDeleted));
    dispatch(deleteWordFromGamesStore(word));
    setIsMounted(false);
    setTimeout(() => {
      setIsDeleted(true);
    }, APPEAR_DURATION);
  };

  const handleRestoreClick = (event: React.MouseEvent<HTMLElement>): void => {
    setRestoreAnchor(event.currentTarget);
  };

  const handleRestoreClose = (): void => {
    setRestoreAnchor(null);
  };

  const handleKeepInDictionary = (): void => {
    handleRestoreClose();
    dispatch(setUserWordDeleted(word, userData, !isDeleted));
    setIsMounted(false);
    setTimeout(() => {
      setIsDeleted(true);
    }, APPEAR_DURATION);
  };

  const handleRemoveFromDictionary = (): void => {
    handleRestoreClose();
    dispatch(deleteUserWord(word, userData));
    setIsMounted(false);
    setTimeout(() => {
      setIsDeleted(true);
    }, APPEAR_DURATION);
  };

  const renderMainParagraph = (title: string, content: string, className: {}): JSX.Element => (
    <Typography variant="body2">
      {title}: <span style={className}>{Parser(content)}</span>
    </Typography>
  );

  const renderParagraph = (title: string, content: string): JSX.Element => (
    <Typography variant="body2" color="textSecondary" className={classes.secondary}>
      {title}: {Parser(content)}
    </Typography>
  );

  const wordTranslateComponent = showTranslate && (
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

  useEffect(() => {
    setIsDeleted(isInDeletedWords);
  }, [isInDeletedWords]);

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
                {wordTranslateComponent}
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
                !isDeleted &&
                renderButton({
                  label: 'Добавить в сложные',
                  altLabel: 'Добавлено в сложные',
                  title: 'Добавить слово в список сложных слов',
                  altTitle: 'Удалить слово из списка сложных слов',
                  clickable: isUserLoggedIn,
                  onClick: handleAddToDifficult,
                  param: isDifficult,
                })}
              {showButtons &&
                renderButton({
                  label: 'В удалённые',
                  altLabel: 'Удалено',
                  title: 'Переместить слово в удалённые',
                  altTitle: '',
                  clickable: isUserLoggedIn && !isDeleted,
                  onClick: handleDelete,
                  param: isDeleted,
                })}
              {showButtons && isUserLoggedIn && isDeleted && (
                <>
                  <Chip
                    aria-controls="simple-menu"
                    className={classes.button}
                    variant="outlined"
                    color="default"
                    size="small"
                    clickable
                    label="Восстановить"
                    onClick={handleRestoreClick}
                  />
                  <Menu
                    id="simple-menu"
                    anchorEl={restoreAnchor}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    getContentAnchorEl={null}
                    keepMounted
                    open={Boolean(restoreAnchor)}
                    onClose={handleRestoreClose}>
                    <MenuItem onClick={handleRemoveFromDictionary}>Удалить из словаря</MenuItem>
                    <MenuItem onClick={handleKeepInDictionary}>Оставить в словаре</MenuItem>
                  </Menu>
                </>
              )}
              {userWords[word.word]?.userWord && (
                <div className={classes.heatsPanel}>
                  <ChevronLeft className={classes.chevron} />
                  <Typography className={classes.successHeats}>
                    Попаданий: {userWords[word.word]?.userWord?.optional.successHeats || 0}
                  </Typography>
                  <Typography className={classes.errorHeats}>
                    Промахов: {userWords[word.word]?.userWord?.optional.errorHeats || 0}
                  </Typography>
                </div>
              )}
            </Card>
          )}
        </>
      )}
    </Transition>
  );
};

export default WordCard;
