import * as React from 'react';

import { StatisticChart } from './StatisticChart';

export const TestResult = (): React.ReactElement => (
  <>
    <div className="test-result">
      <h2 className="test-title">Your result is 8 out of 12</h2>
      <StatisticChart rows={[1, 6, 2, 7, 4, 9, 13, 15, 12, 8]} chosenRowIndex={3} />
      <div className="test-hint">you are here</div>
      <div className="test-thumbs">
        {[...Array(12)].map((v, i) => <div key={i.toString()} className="test-thumb" />)}
      </div>
    </div>
  </>
);
