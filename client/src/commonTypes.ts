export type Values<T> = T[keyof T];

export interface Question {
  token: string;
  problemFields: string[];
  options: string[];
}

export interface FinishFormState<T> {
  isFinish: boolean;
  error: false | string;
  oldData: T;
}
