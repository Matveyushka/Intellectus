import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { URLS } from '../constants';

export const Header = (): React.ReactElement => (
  <nav className="header-container">
    <h1 className="header-item">
      <NavLink to={URLS.main} exact>
          MAIN
      </NavLink>
    </h1>
    <h1 className="header-item">
      <NavLink to={URLS.statistics} exact>
          STATISTICS
      </NavLink>
    </h1>
    <h1 className="header-item">
      <NavLink to={URLS.about} exact>
          ABOUT
      </NavLink>
    </h1>
    <h1 className="header-item">
      <NavLink to={URLS.contactUs} exact>
          CONTACT US
      </NavLink>
    </h1>
  </nav>
);
