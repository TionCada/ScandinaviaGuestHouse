import {connect} from "react-redux";
import {switchToEnglish, switchToUkrainian} from "../redux/language-reducer";
import Menu from "./Menu";
import {setMenuClosed} from "../redux/menu-reducer";


let mapStateToProps = (state) => {
    return {
        firstLink: state.languages.navigationMenu.firstLink,
        secondLink: state.languages.navigationMenu.secondLink,
        thirdLink: state.languages.navigationMenu.thirdLink,
        fourthLink: state.languages.navigationMenu.fourthLink,
        phoneCall: state.languages.navigationMenu.phoneCall,
        phoneNumber: state.languages.navigationMenu.phoneNumber,
        logo: state.content.navigationMenu.logo,
        white_phone: state.content.navigationMenu.white_phone,
        black_phone: state.content.navigationMenu.black_phone,
        isEnglishLanguageActive: state.languages.isEnglishLanguageActive,
        right_arrow: state.content.other.right_arrow,
    }
}

export default connect(mapStateToProps, {switchToEnglish, switchToUkrainian, setMenuClosed})(Menu);