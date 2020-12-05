import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import $ from 'jquery';

// Import store
import store from 'store/index.js';

// Import components
import App from 'containers/App';
import ScrollToTop from 'components/ScrollToTop';

// PWA setup
import * as serviceWorker from './serviceWorker';

// Import root styles
import 'assets/styles/index.scss';

// Make jQuery and notifier global
window.jQuery = window.jquery = window.$ = $;

// Debug store values
if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>

        <Route component={App} />

      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
