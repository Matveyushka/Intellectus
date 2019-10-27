import { SagaIterator } from 'redux-saga';
import { takeEvery, put, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  setStatistics, STATISTICS_ACTION_TYPES, hideLoader,
} from './actions';
import { API, zeroTime } from '../../constants';
import { validateStatistics } from '../../validators';

function* getStatistics(): SagaIterator {
  try {
    const { data } = yield call(axios.get, API.statisticsData);

    validateStatistics(data);

    const averageTime = new Date(zeroTime + data.averageTime);

    yield put(setStatistics({ ...data, averageTime }));

    yield put(hideLoader());
  } catch (err) {
    console.error('Failed to get statistics!');

    throw err;
  }
}

export function* statisticsSaga(): SagaIterator {
  yield takeEvery(STATISTICS_ACTION_TYPES.getStatistics, getStatistics);
}
