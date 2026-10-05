import backgroundImage from "../assets/images/homeSection/image1.jpg"
import backgroundVideo from "../assets/videos/homeSection/video1.mp4"
import bungalowImage from "../assets/images/housesSection/bungalow.jpg"
import campingImage from "../assets/images/housesSection/camping.jpg"
import summerImage from "../assets/images/exteriorSection/image1.jpg"
import autumnImage from "../assets/images/exteriorSection/image2.jpg"
import winterImage from "../assets/images/exteriorSection/image3.jpg"
import springImage from "../assets/images/exteriorSection/image4.jpg"
import logo from "../assets/images/navigationMenu/logo.svg"
import white_phone from "../assets/images/navigationMenu/white_phone.svg"
import black_phone from "../assets/images/navigationMenu/black_phone.svg"
import down_arrow from "../assets/images/other/down_arrow.svg"
import flagsXL from "../assets/images/other/flagsXL.jpg"
import flagsL from "../assets/images/other/flagsL.jpg"
import flagsM from "../assets/images/other/flagsM.jpg"
import flagsS from "../assets/images/other/flagsS.jpg"
import flagsXS from "../assets/images/other/flagsXS.jpg"
import left_arrow from "../assets/images/other/left_arrow.svg"
import right_arrow from "../assets/images/other/right_arrow.svg"
import loader from "../assets/images/other/loader.svg"

let initialState = {
    navigationMenu: {
        logo: logo,
        white_phone: white_phone,
        black_phone: black_phone
    },
    homeSection: {
        backgroundImage: backgroundImage,
        backgroundVideo: backgroundVideo
    },
    housesSection: {
        bungalowImage: bungalowImage,
        campingImage: campingImage
    },
    exteriorSection: {
        summerImage: summerImage,
        autumnImage: autumnImage,
        winterImage: winterImage,
        springImage: springImage,
    },
    other: {
        down_arrow: down_arrow,
        flagsXL: flagsXL,
        flagsL: flagsL,
        flagsM: flagsM,
        flagsS: flagsS,
        flagsXS: flagsXS,
        left_arrow: left_arrow,
        right_arrow: right_arrow,
        loader: loader
    }
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}

export default languageReducer;