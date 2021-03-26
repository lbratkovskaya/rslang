import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import Header from '../Header';
import Footer from '../Footer';
import { fetchWords } from '../../store/actions/wordBookActions';
import { IAppState, IWord } from '../../store/types';
import styles from './styles';

const WordBook: React.FC = () => {
  const dictionary = useSelector((state: IAppState) => state.wordBook);
  const dispatch = useDispatch();
  const classes = makeStyles(() => styles)();

  const getWords = () => dispatch(fetchWords());

  useEffect(() => {
    getWords();
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
        <Typography variant="h5">WordBook</Typography>
        {renderWords()}
      </main>
      <Footer />
    </>
  );
};

export default WordBook;
