import axios from 'axios';
import { API, MAIN_VIEW_TYPES } from '../../constants';
import { Question } from '../../commonTypes';
import { validateQuestions, validateResults } from '../../validators';
import { Dispatch, State } from '../../store';

export interface MainState {
  currentView: MAIN_VIEW_TYPES;
  token?: string;
  questions?: Question[];
  solutions?: number[];
  pointsDistribution?: number[];
  userAnswers: number[];
  resultTime?: Date;
  stepIndex: number;
}

export const main = {
  state: {
    currentView: MAIN_VIEW_TYPES.intro,
    userAnswers: Array(12).fill(undefined),
    stepIndex: 0,
  } as MainState,
  reducers: {
    setQuestions: (state: MainState, { token, questions }: Partial<MainState>) => ({
      ...state,
      token,
      questions,
    }),
    setResults: (state: MainState, { solutions, pointsDistribution }: Partial<MainState>) => ({
      ...state,
      solutions,
      pointsDistribution,
    }),
    setCurrentView: (state: MainState, currentView: string) => ({
      ...state,
      currentView,
    }),
    setUserAnswers: (state: MainState, userAnswers: MainState['userAnswers']) => ({
      ...state,
      userAnswers,
    }),
    setResultTime: (state: MainState, resultTime: MainState['resultTime']) => ({
      ...state,
      resultTime,
    }),
    setStepIndex: (state: MainState, stepIndex: MainState['stepIndex']) => ({
      ...state,
      stepIndex,
    }),
  },
  effects: (dispatch: Dispatch) => ({
    getQuestions: async () => {
      dispatch.loader.showLoader();

      dispatch.main.setUserAnswers(Array(12).fill(null));

      dispatch.main.setStepIndex(0);

      const { data } = await axios.get(API.questions);

      validateQuestions(data);

      dispatch.main.setQuestions(data);

      dispatch.main.setCurrentView(MAIN_VIEW_TYPES.test);

      dispatch.loader.hideLoader();
    },
    getResults: async (_payload: undefined, state: State) => {
      dispatch.loader.showLoader();

      const { token, userAnswers }: MainState = state.main;

      const { data } = await axios.post(API.answers, { token, answers: userAnswers });

      validateResults(data);

      dispatch.main.setResults(data);

      dispatch.main.setCurrentView(MAIN_VIEW_TYPES.results);

      dispatch.loader.hideLoader();
    },
  }),
};
