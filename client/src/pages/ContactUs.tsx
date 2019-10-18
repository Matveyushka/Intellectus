import * as React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Footer, ContactUsForm } from '../components';
import { Loader } from '../components/Loader';

interface FinishState {
  isFinish: boolean;
  error: false | string;
  oldData: Record<string, string>;
}

const defaultFinishState: FinishState = {
  isFinish: false,
  error: false,
  oldData: {},
};

export const ContactUs = (): React.ReactElement | null => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [finishState, setFinishState] = React.useState<FinishState>(
    defaultFinishState,
  );

  const feedbackFormSubmit = (data: Record<string, string>): void => {
    setIsLoading(true);
    let error: false | string = false;

    axios('/feedback', { method: 'post', data })
      .catch((err: Error) => {
        error = 'Something went wrong';
        throw err;
      })
      .finally(() => {
        setFinishState({
          oldData: data,
          isFinish: true,
          error,
        });

        setIsLoading(false);
      });
  };

  const tryToSendFormAgain = (): void => {
    setFinishState({
      ...defaultFinishState,
      oldData: finishState.oldData,
    });
  };

  if (isLoading) return <Loader />;

  if (finishState.isFinish) {
    return (
      <>
        <main className="main-container">
          <div className="contact-results">
            {finishState.error !== false && (
              <>
                <div className="error">{finishState.error}</div>
                <button
                  type="button"
                  className="button"
                  onClick={tryToSendFormAgain}
                >
                  Try again
                </button>
              </>
            )}
            {finishState.error === false && (
              <>
                <div className="success">We got your feedback</div>
                <NavLink
                  to="/"
                  type="button"
                  className="button"
                >
                  Go to main page
                </NavLink>
              </>
            )}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="main-container">
        <ContactUsForm
          feedbackFormSubmit={feedbackFormSubmit}
          data={finishState.oldData}
        />
      </main>
      <Footer />
    </>
  );
};
