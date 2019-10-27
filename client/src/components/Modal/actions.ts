export enum MODEL_ACTION_TYPES {
  showModal = 'MODAL/SHOW',
  hideModal = 'MODAL/HIDE',
}

export interface ToggleModalAction {
  type: MODEL_ACTION_TYPES;
  payload: boolean;
}

export const showModal = (): ToggleModalAction => ({
  type: MODEL_ACTION_TYPES.showModal,
  payload: true,
});

export const hideModal = (): ToggleModalAction => ({
  type: MODEL_ACTION_TYPES.hideModal,
  payload: false,
});
