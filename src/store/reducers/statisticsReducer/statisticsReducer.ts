import { IStatisticsState, IStatisticsAction, StatisticsActionTypes } from '../../types';

const initialState: IStatisticsState = {
  isLoading: false,
  statistics: {},
};

export default function statisticsReducer(
  state: IStatisticsState = initialState,
  action: IStatisticsAction
) {
  switch (action.type) {
    case StatisticsActionTypes.STATS_IS_LOADING:
      return { ...state, isLoading: true };
    case StatisticsActionTypes.STATS_FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        statistics: action.payload.statistics,
      };
    case StatisticsActionTypes.STATS_FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload.error };
    default:
      return state;
  }
}
