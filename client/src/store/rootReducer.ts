import { combineReducers } from 'redux';
import { loaderReducer } from '../components/Loader/reducer';
import { mainReducer } from '../pages/Main/reducer';
import { statisticsReducer } from '../pages/Statistics/reducer';
import { modalReducer } from '../components/Modal';

export const rootReducer = combineReducers({
  loader: loaderReducer,
  main: mainReducer,
  statistics: statisticsReducer,
  modal: modalReducer,
});
