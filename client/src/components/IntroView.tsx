import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Footer } from './Footer';
import { Dispatch } from '../store';

export const IntroView = (): React.ReactElement => {
  const dispatch: Dispatch = useDispatch();

  const handlePlayButtonClick = (): void => {
    dispatch.main.getQuestions();
  };

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
      </main>
      <Footer />
      <button type="button" title="Share this site with your friends!" className="share-icon" />
    </>
  );
};
