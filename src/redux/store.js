import {combineReducers, createStore} from "redux";
import languageReducer from "./language-reducer";
import contentReducer from "./content-reducer";
import menuReducer from "./menu-reducer";

let reducers = combineReducers({
    languages: languageReducer,
    content: contentReducer,
    menu: menuReducer
});

let store = createStore(reducers);

export default store;