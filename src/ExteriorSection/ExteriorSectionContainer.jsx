import {connect} from "react-redux";
import ExteriorSection from "./ExteriorSection";

let mapStateToProps = (state) => {
    return {
        SummerHeader: state.languages.exteriorSection.summer.header,
        SummerSubheader: state.languages.exteriorSection.summer.subheader,
        AutumnHeader: state.languages.exteriorSection.autumn.header,
        AutumnSubheader: state.languages.exteriorSection.autumn.subheader,
        WinterHeader: state.languages.exteriorSection.winter.header,
        WinterSubheader: state.languages.exteriorSection.winter.subheader,
        SpringHeader: state.languages.exteriorSection.spring.header,
        SpringSubheader: state.languages.exteriorSection.spring.subheader,
        summerImage: state.content.exteriorSection.summerImage,
        autumnImage: state.content.exteriorSection.autumnImage,
        winterImage: state.content.exteriorSection.winterImage,
        springImage: state.content.exteriorSection.springImage,
        right_arrow_white: state.content.other.right_arrow_white,
    }
}

export default connect(mapStateToProps, {})(ExteriorSection);