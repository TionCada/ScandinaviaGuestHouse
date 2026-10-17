import {connect} from "react-redux";
import HomeSection from "./HomeSection";

let mapStateToProps = (state) => {
    return {
        firstTextBlock: state.languages.homeSection.firstTextBlock,
        secondTextBlock: state.languages.homeSection.secondTextBlock,
        backgroundImage: state.content.homeSection.backgroundImage,
        backgroundVideo: state.content.homeSection.backgroundVideo,
        down_arrow: state.content.other.down_arrow
    }
}

export default connect(mapStateToProps, {})(HomeSection);