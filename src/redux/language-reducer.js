import ukrainianLanguage from "../redux/ukrainianLanguage";
import englishLanguage from "../redux/englishLanguage";

const SWITCH_TO_ENGLISH = 'scandinavia/language/SWITCH_TO_ENGLISH';
const SWITCH_TO_UKRAINIAN = 'scandinavia/language/SWITCH_TO_UKRAINIAN';

let initialState = {
    ...ukrainianLanguage,
    navigationMenu: {...ukrainianLanguage.navigationMenu},
    homeSection: {...ukrainianLanguage.homeSection},
    transitionSection: {...ukrainianLanguage.transitionSection},
    exteriorSection: {
        summer: {...ukrainianLanguage.exteriorSection.summer},
        autumn: {...ukrainianLanguage.exteriorSection.autumn},
        winter: {...ukrainianLanguage.exteriorSection.winter},
        spring: {...ukrainianLanguage.exteriorSection.spring}
    },
    interiorSection: {
        ...ukrainianLanguage.interiorSection,
        secondTextBlock: [...ukrainianLanguage.interiorSection.secondTextBlock]
    },
    contactsSection: {
        ...ukrainianLanguage.contactsSection,
        socialNetworks: {...ukrainianLanguage.contactsSection.socialNetworks},
        contacts: {...ukrainianLanguage.contactsSection.contacts}
    },
    galleryPage: {
        ...ukrainianLanguage.galleryPage,
        summer: {...ukrainianLanguage.galleryPage.summer},
        autumn: {...ukrainianLanguage.galleryPage.autumn},
        winter: {...ukrainianLanguage.galleryPage.winter},
        spring: {...ukrainianLanguage.galleryPage.spring}
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
                transitionSection: {...tempState.transitionSection},
                exteriorSection: {
                    summer: {...tempState.exteriorSection.summer},
                    autumn: {...tempState.exteriorSection.autumn},
                    winter: {...tempState.exteriorSection.winter},
                    spring: {...tempState.exteriorSection.spring}
                },
                interiorSection: {
                    ...tempState.interiorSection,
                    secondTextBlock: [...tempState.interiorSection.secondTextBlock]
                },
                contactsSection: {
                    ...tempState.contactsSection,
                    socialNetworks: {...tempState.contactsSection.socialNetworks},
                    contacts: {...tempState.contactsSection.contacts}
                },
                galleryPage: {
                    ...tempState.galleryPage,
                    summer: {...tempState.galleryPage.summer},
                    autumn: {...tempState.galleryPage.autumn},
                    winter: {...tempState.galleryPage.winter},
                    spring: {...tempState.galleryPage.spring}
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
                transitionSection: {...tempState.transitionSection},
                exteriorSection: {
                    summer: {...tempState.exteriorSection.summer},
                    autumn: {...tempState.exteriorSection.autumn},
                    winter: {...tempState.exteriorSection.winter},
                    spring: {...tempState.exteriorSection.spring}
                },
                interiorSection: {
                    ...tempState.interiorSection,
                    secondTextBlock: [...tempState.interiorSection.secondTextBlock]
                },
                contactsSection: {
                    ...tempState.contactsSection,
                    socialNetworks: {...tempState.contactsSection.socialNetworks},
                    contacts: {...tempState.contactsSection.contacts}
                },
                galleryPage: {
                    ...tempState.galleryPage,
                    summer: {...tempState.galleryPage.summer},
                    autumn: {...tempState.galleryPage.autumn},
                    winter: {...tempState.galleryPage.winter},
                    spring: {...tempState.galleryPage.spring}
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