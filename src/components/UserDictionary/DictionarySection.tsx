import React from 'react';
import { IDictionarySectionProps } from './types';
import useStyles from './styles';
import UserWordCard from './UserWordCard';

const DictionarySection: React.FC<IDictionarySectionProps> = ({
  words,
}: IDictionarySectionProps) => {
  const classes = useStyles();

  const renderWords = () => {
    return words.map((word, index) => (
      <div key={word.word}>
        <UserWordCard word={word} index={index}/>
      </div>
    ));
  };

  return <div className={classes.section}>{renderWords()}</div>;
};

export default DictionarySection;
