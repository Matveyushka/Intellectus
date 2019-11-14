import * as React from 'react';
import mergeClassNames from 'classnames';
import { useDispatch } from 'react-redux';
import { Footer } from './Footer';
import { Dispatch } from '../store';

export const IntroView = (): React.ReactElement => {
  const dispatch: Dispatch = useDispatch();

  React.useEffect((): void => {
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
        className="play-icon"
        title="Start test!"
        onClick={handlePlayButtonClick}
      />
      <Footer />
      <button
        type="button"
        title="Share this site with your friends!"
        className="share-icon"
        onClick={() => setIsShareOpen(!isShareOpen)}
      />
      <div className={shareSeparatorClassName} />
      <div className={shareClassNames}>
        <button
          type="button"
          data-sharer="twitter"
          className="twitter"
          data-title="Checkout Intellectus, challenge your mind!"
          data-hashtags="intellectus, iq, test"
          data-url="https://intellectus-demo.herokuapp.com/"
        />
        <button
          type="button"
          className="facebook"
          data-sharer="facebook"
          data-hashtag="intellectus"
          data-url="https://intellectus-demo.herokuapp.com/"
        />
        <button
          type="button"
          className="vk"
          data-sharer="vk"
          data-title="Checkout Intellectus, challenge your mind!"
          data-url="https://intellectus-demo.herokuapp.com/"
        />
      </div>
    </>
  );
};
