import { DictionaryActionTypes, IDictionaryAction, IDictionaryState, IWord } from '../../types';
import dictionaryReducer from './dictionaryReducer';

const expectedInitialState: IDictionaryState = {
  isLoading: false,
  learningWords: [] as Array<IWord>,
  difficultWords: [] as Array<IWord>,
  deletedWords: [] as Array<IWord>,
};

describe('dictionaryReducer testing:', () => {
  it('Should return the initial state', () => {
    expect(dictionaryReducer(undefined, {} as IDictionaryAction)).toEqual(expectedInitialState);
  });

  it('Should handle DICT_IS_LOADING', () => {
    expect(
      dictionaryReducer(undefined, {
        type: DictionaryActionTypes.DICT_IS_LOADING,
        payload: { isLoading: true },
      } as IDictionaryAction)
    ).toEqual({ ...expectedInitialState, isLoading: true });
  });

  it('Should handle FETCH_SUCCESS', () => {
    expect(
      dictionaryReducer(undefined, {
        type: DictionaryActionTypes.FETCH_SUCCESS,
        payload: {
          isLoading: false,
          learningWords: [{ word: 'test' } as IWord],
          difficultWords: [],
          deletedWords: [],
          allWords: [],
          error: Error('Test error'),
        },
      } as IDictionaryAction)
    ).toEqual({ ...expectedInitialState, learningWords: [{ word: 'test' }] });
  });

  it('Should handle FETCH_ERROR', () => {
    expect(
      dictionaryReducer(undefined, {
        type: DictionaryActionTypes.FETCH_ERROR,
        payload: { isLoading: false, error: Error('Test fetch error') },
      } as IDictionaryAction)
    ).toEqual({ ...expectedInitialState, isLoading: false, error: Error('Test fetch error') });
  });
});
