import backgroundImage from "../assets/images/homeSection/image1.jpg"
import summerImage from "../assets/images/exteriorSection/image1.jpg"
import autumnImage from "../assets/images/exteriorSection/image2.jpg"
import winterImage from "../assets/images/exteriorSection/image3.jpg"
import springImage from "../assets/images/exteriorSection/image4.jpg"
import logo from "../assets/images/navigationMenu/logo.svg"
import white_phone from "../assets/images/navigationMenu/white_phone.svg"
import black_phone from "../assets/images/navigationMenu/black_phone.svg"
import interiorImage1 from "../assets/images/interiorSection/image1.jpg"
import interiorImage2 from "../assets/images/interiorSection/image2.jpg"
import interiorImage3 from "../assets/images/interiorSection/image3.jpg"
import interiorImage4 from "../assets/images/interiorSection/image4.jpg"
import interiorImage5 from "../assets/images/interiorSection/image5.jpg"
import interiorImage6 from "../assets/images/interiorSection/image6.jpg"
import interiorImage7 from "../assets/images/interiorSection/image7.jpg"
import interiorImage8 from "../assets/images/interiorSection/image8.jpg"
import interiorImage9 from "../assets/images/interiorSection/image9.jpg"
import interiorImage10 from "../assets/images/interiorSection/image10.jpg"
import down_arrow from "../assets/images/other/down_arrow.svg"
import flagsXL from "../assets/images/other/flagsXL.jpg"
import flagsL from "../assets/images/other/flagsL.jpg"
import flagsM from "../assets/images/other/flagsM.jpg"
import flagsS from "../assets/images/other/flagsS.jpg"
import flagsXS from "../assets/images/other/flagsXS.jpg"
import left_arrow from "../assets/images/other/left_arrow.svg"
import right_arrow from "../assets/images/other/right_arrow.svg"
import right_arrow_white from "../assets/images/other/right_arrow_white.png"
import winterImage1 from "../assets/images/exteriorSection/winter/image1.jpg"
import winterImage2 from "../assets/images/exteriorSection/winter/image2.jpg"
import winterImage3 from "../assets/images/exteriorSection/winter/image3.jpg"
import winterImage4 from "../assets/images/exteriorSection/winter/image4.jpg"
import winterImage5 from "../assets/images/exteriorSection/winter/image5.jpg"
import winterImage6 from "../assets/images/exteriorSection/winter/image6.jpg"
import winterImage7 from "../assets/images/exteriorSection/winter/image7.jpg"
import winterImage8 from "../assets/images/exteriorSection/winter/image8.jpg"
import winterImage9 from "../assets/images/exteriorSection/winter/image9.jpg"
import summerImage1 from "../assets/images/exteriorSection/summer/image1.jpg"
import summerImage2 from "../assets/images/exteriorSection/summer/image2.jpg"
import summerImage3 from "../assets/images/exteriorSection/summer/image3.jpg"
import summerImage4 from "../assets/images/exteriorSection/summer/image4.jpg"
import summerImage5 from "../assets/images/exteriorSection/summer/image5.jpg"
import summerImage6 from "../assets/images/exteriorSection/summer/image6.jpg"
import summerImage7 from "../assets/images/exteriorSection/summer/image7.jpg"
import summerImage8 from "../assets/images/exteriorSection/summer/image8.jpg"
import summerImage9 from "../assets/images/exteriorSection/summer/image9.jpg"
import summerImage10 from "../assets/images/exteriorSection/summer/image10.jpg"
import summerImage11 from "../assets/images/exteriorSection/summer/image11.jpg"
import summerImage12 from "../assets/images/exteriorSection/summer/image12.jpg"
import autumnImage1 from "../assets/images/exteriorSection/autumn/image1.jpg"
import autumnImage2 from "../assets/images/exteriorSection/autumn/image2.jpg"
import autumnImage3 from "../assets/images/exteriorSection/autumn/image3.jpg"
import autumnImage4 from "../assets/images/exteriorSection/autumn/image4.jpg"
import autumnImage5 from "../assets/images/exteriorSection/autumn/image5.jpg"
import autumnImage6 from "../assets/images/exteriorSection/autumn/image6.jpg"
import autumnImage7 from "../assets/images/exteriorSection/autumn/image7.jpg"
import autumnImage8 from "../assets/images/exteriorSection/autumn/image8.jpg"
import springImage1 from "../assets/images/exteriorSection/spring/image1.jpg"
import springImage2 from "../assets/images/exteriorSection/spring/image2.jpg"
import springImage3 from "../assets/images/exteriorSection/spring/image3.jpg"
import springImage4 from "../assets/images/exteriorSection/spring/image4.jpg"
import springImage5 from "../assets/images/exteriorSection/spring/image5.jpg"
import springImage6 from "../assets/images/exteriorSection/spring/image6.jpg"
import springImage7 from "../assets/images/exteriorSection/spring/image7.jpg"
import loader from "../assets/images/other/loader.svg"

let initialState = {
    navigationMenu: {
        logo: logo,
        white_phone: white_phone,
        black_phone: black_phone
    },
    homeSection: {
        backgroundImage: backgroundImage
    },
    exteriorSection: {
        summerImage: summerImage,
        autumnImage: autumnImage,
        winterImage: winterImage,
        springImage: springImage,
    },
    seasonsGallerySection: {
        summerSeasonPhotos: [summerImage1, summerImage2, summerImage3,
            summerImage4, summerImage5, summerImage6, summerImage7,
            summerImage8, summerImage9, summerImage10, summerImage11, summerImage12],
        autumnSeasonPhotos: [autumnImage1, autumnImage2, autumnImage3,
            autumnImage4, autumnImage5, autumnImage6, autumnImage7, autumnImage8],
        winterSeasonPhotos: [winterImage1, winterImage2, winterImage3,
            winterImage4, winterImage5, winterImage6, winterImage7,
            winterImage8, winterImage9],
        springSeasonPhotos: [springImage1, springImage2, springImage3,
            springImage4, springImage5, springImage6, springImage7]
    },
    interiorSection: [interiorImage1, interiorImage2, interiorImage3,
        interiorImage4, interiorImage5, interiorImage6, interiorImage7,
        interiorImage8, interiorImage9, interiorImage10],
    other: {
        down_arrow: down_arrow,
        flagsXL: flagsXL,
        flagsL: flagsL,
        flagsM: flagsM,
        flagsS: flagsS,
        flagsXS: flagsXS,
        left_arrow: left_arrow,
        right_arrow: right_arrow,
        right_arrow_white: right_arrow_white,
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