import React from 'react';
import { Provider } from 'react-redux';

import store from '../_services/store';
import StoreBox from './store/StoreBox';

const Root = ({ children, initialState = {} }) => (
  <Provider store={store(initialState)}>{children}</Provider>
);

const Store = ({ children, initialState = {} }) => (
  <section className="section">
    <div className="container">
      <h1 className="title">Friends of Noise</h1>
      <p className="subtitle">
        All ages <strong>always</strong>!
      </p>
      <p className="membertagline">
        Ask about how to be sponsored for a membership.
      </p>
    </div>

    <div className="col-md-6">
      <br />


      <Root>
        <StoreBox />
      </Root>

    </div>
  </section>
);

export default Store;
