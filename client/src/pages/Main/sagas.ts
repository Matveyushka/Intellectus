import { call, put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import axios from 'axios';
import {
  GetResultsAction, MAIN_ACTION_TYPES, setCurrentView, setQuestions, setResults, setUserAnswers,
} from './actions';
import { hideLoader, showLoader } from '../../components/Loader/actions';
import { MAIN_VIEW_TYPES } from '../../constants';

function* getQuestions(): SagaIterator {
  try {
    yield put(showLoader());

    yield put(setUserAnswers(Array(12).fill(null)));

    const { data } = yield call(axios.get, '/questions');

    yield put(setQuestions(data));

    yield put(setCurrentView(MAIN_VIEW_TYPES.test));

    yield put(hideLoader());
  } catch (err) {
    console.error('getQuestions saga failed!');

    throw err;
  }
}

function* getResults(action: GetResultsAction): SagaIterator {
  try {
    yield put(showLoader());

    const { token, answers } = action.payload;

    const { data } = yield call(axios.post, '/answers', { token, answers });

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
