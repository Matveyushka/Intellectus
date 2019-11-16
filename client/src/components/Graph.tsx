import * as React from 'react';
import { StatisticChart } from './StatisticChart';

interface GraphProps {
  stringForClassName: string;
  text: string;
  arrayGraph: number[];
}

export const Graph = (props: GraphProps): React.ReactElement | null => {
  const {stringForClassName, text, arrayGraph } = props;

  return (
    <div className={`statistics-graph-with-text ${stringForClassName}`}>
      <StatisticChart rows={arrayGraph} chosenRowIndex={arrayGraph.length} />
      <div className="graphtext text-font">
        {text}
      </div>
    </div>
  );
};
