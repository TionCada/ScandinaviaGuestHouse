import ukrainianLanguage from "../redux/ukrainianLanguage";
import englishLanguage from "../redux/englishLanguage";
import heroPoster from "../assets/images/homeSection/image1.jpg"
import heroVideo from "../assets/videos/homeSection/video1.mp4"
import bungalowCover from "../assets/images/housesSection/bungalow.jpg"
import campingCover from "../assets/images/housesSection/camping.jpg"

// The site's editable content as built into it: shown until something is saved in the admin,
// and for anything a saved version doesn't have. Same shape as the saved document:
//   texts: {uk, en}  every text, in the shape of ukrainianLanguage.js
//   media: links to the photos and the video

// Every photo in a house's folder, in file name order (the names start with 01, 02, ...)
const inNameOrder = (photos) => Object.entries(photos)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);
// image1.jpg, image2.jpg, ... in number order
const inNumberOrder = (photos) => Object.entries(photos)
    .sort(([a], [b]) => parseInt(a.match(/image(\d+)/)[1]) - parseInt(b.match(/image(\d+)/)[1]))
    .map(([, url]) => url);

const bungalowPhotos = inNameOrder(import.meta.glob("../assets/images/housesSection/bungalow/*.jpg",
    {eager: true, import: "default"}));
const campingPhotos = inNameOrder(import.meta.glob("../assets/images/housesSection/camping/*.jpg",
    {eager: true, import: "default"}));
// Nature photos for the main page carousel, cropped to one tall shape; the same numbers in the
// "full" folder are the whole, uncropped photos, opened full screen
const momentPhotos = inNumberOrder(import.meta.glob("../assets/images/exteriorSection/image*.jpg",
    {eager: true, import: "default"}));
const momentPhotosFull = inNumberOrder(import.meta.glob("../assets/images/exteriorSection/full/image*.jpg",
    {eager: true, import: "default"}));

const defaultContent = {
    texts: {
        uk: ukrainianLanguage,
        en: englishLanguage
    },
    media: {
        heroVideo,
        // Shown until the video plays
        heroPoster,
        bungalowCover,
        campingCover,
        bungalowPhotos,
        campingPhotos,
        // src: shown in the carousel; full: opened full screen
        moments: momentPhotos.map((src, index) => ({src, full: momentPhotosFull[index] || src}))
    }
};

const isPlainObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

// The saved values over the built-in ones, field by field, so texts added to the site later
// still show before they are saved in the admin. Lists are taken whole
const mergeOver = (base, saved) => {
    if (!isPlainObject(base) || !isPlainObject(saved)) {
        return saved === undefined ? base : saved;
    }
    const merged = {...base};
    Object.keys(saved).forEach(key => {
        merged[key] = mergeOver(base[key], saved[key]);
    });
    return merged;
};

// The content to show: a saved document (or null when nothing is saved) over the built-in one
export const withDefaults = (saved) => isPlainObject(saved) ? mergeOver(defaultContent, saved) : defaultContent;

export default defaultContent;
