import {configureStore} from "@reduxjs/toolkit";
import languageReducer from "./language-reducer";
import contentReducer from "./content-reducer";

let store = configureStore({
    reducer: {
        languages: languageReducer,
        content: contentReducer
    }
});

export default store;
