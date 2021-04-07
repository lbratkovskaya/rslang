import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fetchWords,
  fetchWordsStart,
  fetchWordsSuccess,
  setGroup,
  setPage,
} from './wordBookActions';
import { WordBookActionTypes } from '../types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('WordBook actions testing', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('Should create actions to set page and group', () => {
    const group = 2;
    const page = 13;
    const expectedActions = [
      { type: WordBookActionTypes.SET_GROUP, payload: { activeGroup: group } },
      { type: WordBookActionTypes.SET_PAGE, payload: { activePage: page } },
    ];

    expect(setGroup(group)).toEqual(expectedActions[0]);
    expect(setPage(page)).toEqual(expectedActions[1]);
  });

  it('Should create actions when fetchWords() has been called', () => {
    const store = mockStore({ words: [] });
    fetchMock.get('https://rslang-server.herokuapp.com/words/?group=0&page=0', {
      body: [],
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [fetchWordsStart(), fetchWordsSuccess([])];

    return store.dispatch(fetchWords(0, 0) as any).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedActions[0]);
      expect(actions[1]).toEqual(expectedActions[1]);
    });
  });
});
