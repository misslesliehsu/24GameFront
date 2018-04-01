import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
// import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
document.getElementById('root'),
);
registerServiceWorker();
