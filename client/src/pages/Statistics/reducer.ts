import { AllStatsActions, STATISTICS_ACTION_TYPES } from './actions';
import { initialStatisticsState, StatisticsState } from './initialState';

export const statisticsReducer = (
  state: StatisticsState = initialStatisticsState,
  action: AllStatsActions,
): StatisticsState => {
  switch (action.type) {
    case STATISTICS_ACTION_TYPES.setStatistics: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case STATISTICS_ACTION_TYPES.hideLoader:
      // falls through

    case STATISTICS_ACTION_TYPES.showLoader: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
