import * as React from 'react';
import isNumber from 'lodash/isNumber';
import random from 'lodash/random';
import { useDispatch, useSelector } from 'react-redux';
import { StepItem, Stepper } from '../Stepper';
import { adjustSecond, formatTime, generateInitialStepperData } from './helpers';
import { OptionTable } from '../OptionTable';
import { ProblemTable } from '../ProblemTable';
import { STEPPER_DIRECTION } from './constants';
import { Dispatch, State } from '../../store';
import { useInterval } from '../../helpers';
import { MainState } from '../../pages/Main/model';

const stepperInitialData = generateInitialStepperData();

export const TestView = (): React.ReactElement => {
  const dispatch: Dispatch = useDispatch();

  const {
    userAnswers, stepIndex,
  } = useSelector<State, MainState>(state => state.main);

  const [stepperData, setStepperData] = React.useState<StepItem[]>(stepperInitialData);
  const [time, setTime] = React.useState<Date>(new Date(1, 1, 1, 0, 0, 0));

  const selectedOptionIndex = userAnswers[stepIndex];
  const isTestFinished = userAnswers.every(isNumber);

  useInterval(() => setTime(adjustSecond(time)), 1000);

  const handleOptionSelect = (optionIndex: number): void => {
    const newAnswers = userAnswers.map((item, index) => (
      index === stepIndex
        ? optionIndex
        : item
    ));

    dispatch.main.setUserAnswers(newAnswers);

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

    dispatch.main.setStepIndex(stepIndex + direction);
  };

  const handleFinishButtonClick = (): void => {
    dispatch.main.setResultTime(time);

    dispatch.main.getResults();
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
              <ProblemTable />
            </div>
            <div className="test-view-separator" />
            <h1 className="problem-title options">Options:</h1>
            <div className="option-wrapper">
              <OptionTable
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
            {process.env.NODE_ENV === 'development' && !isTestFinished && (
              // данный код удаляется вебпаком при сборке
              <button
                type="button"
                className="test-view-finish-button instantly"
                onClick={() => {
                  const newAnswers = Array.from(Array(12), () => random(0, 5));

                  dispatch.main.setUserAnswers(
                    userAnswers.map((item, index) => item ?? newAnswers[index]),
                  );

                  dispatch.main.getResults();
                }}
              >
                Finish Instantly
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
        onClick={(_item, index) => dispatch.main.setStepIndex(index)}
      />
    </div>
  );
};
