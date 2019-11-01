import * as React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { Modal } from './Modal';
import { store } from '../../store';
import { showModal } from './actions';

describe('Render', () => {
  it('should render closed modal by default', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    expect(wrapper.find('.modal')).toHaveLength(0);
  });

  it('should render opened modal', () => {
    store.dispatch(showModal());

    const wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    expect(wrapper.find('.modal')).toHaveLength(1);

    expect(wrapper.find('.modal').find('.modal-bg')).toHaveLength(1);

    expect(wrapper.find('.modal').find('.modal-body')).toHaveLength(1);
  });

  it('should hide modal onClick', () => {
    store.dispatch(showModal());

    const wrapper = mount(
      <Provider store={store}>
        <Modal />
      </Provider>,
    );

    wrapper.find('.modal').find('.modal-bg').simulate('click');

    expect(wrapper.find('.modal')).toHaveLength(0);
  });

  it('should render children', () => {
    store.dispatch(showModal());

    const wrapper = mount(
      <Provider store={store}>
        <Modal>
          <button type="button" className="charm-button">CLICK ME HARDER</button>
        </Modal>
      </Provider>,
    );

    expect(wrapper.find('.modal').find('.charm-button').text()).toEqual('CLICK ME HARDER');
  });
});
