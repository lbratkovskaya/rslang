import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import Header from '../Header';
import Footer from '../Footer';
import { fetchDictionary } from '../../store/actions/dictionaryActions';
import { ICombinedState, IWord } from '../../store/types';
import styles from './styles';

const Dictionary: React.FC = () => {
  const dictionary = useSelector((state: ICombinedState) => state.dictionary);
  const dispatch = useDispatch();
  const classes = makeStyles(() => styles)();

  const getDictionary = () => dispatch(fetchDictionary());

  useEffect(() => {
    getDictionary();
  }, []);

  const renderWords = () =>
    dictionary.words.map((word: IWord) => (
      <Typography className={classes.text} key={word.word}>
        {word.textMeaningTranslate}
      </Typography>
    ));

  return (
    <>
      <Header />
      <main>
        <Typography variant="h5">Dictionary</Typography>
        {renderWords()}
      </main>
      <Footer />
    </>
  );
};

export default Dictionary;
