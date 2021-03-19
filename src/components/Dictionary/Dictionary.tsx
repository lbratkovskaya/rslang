import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Typography } from '@material-ui/core';
import {
  fetchDictionary,
  fetchDictionarySuccess,
  testWord,
} from '../../store/actions/dictionaryActions';
import { IAppState } from '../../store/types';
import './Dictionary.scss';

type Props = ConnectedProps<typeof connector>;

const Dictionary: React.FC<Props> = (props: Props) => {
  useEffect(() => {
    props.fetchDictionary();
  }, []);

  return (
    <>
      <Typography variant="h5">
        Dictionary
      </Typography>
      <Typography className="testClass">
        {props.dictionary.words[0]?.textMeaningTranslate}
      </Typography>
    </>
  );
};

const mapStateToProps = (state: IAppState) => ({
  dictionary: state.dictionary,
});

function mapDispatchToProps(dispatch: any) {
  return {
    // fetchDictionary: () => dispatch(fetchDictionary()), // why error here ?
    fetchDictionary: () => dispatch(fetchDictionarySuccess([testWord])),
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Dictionary);
