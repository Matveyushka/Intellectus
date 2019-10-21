import { StepItem } from '../Stepper';

export const generateInitialStepperData = (): StepItem[] => Array(12)
  .fill(null)
  .map((_, index) => ({
    text: (index + 1).toString(),
    isCompleted: false,
  }));

export const adjustSecond = (date: Date): Date => new Date(
  date.getFullYear(),
  date.getMonth(),
  date.getDay(),
  date.getHours(),
  date.getMinutes(),
  date.getSeconds() + 1,
);

export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().length === 1
    ? `0${date.getHours().toString()}`
    : date.getHours().toString();
  const minutes = date.getMinutes().toString().length === 1
    ? `0${date.getMinutes().toString()}`
    : date.getMinutes().toString();
  const seconds = date.getSeconds().toString().length === 1
    ? `0${date.getSeconds().toString()}`
    : date.getSeconds().toString();

  return `${hours}:${minutes}:${seconds}`;
};
