import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Typography, Avatar } from '@material-ui/core';

import backendURL, { playIcon } from '../../../../constants';
import IAnswerProps from './types';
import { IAppState } from '../../../../store/types';
import useStyles from './styles';

const GameAnswer: React.FC<IAnswerProps> = (props: IAnswerProps) => {
  const volume = useSelector((state: IAppState) => state.volumeHandler.volume);
  const audio = props.track;
  const styles = useStyles();

  useEffect(() => {
    audio.volume = volume;
  }, [volume]);

  return (
    <div className={styles.moreInfo}>
      <Avatar src={`${backendURL}/${props.words[props.index].image}`} className={styles.large} />
      <div className={styles.soundInfo}>
        <button
          type="button"
          className={styles.fab}
          onClick={() => {
            audio.src = `${backendURL}/${props.words[props.index].audio}`;
            audio.play();
          }}>
          <img src={playIcon} className={styles.img} alt="play" />
        </button>
        <Typography className={styles.typo}>
          {`${props.words[props.index].word} - ${props.words[props.index].transcription}`}
        </Typography>
      </div>
      <div className={styles.soundInfo}>
        <button
          className={styles.fab}
          type="button"
          onClick={() => {
            audio.src = `${backendURL}/${props.words[props.index].audioExample}`;
            audio.play();
          }}>
          <img src={playIcon} className={styles.img} alt="play" />
        </button>
        <Typography className={styles.typo}>
          <span dangerouslySetInnerHTML={{ __html: props.words[props.index].textExample }} />
        </Typography>
      </div>
      <Button onClick={props.increment} color="secondary" variant="contained">
        {props.index < props.words.length - 1 ? 'ДАЛЬШЕ' : 'КОНЕЦ'} &#10132;
      </Button>
    </div>
  );
};

export default GameAnswer;
