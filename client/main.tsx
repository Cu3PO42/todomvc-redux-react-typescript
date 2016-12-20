/// <reference path='../typings/index.d.ts'/>

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './main/components/App';
import rootReducer from './main/reducer';
import DevTools from './main/components/DevTools';

const initialState = {};

const store = createStore(rootReducer, initialState, DevTools.instrument());

declare var module: any;
declare var require: (module: string) => any;
if (module.hot) {
  console.log('configuring reducer hot swap');
  module.hot.accept('./main/reducer', () => {
    console.log('got new reducers');
    store.replaceReducer(require('./main/reducer').default);
  });
}

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
      </div>
  </Provider>,
  document.getElementById('app')
);