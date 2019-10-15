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
  const [shouldFetchQuestions, setShouldFetchQuestions] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [shouldFetchAnswers, setShouldFetchAnswers] = React.useState<boolean>(false);

  const { token, questions } = useFetch<QuestionsFetchResult>({
    url: '/questions',
    shouldFetch: shouldFetchQuestions,
    onLoad: () => setIsLoading(false),
  });
  const { solutions, pointsDistribution } = useFetch<AnswersFetchResult>({
    url: '/answers',
    shouldFetch: shouldFetchAnswers,
    onLoad: () => setIsLoading(false),
    config: { method: 'post', data: { token, answers: userAnswers } },
  });

  const onFinishButtonClick = (answers: number[]): void => {
    setUserAnswers(answers);

    setShouldFetchAnswers(true);

    setCurrentView(MAIN_VIEW_TYPES.results);

    setIsLoading(true);
  };

  const handlePlayButtonClick = (): void => {
    setShouldFetchQuestions(true);

    setCurrentView(MAIN_VIEW_TYPES.test);

    setIsLoading(true);
  };

  if (isLoading) return <Loader />;

  switch (currentView) {
    case MAIN_VIEW_TYPES.intro: {
      return (
        <IntroView
          onPlayButtonClick={handlePlayButtonClick}
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
