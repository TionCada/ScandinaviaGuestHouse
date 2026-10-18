import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import store from "./redux/store";
import {Provider} from "react-redux";
import App from "./App";
import {loadSavedContent, setContent} from "./redux/site-content";

const render = () => createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>
);

// The texts and photos saved in the admin come first, so the built-in ones never flash before
// them; the page stays blank only briefly, during its fade-in
loadSavedContent().then(saved => {
    if (saved) store.dispatch(setContent(saved));
    render();
});
