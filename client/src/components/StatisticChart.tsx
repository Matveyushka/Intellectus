import React, { CSSProperties } from 'react';

interface Props {
  rows: number[],
  chosenRowIndex?: number,
}

export const StatisticChart = (props: Props): React.ReactElement => {
  const { rows, chosenRowIndex } = props;

  return (
    <>
      <div className="stats">
        {rows.map((x, i) => {
          const rowStyle: CSSProperties = {};

          rowStyle.height = `${(97 * x) / Math.max(...rows)}%`;

          rowStyle.width = `${84 / rows.length}%`;

          if (i === chosenRowIndex) {
            rowStyle.backgroundColor = '#969696';
          }

          return <div key={i.toString()} className="stats-column" style={rowStyle} />;
        })}
      </div>
    </>
  );
};

StatisticChart.defaultProps = {
  rows: [],
};
