import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Typography } from '@material-ui/core';
import { fetchDictionary } from '../../store/actions/dictionaryActions';
import { IAppState, IWord } from '../../store/types';
import './Dictionary.scss';

type Props = ConnectedProps<typeof connector>;

const Dictionary: React.FC<Props> = (props: Props) => {
	useEffect(() => {
		props.fetchDictionary();
	}, []);

  const renderWords = () => props.dictionary.words
    .map((word: IWord) => (
      <Typography className="testClass">
        {word.textMeaningTranslate}
      </Typography>
    ));

  return (
    <>
      <Typography variant="h5">
        Dictionary
      </Typography>
      {renderWords()}
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
	dictionary: state.dictionary,
});

function mapDispatchToProps(dispatch: any) {
  return {
    fetchDictionary: () => dispatch(fetchDictionary()),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dictionary);
