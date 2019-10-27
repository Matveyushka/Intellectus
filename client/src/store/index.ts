import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialLoaderState } from '../components/Loader';
import { initialModalState } from '../components/Modal';
import { rootReducer } from './rootReducer';
import { rootSaga } from './rootSaga';
import { initialMainState } from '../pages/Main/initialState';

export const initialState = {
  loader: initialLoaderState,
  modal: initialModalState,
  main: initialMainState,
};

export type State = typeof initialState;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);
