import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Footer, Graph } from '../components';
import { URLS } from '../constants';
import { Loader, LoaderState } from '../components/Loader';
import { hideLoader, showLoader } from '../components/Loader/actions';
import { formatTime } from '../components/TestView/helpers';
import { State } from '../store';

const passedTestGraph = 'Distribution of passed test number by correct answers number';
const averageTimeGraph = 'Distribution of average elapsed time by correct answers number';
const zeroTime = new Date(0, 0, 0).getTime();

interface StatisticsProps {
  passedTestsCounter: number;
  averageTime: number;
  pointsDistribution: number[];
  averageTimeDistribution: number[];
}

const defaultStatisticsData: StatisticsProps = {
  passedTestsCounter: 0,
  averageTime: 0,
  pointsDistribution: [],
  averageTimeDistribution: [],
};

export const Statistics = (): React.ReactElement | null => {
  const { isLoading } = useSelector<State, LoaderState>(state => state.loader);
  const dispatch = useDispatch();
  const [statisticsData, setStatisticsData] = React
    .useState<StatisticsProps>(
      defaultStatisticsData,
    );

  const time = React.useMemo(() => formatTime(
    new Date(zeroTime + statisticsData.averageTime),
  ), [statisticsData]);

  React.useEffect(() => {
    dispatch(showLoader());

    axios.get('/statistics').then((res) => {
      setStatisticsData(res.data);

      dispatch(hideLoader());
    });
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <main className="main-container">
        <div className="statistics-title text-font">
          {'The test was passed '}
          {statisticsData.passedTestsCounter}
          {' times with average time '}
          {time}
        </div>

        <div className="statistics-graphs">
          <Graph
            text={averageTimeGraph}
            arrayGraph={statisticsData.averageTimeDistribution}
          />
          <Graph
            text={passedTestGraph}
            arrayGraph={statisticsData.pointsDistribution}
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
