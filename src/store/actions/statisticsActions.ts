// import moment from 'moment';
import { Dispatch } from 'redux';
import backendUrl from '../../constants';
import {
  IUserData,
  StatisticsActionTypes,
  IGameName,
  IDateStatistics,
  IStatistics,
} from '../types';

const startStatsLoading = () => ({
  type: StatisticsActionTypes.STATS_IS_LOADING,
  payload: { isLoading: true },
});

const fetchStatsSuccess = (stats: IStatistics) => {
  return {
    type: StatisticsActionTypes.STATS_FETCH_SUCCESS,
    payload: {
      statistics: stats,
      isLoading: false,
    },
  };
};

const fetchStatsError = (error: Error) => ({
  type: StatisticsActionTypes.STATS_FETCH_ERROR,
  payload: { error, isLoading: false },
});

export const fetchStatistics = (userData: IUserData) => (dispatch: Dispatch) => {
  const fetchUserId = userData.userId;
  const url = `${backendUrl}/users/${fetchUserId}/statistics`;
  const userToken = userData.token;

  if (!userToken) {
    return;
  }
  dispatch(startStatsLoading());
  try {
    fetch(url, {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((stats) => fetchStatsSuccess(stats))
      .catch((error) => dispatch(fetchStatsError(error)));
  } catch (e) {
    dispatch(fetchStatsError(e));
  }
};

export const putGameStatistics = (
  stats: IStatistics,
  totallyLearned: number,
  userData: IUserData
) => (dispatch: Dispatch) => {
  const fetchUserId = userData.userId;
  const userToken = userData.token;
  const url = `${backendUrl}/users/${fetchUserId}/statistics`;
  if (!userToken) {
    return;
  }
  try {
    fetch(url, {
      method: 'PUT',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        learnedWords: totallyLearned,
        optional: { ...stats },
      }),
    })
      .then(() => fetchStatsSuccess(stats))
      .catch((error) => dispatch(fetchStatsError(error)));
  } catch (e) {
    dispatch(fetchStatsError(e));
  }
};

export const addGameStatistics = (
  userData: IUserData,
  gameName: IGameName,
  wordsLearned: number,
  wordsTotal: number,
  correctTotal: number,
  correctSeries: number
) => (dispatch: Dispatch) => {
  const fetchUserId = userData.userId;
  const userToken = userData.token;
  const url = `${backendUrl}/users/${fetchUserId}/statistics`;
  if (!userToken) {
    return;
  }
  dispatch(startStatsLoading());
  try {
    fetch(url, {
      method: 'GET',
      credentials: 'omit',
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => data.optional.stats || data.optional)
      .then((stats: IStatistics) => {
        const newDate = Date.now();
        const newStatsData: IDateStatistics = {
          dateTime: newDate,
          gameName,
          wordsTotal,
          wordsLearned,
          correctTotal,
          correctSeries,
        };
        const totallyLearned =
          Object.values(stats).reduce(
            (acc, val) => {
              acc.sum += val.wordsLearned;
              return acc;
            },
            { sum: 0 }
          ).sum + wordsLearned;
        putGameStatistics(
          { ...stats, [newDate.toString()]: newStatsData },
          totallyLearned,
          userData
        )(dispatch);
      })
      .catch((error) => dispatch(fetchStatsError(error)));
  } catch (e) {
    dispatch(fetchStatsError(e));
  }
};
