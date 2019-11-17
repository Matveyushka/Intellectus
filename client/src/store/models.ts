import { Models } from '@rematch/core';
import { loader } from '../components/Loader/model';
import { main } from '../pages/Main/model';
import { modal } from '../components/Modal/model';
import { statistics } from '../pages/Statistics/model';
import { contactUs } from '../pages/ContactUs/model';

export interface RootModel extends Models {
  loader: typeof loader;
  main: typeof main;
  modal: typeof modal;
  statistics: typeof statistics;
  contactUs: typeof contactUs;
}

export const models: RootModel = {
  loader,
  main,
  modal,
  statistics,
  contactUs,
};
