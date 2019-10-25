import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StepItem, Stepper } from './Stepper';
import { OptionTable } from './OptionTable';
import { ProblemTable } from './ProblemTable';
import { STEPPER_DIRECTION } from './TestView/constants';
import { setStepIndex, setCurrentView } from '../pages/Main/actions';
import { MainState } from '../pages/Main/initialState';
import { State } from '../store';
import { formatTime } from './TestView/helpers';
import { MAIN_VIEW_TYPES } from '../constants';

export interface Question {
  token: string;
  problemFields: string[];
  options: string[];
}

export const WatchResults = (): React.ReactElement => {
  const dispatch = useDispatch();

  const {
    questions,
    userAnswers,
    stepIndex,
    solutions,
    resultTime = new Date(1, 1, 1, 0, 0, 0),
  } = useSelector<State, MainState>(state => state.main);
  const stepperInitialData: StepItem[] = userAnswers.map((v, i) => ({
    text: i.toString(),
    isCompleted: true,
    isFailed: solutions ? solutions[i] !== v : true,
  }));
  const [stepperData] = React.useState<StepItem[]>(stepperInitialData);

  const currentOptions = questions ? questions[stepIndex].options : [];
  const rightAnswerIndex = solutions ? solutions[stepIndex] : 0;

  const handlePrevNextButtonClick = (direction: number): void => {
    dispatch(setStepIndex(stepIndex + direction));
  };

  const handleResultsButtonClick = (): void => {
    dispatch(setCurrentView(MAIN_VIEW_TYPES.results));
  };

  // TODO Добавить реализацию ReportModal
  const handleReportButtonClick = (): void => {};

  return (
    <div className="test-view">
      <div className="test-view-layout">
        <div className="test-view-aside left">
          {stepIndex > 0 && (
            <button
              type="button"
              className="test-view-prev-button"
              onClick={() => handlePrevNextButtonClick(STEPPER_DIRECTION.backward)}
            />
          )}
        </div>
        <div className="test-view-content">
          <div className="test-view-header">
            <h1 className="problem-title">Problem:</h1>
            <h1 className="problem-title options">Options:</h1>
          </div>
          <div className="test-view-body">
            <div className="problem-wrapper">
              <ProblemTable
                rightAnswer={currentOptions[rightAnswerIndex]}
              />
            </div>
            <div className="test-view-separator" />
            <div className="option-wrapper">
              <OptionTable
                rightAnswerIndex={rightAnswerIndex}
              />
            </div>
          </div>
          <div className="test-view-bottom">
            <span className="test-view-timer">{formatTime(resultTime)}</span>
            <button
              type="button"
              className="test-view-finish-button"
              onClick={handleResultsButtonClick}
            >
              Results
            </button>
            <button
              type="button"
              className="test-view-report-button"
              onClick={handleReportButtonClick}
            >
              Report
            </button>
          </div>
        </div>
        <div className="test-view-aside right">
          {stepIndex < stepperData.length - 1 && (
            <button
              type="button"
              className="test-view-next-button"
              onClick={() => handlePrevNextButtonClick(STEPPER_DIRECTION.forward)}
            />
          )}
        </div>
      </div>
      <Stepper
        data={stepperData}
        value={stepperData[stepIndex]}
        onClick={(_item, index) => dispatch(setStepIndex(index))}
      />
    </div>
  );
};
