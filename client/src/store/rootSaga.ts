import { fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { mainSaga } from '../pages/Main/sagas';
import { statisticsSaga } from '../pages/Statistics/sagas';

export function* rootSaga(): SagaIterator {
  yield fork(mainSaga);

  yield fork(statisticsSaga);
}
