import * as React from 'react';
import { Footer } from '../components';

export const ContactUs = (): React.ReactElement | null => (
  <>
    <main className="main-container">
      <form className="contact-form">
        <div className="input-field">
          <label className="input-label" htmlFor="name">
            <p className="label-title">Your name:</p>
            <input className="input-text" type="text" id="name" name="name" />
          </label>
        </div>
        <div className="input-field">
          <label className="input-label" htmlFor="email">
            <p className="label-title">Email:</p>
            <input className="input-text" type="text" id="email" name="email" />
          </label>
        </div>
        <div className="input-field">
          <label className="input-label" htmlFor="text">
            <p className="label-title">Feedback:</p>
            <div className="input-with-area">
              <input className="input-text" type="text" placeholder="Title" name="title" />
              <textarea className="input-area" id="text" placeholder="Body" name="body" />
              <div className="send-form">
                <div className="area-count">0 / 300</div>
                <button type="button" className="send-btn">
                  <i className="plane-icon" />
                </button>
              </div>
            </div>
          </label>
        </div>
      </form>
    </main>
    <Footer />
  </>
);
