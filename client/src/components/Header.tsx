import * as React from 'react';
import mergeClassNames from 'classnames';
import * as shortid from 'shortid';
import { NavLink } from 'react-router-dom';
import { URLS } from '../constants';

export interface HeaderProps {
  location: Location;
  onBackToMainPageClick: () => void;
  isTest: boolean;
}

export const Header = (props: HeaderProps): React.ReactElement => {
  const {
    location: { pathname },
    isTest,
    onBackToMainPageClick,
  } = props;

  return (
    <header className="header">
      <div className="header-logo">
        <NavLink
          to={{
            pathname: `${URLS.main}`,
            state: { mainKey: shortid.generate() },
          }}
          onClick={onBackToMainPageClick}
          exact
        >
          <img className="header-logo-img" src="images/logo.png" />
        </NavLink>
      </div>
      {!isTest && (
        <nav className="header-container">
          <h1
            className={mergeClassNames('header-item', {
              active: pathname === URLS.statistics,
            })}
          >
            <NavLink to={URLS.statistics} exact>
              STATISTICS
            </NavLink>
          </h1>
          <h1
            className={mergeClassNames('header-item', {
              active: pathname === URLS.about,
            })}
          >
            <NavLink to={URLS.about} exact>
              ABOUT
            </NavLink>
          </h1>
          <h1
            className={mergeClassNames('header-item', {
              active: pathname === URLS.contactUs,
            })}
          >
            <NavLink to={URLS.contactUs} exact>
              CONTACT US
            </NavLink>
          </h1>
        </nav>
      )}
    </header>
  );
};
