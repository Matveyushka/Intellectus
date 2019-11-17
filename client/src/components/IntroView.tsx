import * as React from 'react';
import mergeClassNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Footer } from './Footer';
import { Dispatch } from '../store';

export const IntroView = (): React.ReactElement => {
  const dispatch: Dispatch = useDispatch();

  React.useEffect((): void => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Sharer.init();
  }, []);

  const [isShareOpen, setIsShareOpen] = React.useState<boolean>(false);

  const shareClassNames = mergeClassNames('share-buttons', {
    hidden: !isShareOpen,
  });

  const shareSeparatorClassName = mergeClassNames('share-separator', {
    hidden: !isShareOpen,
  });

  const handlePlayButtonClick = (): void => {
    dispatch.main.getQuestions();
  };

  return (
    <>
      <main className="title-container">
        <h1 className="title">CHALLENGE</h1>
        <h1 className="title">YOUR MIND</h1>
      </main>
      <button
        type="button"
        aria-label="Start test"
        className="play-icon"
        title="Start test!"
        onClick={handlePlayButtonClick}
      />
      <Footer />
      <button
        type="button"
        aria-label="Share this site with your friends"
        title="Share this site with your friends!"
        className="share-icon"
        onClick={() => setIsShareOpen(!isShareOpen)}
      />
      <div className={shareSeparatorClassName} />
      <div className={shareClassNames}>
        <button
          type="button"
          aria-label="share in twitter"
          data-sharer="twitter"
          className="twitter"
          data-title="Checkout Intellectus, challenge your mind!"
          data-hashtags="intellectus, iq, test"
          data-url="https://intellectus-demo.herokuapp.com/"
        />
        <button
          type="button"
          aria-label="share in facebook"
          className="facebook"
          data-sharer="facebook"
          data-hashtag="intellectus"
          data-url="https://intellectus-demo.herokuapp.com/"
        />
        <button
          type="button"
          aria-label="share in vk"
          className="vk"
          data-sharer="vk"
          data-title="Checkout Intellectus, challenge your mind!"
          data-url="https://intellectus-demo.herokuapp.com/"
        />
      </div>
    </>
  );
};
