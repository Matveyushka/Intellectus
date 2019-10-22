import * as React from 'react';
import { useSelector } from 'react-redux';
import { MAIN_VIEW_TYPES } from '../../constants';
import { IntroView, TestView } from '../../components';
import { TestResult } from '../../components/TestResult';
import { Loader, LoaderState } from '../../components/Loader';
import { State } from '../../store';
import { MainState } from './initialState';

export const Main = (): React.ReactElement | null => {
  const { isLoading } = useSelector<State, LoaderState>(state => state.loader);
  const { currentView } = useSelector<State, MainState>(state => state.main);

  if (isLoading) return <Loader />;

  switch (currentView) {
    case MAIN_VIEW_TYPES.intro: {
      return (
        <IntroView />
      );
    }

    case MAIN_VIEW_TYPES.test: {
      return (
        <TestView />
      );
    }

    case MAIN_VIEW_TYPES.results: {
      return (
        <TestResult />
      );
    }

    default: {
      return null;
    }
  }
};
