import defaultContent from "../content/defaults";
import {SET_CONTENT} from "./site-content";

const SWITCH_TO_ENGLISH = 'scandinavia/language/SWITCH_TO_ENGLISH';
const SWITCH_TO_UKRAINIAN = 'scandinavia/language/SWITCH_TO_UKRAINIAN';

// The texts of the current language at the top level, as the sections read them, with both
// languages kept in "texts" to switch between
const inLanguage = (texts, isEnglish) => ({
    ...(isEnglish ? texts.en : texts.uk),
    texts: texts,
    isEnglishLanguageActive: isEnglish
});

let initialState = inLanguage(defaultContent.texts, false);

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_TO_ENGLISH:
            return inLanguage(state.texts, true);
        case SWITCH_TO_UKRAINIAN:
            return inLanguage(state.texts, false);
        case SET_CONTENT:
            return inLanguage(action.content.texts, state.isEnglishLanguageActive);
        default:
            return state;
    }
}

// Action Creators

export const switchToEnglish = () => ({type: SWITCH_TO_ENGLISH})
export const switchToUkrainian = () => ({type: SWITCH_TO_UKRAINIAN})

export default languageReducer;
