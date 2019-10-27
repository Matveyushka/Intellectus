import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialLoaderState } from '../components/Loader/initialState';
import { initialModalState } from '../components/Modal';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { initialMainState } from '../pages/Main/initialState';
import { initialStatisticsState } from '../pages/Statistics/initialState';

export const initialState = {
  loader: initialLoaderState,
  modal: initialModalState,
  main: initialMainState,
  statistics: initialStatisticsState,
};

export type State = typeof initialState;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
