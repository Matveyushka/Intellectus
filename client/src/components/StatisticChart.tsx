import React, { CSSProperties } from 'react';

import mergeClassNames from 'classnames';

export interface StaticChartProps {
  rows?: number[];
  chosenRowIndex?: number;
}

export const StatisticChart = (props: StaticChartProps): React.ReactElement => {
  const { rows = [], chosenRowIndex } = props;
  const chartMaxHeight = 97;
  const chartWidth = 84;
  const chartMinHeight = 2;

  return (
    <div className="stats">
      {rows.map((value, index) => {
        const rowStyle: CSSProperties = {
          height: `${(chartMaxHeight * value) / Math.max(...rows) + chartMinHeight}%`,
          width: `${chartWidth / rows.length}%`,
        };

        return (
          <div
            key={index.toString()}
            className={mergeClassNames('stats-column', {
              selected: index === chosenRowIndex,
            })}
            style={rowStyle}
          />
        );
      })}
    </div>
  );
};
