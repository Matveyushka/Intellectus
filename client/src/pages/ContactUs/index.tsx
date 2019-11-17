import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Footer, ContactUsForm, DefaultContactData, Header,
} from '../../components';
import { Loader } from '../../components/Loader';
import { URLS } from '../../constants';
import { Dispatch, State } from '../../store';
import { ContactUsState } from './model';

export interface ContactUsProps {
  location: Location;
}

export const ContactUs = (props: ContactUsProps): React.ReactElement | null => {
  const { location } = props;
  const dispatch: Dispatch = useDispatch();
  const isLoading = useSelector<State, boolean>(state => state.loader);
  const {
    isFinish,
    error,
    oldData,
  } = useSelector<State, ContactUsState>(state => state.contactUs);

  const feedbackFormSubmit = (data: DefaultContactData): void => {
    dispatch.contactUs.postFeedback(data);
  };

  const tryToSendFormAgain = (): void => {
    dispatch.contactUs.setState({
      isFinish: false,
      error: undefined,
      oldData,
    });
  };

  if (isLoading) return <Loader />;

  if (isFinish) {
    return (
      <div className="main-layout contact-us">
        <Header location={location} />
        <main className="main-container">
          <div className="contact-results">
            {error ? (
              <>
                <div className="error">{error}</div>
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
      </div>
    );
  }

  return (
    <div className="main-layout contact-us">
      <Header location={location} />
      <main className="main-container">
        <ContactUsForm
          feedbackFormSubmit={feedbackFormSubmit}
          data={oldData}
        />
      </main>
      <Footer />
    </div>
  );
};
