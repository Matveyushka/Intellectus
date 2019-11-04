import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Footer, Graph } from '../../components';
import { URLS } from '../../constants';
import { Loader } from '../../components/Loader';
import { formatTime } from '../../components/TestView/helpers';
import { Dispatch, State } from '../../store';
import { averageTimeGraph, passedTestGraph } from './constants';
import { statistics, StatisticsState } from './model';

export const Statistics = (): React.ReactElement | null => {
  const dispatch: Dispatch = useDispatch();

  const {
    averageTime, averageTimeDistribution, passedTestsCounter, pointsDistribution, isLoading,
  } = useSelector<State, StatisticsState>(state => state.statistics);

  React.useEffect((): () => void => {
    dispatch.statistics.getStatistics();

    return () => dispatch.statistics.setStatistics(statistics.state);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <main className="main-container">
        <div className="statistics-title text-font">
          {'The test was passed '}
          {passedTestsCounter}
          {' times with average time '}
          {averageTime && formatTime(averageTime)}
        </div>
        <div className="statistics-graphs">
          <Graph
            text={averageTimeGraph}
            arrayGraph={averageTimeDistribution}
          />
          <Graph
            text={passedTestGraph}
            arrayGraph={pointsDistribution}
          />
        </div>
        <NavLink
          to={URLS.main}
          exact
        >
          <button type="button" className="statistics-button textFont">Try now</button>
        </NavLink>
      </main>
      <Footer />
    </>
  );
};
