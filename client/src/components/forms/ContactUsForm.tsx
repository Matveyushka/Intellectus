import * as React from 'react';
import useForm from 'react-hook-form';
import mergeClassNames from 'classnames';

export interface DefaultContactData {
  email?: string;
  title?: string;
  name?: string;
  body?: string;
}

export interface ContactUsFormProps {
  feedbackFormSubmit: (data: DefaultContactData) => void;
  data: DefaultContactData;
}

export const ContactUsForm = ({
  data,
  feedbackFormSubmit,
}: ContactUsFormProps): React.ReactElement | null => {
  const {
    register, handleSubmit, errors, clearError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: data,
  });

  const [textareaLength, setTextareaLength] = React.useState<number>(
    data.body ? data.body.length : 0,
  );
  const maxTextAreaLength = 300;

  const onTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setTextareaLength(event.target.value.length);
  };

  return (
    <form className="contact-form common-form" onSubmit={handleSubmit(feedbackFormSubmit)}>
      <div className="input-field">
        <label className="input-label" htmlFor="name">
          <p
            className={mergeClassNames('label-title', {
              'label-error': errors.name,
            })}
          >
            Your name:
          </p>
          <input
            className={mergeClassNames('input-text', {
              'border-error': errors.name,
            })}
            type="text"
            id="name"
            name="name"
            onFocus={() => clearError('name')}
            ref={register({ required: true })}
          />
        </label>
      </div>
      <div className="input-field">
        <label className="input-label" htmlFor="email">
          <p
            className={mergeClassNames('label-title', {
              'label-error': errors.email,
            })}
          >
            Email:&nbsp;
            {errors.email && errors.email.message}
          </p>
          <input
            className={mergeClassNames('input-text', {
              'border-error': errors.email,
            })}
            type="text"
            id="email"
            name="email"
            onFocus={() => clearError('email')}
            ref={register({
              required: true,
              pattern: {
                // eslint-disable-next-line max-len
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'should looks like email',
              },
            })}
          />
        </label>
      </div>
      <div className="input-field">
        <label className="input-label" htmlFor="text">
          <p
            className={mergeClassNames('label-title', {
              'label-error': errors.body || errors.title,
            })}
          >
            Feedback:
          </p>
          <div
            className={mergeClassNames('input-with-area', {
              'border-error': errors.body || errors.title,
            })}
          >
            <input
              className={mergeClassNames('input-text', {
                'border-error': errors.body || errors.title,
              })}
              type="text"
              placeholder="Title"
              name="title"
              onFocus={() => clearError('title')}
              ref={register({ required: true })}
            />
            <textarea
              className="input-area"
              id="text"
              placeholder="Body"
              name="body"
              onChange={onTextareaChange}
              maxLength={maxTextAreaLength}
              onFocus={() => clearError('body')}
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
  );
};
