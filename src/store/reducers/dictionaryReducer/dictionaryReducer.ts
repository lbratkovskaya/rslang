import { IDictionaryState, IDictionaryAction, DictionaryActionTypes, IWord } from '../../types';

const initialState: IDictionaryState = {
  isLoading: false,
  learningWords: [] as Array<IWord>,
  difficultWords: [] as Array<IWord>,
  deletedWords: [] as Array<IWord>,
};

export default function dictionaryReducer(
  state: IDictionaryState = initialState,
  action: IDictionaryAction
) {
  switch (action.type) {
    case DictionaryActionTypes.DICT_IS_LOADING:
      return { ...state, isLoading: true };
    case DictionaryActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        learningWords: action.payload.learningWords,
        difficultWords: action.payload.difficultWords,
        deletedWords: action.payload.deletedWords,
      };
    case DictionaryActionTypes.FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
}
