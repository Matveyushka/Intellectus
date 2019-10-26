import * as React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Footer, Graph } from '../components';
import { URLS } from '../constants';
import { Loader } from '../components/Loader';
import { formatTime } from '../components/TestView/helpers';

const averageTimesGraph = 'Distribution of average elapsed time by correct answers number';
const passedTestGraph = 'Distribution of passed test number by correct answers number';

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
  const [isLoading, setIsLoading] = React.useState(true);
  const [statisticsData, setStatisticsData] = React
    .useState<StatisticsProps>(
      defaultStatisticsData,
    );

  const loadStatisticsData = async (): Promise<void> => {
    setStatisticsData((await axios.get('/statistics')).data);

    setIsLoading(false);
  };

  const time = React.useMemo(() => formatTime(
      new Date(new Date(0, 0, 0, 0, 0, 0).getTime() + statisticsData.averageTime),
  ), [statisticsData]);

  React.useEffect(() => {
    if (isLoading === true) {
      loadStatisticsData();
    }
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      <main className="main-container">
        <div className="statistics-title textFont">
          {'The test was passed '}
          {statisticsData.passedTestsCounter}
          {' times with average time '}
          {time}
        </div>

        <div className="statistics-graphs">
          <Graph
            text={averageTimesGraph}
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
          <button type="button" className="statistics-but textFont">Try now</button>
        </NavLink>
      </main>
      <Footer />
    </>
  );
};
