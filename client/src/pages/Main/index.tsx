import * as React from 'react';
import { useSelector } from 'react-redux';
import mergeClassNames from 'classnames';
import { MAIN_VIEW_TYPES } from '../../constants';
import { Header, IntroView, TestView } from '../../components';
import { TestResult } from '../../components/TestResult';
import { WatchResults } from '../../components/WatchResults';
import { Loader } from '../../components/Loader';
import { State } from '../../store';
import { MainState } from './model';

export interface MainProps {
  location: Location;
}

export const Main = (props: MainProps): React.ReactElement | null => {
  const { location } = props;

  const isLoading = useSelector<State, boolean>(state => state.loader);
  const isModalOpen = useSelector<State, boolean>(state => state.modal);
  const { currentView } = useSelector<State, MainState>(state => state.main);

  const getContent = (): React.ReactElement | null => {
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

  const mainClassNames = mergeClassNames(
    'main-layout',
    { intro: currentView === MAIN_VIEW_TYPES.intro },
  );

  return (
    <div className={mainClassNames}>
      <Header location={location} />
      {getContent()}
    </div>
  );
};
