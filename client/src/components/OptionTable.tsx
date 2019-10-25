import * as React from 'react';
import mergeClassNames from 'classnames';
import { toDataURL } from '../helpers';

export interface OptionTableProps {
  options: string[];
  selectedIndex: number | null;
  onSelect?: (optionIndex: number) => void;
  rightAnswerIndex?: number;
}

export const OptionTable = (props: OptionTableProps): React.ReactElement => {
  const {
    options,
    onSelect = () => {},
    selectedIndex,
    rightAnswerIndex,
  } = props;

  return (
    <>
      {options.map((item, index) => {
        const className = mergeClassNames('problem-cell', 'clickable', {
          selected: index === selectedIndex,
          'right-answer': index === rightAnswerIndex,
          error:
            index === selectedIndex
            && selectedIndex !== rightAnswerIndex
            && rightAnswerIndex !== undefined,
        });

        return (
          <img
            className={className}
            src={toDataURL(item)}
            onClick={() => onSelect(index)}
            key={index.toString()}
          />
        );
      })}
    </>
  );
};
