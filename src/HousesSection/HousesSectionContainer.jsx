import {connect} from "react-redux";
import HousesSection from "./HousesSection";

let mapStateToProps = (state) => {
    return {
        bungalow: state.languages.housesSection.bungalow,
        bungalowDetails: state.languages.housesSection.bungalowDetails,
        camping: state.languages.housesSection.camping,
        campingDetails: state.languages.housesSection.campingDetails,
        bungalowImage: state.content.housesSection.bungalowImage,
        campingImage: state.content.housesSection.campingImage
    }
}

export default connect(mapStateToProps, {})(HousesSection);
