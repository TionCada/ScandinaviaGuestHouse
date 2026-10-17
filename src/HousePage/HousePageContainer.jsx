import {connect} from "react-redux";
import HousePage from "./HousePage";

// ownProps.houseId is the house's key in the texts and pictures: "bungalow" or "camping"
let mapStateToProps = (state, ownProps) => {
    const texts = state.languages.housesSection;
    const id = ownProps.houseId;
    return {
        house: {
            ...texts[id + 'Info'],
            id: id,
            name: texts[id],
            details: texts[id + 'Details'],
            photos: state.content.housesSection[id + 'Photos']
        },
        labels: texts.housePage
    }
}

export default connect(mapStateToProps, {})(HousePage);
