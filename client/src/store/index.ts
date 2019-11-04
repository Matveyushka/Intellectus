import { init, RematchDispatch, RematchRootState } from '@rematch/core';
import { models } from './models';

export const store = init({
  models,
});

export type State = RematchRootState<typeof models>;
export type Dispatch = RematchDispatch<typeof models>;
