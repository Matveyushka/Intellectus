import {
  call, put, takeEvery, select,
} from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import axios from 'axios';
import {
  MAIN_ACTION_TYPES,
  setCurrentView,
  setQuestions,
  setResults,
  setStepIndex,
  setUserAnswers,
} from './actions';
import { hideLoader, showLoader } from '../../components/Loader/actions';
import { API, MAIN_VIEW_TYPES } from '../../constants';
import { validateQuestions, validateResults } from '../../validators';
import { MainState } from './initialState';

function* getQuestions(): SagaIterator {
  try {
    yield put(showLoader());

    yield put(setUserAnswers(Array(12).fill(null)));

    yield put(setStepIndex(0));

    const { data } = yield call(axios.get, API.questions);

    validateQuestions(data); // may throw

    yield put(setQuestions(data));

    yield put(setCurrentView(MAIN_VIEW_TYPES.test));

    yield put(hideLoader());
  } catch (err) {
    console.error('getQuestions saga failed!');

    throw err;
  }
}

function* getResults(): SagaIterator {
  try {
    yield put(showLoader());

    const { token, userAnswers }: MainState = yield select(state => state.main);

    const { data } = yield call(axios.post, '/answers', { token, answers: userAnswers });

    validateResults(data); // may throw

    yield put(setResults(data));

    yield put(setCurrentView(MAIN_VIEW_TYPES.results));

    yield put(hideLoader());
  } catch (err) {
    console.error('getResults saga failed!');

    throw err;
  }
}

export function* mainSaga(): SagaIterator {
  yield takeEvery(MAIN_ACTION_TYPES.getQuestions, getQuestions);

  yield takeEvery(MAIN_ACTION_TYPES.getResults, getResults);
}
