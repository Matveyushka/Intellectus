import { MODEL_ACTION_TYPES, ToggleModalAction } from './actions';
import { initialModalState, ModalState } from './initialState';

export const modalReducer = (
  state: ModalState = initialModalState,
  action: ToggleModalAction,
): ModalState => {
  switch (action.type) {
    case MODEL_ACTION_TYPES.hideModal:
      // falls through

    case MODEL_ACTION_TYPES.showModal: {
      return {
        ...state,
        isModalOpen: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
