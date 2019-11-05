import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  About, ContactUs, Main, Statistics,
} from './pages';
import { URLS } from './constants';

export const MainLayout = (): React.ReactElement => (
  <Router>
    <Route path={URLS.main} exact component={Main} />
    <Route path={URLS.statistics} component={Statistics} />
    <Route path={URLS.about} component={About} />
    <Route path={URLS.contactUs} component={ContactUs} />
  </Router>
);
