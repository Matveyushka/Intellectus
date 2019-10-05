import * as React from 'react';
import mergeClassNames from 'classnames';
import { StatisticChart } from './StatisticChart';

export interface TestResultProps {
  statistics: number[];
  rightAnswers: number[];
  userAnswers: number[];
}

export const TestResult = (props: TestResultProps): React.ReactElement => {
  const { userAnswers, rightAnswers, statistics = [0, 3, 6, 2] } = props;

  const answers: boolean[] = userAnswers.map((v, i) => rightAnswers[i] === v);
  const rightAnswersCount: number = answers.reduce((t, v) => (v ? t + 1 : t), 0);

  return (
    <div className="test-result">
      <h2 className="test-title">
        Your result is&nbsp;
        {rightAnswersCount}
        &nbsp;out of&nbsp;
        {answers.length}
      </h2>
      <StatisticChart rows={statistics} chosenRowIndex={rightAnswersCount} />
      <div className="test-hint">you are here</div>
      <div className="test-thumbs">
        {answers.map((value, index) => (
          <div
            key={index.toString()}
            className={mergeClassNames('test-thumb', {
              cross: !value,
            })}
          />
        ))}
      </div>
    </div>
  );
};
