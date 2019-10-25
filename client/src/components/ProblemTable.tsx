import * as React from 'react';
import isNil from 'lodash/isNil';
import { useSelector } from 'react-redux';
import { toDataURL } from '../helpers';
import { MainState } from '../pages/Main/initialState';
import { State } from '../store';

export const ProblemTable = (): React.ReactElement | null => {
  const { userAnswers, questions, stepIndex } = useSelector<State, MainState>(state => state.main);

  if (!questions) return null;

  const { problemFields, options } = questions[stepIndex];

  return (
    <>
      {problemFields.map((item, index) => {
        if (item) {
          return (
            <img
              className="problem-cell"
              src={item ? toDataURL(item) : undefined}
              key={index.toString()}
            />
          );
        }

        // img без src отображает заглушку, поэтому используем div
        if (isNil(item) && isNil(userAnswers[stepIndex])) {
          return (
            <div
              className="problem-cell empty"
              key={index.toString()}
            />
          );
        }

        if (isNil(item) && !isNil(userAnswers[stepIndex]) && questions) {
          return (
            <div className="problem-cell-wrapper">
              <img
                className="problem-cell empty preview"
                src={toDataURL(options[userAnswers[stepIndex]])}
                key={index.toString()}
              />
            </div>
          );
        }

        return null;
      })}
    </>
  );
};
