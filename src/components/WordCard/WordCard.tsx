import React from 'react';
import Parser from 'html-react-parser';
import { Typography, Card, Chip } from '@material-ui/core';
import { Done, VolumeUpRounded } from '@material-ui/icons';
import backendUrl from '../../consts';
import { IWordCardProps } from './types';
import useStyles from './styles';

const WordCard: React.FC<IWordCardProps> = ({ word }: IWordCardProps) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <img
        src={`${backendUrl}/${word.image}`}
        alt={word.word}
        width={240}
        height={160}
        className={classes.image}
      />
      <Typography className={classes.word}>
        {`${word.word} — `}
        <span className={classes.wordTranslate}>{word.wordTranslate}</span>
      </Typography>
      <Typography className={classes.transcription}>
        {` ${word.transcription} `}
        <VolumeUpRounded className={classes.icon} />
      </Typography>
      <Typography variant="body2">Meaning: {Parser(word.textMeaning)}</Typography>
      <Typography variant="body2" color="textSecondary" className={classes.secondary}>
        (Значение: {Parser(word.textMeaningTranslate)})
      </Typography>
      <Typography variant="body2">Example: {Parser(word.textExample)}</Typography>
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
  );
};

export default WordCard;
