import * as React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Footer, ContactUsForm, DefaultContactData } from '../components';
import { Loader } from '../components/Loader';
import { URLS } from '../constants';

interface FinishState {
  isFinish: boolean;
  error: false | string;
  oldData: DefaultContactData;
}

const defaultFinishState: FinishState = {
  isFinish: false,
  error: false,
  oldData: {},
};

export const ContactUs = (): React.ReactElement | null => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [finishState, setFinishState] = React.useState<FinishState>(
    defaultFinishState,
  );

  const feedbackFormSubmit = (data: DefaultContactData): void => {
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

  const tryToSendFormAgain = (): void => setFinishState({
    ...defaultFinishState,
    oldData: finishState.oldData,
  });

  if (isLoading) return <Loader />;

  if (finishState.isFinish) {
    return (
      <>
        <main className="main-container">
          <div className="contact-results">
            {finishState.error !== false ? (
              <>
                <div className="error">{finishState.error}</div>
                <div className="button" onClick={tryToSendFormAgain}>
                  Try again
                </div>
              </>
            ) : (
              <>
                <div className="success">We got your feedback</div>
                <NavLink to={URLS.main} type="button" className="button">
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
