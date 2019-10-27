export interface StatisticsState {
  passedTestsCounter: number;
  averageTime: Date | null;
  pointsDistribution: number[];
  averageTimeDistribution: number[];
  isLoading: boolean;
}

export const initialStatisticsState: StatisticsState = {
  // собственный лоадер, потому что по-умолчанию true
  isLoading: true,
  passedTestsCounter: 0,
  averageTime: null,
  pointsDistribution: [],
  averageTimeDistribution: [],
};
