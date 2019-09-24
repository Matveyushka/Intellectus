import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header } from './components';
import {
  About, ContactUs, Main, Statistics,
} from './pages';

export const MainLayout = (): React.ReactElement => (
  <div>
    <Header />
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/statistics" component={Statistics} />
        <Route path="/about" component={About} />
        <Route path="/contact-us" component={ContactUs} />
      </Switch>
    </Router>
  </div>
);
