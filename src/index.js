import React from "react";
import ReactDOM  from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';

import App from './App';
import store from './app/store'
import 'antd/dist/reset.css';
ReactDOM.render(
    <StrictMode>
    <Router>
        <Provider store={store}>
        <App />
        </Provider>
    </Router>
    </StrictMode>
, document.getElementById("root"));
