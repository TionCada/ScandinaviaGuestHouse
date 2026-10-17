import ukrainianLanguage from "../redux/ukrainianLanguage";
import englishLanguage from "../redux/englishLanguage";

const SWITCH_TO_ENGLISH = 'scandinavia/language/SWITCH_TO_ENGLISH';
const SWITCH_TO_UKRAINIAN = 'scandinavia/language/SWITCH_TO_UKRAINIAN';

let initialState = {
    ...ukrainianLanguage,
    navigationMenu: {...ukrainianLanguage.navigationMenu},
    homeSection: {...ukrainianLanguage.homeSection},
    housesSection: {...ukrainianLanguage.housesSection},
    exteriorSection: {
        ...ukrainianLanguage.exteriorSection,
        summer: {...ukrainianLanguage.exteriorSection.summer},
        autumn: {...ukrainianLanguage.exteriorSection.autumn},
        winter: {...ukrainianLanguage.exteriorSection.winter},
        spring: {...ukrainianLanguage.exteriorSection.spring}
    },
    contactsSection: {
        ...ukrainianLanguage.contactsSection,
        contacts: {...ukrainianLanguage.contactsSection.contacts}
    },
    isEnglishLanguageActive: false
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_TO_ENGLISH: {
            let tempState = englishLanguage;
            return {
                ...state,
                navigationMenu: {...tempState.navigationMenu},
                homeSection: {...tempState.homeSection},
                housesSection: {...tempState.housesSection},
                exteriorSection: {
                    ...tempState.exteriorSection,
                    summer: {...tempState.exteriorSection.summer},
                    autumn: {...tempState.exteriorSection.autumn},
                    winter: {...tempState.exteriorSection.winter},
                    spring: {...tempState.exteriorSection.spring}
                },
                contactsSection: {
                    ...tempState.contactsSection,
                    contacts: {...tempState.contactsSection.contacts}
                },
                isEnglishLanguageActive: true
            };
        }
        case
        SWITCH_TO_UKRAINIAN: {
            let tempState = ukrainianLanguage;
            return {
                ...state,
                navigationMenu: {...tempState.navigationMenu},
                homeSection: {...tempState.homeSection},
                housesSection: {...tempState.housesSection},
                exteriorSection: {
                    ...tempState.exteriorSection,
                    summer: {...tempState.exteriorSection.summer},
                    autumn: {...tempState.exteriorSection.autumn},
                    winter: {...tempState.exteriorSection.winter},
                    spring: {...tempState.exteriorSection.spring}
                },
                contactsSection: {
                    ...tempState.contactsSection,
                    contacts: {...tempState.contactsSection.contacts}
                },
                isEnglishLanguageActive: false
            };
        }
        default:
            return state;
    }
}

// Action Creators

export const switchToEnglish = () => ({type: SWITCH_TO_ENGLISH})
export const switchToUkrainian = () => ({type: SWITCH_TO_UKRAINIAN})

export default languageReducer;