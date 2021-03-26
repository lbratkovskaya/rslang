import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../Header';
import Footer from '../Footer';
import { fetchWords } from '../../store/actions/wordBookActions';
import { IAppState, IWord } from '../../store/types';
import styles from './styles';

const WordBook: React.FC = () => {
  const dictionary = useSelector((state: IAppState) => state.wordBook);
  const dispatch = useDispatch();
  const classes = makeStyles(() => styles)();
  const [group, setGroup] = useState(1);
  const [page, setPage] = useState(1);

  const getWords = () => dispatch(fetchWords(group - 1, page - 1));

  const renderWords = () =>
    dictionary.words.map((word: IWord) => (
      <Typography className={classes.text} key={word.word}>
        {word.word}
      </Typography>
    ));

  const handlePageChange = (e: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    getWords();
  }, [page]);

  return (
    <>
      <Header />
      <main>
        <Typography variant="h5">WordBook</Typography>
        {renderWords()}
        <Pagination
          count={30}
          page={page}
          variant="outlined"
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </main>
      <Footer />
    </>
  );
};

export default WordBook;
