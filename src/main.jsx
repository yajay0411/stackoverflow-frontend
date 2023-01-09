import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';


import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers/rootReducer.js";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
  // </React.StrictMode>
)
