import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Footer } from './Footer';
import { getQuestions } from '../pages/Main/actions';

export const IntroView = (): React.ReactElement => {
  const dispatch = useDispatch();

  const handlePlayButtonClick = (): void => {
    dispatch(getQuestions());
  };

  return (
    <>
      <main className="title-container">
        <h1 className="title">CHALLENGE</h1>
        <h1 className="title">YOUR MIND</h1>
      </main>
      <button
        type="button"
        className="play-icon"
        title="Start test!"
        onClick={handlePlayButtonClick}
      />
      <Footer />
      <button type="button" title="Share this site with your friends!" className="share-icon" />
    </>
  );
};
