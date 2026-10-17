import {connect} from "react-redux";
import SliderNavigation from "./SliderNavigation";

let mapStateToProps = (state, ownProps) => {
    return {
        images: ownProps.images,
        // Optional: uncropped versions of the images, shown when one is opened full screen
        fullImages: ownProps.fullImages,
        s1: ownProps.style1
    }
}

export default connect(mapStateToProps, {})(SliderNavigation);