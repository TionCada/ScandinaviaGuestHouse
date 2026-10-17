import backgroundImage from "../assets/images/homeSection/image1.jpg"
import backgroundVideo from "../assets/videos/homeSection/video1.mp4"
import bungalowImage from "../assets/images/housesSection/bungalow.jpg"
import campingImage from "../assets/images/housesSection/camping.jpg"
// Every photo in a house's folder, in file name order (the names start with 01, 02, ...)
const inNameOrder = (photos) => Object.entries(photos)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);
const bungalowGallery = inNameOrder(import.meta.glob("../assets/images/housesSection/bungalow/*.jpg",
    {eager: true, import: "default"}));
const campingGallery = inNameOrder(import.meta.glob("../assets/images/housesSection/camping/*.jpg",
    {eager: true, import: "default"}));
// Nature photos for the main page carousel: image1.jpg, image2.jpg, ... in number order, by
// season. The carousel shows them cropped to one tall shape; the same numbers in the "full"
// folder are the whole, uncropped photos, opened full screen
const inNumberOrder = (photos) => Object.entries(photos)
    .sort(([a], [b]) => parseInt(a.match(/image(\d+)/)[1]) - parseInt(b.match(/image(\d+)/)[1]))
    .map(([, url]) => url);
const naturePhotos = inNumberOrder(import.meta.glob("../assets/images/exteriorSection/image*.jpg",
    {eager: true, import: "default"}));
const naturePhotosFull = inNumberOrder(import.meta.glob("../assets/images/exteriorSection/full/image*.jpg",
    {eager: true, import: "default"}));
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
        campingImage: campingImage,
        // Photos on each house's page; the camping shows its cover photo until its folder has some
        bungalowPhotos: bungalowGallery,
        campingPhotos: campingGallery.length > 0 ? campingGallery : [campingImage]
    },
    exteriorSection: {
        photos: naturePhotos,
        fullPhotos: naturePhotosFull,
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