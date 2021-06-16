import {connect} from "react-redux";
import InteriorSection from "./InteriorSection";

let mapStateToProps = (state) => {
    return {
        header: state.languages.interiorSection.header,
        subheader: state.languages.interiorSection.subheader,
        firstTextBlock: state.languages.interiorSection.firstTextBlock,
        secondTextBlock: state.languages.interiorSection.secondTextBlock,
        images: state.content.interiorSection
    }
}

export default connect(mapStateToProps, {})(InteriorSection);