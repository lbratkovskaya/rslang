import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header';
import Footer from '../Footer';
import { fetchDictionary } from '../../store/actions/dictionaryActions';
import { IAppState } from '../../store/types';
import DictionarySection from './DictionarySection';
import useStyles from './styles';

const UserDictionary: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IAppState) => state.user);
  const dictionary = useSelector((state: IAppState) => state.userDictionary);
  const getWords = () => dispatch(fetchDictionary(currentUser.data));

  const classes = useStyles();

  useEffect(() => {
    getWords();
  }, [currentUser]);

  return (
    <>
      <Header />
      <main>
        <div className={classes.dictionary}>
          <DictionarySection
            words={[...dictionary.easyWords, ...dictionary.difficultWords] || []}
          />
          <DictionarySection words={dictionary.difficultWords || []} />
          <DictionarySection words={dictionary.deletedWords || []} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UserDictionary;
