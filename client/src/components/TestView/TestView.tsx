import * as React from 'react';
import * as _ from 'lodash';
import { StepItem, Stepper } from '../Stepper';
import { generateInitialStepperData } from './helpers';
import { OptionTable } from '../OptionTable';
import { ProblemTable } from '../ProblemTable';

export interface TestViewProps {
  onFinishButtonClick: (answers: number[]) => void;
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

  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState<number | null>(null);

  const currentProblemFields = questions ? questions[stepIndex].problemFields : [];

  const currentOptions = questions ? questions[stepIndex].options : [];

  const handleOptionSelect = (optionIndex: number): void => {
    setSelectedOptionIndex(optionIndex);
  };

  const handleNextTaskButtonClick = (): void => {
    if (_.isNil(selectedOptionIndex)) return;
    const newAnswers = [...userAnswers, selectedOptionIndex];

    if (stepIndex === stepperData.length - 1) {
      onFinishButtonClick(newAnswers);

      return;
    }

    onUserAnswersUpdate(newAnswers);

    setStepperData(stepperData.map((item, index) => {
      if (index === stepIndex) {
        return {
          ...item,
          isCompleted: true,
        };
      }

      return item;
    }));

    setStepIndex(stepIndex + 1);

    setSelectedOptionIndex(null);
  };

  return (
    <div className="test-view">
      <div className="test-view-layout">
        <div className="test-view-aside" />
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
        </div>
        <div className="test-view-aside">
          {!_.isNil(selectedOptionIndex) && (
            <button
              type="button"
              className="test-view-next-button"
              onClick={handleNextTaskButtonClick}
            >
              {stepIndex === stepperData.length - 1 ? 'Finish' : 'Next'}
            </button>
          )}
        </div>
      </div>
      <Stepper data={stepperData} value={stepperData[stepIndex]} />
    </div>
  );
};
