/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import * as React from 'react';
import axios from 'axios';
import * as _ from 'lodash';
import { StepItem, Stepper } from '../Stepper';
import { generateInitialStepperData } from './helpers';
import { OptionTable } from '../OptionTable';
import { ProblemTable } from '../ProblemTable';

export interface TestViewProps {
  onFinishButtonClick: (token: string, answers: number[]) => void;
  userAnswers: number[];
  onUserAnswersUpdate: (newAnswers: number[]) => void;
}

export interface Question {
  token: string;
  problems: string[];
  options: string[];
}

const stepperInitialData = generateInitialStepperData();

export const TestView = (props: TestViewProps): React.ReactElement => {
  const { onFinishButtonClick, userAnswers, onUserAnswersUpdate } = props;

  const [stepperData, setStepperData] = React.useState<StepItem[]>(stepperInitialData);

  const [stepIndex, setStepIndex] = React.useState<number>(0);

  const [questions, setQuestions] = React.useState<Question[] | null>(null);

  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState<number | null>(null);

  const [token, setToken] = React.useState<string>('');

  React.useEffect(() => {
    axios.get('/questions')
      .then((res) => {
        setToken(res.data.token);

        setQuestions(res.data.questions);
      })
      .catch((err: Error) => {
        throw err;
      });
  }, []);

  const currentProblems = questions ? questions[stepIndex].problems : [];

  const currentOptions = questions ? questions[stepIndex].options : [];

  const handleOptionSelect = (optionIndex: number): void => {
    setSelectedOptionIndex(optionIndex);
  };

  const handleNextTaskButtonClick = (): void => {
    if (_.isNil(selectedOptionIndex)) return;
    const newAnswers = [...userAnswers, selectedOptionIndex];

    if (stepIndex === stepperData.length - 1) {
      onFinishButtonClick(token, newAnswers);

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
      <div className="test-view-header">
        <h1 className="problem-title">Problem:</h1>
        <h1 className="problem-title options">Options:</h1>
      </div>
      <div className="test-view-body">
        <div className="problem-wrapper">
          <ProblemTable problems={currentProblems} />
        </div>
        <div className="test-view-separator" />
        <div className="option-wrapper">
          <OptionTable
            options={currentOptions}
            selectedIndex={selectedOptionIndex}
            onSelect={handleOptionSelect}
          />
        </div>
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
      <Stepper data={stepperData} value={stepperData[stepIndex]} />
    </div>
  );
};
