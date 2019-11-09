import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StepItem, Stepper } from './Stepper';
import { OptionTable } from './OptionTable';
import { ProblemTable } from './ProblemTable';
import { STEPPER_DIRECTION } from './TestView/constants';
import { Dispatch, State } from '../store';
import { formatTime } from './TestView/helpers';
import { MAIN_VIEW_TYPES } from '../constants';
import { ReportModal } from './ReportModal';
import { MainState } from '../pages/Main/model';

export const WatchResults = (): React.ReactElement => {
  const dispatch: Dispatch = useDispatch();

  const {
    questions,
    userAnswers,
    stepIndex,
    solutions,
    resultTime = new Date(0, 0, 0),
  } = useSelector<State, MainState>(state => state.main);

  const stepperInitialData: StepItem[] = userAnswers.map((item, index) => ({
    text: index.toString(),
    isCompleted: true,
    isFailed: solutions ? solutions[index] !== item : true,
  }));
  const [stepperData] = React.useState<StepItem[]>(stepperInitialData);
  const isModalOpen = useSelector<State, boolean>(state => state.modal);

  const currentOptions = questions ? questions[stepIndex].options : [];
  const rightAnswerIndex = solutions ? solutions[stepIndex] : 0;

  const handlePrevNextButtonClick = (direction: number): void => {
    dispatch.main.setStepIndex(stepIndex + direction);
  };

  const handleResultsButtonClick = (): void => {
    dispatch.main.setCurrentView(MAIN_VIEW_TYPES.results);
  };

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
          <div className="test-view-body">
            <h1 className="problem-title">Problem:</h1>
            <div className="problem-wrapper">
              <ProblemTable
                rightAnswer={currentOptions[rightAnswerIndex]}
              />
            </div>
            <div className="test-view-separator" />
            <h1 className="problem-title options">Options:</h1>
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
              onClick={() => dispatch.modal.showModal()}
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
        onClick={(_item, index) => dispatch.main.setStepIndex(index)}
      />
      {isModalOpen && <ReportModal />}
    </div>
  );
};
