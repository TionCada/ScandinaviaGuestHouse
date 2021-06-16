import {connect} from "react-redux";
import SliderNavigation from "./SliderNavigation";

let mapStateToProps = (state, ownProps) => {
    return {
        images: ownProps.images,
        s1: ownProps.style1
    }
}

export default connect(mapStateToProps, {})(SliderNavigation);