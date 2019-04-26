import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './store';

require('./styles.css')

// uncomment so that webpack can bundle styles
// import styles from './scss/application.scss';

render(
  // <Provider store={store}>
    <App/>
  // </Provider>
  ,document.getElementById('contents')
);