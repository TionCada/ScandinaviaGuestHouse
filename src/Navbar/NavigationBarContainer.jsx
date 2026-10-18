import {connect} from "react-redux";
import {createSelector} from "@reduxjs/toolkit";
import {switchToEnglish, switchToUkrainian} from "../redux/language-reducer";
import Navbar from "./NavigationBar";

// Every wording each header label can show, across languages (the texts can be edited in the admin)
const selectLabelVariants = createSelector([state => state.languages.texts], texts => {
    const menus = [texts.uk.navigationMenu, texts.en.navigationMenu];
    return {
        language: menus.map(m => m.languageCode),
        contacts: menus.map(m => m.contactsLabel)
    };
});

let mapStateToProps = (state) => {
    return {
        labelVariants: selectLabelVariants(state),
        contactsLabel: state.languages.navigationMenu.contactsLabel,
        fourthLink: state.languages.navigationMenu.fourthLink,
        languageCode: state.languages.navigationMenu.languageCode,
        logo: state.content.navigationMenu.logo,
        isEnglishLanguageActive: state.languages.isEnglishLanguageActive,
    }
}

export default connect(mapStateToProps, {switchToEnglish, switchToUkrainian})(Navbar);
