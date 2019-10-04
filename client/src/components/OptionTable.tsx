/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import mergeClassNames from 'classnames';
import { toDataURL } from '../helpers';

export interface OptionTableProps {
  options: string[],
  selectedIndex: number | null,
  onSelect: (optionIndex: number) => void,
}

export const OptionTable = (props: OptionTableProps): React.ReactElement => {
  const { options, onSelect, selectedIndex } = props;

  return (
    <>
      {options.map((item, index) => {
        const className = mergeClassNames(
          'problem-cell',
          'clickable',
          { selected: index === selectedIndex },
        );

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
