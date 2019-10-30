import * as React from 'react';
import { mount } from 'enzyme';
import { Stepper } from './index';

describe('Render', () => {
  it('should render 4 steps', () => {
    const stepperData = [
      { text: '1', isCompleted: true },
      { text: '2', isCompleted: true },
      { text: '3', isCompleted: true, isFailed: true },
      { text: '4' },
    ];

    const wrapper = mount(
      <Stepper
        data={stepperData}
        value={stepperData[2]}
        onClick={jest.fn()}
      />,
    );

    expect(wrapper.find('.stepper-wrapper').children()).toHaveLength(7);

    expect(wrapper.find('.stepper-item')).toHaveLength(4);

    expect(wrapper.find('.stepper-item.completed')).toHaveLength(3);

    expect(wrapper.find('.stepper-item.failed')).toHaveLength(1);

    expect(wrapper.find('.stepper-line')).toHaveLength(3);

    expect(wrapper.find('.stepper-item').at(2).hasClass('failed')).toBeTruthy();

    expect(wrapper.find('.stepper-item').at(2).hasClass('current')).toBeTruthy();
  });
});

describe('Handlers', () => {
  it('should call onClick', () => {
    const stepperData = [
      { text: '1', isCompleted: true },
    ];

    const handleClick = jest.fn();

    const wrapper = mount(
      <Stepper
        data={stepperData}
        onClick={handleClick}
      />,
    );

    wrapper.find('.stepper-item').simulate('click');

    expect(handleClick).toHaveBeenCalledWith(stepperData[0], 0);
  });
});
