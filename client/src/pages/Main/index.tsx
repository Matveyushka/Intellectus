import * as React from 'react';
import { useSelector } from 'react-redux';
import { MAIN_VIEW_TYPES } from '../../constants';
import { IntroView, TestView } from '../../components';
import { TestResult } from '../../components/TestResult';
import { WatchResults } from '../../components/WatchResults';
import { Loader } from '../../components/Loader';
import { State } from '../../store';
import { MainState } from './initialState';
import { LoaderState } from '../../components/Loader/initialState';
import { ModalState } from '../../components/Modal';

export const Main = (): React.ReactElement | null => {
  const { isLoading } = useSelector<State, LoaderState>(state => state.loader);
  const { isModalOpen } = useSelector<State, ModalState>(state => state.modal);
  const { currentView } = useSelector<State, MainState>(state => state.main);

  if (!isModalOpen && isLoading) return <Loader />;

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

    case MAIN_VIEW_TYPES.watch: {
      return (
        <WatchResults />
      );
    }

    default: {
      return null;
    }
  }
};
