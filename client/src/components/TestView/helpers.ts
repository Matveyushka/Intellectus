import { StepItem } from '../Stepper';

export const generateInitialStepperData = (): StepItem[] => Array(12)
  .fill(null)
  .map((_, index) => ({
    text: (index + 1).toString(),
    isCompleted: false,
  }));
