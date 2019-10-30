import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import { MAIN_VIEW_TYPES, URLS } from '../../constants';
import { Header } from './index';
import { store } from '../../store';
import { showLoader } from '../Loader/actions';
import { setCurrentView } from '../../pages/Main/actions';

describe('Render', () => {
  it('should render header', () => {
    const location = { pathname: '/' };

    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Header location={location} />
        </Router>
      </Provider>,
    );

    expect(wrapper.find('.header')).toHaveLength(1);

    expect(wrapper.find('.header-logo-img')).toHaveLength(1);

    expect(wrapper.find('.header-logo-img').props().src).toEqual('images/logo.png');

    expect(wrapper.find('.header-item')).toHaveLength(3);

    expect(wrapper.find('.header-item').at(0).text()).toEqual('STATISTICS');

    expect(wrapper.find('.header-item').at(1).text()).toEqual('ABOUT');

    expect(wrapper.find('.header-item').at(2).text()).toEqual('CONTACT US');

    expect(wrapper.find('NavLink').at(0).props().to).toEqual(URLS.main);

    expect(wrapper.find('NavLink').at(1).props().to).toEqual(URLS.statistics);

    expect(wrapper.find('NavLink').at(2).props().to).toEqual(URLS.about);

    expect(wrapper.find('NavLink').at(3).props().to).toEqual(URLS.contactUs);
  });

  it('should not render navigation when isLoading', () => {
    store.dispatch(showLoader());

    const location = { pathname: '/' };

    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Header location={location} />
        </Router>
      </Provider>,
    );

    expect(wrapper.find('.header-logo')).toHaveLength(1);

    expect(wrapper.find('.header-item')).toHaveLength(0);
  });

  it('should not render navigation when test is began', () => {
    store.dispatch(setCurrentView(MAIN_VIEW_TYPES.test));

    const location = { pathname: '/' };

    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Header location={location} />
        </Router>
      </Provider>,
    );

    expect(wrapper.find('.header-logo')).toHaveLength(1);

    expect(wrapper.find('.header-item')).toHaveLength(0);
  });

  it('should not render navigation when results is shown', () => {
    store.dispatch(setCurrentView(MAIN_VIEW_TYPES.results));

    const location = { pathname: '/' };

    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Header location={location} />
        </Router>
      </Provider>,
    );

    expect(wrapper.find('.header-logo')).toHaveLength(1);

    expect(wrapper.find('.header-item')).toHaveLength(0);
  });
});
