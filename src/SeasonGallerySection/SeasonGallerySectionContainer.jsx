import {connect} from "react-redux";
import SeasonGallerySection from "./SeasonGallerySection";

let mapStateToProps = (state, ownProps) => {
    return {
        text: ownProps.text,
        author: ownProps.author,
        galleryImages: ownProps.galleryImages,
        left_arrow: state.content.other.left_arrow,
        loader: state.content.other.loader
    }
}

export default connect(mapStateToProps, {})(SeasonGallerySection);