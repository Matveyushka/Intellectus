import { AllMainActions, MAIN_ACTION_TYPES } from './actions';
import { initialMainState, MainState } from './initialState';
import { MAIN_VIEW_TYPES } from '../../constants';

export const mainReducer = (
  state: MainState = initialMainState,
  action: AllMainActions,
): MainState => {
  switch (action.type) {
    case MAIN_ACTION_TYPES.setQuestions: {
      return {
        ...state,
        token: action.payload.token,
        questions: action.payload.questions,
      };
    }

    case MAIN_ACTION_TYPES.setResults: {
      return {
        ...state,
        solutions: action.payload.solutions,
        pointsDistribution: action.payload.pointsDistribution,
      };
    }

    case MAIN_ACTION_TYPES.setCurrentView: {
      return {
        ...state,
        currentView: action.payload,
      };
    }

    case MAIN_ACTION_TYPES.setUserAnswers: {
      return {
        ...state,
        userAnswers: action.payload,
      };
    }

    case MAIN_ACTION_TYPES.setWatchResultIndex: {
      return {
        ...state,
        stepWatchResultIndex: action.payload,
        currentView: MAIN_VIEW_TYPES.watch,
      };
    }

    case MAIN_ACTION_TYPES.setResultTime: {
      return {
        ...state,
        resultTime: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
