export type Values<T> = T[keyof T];

export interface Question {
  token: string;
  problemFields: string[];
  options: string[];
}