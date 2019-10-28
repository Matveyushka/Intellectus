import { StatisticsState } from './initialState';

export enum STATISTICS_ACTION_TYPES {
  getStatistics = 'STATS/GET_STATISTICS',
  setStatistics = 'STATS/SET_STATISTICS',
  showLoader = 'STATS/SHOW_LOADER',
  hideLoader = 'STATS/HIDE_LOADER',
}

export interface SetStatisticsAction {
  type: STATISTICS_ACTION_TYPES.setStatistics;
  payload: StatisticsState;
}

export interface GetStatisticsAction {
  type: STATISTICS_ACTION_TYPES.getStatistics;
}

export interface ShowHideLoaderAction {
  type: STATISTICS_ACTION_TYPES.showLoader | STATISTICS_ACTION_TYPES.hideLoader;
  payload: boolean;
}

export type AllStatsActions = SetStatisticsAction | GetStatisticsAction | ShowHideLoaderAction;

export const getStatistics = (): GetStatisticsAction => ({
  type: STATISTICS_ACTION_TYPES.getStatistics,
});

export const setStatistics = (payload: SetStatisticsAction['payload']): SetStatisticsAction => ({
  type: STATISTICS_ACTION_TYPES.setStatistics,
  payload,
});

export const showLoader = (): ShowHideLoaderAction => ({
  type: STATISTICS_ACTION_TYPES.showLoader,
  payload: true,
});

export const hideLoader = (): ShowHideLoaderAction => ({
  type: STATISTICS_ACTION_TYPES.hideLoader,
  payload: false,
});
