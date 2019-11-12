import * as React from 'react';
import mergeClassNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { StatisticChart } from './StatisticChart';
import { Stepper } from './Stepper';
import { Dispatch, State } from '../store';
import { MAIN_VIEW_TYPES } from '../constants';
import { MainState } from '../pages/Main/model';

export const TestResult = (): React.ReactElement => {
  const dispatch: Dispatch = useDispatch();

  React.useEffect((): void => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.Sharer.init();
  }, []);

  const [isShareOpen, setIsShareOpen] = React.useState<boolean>(false);

  const shareClassNames = mergeClassNames('share-buttons', 'result', {
    hidden: !isShareOpen,
  });

  const shareSeparatorClassName = mergeClassNames('share-separator', 'result', {
    hidden: !isShareOpen,
  });

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
      <Stepper
        data={stepperData}
        onClick={(_item, index) => {
          dispatch.main.setStepIndex(index);

          dispatch.main.setCurrentView(MAIN_VIEW_TYPES.watch);
        }}
      />
      <button
        type="button"
        title="Share this site with your friends!"
        className="share-icon result"
        onClick={() => setIsShareOpen(!isShareOpen)}
      />
      <div className={shareSeparatorClassName} />
      <div className={shareClassNames}>
        <button
          type="button"
          data-sharer="twitter"
          className="twitter"
          data-title={`My score at Intellectus is ${solutionsCount} of 12!`}
          data-hashtags="intellectus, iq, test"
          data-url="https://intellectus-demo.herokuapp.com/"
        />
        <button
          type="button"
          className="facebook"
          data-sharer="facebook"
          data-hashtag="intellectus"
          data-url="https://intellectus-demo.herokuapp.com/"
        />
        <button
          type="button"
          className="vk"
          data-sharer="vk"
          data-title={`My score at Intellectus is ${solutionsCount} of 12!`}
          data-url="https://intellectus-demo.herokuapp.com/"
        />
      </div>
    </>
  );
};
