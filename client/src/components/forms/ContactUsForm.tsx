import * as React from 'react';
import useForm from 'react-hook-form';
import mergeClassNames from 'classnames';

export interface ContactUsFormProps {
  feedbackFormSubmit: (data: Record<string, string>) => void;
  data: Record<string, string>;
}

export const ContactUsForm = ({
  data,
  feedbackFormSubmit,
}: ContactUsFormProps): React.ReactElement | null => {
  const {
    register,
    handleSubmit,
    errors,
    clearError,
  } = useForm({
    mode: 'onBlur',
    defaultValues: data,
  });

  const [textareaLength, setTextareaLength] = React.useState<number>(0);
  const maxTextAreaLength = 300;

  const onTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    setTextareaLength(event.target.value.length);
  };

  React.useEffect(() => {
    setTextareaLength(data.body ? data.body.length : textareaLength);
  }, []);

  return (
    <form className="contact-form" onSubmit={handleSubmit(feedbackFormSubmit)}>
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
                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/,
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
              'label-error': errors.body,
            })}
          >
            Feedback:
          </p>
          <div
            className={mergeClassNames('input-with-area', {
              'border-error': errors.body,
            })}
          >
            <input
              className={mergeClassNames('input-text', {
                'border-error': errors.body,
              })}
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
