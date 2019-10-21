import * as React from 'react';
import * as _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { StepItem, Stepper } from '../Stepper';
import { adjustSecond, formatTime, generateInitialStepperData } from './helpers';
import { OptionTable } from '../OptionTable';
import { ProblemTable } from '../ProblemTable';
import { STEPPER_DIRECTION } from './constants';
import { getResults, setUserAnswers } from '../../pages/Main/actions';
import { MainState } from '../../pages/Main/initialState';
import { State } from '../../store';
import { useInterval } from '../../helpers';

export interface Question {
  token: string;
  problemFields: string[];
  options: string[];
}

const stepperInitialData = generateInitialStepperData();

export const TestView = (): React.ReactElement => {
  const dispatch = useDispatch();

  const { questions, token, userAnswers } = useSelector<State, MainState>(state => state.main);

  const [stepperData, setStepperData] = React.useState<StepItem[]>(stepperInitialData);
  const [stepIndex, setStepIndex] = React.useState<number>(0);
  const [time, setTime] = React.useState<Date>(new Date(1, 1, 1, 0, 0, 0));

  const currentProblemFields = questions ? questions[stepIndex].problemFields : [];
  const currentOptions = questions ? questions[stepIndex].options : [];
  const selectedOptionIndex = userAnswers[stepIndex];
  const isTestFinished = userAnswers.every(_.isNumber);

  useInterval(() => setTime(adjustSecond(time)), 1000);

  const handleOptionSelect = (optionIndex: number): void => {
    const newAnswers = userAnswers.map((item, index) => (
      index === stepIndex
        ? optionIndex
        : item
    ));

    dispatch(setUserAnswers(newAnswers));

    setStepperData(stepperData.map((item, index) => (
      index === stepIndex
        ? ({
          ...item,
          isCompleted: true,
        })
        : item
    )));
  };

  const handlePrevNextButtonClick = (direction: number): void => {
    if (selectedOptionIndex) {
      setStepperData(stepperData.map((item, index) => (
        index === stepIndex
          ? ({
            ...item,
            isCompleted: true,
          })
          : item
      )));
    }

    setStepIndex(stepIndex + direction);
  };

  const handleFinishButtonClick = (): void => {
    if (token && userAnswers) {
      dispatch(getResults({ token, answers: userAnswers }));
    }
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
          <div className="test-view-header">
            <h1 className="problem-title">Problem:</h1>
            <h1 className="problem-title options">Options:</h1>
          </div>
          <div className="test-view-body">
            <div className="problem-wrapper">
              <ProblemTable problemFields={currentProblemFields} />
            </div>
            <div className="test-view-separator" />
            <div className="option-wrapper">
              <OptionTable
                options={currentOptions}
                selectedIndex={selectedOptionIndex}
                onSelect={handleOptionSelect}
              />
            </div>
          </div>
          <div className="test-view-bottom">
            <span className="test-view-timer">{formatTime(time)}</span>
            {isTestFinished && (
              <button
                type="button"
                className="test-view-finish-button"
                onClick={handleFinishButtonClick}
              >
                Finish
              </button>
            )}
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
        onClick={(_item, index) => setStepIndex(index)}
      />
    </div>
  );
};
