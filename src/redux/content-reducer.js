import defaultContent from "../content/defaults";
import {SET_CONTENT} from "./site-content";
import logo from "../assets/images/navigationMenu/logo.svg"
import down_arrow from "../assets/images/other/down_arrow.svg"
import flagsXL from "../assets/images/other/flagsXL.jpg"
import flagsL from "../assets/images/other/flagsL.jpg"
import flagsM from "../assets/images/other/flagsM.jpg"
import flagsS from "../assets/images/other/flagsS.jpg"
import flagsXS from "../assets/images/other/flagsXS.jpg"

// Photos and the video, from the content's media (editable in the admin), in the shape the
// sections read them
const fromMedia = (media) => ({
    homeSection: {
        backgroundImage: media.heroPoster,
        backgroundVideo: media.heroVideo
    },
    housesSection: {
        bungalowImage: media.bungalowCover,
        campingImage: media.campingCover,
        // Photos on each house's page; a house without any shows its cover photo
        bungalowPhotos: media.bungalowPhotos.length > 0 ? media.bungalowPhotos : [media.bungalowCover],
        campingPhotos: media.campingPhotos.length > 0 ? media.campingPhotos : [media.campingCover]
    },
    exteriorSection: {
        photos: media.moments.map(moment => moment.src),
        fullPhotos: media.moments.map(moment => moment.full || moment.src)
    }
});

let initialState = {
    ...fromMedia(defaultContent.media),
    // Part of the design, not editable
    navigationMenu: {
        logo: logo
    },
    other: {
        down_arrow: down_arrow,
        flagsXL: flagsXL,
        flagsL: flagsL,
        flagsM: flagsM,
        flagsS: flagsS,
        flagsXS: flagsXS
    }
};

const contentReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTENT:
            return {...state, ...fromMedia(action.content.media)};
        default:
            return state;
    }
}

export default contentReducer;
