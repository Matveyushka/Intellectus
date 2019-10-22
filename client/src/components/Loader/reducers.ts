import { LOADER_ACTION_TYPES, ToggleLoaderAction } from './actions';
import { initialLoaderState, LoaderState } from './initialState';

export const loaderReducer = (
  state: LoaderState = initialLoaderState,
  action: ToggleLoaderAction,
): LoaderState => {
  switch (action.type) {
    case LOADER_ACTION_TYPES.hideLoader:
    case LOADER_ACTION_TYPES.showLoader: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
