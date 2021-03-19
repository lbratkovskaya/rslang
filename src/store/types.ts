export interface IWord {
  id: string,
  group: 0,
  page: 0,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string,
}

export interface IDictionary {
  words: IWord[],
  wordsActual: IWord[],
  wordsDifficult: IWord[],
  wordsLearned: IWord[],
}

export interface IAppState {
  dictionary: IDictionary,
  isLoggedIn?: boolean,
  isRegistred?: boolean,
  userName?: string,
  userImage?: string,
}

type DictionaryActions =
  'FETCH_DICTIONARY_START' |
  'FETCH_DICTIONARY_SUCCESS' |
  'FETCH_DICTIONARY_ERROR'

export interface IDictionaryAction {
  type: DictionaryActions,
  payload: {
    words: IWord[],
    isLoading: boolean,
    error: Error,
  }
}
