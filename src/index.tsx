import {render} from 'react-dom';
import React from "react";

import ReactDOM from "react-dom/client";

import App from "../src/App";
import "config/configureMobX";
import 'regenerator-runtime';

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    , document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}