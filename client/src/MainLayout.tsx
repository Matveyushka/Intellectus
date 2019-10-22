import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components';
import {
  About, ContactUs, Main, Statistics,
} from './pages';

import { URLS } from './constants';

export const MainLayout = (): React.ReactElement => (
  <div className="main-layout">
    <Router>
      <Route>
        {({ location }) => (
          <Header
            location={location as unknown as Location}
          />
        )}
      </Route>
      <Switch>
        <Route path={URLS.main} exact component={Main} />
        <Route path={URLS.statistics} component={Statistics} />
        <Route path={URLS.about} component={About} />
        <Route path={URLS.contactUs} component={ContactUs} />
      </Switch>
    </Router>
  </div>
);
