import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components';
import {
  About, ContactUs, Main, Statistics,
} from './pages';

import { URLS } from './constants';

export const MainLayout = (): React.ReactElement => {
  const [isTest, setIsTest] = React.useState<boolean>(false);

  const handleBackToMainPage = (): void => setIsTest(false);

  const handleStartTest = (): void => setIsTest(true);

  return (
    <div className="main-layout">
      <Router>
        <Route>
          {({ location }) => (
            <Header
              location={location as unknown as Location}
              onBackToMainPageClick={handleBackToMainPage}
              isTest={isTest}
            />
          )}
        </Route>
        <Switch>
          <Route path={URLS.main} exact>
            {({ location }) => (
              <Main
                key={(location.state) ? location.state.mainKey : 0}
                onStartTest={handleStartTest}
              />
            )}
          </Route>
          <Route path={URLS.statistics} component={Statistics} />
          <Route path={URLS.about} component={About} />
          <Route path={URLS.contactUs} component={ContactUs} />
        </Switch>
      </Router>
    </div>
  );
};
