import * as React from 'react';
import isNil from 'lodash/isNil';
import { useSelector } from 'react-redux';
import { toDataURL } from '../helpers';
import { State } from '../store';
import { MainState } from '../pages/Main/model';

export interface ProblemTableProps {
  rightAnswer?: string;
}

export const ProblemTable = (props: ProblemTableProps): React.ReactElement | null => {
  const { rightAnswer } = props;
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

        // Если есть правильный ответ, то показываем его
        if (rightAnswer !== undefined) {
          return (
            <img
              className="problem-cell right-answer"
              src={toDataURL(rightAnswer)}
              key={index.toString()}
            />
          );
        }

        if (isNil(item) && !isNil(userAnswers[stepIndex]) && questions) {
          return (
            <div key={index.toString()} className="problem-cell-wrapper">
              <img
                className="problem-cell empty preview"
                src={toDataURL(options[userAnswers[stepIndex]])}
              />
            </div>
          );
        }

        return null;
      })}
    </>
  );
};
