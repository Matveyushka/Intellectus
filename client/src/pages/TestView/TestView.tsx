import * as React from 'react';
import { StepItem, Stepper } from '../../components/Stepper';
import { generateInitialStepperData } from './helpers';

const stepperInitialData = generateInitialStepperData();

export const TestView = (): React.ReactElement => {
  const [stepperData, setStepperData] = React.useState<StepItem[]>(stepperInitialData);

  return (
    <div>
      <br />
      <Stepper
        data={stepperData}
        value={stepperData[3]}
      />
    </div>
  );
};
