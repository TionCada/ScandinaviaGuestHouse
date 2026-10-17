import {configureStore} from "@reduxjs/toolkit";
import languageReducer from "./language-reducer";
import contentReducer from "./content-reducer";
import menuReducer from "./menu-reducer";

let store = configureStore({
    reducer: {
        languages: languageReducer,
        content: contentReducer,
        menu: menuReducer
    }
});

export default store;
