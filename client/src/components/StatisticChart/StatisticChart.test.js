import * as React from 'react';
import { mount } from 'enzyme';
import { StatisticChart } from './index';

describe('Render', () => {
  it('should render empty chart', () => {
    const wrapper = mount(<StatisticChart />);

    expect(wrapper.find('.stats')).toHaveLength(1);

    expect(wrapper.find('.stats-column')).toHaveLength(0);
  });

  it('should render chart with columns', () => {
    const wrapper = mount(<StatisticChart rows={[1, 2, 3, 4, 5]} chosenRowIndex={2} />);

    expect(wrapper.find('.stats')).toHaveLength(1);

    expect(wrapper.find('.stats-column')).toHaveLength(5);

    expect(wrapper.find('.stats-column').at(2).hasClass('selected')).toBeTruthy();
  });
});
