import { combineReducers } from 'redux';
import { loaderReducer } from '../components/Loader';
import { mainReducer } from '../pages/Main/reducers';
import { modalReducer } from '../components/Modal';

export const rootReducer = combineReducers({
  loader: loaderReducer,
  main: mainReducer,
  modal: modalReducer,
});
