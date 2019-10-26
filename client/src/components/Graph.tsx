import * as React from 'react';
import { StatisticChart } from './StatisticChart';

interface GraphProps {
  text: string;
  arrayGraph: number[];
}

export const Graph = (props: GraphProps): React.ReactElement | null => {
  const { text, arrayGraph } = props;

  return (
    <div className="statistics-graph-with-text">
      <StatisticChart rows={arrayGraph} chosenRowIndex={arrayGraph.length} />
      <div className="graphtext text-font">
        {text}
      </div>
    </div>
  );
};
