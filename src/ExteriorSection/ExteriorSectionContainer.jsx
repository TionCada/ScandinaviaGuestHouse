import {connect} from "react-redux";
import ExteriorSection from "./ExteriorSection";

let mapStateToProps = (state) => {
    return {
        title: state.languages.exteriorSection.title,
        photos: state.content.exteriorSection.photos,
        fullPhotos: state.content.exteriorSection.fullPhotos
    }
}

export default connect(mapStateToProps, {})(ExteriorSection);
