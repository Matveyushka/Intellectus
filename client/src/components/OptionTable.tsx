import * as React from 'react';
import mergeClassNames from 'classnames';
import { useSelector } from 'react-redux';
import { toDataURL } from '../helpers';
import { State } from '../store';
import { MainState } from '../pages/Main/model';

export interface OptionTableProps {
  onSelect?: (optionIndex: number) => void;
  rightAnswerIndex?: number;
}

export const OptionTable = (props: OptionTableProps): React.ReactElement | null => {
  const { onSelect, rightAnswerIndex } = props;
  const { questions, userAnswers, stepIndex } = useSelector<State, MainState>(state => state.main);

  if (!questions) return null;

  const { options } = questions[stepIndex];
  const selectedIndex = userAnswers[stepIndex];

  return (
    <>
      {options.map((item, index) => {
        const className = mergeClassNames('problem-cell-wrapper', {
          selected: index === selectedIndex,
          'right-answer': index === rightAnswerIndex,
          error:
            index === selectedIndex
            && selectedIndex !== rightAnswerIndex
            && rightAnswerIndex !== undefined,
          clickable: rightAnswerIndex === undefined,
        });

        return (
          <div key={index.toString()} className={className}>
            <img
              className="problem-cell"
              src={toDataURL(item)}
              onClick={() => onSelect?.(index)}
            />
          </div>
        );
      })}
    </>
  );
};
