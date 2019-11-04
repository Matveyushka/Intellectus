import { Models } from '@rematch/core';
import { loader } from '../components/Loader/model';
import { main } from '../pages/Main/model';
import { modal } from '../components/Modal/model';
import { statistics } from '../pages/Statistics/model';

export interface RootModel extends Models {
  loader: typeof loader;
  main: typeof main;
  modal: typeof modal;
  statistics: typeof statistics;
}

export const models: RootModel = {
  loader,
  main,
  modal,
  statistics,
};
