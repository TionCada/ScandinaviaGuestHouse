import {connect} from "react-redux";
import {switchToEnglish, switchToUkrainian} from "../redux/language-reducer";
import TransitionSection from "./TransitionSection";

let mapStateToProps = (state) => {
    return {
        header: state.languages.transitionSection.header,
        subheader: state.languages.transitionSection.subheader,
        quote: state.languages.transitionSection.quote,
        author: state.languages.transitionSection.author,
        whoIsAuthor: state.languages.transitionSection.whoIsAuthor
    }
}

export default connect(mapStateToProps, {switchToEnglish, switchToUkrainian})(TransitionSection);