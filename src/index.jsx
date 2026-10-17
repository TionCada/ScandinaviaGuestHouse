import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import store from "./redux/store";
import {Provider} from "react-redux";
import AppContainer from "./AppContainer";

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>
);
