import * as React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { Footer } from '../components';
import { StatisticChart } from '../components/StatisticChart';
import { URLS } from '../constants';
import { Loader } from '../components/Loader';

const averageTimesGraph = 'Distribution of average elapsed time by correct answers number';
const passedTestGraph = 'Distribution of passed test number by correct answers number';

interface StatisticsProps {
  passedTestsCounter: number;
  averageTime: number;
  pointsDistribution: [];
  averageTimeDistribution: [];
}
const defaultStatisticsData: StatisticsProps = {
  passedTestsCounter: 0,
  averageTime: 0,
  pointsDistribution: [],
  averageTimeDistribution: [],
};

const graphComponent = (text: string, arrayGraph: []): React.ReactElement | null => (
  <>
    <div className="statistics-graphWithText">
      <StatisticChart rows={arrayGraph} chosenRowIndex={arrayGraph.length} />
      <div className="graphtext textFont">
        {text}
      </div>
    </div>
  </>
);

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

  React.useEffect(() => {
    if (isLoading === true) {
      loadStatisticsData();
    }
  }, []);

  const formatTime = (): string => {
    const hours = Math.round(statisticsData.averageTime / (60 * 60 * 1000));
    const minutes = Math.round(statisticsData.averageTime / (60 * 1000) - hours);
    const seconds = Math.round(((statisticsData.averageTime / 1000) - hours) - minutes);
    const hoursString = `${(hours < 10 ? '0' : '')}${hours.toString()}:`;
    const minutesString = `${(minutes < 10 ? '0' : '')}${minutes.toString()}:`;
    const secondsString = `${(seconds < 10 ? '0' : '')}${seconds.toString()}`;

    return hoursString + minutesString + secondsString;
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <main className="main-container">
        <div className="statistics-title textFont">
          {'The test was passed '}
          {statisticsData.passedTestsCounter}
          {' times with average time '}
          {formatTime()}
        </div>

        <div className="statistics-graphs">
          {graphComponent(averageTimesGraph, statisticsData.averageTimeDistribution)}
          {graphComponent(passedTestGraph, statisticsData.pointsDistribution)}
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
