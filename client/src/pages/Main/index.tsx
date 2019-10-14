import * as React from 'react';
import { MAIN_VIEW_TYPES } from '../../constants';
import { Values } from '../../commonTypes';
import { IntroView, TestView } from '../../components';
import { TestResult } from '../../components/TestResult';
import { Loader } from '../../components/Loader';
import { Question } from '../../components/TestView/TestView';
import { useFetch } from './hooks';

type ViewTypes = Values<typeof MAIN_VIEW_TYPES>;

export interface QuestionsFetchResult {
  token: string;
  questions: Question[];
}

export interface AnswersFetchResult {
  solutions: number[];
  pointsDistribution: number[];
}

export const Main = (): React.ReactElement | null => {
  const [currentView, setCurrentView] = React.useState<ViewTypes>(MAIN_VIEW_TYPES.intro);
  const [userAnswers, setUserAnswers] = React.useState<number[]>([]);
  const [shouldFetchAnswers, setShouldFetchAnswers] = React.useState<boolean>(false);

  const [isTestLoading, { token, questions }] = useFetch<QuestionsFetchResult>(
    '/questions',
    currentView === MAIN_VIEW_TYPES.test,
  );
  const [isResultLoading, { solutions, pointsDistribution }] = useFetch<AnswersFetchResult>(
    '/answers',
    shouldFetchAnswers,
    { method: 'post', data: { token, answers: userAnswers } },
  );

  const isLoading = isTestLoading || isResultLoading;

  const onFinishButtonClick = (answers: number[]): void => {
    setUserAnswers(answers);

    setCurrentView(MAIN_VIEW_TYPES.results);

    setShouldFetchAnswers(true);
  };

  if (isLoading) return <Loader />;

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
          questions={questions}
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
          solutions={solutions}
          pointsDistribution={pointsDistribution}
        />
      );
    }
    default: {
      return null;
    }
  }
};
