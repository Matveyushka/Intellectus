import React, { CSSProperties } from 'react';

export interface StaticChartProps {
  rows?: number[];
  chosenRowIndex?: number;
}

export const StatisticChart = (props: StaticChartProps): React.ReactElement => {
  const { rows = [], chosenRowIndex } = props;
  const magicChartMaxHeight = 97;
  const magicChartWidth = 84;

  return (
    <div className="stats">
      {rows.map((value, index) => {
        const rowStyle: CSSProperties = {
          height: `${(magicChartMaxHeight * value) / Math.max(...rows)}%`,
          width: `${magicChartWidth / rows.length}%`,
        };

        if (index === chosenRowIndex) {
          rowStyle.backgroundColor = '#969696';
        }

        return (
          <div
            key={index.toString()}
            className="stats-column"
            style={rowStyle}
          />
        );
      })}
    </div>
  );
};
