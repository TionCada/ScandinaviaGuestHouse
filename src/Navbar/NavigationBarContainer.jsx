import {connect} from "react-redux";
import {switchToEnglish, switchToUkrainian} from "../redux/language-reducer";
import Navbar from "./NavigationBar";
import ukrainianLanguage from "../redux/ukrainianLanguage";
import englishLanguage from "../redux/englishLanguage";

// Every wording each header label can show, across languages
const menus = [ukrainianLanguage.navigationMenu, englishLanguage.navigationMenu];
const labelVariants = {
    language: menus.map(m => m.languageCode),
    contacts: menus.map(m => m.contactsLabel)
};

let mapStateToProps = (state) => {
    return {
        labelVariants: labelVariants,
        contactsLabel: state.languages.navigationMenu.contactsLabel,
        fourthLink: state.languages.navigationMenu.fourthLink,
        languageCode: state.languages.navigationMenu.languageCode,
        logo: state.content.navigationMenu.logo,
        isEnglishLanguageActive: state.languages.isEnglishLanguageActive,
    }
}

export default connect(mapStateToProps, {switchToEnglish, switchToUkrainian})(Navbar);