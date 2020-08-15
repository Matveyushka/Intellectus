import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Footer, Graph, Header } from '../../components';
import { URLS } from '../../constants';
import { Loader } from '../../components/Loader';
import { formatTime } from '../../components/TestView/helpers';
import { Dispatch, State } from '../../store';
import { averageTimeGraph, passedTestGraph } from './constants';
import { statistics, StatisticsState } from './model';

export interface StatisticsProps {
  location: Location;
}

export const Statistics = (props: StatisticsProps): React.ReactElement | null => {
  const { location } = props;

  const dispatch: Dispatch = useDispatch();

  const {
    averageTime, averageTimeDistribution, passedTestsCounter, pointsDistribution, isLoading,
  } = useSelector<State, StatisticsState>(state => state.statistics);

  React.useEffect((): () => void => {
    dispatch.statistics.getStatistics();

    return () => dispatch.statistics.setStatistics(statistics.state);
  }, []);

  return (
    <div className="main-layout">
      <div className="intro">
        <Header location={location} />
      </div>
      {
        isLoading ?
          <Loader /> :
          <main className="main-container statistics-content">
            <div className="statistics-title text-font">
              {'The test was passed\u00A0'}
              {passedTestsCounter}
              {'\u00A0times with average time\u00A0'}
              {averageTime && formatTime(averageTime)}
            </div>
            <div className="statistics-graphs">
              <Graph
                className="graph1"
                text={averageTimeGraph}
                arrayGraph={averageTimeDistribution}
              />
              <Graph
                className="graph2"
                text={passedTestGraph}
                arrayGraph={pointsDistribution}
              />
            </div>
            <div className="statistics-button">
              <NavLink
                to={URLS.main}
                exact
              >
                <button type="button" className="statistics-button-text textFont">Try now</button>
              </NavLink>
            </div>
          </main>
      }



      <div className="statistics-footer">
        <Footer />
      </div>
    </div>
  );
};
