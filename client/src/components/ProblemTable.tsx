/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { toDataURL } from '../helpers';

export interface ProblemTableProps {
  problems: (string | null)[];
}

export const ProblemTable = (props: ProblemTableProps): React.ReactElement => {
  const { problems } = props;

  return (
    <>
      {problems.map((item, index) => (item
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
