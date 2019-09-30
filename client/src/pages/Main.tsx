/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import { History } from 'history';
import { URLS } from '../constants';

export interface MainProps {
  history: History,
}

export const Main = (props: MainProps): React.ReactElement | null => {
  const { history } = props;

  const handlePlayButtonClick = (): void => history.push(URLS.testView);

  return (
    <>
      <main className="main-container">
        <h1 className="title">CHALLENGE</h1>
        <h1 className="title">YOUR MIND</h1>
        <button
          type="button"
          className="play-icon"
          title="Start test!"
          onClick={handlePlayButtonClick}
        />
        <button type="button" title="Share this site with your friends!" className="share-icon" />
      </main>
      <footer className="footer">
        <p>INTELLECTUS</p>
        <p>BY NOBRAINS</p>
      </footer>
    </>
  );
};
