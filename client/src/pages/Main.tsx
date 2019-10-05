/* eslint-disable jsx-a11y/control-has-associated-label */
import * as React from 'react';
import { MAIN_VIEW_TYPES } from '../constants';
import { Values } from '../commonTypes';
import { IntroView, TestView } from '../components';

type ViewTypes = Values<typeof MAIN_VIEW_TYPES>;

export const Main = (): React.ReactElement | null => {
  const [currentView, setCurrentView] = React.useState<ViewTypes>(MAIN_VIEW_TYPES.intro);
  const [userAnswers, setUserAnswers] = React.useState<number[]>([]);

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
          onFinishButtonClick={() => setCurrentView(MAIN_VIEW_TYPES.results)}
        />
      );
    }
    case MAIN_VIEW_TYPES.results: {
    // TODO: добавить ResultsView
      return null;
    }
    default: {
      return null;
    }
  }
};
