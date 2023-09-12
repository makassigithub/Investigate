import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';

import App from './components/App';
import './index.css';
import axios from 'axios';

window.axios = axios;

const rootEl = document.querySelector('#root');
const root = ReactDOM.createRoot(rootEl);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
