import axios from 'axios';
import { Dispatch } from '../../store';
import { API, zeroTime } from '../../constants';
import { validateStatistics } from '../../validators';

export interface StatisticsState {
  passedTestsCounter: number;
  averageTime: Date | null;
  pointsDistribution: number[];
  averageTimeDistribution: number[];
  isLoading: boolean;
}

export const statistics = {
  state: {
    isLoading: true,
    passedTestsCounter: 0,
    averageTime: null,
    pointsDistribution: [],
    averageTimeDistribution: [],
  } as StatisticsState,
  reducers: {
    setStatistics: (state: StatisticsState, payload: Partial<StatisticsState>) => ({
      ...state,
      ...payload,
    }),
    hideLoader: (state: StatisticsState) => ({
      ...state,
      isLoading: false,
    }),
  },
  effects: (dispatch: Dispatch) => ({
    getStatistics: async () => {
      const { data } = await axios.get(API.statisticsData);

      validateStatistics(data);

      const averageTime = new Date(zeroTime + data.averageTime);

      dispatch.statistics.setStatistics({ ...data, averageTime });

      dispatch.statistics.hideLoader();
    },
  }),
};
