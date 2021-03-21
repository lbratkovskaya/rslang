import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Typography } from '@material-ui/core';
import Header from '../Header';
import Footer from '../Footer';
import { fetchDictionary } from '../../store/actions/dictionaryActions';
import { IAppState, IWord } from '../../store/types';
import './Dictionary.scss';

type Props = ConnectedProps<typeof connector>;

const Dictionary: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.fetchDictionary();
  }, []);

  const renderWords = () =>
    props.dictionary.words.map((word: IWord) => (
      <Typography className="testClass" key={word.word}>
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

const mapStateToProps = (state: IAppState) => ({
  dictionary: state.dictionary,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchDictionary: () => dispatch(fetchDictionary()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dictionary);
