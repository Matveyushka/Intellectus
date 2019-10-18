import * as React from 'react';
import * as _ from 'lodash';
import { StepItem, Stepper } from '../Stepper';
import { generateInitialStepperData } from './helpers';
import { OptionTable } from '../OptionTable';
import { ProblemTable } from '../ProblemTable';
import { STEPPER_DIRECTION } from './constants';

export interface TestViewProps {
  onFinishButtonClick: () => void;
  userAnswers: number[];
  onUserAnswersUpdate: (newAnswers: number[]) => void;
  questions?: Question[] | null;
}

export interface Question {
  token: string;
  problemFields: string[];
  options: string[];
}

const stepperInitialData = generateInitialStepperData();

export const TestView = (props: TestViewProps): React.ReactElement => {
  const {
    onFinishButtonClick, userAnswers, onUserAnswersUpdate, questions,
  } = props;

  const [stepperData, setStepperData] = React.useState<StepItem[]>(stepperInitialData);

  const [stepIndex, setStepIndex] = React.useState<number>(0);

  const currentProblemFields = questions ? questions[stepIndex].problemFields : [];

  const currentOptions = questions ? questions[stepIndex].options : [];

  const selectedOptionIndex = userAnswers[stepIndex];

  const isTestFinished = userAnswers.every(_.isNumber);

  const handleOptionSelect = (optionIndex: number): void => {
    const newAnswers = userAnswers.map((item, index) => (
      index === stepIndex
        ? optionIndex
        : item
    ));

    onUserAnswersUpdate(newAnswers);

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
      const newAnswers = userAnswers.map((item, index) => (
        index === stepIndex
          ? selectedOptionIndex
          : item
      ));

      onUserAnswersUpdate(newAnswers);

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
          {isTestFinished
            ? (
              <button
                type="button"
                className="test-view-finish-button"
                onClick={onFinishButtonClick}
              >
              Finish!
              </button>
            )
            : (
            // заглушка, чтобы при появлении кнопки интерфейс не дергался
              <div className="test-view-finish-button" />
            )}
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
