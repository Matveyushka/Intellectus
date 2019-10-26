import { Question } from '../../commonTypes';
import { MAIN_VIEW_TYPES } from '../../constants';

export enum MAIN_ACTION_TYPES {
  getQuestions = 'MAIN/GET_QUESTIONS',
  getResults = 'MAIN/GET_RESULTS',
  setQuestions = 'MAIN/SET_QUESTIONS',
  setResults = 'MAIN/SET_RESULTS',
  setCurrentView = 'MAIN/SET_CURRENT_VIEW',
  setUserAnswers = 'MAIN/SET_USER_ANSWERS',
  setResultTime = 'MAIN/SET_RESULT_TIME',
  setStepIndex = 'MAIN/SET_STEP_INDEX',
}

export interface SetUserAnswersAction {
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

export interface SetResultTimeAction {
  type: MAIN_ACTION_TYPES.setResultTime;
  payload: Date;
}

export interface SetStepIndexAction {
  type: MAIN_ACTION_TYPES.setStepIndex;
  payload: number;
}

export type AllMainActions = GetQuestionsAction
  | GetResultsAction
  | SetQuestionsAction
  | SetResultsAction
  | SetCurrentViewAction
  | SetResultTimeAction
  | SetUserAnswersAction
  | SetStepIndexAction;

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

export const setUserAnswers = (payload: number[]): SetUserAnswersAction => ({
  type: MAIN_ACTION_TYPES.setUserAnswers,
  payload,
});

export const setResultTime = (payload: SetResultTimeAction['payload']): SetResultTimeAction => ({
  type: MAIN_ACTION_TYPES.setResultTime,
  payload,
});

export const setStepIndex = (payload: number): SetStepIndexAction => ({
  type: MAIN_ACTION_TYPES.setStepIndex,
  payload,
});
