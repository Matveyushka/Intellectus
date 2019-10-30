import * as React from 'react';
import { mount } from 'enzyme';
import { Footer } from './index';

describe('Render', () => {
  it('should render text', () => {
    const wrapper = mount(
      <Footer />,
    );

    expect(wrapper.find('.footer')).toHaveLength(1);

    expect(wrapper.find('.footer').children().html()).toEqual(wrapper.find('.credentials').html());

    expect(wrapper.find('.credentials').text()).toEqual('CREATED BY NOBRAINS');
  });
});
