import * as React from 'react';
import { toDataURL } from '../helpers';

export interface ProblemTableProps {
  problemFields: (string | null)[];
}

export const ProblemTable = (props: ProblemTableProps): React.ReactElement => {
  const { problemFields } = props;

  return (
    <>
      {problemFields.map((item, index) => (item
        ? (
          <img
            className="problem-cell"
            src={item ? toDataURL(item) : undefined}
            key={index.toString()}
          />
        )
        // img без src отображает заглушку, поэтому используем div
        : (
          <div
            className="problem-cell"
            key={index.toString()}
          />
        )))}
    </>
  );
};
