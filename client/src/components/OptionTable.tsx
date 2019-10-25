import * as React from 'react';
import mergeClassNames from 'classnames';
import { useSelector } from 'react-redux';
import { toDataURL } from '../helpers';
import { MainState } from '../pages/Main/initialState';
import { State } from '../store';

export interface OptionTableProps {
  onSelect: (optionIndex: number) => void;
}

export const OptionTable = (props: OptionTableProps): React.ReactElement | null => {
  const { onSelect } = props;
  const { questions, userAnswers, stepIndex } = useSelector<State, MainState>(state => state.main);

  if (!questions) return null;

  const { options } = questions[stepIndex];
  const selectedIndex = userAnswers[stepIndex];

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
