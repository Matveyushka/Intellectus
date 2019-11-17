import { store } from '../../store';
import { MAIN_VIEW_TYPES } from '../../constants';
import { STEPPER_DIRECTION } from '../../components/TestView/constants';

export const handleKeyDown = (ev: KeyboardEvent): void => {
  const state = store.getState();

  const { currentView, stepIndex, userAnswers } = state.main;
  const isModalOpen = state.modal;

  if (isModalOpen && ev.key === 'Escape') {
    store.dispatch.modal.hideModal();

    return;
  }

  if (currentView === MAIN_VIEW_TYPES.intro) {
    if (document.activeElement === document.body && ev.key === 'Enter') {
      store.dispatch.main.getQuestions();

      return;
    }
  }

  if (currentView === MAIN_VIEW_TYPES.test) {
    if (/^[1-6]$/.test(ev.key)) {
      const optionIndex = Number(ev.key) - 1;

      const newAnswers = userAnswers.map((item, index) => (
        index === stepIndex
          ? optionIndex
          : item
      ));

      store.dispatch.main.setUserAnswers(newAnswers);

      return;
    }
  }

  if (currentView === MAIN_VIEW_TYPES.results) {
    if (ev.key === 'ArrowLeft' || ev.key === 'ArrowRight') {
      store.dispatch.main.setStepIndex(0);

      store.dispatch.main.setCurrentView(MAIN_VIEW_TYPES.watch);

      return;
    }
  }

  if (currentView === MAIN_VIEW_TYPES.watch || currentView === MAIN_VIEW_TYPES.test) {
    if (isModalOpen) return;

    if (ev.key === 'ArrowLeft' && stepIndex > 0) {
      store.dispatch.main.setStepIndex(stepIndex + STEPPER_DIRECTION.backward);

      return;
    }

    if (ev.key === 'ArrowRight' && stepIndex < 11) {
      store.dispatch.main.setStepIndex(stepIndex + STEPPER_DIRECTION.forward);
    }
  }
};
