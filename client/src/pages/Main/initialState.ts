import { MAIN_VIEW_TYPES } from '../../constants';
import { Question } from '../../components/TestView';

export interface MainState {
  currentView: MAIN_VIEW_TYPES;
  token?: string;
  questions?: Question[];
  solutions?: number[];
  pointsDistribution?: number[];
  userAnswers: number[];
}

export const initialMainState: MainState = {
  currentView: MAIN_VIEW_TYPES.intro,
  userAnswers: Array(12).fill(undefined),
};
