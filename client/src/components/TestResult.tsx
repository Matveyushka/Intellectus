import * as React from 'react';
import { useSelector } from 'react-redux';
import { StatisticChart } from './StatisticChart';
import { Stepper } from './Stepper';
import { MainState } from '../pages/Main/initialState';
import { State } from '../store';

export const TestResult = (): React.ReactElement => {
  const {
    userAnswers,
    solutions = [],
    pointsDistribution = [],
  } = useSelector<State, MainState>(state => state.main);

  const answers: boolean[] = userAnswers.map((item, index) => solutions[index] === item);
  const solutionsCount: number = answers.reduce((accum, item) => (item ? accum + 1 : accum), 0);
  const stepperData = answers.map((item, index) => ({
    text: index.toString(),
    isCompleted: true,
    isFailed: !item,
  }));

  return (
    <>
      <div className="test-result">
        <h2 className="test-title">
          Your result is&nbsp;
          {solutionsCount}
          &nbsp;out of&nbsp;
          {answers.length}
        </h2>
        <StatisticChart rows={pointsDistribution} chosenRowIndex={solutionsCount} />
        <div className="test-hint">you are here</div>
      </div>
      <Stepper data={stepperData} />
    </>
  );
};
