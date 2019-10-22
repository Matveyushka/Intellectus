import { combineReducers } from 'redux';
import { loaderReducer } from '../components/Loader';
import { mainReducer } from '../pages/Main/reducers';

export const rootReducer = combineReducers({
  loader: loaderReducer,
  main: mainReducer,
});
