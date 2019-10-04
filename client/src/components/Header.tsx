import * as React from 'react';
import mergeClassNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { URLS } from '../constants';

export interface HeaderProps {
  location: Location;
}

export const Header = (props: HeaderProps): React.ReactElement => {
  const { location: { pathname } } = props;

  return (
    <nav className="header-container">
      <h1
        className={mergeClassNames('header-item', { active: pathname === URLS.main })}
      >
        <NavLink to={URLS.main} exact>
            MAIN
        </NavLink>
      </h1>
      <h1
        className={mergeClassNames('header-item', { active: pathname === URLS.statistics })}
      >
        <NavLink to={URLS.statistics} exact>
            STATISTICS
        </NavLink>
      </h1>
      <h1
        className={mergeClassNames('header-item', { active: pathname === URLS.about })}
      >
        <NavLink to={URLS.about} exact>
            ABOUT
        </NavLink>
      </h1>
      <h1
        className={mergeClassNames('header-item', { active: pathname === URLS.contactUs })}
      >
        <NavLink to={URLS.contactUs} exact>
            CONTACT US
        </NavLink>
      </h1>
    </nav>
  );
};
