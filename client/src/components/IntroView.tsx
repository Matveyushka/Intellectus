import * as React from 'react';
import { Footer } from './Footer';

export interface IntroViewProps {
  onPlayButtonClick: () => void;
}

export const IntroView = (props: IntroViewProps): React.ReactElement => {
  const { onPlayButtonClick } = props;

  return (
    <>
      <main className="main-container">
        <h1 className="title">CHALLENGE</h1>
        <h1 className="title">YOUR MIND</h1>
        <button
          type="button"
          className="play-icon"
          title="Start test!"
          onClick={onPlayButtonClick}
        />
        <Footer />
      </main>
      <button type="button" title="Share this site with your friends!" className="share-icon" />
    </>
  );
};
