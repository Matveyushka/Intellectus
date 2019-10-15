import * as React from 'react';
import { isFunction } from 'lodash';
import mergeClassNames from 'classnames';

export interface StepItem {
  text: string;
  isCompleted?: boolean;
  isFailed?: boolean;
}

export interface StepperProps {
  data: StepItem[];
  value?: StepItem;
  onClick?: (item: StepItem, index: number) => void;
}

export const Stepper = (props: StepperProps): React.ReactElement => {
  const { data, value, onClick } = props;

  return (
    <div className="stepper-wrapper">
      {data.map((item, index) => {
        const isLastItem = index === data.length - 1;

        const itemClassNames = mergeClassNames(
          'stepper-item',
          { completed: item.isCompleted },
          { failed: item.isFailed },
          { current: item === value },
        );

        return (
          <React.Fragment key={item.text}>
            <div
              className={itemClassNames}
              onClick={() => {
                if (isFunction(onClick)) onClick(item, index);
              }}
            />
            {!isLastItem && <div className="stepper-line" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
