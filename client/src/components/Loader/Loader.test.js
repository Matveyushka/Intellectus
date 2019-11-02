import * as React from 'react';
import { mount } from 'enzyme';
import { Loader } from './index';
import { loaderReducer } from './reducer';
import { hideLoader, showLoader } from './actions';

describe('Render', () => {
  it('should render loading by default', () => {
    const wrapper = mount(
      <Loader />,
    );

    expect(wrapper.find('.loader-wrapper')).toHaveLength(1);

    expect(wrapper.find('.loader')).toHaveLength(1);
  });

  it('should render nothing when not isLoading', () => {
    const wrapper = mount(<Loader isLoading={false} />);

    expect(wrapper.find('.loader-wrapper')).toHaveLength(0);

    expect(wrapper.find('.loader')).toHaveLength(0);
  });
});

describe('Reducer', () => {
  it('should showLoader', () => {
    const initialState = {};

    const newState = loaderReducer(initialState, showLoader());

    expect(newState).toEqual({
      isLoading: true,
    });
  });

  it('should hideLoader', () => {
    const initialState = {};

    const newState = loaderReducer(initialState, hideLoader());

    expect(newState).toEqual({
      isLoading: false,
    });
  });
});
