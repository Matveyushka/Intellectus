import * as React from 'react';
import mergeClassNames from 'classnames';

export interface StepItem {
  text: string,
  isCompleted?: boolean,
}

export interface StepperProps {
  data: StepItem[],
}

export const Stepper = (props: StepperProps): React.ReactElement => {
  const { data } = props;

  return (
    <div className="stepper-wrapper">
      {data.map((item, index) => {
        const isLastItem = index === data.length - 1;

        const itemClassNames = mergeClassNames(
          'stepper-item',
          { completed: item.isCompleted },
        );

        return (
          <React.Fragment key={item.text}>
            <div className={itemClassNames} />
            {!isLastItem && <div className="stepper-line" />}
          </React.Fragment>
        );
      })}
    </div>
  );
};
