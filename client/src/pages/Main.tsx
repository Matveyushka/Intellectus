/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import axios from 'axios';
import { MAIN_VIEW_TYPES } from '../constants';
import { Values } from '../commonTypes';
import { IntroView, TestView } from '../components';
import { TestResult } from '../components/TestResult';

type ViewTypes = Values<typeof MAIN_VIEW_TYPES>;

export const Main = (): React.ReactElement | null => {
  const [currentView, setCurrentView] = React.useState<ViewTypes>(MAIN_VIEW_TYPES.intro);
  const [userAnswers, setUserAnswers] = React.useState<number[]>([]);
  const [rightAnswers, setRightAnswers] = React.useState<number[]>([]);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [statistics, setStatistics] = React.useState<number[]>([]);

  const onFinishButtonClick = (token: string, answers: number[]): void => {
    axios
      .post('/answers', {
        token,
        answers,
      })
      .then((res) => {
        setUserAnswers(answers);

        setRightAnswers(res.data.rightOptions);

        setCurrentView(MAIN_VIEW_TYPES.results);
      })
      .catch((err: Error) => {
        throw err;
      });
  };

  switch (currentView) {
    case MAIN_VIEW_TYPES.intro: {
      return (
        <IntroView
          onPlayButtonClick={() => setCurrentView(MAIN_VIEW_TYPES.test)}
        />
      );
    }
    case MAIN_VIEW_TYPES.test: {
      return (
        <TestView
          userAnswers={userAnswers}
          onUserAnswersUpdate={setUserAnswers}
          onFinishButtonClick={onFinishButtonClick}
        />
      );
    }
    case MAIN_VIEW_TYPES.results: {
      return (
        <TestResult
          userAnswers={userAnswers}
          rightAnswers={rightAnswers}
          statistics={statistics}
        />
      );
    }
    default: {
      return null;
    }
  }
};
