import { Question } from '../../components/TestView';
import { MAIN_VIEW_TYPES } from '../../constants';

export enum MAIN_ACTION_TYPES {
  getQuestions = 'MAIN/GET_QUESTIONS',
  getResults = 'MAIN/GET_RESULTS',
  setQuestions = 'MAIN/SET_QUESTIONS',
  setResults = 'MAIN/SET_RESULTS',
  setCurrentView = 'MAIN/SET_CURRENT_VIEW',
  setUserAnswers = 'MAIN/SET_USER_ANSWERS',
}

export interface SetUserAnswers {
  type: MAIN_ACTION_TYPES.setUserAnswers;
  payload: number[];
}

export interface GetQuestionsAction {
  type: MAIN_ACTION_TYPES.getQuestions;
}

export interface SetQuestionsAction {
  type: MAIN_ACTION_TYPES.setQuestions;
  payload: {
    token: string,
    questions: Question[],
  };
}

export interface SetResultsAction {
  type: MAIN_ACTION_TYPES.setResults;
  payload: {
    solutions: number[],
    pointsDistribution: number[],
  };
}

export interface GetResultsAction {
  type: MAIN_ACTION_TYPES.getResults;
  payload: {
    token: string,
    answers: number[],
  };
}

export interface SetCurrentViewAction {
  type: MAIN_ACTION_TYPES.setCurrentView;
  payload: MAIN_VIEW_TYPES;
}

export type AllMainActions = GetQuestionsAction
  | GetResultsAction
  | SetQuestionsAction
  | SetResultsAction
  | SetCurrentViewAction
  | SetUserAnswers;

export const getQuestions = (): GetQuestionsAction => ({
  type: MAIN_ACTION_TYPES.getQuestions,
});

export const setQuestions = (payload: SetQuestionsAction['payload']): SetQuestionsAction => ({
  type: MAIN_ACTION_TYPES.setQuestions,
  payload,
});

export const getResults = (payload: GetResultsAction['payload']): GetResultsAction => ({
  type: MAIN_ACTION_TYPES.getResults,
  payload,
});

export const setResults = (payload: SetResultsAction['payload']): SetResultsAction => ({
  type: MAIN_ACTION_TYPES.setResults,
  payload,
});

export const setCurrentView = (payload: SetCurrentViewAction['payload']): SetCurrentViewAction => ({
  type: MAIN_ACTION_TYPES.setCurrentView,
  payload,
});

export const setUserAnswers = (payload: number[]): SetUserAnswers => ({
  type: MAIN_ACTION_TYPES.setUserAnswers,
  payload,
});
