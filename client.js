import ReactDOM from 'react-dom';
import React from 'react';
import { getOrSetUserId } from './client/UserId';
import { setupRealtime } from './client/Realtime';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'react-logger';
import { Provider } from 'react-redux';
import PulseAppContainer from './universale/containers/PulseAppContainer';
import pulseApp from './universal/reducers';
import * as actions from './universal/actions/PulseActions';

import './style/pure.css';
import './style/main.css';
import './style/spinner.css';

// Grab initial state from the globaly injected server render
const initialState = window.__INITIAL_STATE__;

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore);

// Create redux store with initial state
const store = createStoreWithMiddleware(pulseApp, initialState);

ReactDOM.render(
  <Provider store={store}>
    <PulseAppContainer />
  </Provider>,
  document.getElementById('app')
);

// Dom has been rendered, let's kick off some Rethink
setupRealtime(store, actions);

// Mutate state and set userID as key from local storage
store.dispatch(actions.setUserId(getOrSetUserId()));
