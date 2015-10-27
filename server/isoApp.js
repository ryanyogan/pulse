import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as eventService from './api/service/event';

import rootReducer from '../universal/reducers';
import PulseAppContainer from '../universal/containers/PulseAppContainer';

export function handleRender(req, res) {
  eventService.getEvents()
  .then(initialEvents => {
    const store = createStore(rootReducer, {events: initialEvents, userId: 'baseUser'});

    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <PulseAppContainer />
      </Provider>
    );

    // Send the renddered page to client, hydrate init stores
    res.render('index', { html: html, initialState: JSON.stringify(store.getState()) });
  });
}
