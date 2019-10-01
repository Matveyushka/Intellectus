import * as React from 'react';

export const TestResult = (): React.ReactElement => (
  <>
    <div className="test-result">
      <h2 className="test-title">Your result is 8 out of 12</h2>
      <div className="stats">
        {[...Array(12)].map((x, i) => {
          const css: any = {
            height: `${(97 * (i + 1)) / 12}%`,
          };

          if (i === 7) {
            css.backgroundColor = '#969696';
          }

          return <div className="stats-column" style={css} />;
        })}
      </div>
      <div className="test-hint">you are here</div>
      <div className="test-thumbs">
        {[...Array(12)].map(() => <div className="test-thumb" />)}
      </div>
    </div>
  </>
);
