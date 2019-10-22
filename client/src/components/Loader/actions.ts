export enum LOADER_ACTION_TYPES {
  showLoader = 'LOADER/SHOW',
  hideLoader = 'LOADER/HIDE',
}

export interface ToggleLoaderAction {
  type: LOADER_ACTION_TYPES;
  payload: boolean;
}

export const showLoader = (): ToggleLoaderAction => ({
  type: LOADER_ACTION_TYPES.showLoader,
  payload: true,
});

export const hideLoader = (): ToggleLoaderAction => ({
  type: LOADER_ACTION_TYPES.hideLoader,
  payload: false,
});
