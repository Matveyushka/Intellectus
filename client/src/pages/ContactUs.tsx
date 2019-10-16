import * as React from 'react';
import axios from 'axios';
import useForm from 'react-hook-form';
import { Footer } from '../components';

export const ContactUs = (): React.ReactElement | null => {
  const { register, handleSubmit, errors } = useForm();

  const [textareaLength, setTextareaLength] = React.useState<number>(0);

  const maxTextAreaLength = 300;

  const onTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setTextareaLength(event.target.value.length);
  };

  const feedbackFormSubmit = (data: Record<string, string>): void => {
    axios('/feedback', { method: 'post', data })
      .then((res) => {
        // eslint-disable-next-line no-console
        console.log(res);
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  return (
    <>
      <main className="main-container">
        <form
          className="contact-form"
          onSubmit={handleSubmit(feedbackFormSubmit)}
        >
          <div className="input-field">
            <label className="input-label" htmlFor="name">
              <p className="label-title">
                Your name:&nbsp;
                <span className="label-error">
                  {errors.name && 'Name required'}
                </span>
              </p>
              <input
                className="input-text"
                type="text"
                id="name"
                name="name"
                ref={register({ required: true })}
              />
            </label>
          </div>
          <div className="input-field">
            <label className="input-label" htmlFor="email">
              <p className="label-title">
                Email:&nbsp;
                <span className="label-error">
                  {errors.email && errors.email.message}
                </span>
              </p>
              <input
                className="input-text"
                type="text"
                id="email"
                name="email"
                ref={register({
                  required: 'Email required',
                  pattern: {
                    value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
                    message: 'Email should looks like email',
                  },
                })}
              />
            </label>
          </div>
          <div className="input-field">
            <label className="input-label" htmlFor="text">
              <p className="label-title">
                Feedback:&nbsp;
                <span className="label-error">
                  {errors.body && 'Body required'}
                </span>
              </p>
              <div className="input-with-area">
                <input
                  className="input-text"
                  type="text"
                  placeholder="Title"
                  name="title"
                  ref={register}
                />
                <textarea
                  className="input-area"
                  id="text"
                  placeholder="Body"
                  name="body"
                  onChange={onTextareaChange}
                  maxLength={maxTextAreaLength}
                  ref={register({ required: true })}
                />
                <div className="send-form">
                  <div className="area-count">
                    {textareaLength}
                    &nbsp;/&nbsp;
                    {maxTextAreaLength}
                  </div>
                  <button type="submit" className="send-btn">
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
};
