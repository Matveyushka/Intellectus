import * as React from 'react';
import mergeClassNames from 'classnames';
import { StatisticChart } from './StatisticChart';

interface GraphProps {
  className: string;
  text: string;
  arrayGraph: number[];
}

export const Graph = (props: GraphProps): React.ReactElement | null => {
  const { className, text, arrayGraph } = props;

  const graphClassNames = mergeClassNames('statistics-graph-with-text', className);

  return (
    <div className={graphClassNames}>
      <StatisticChart rows={arrayGraph} chosenRowIndex={arrayGraph.length} />
      <div className="graphtext text-font">
        {text}
      </div>
    </div>
  );
};
