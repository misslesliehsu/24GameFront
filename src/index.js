import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'
// import { createStore, applyMiddleware, compose } from 'redux'
import { ActionCableProvider } from 'react-actioncable-provider';
import { BrowserRouter } from 'react-router-dom'
// import { Provider } from 'react-redux';
import { API_WS_ROOT } from './constants';

// const store = createStore(rootReducer)

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ActionCableProvider>,
document.getElementById('root'),
);
registerServiceWorker();
