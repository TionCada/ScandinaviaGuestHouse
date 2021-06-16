import {connect} from "react-redux";
import App from "./App";

const AppContainer = (props) => {
    return <App {...props}/>
}

let mapStateToProps = (state) => {
    return {
        summerGalleryPageText: state.languages.galleryPage.summer.text,
        summerGalleryPageAuthor: state.languages.galleryPage.summer.author,
        autumnGalleryPageText: state.languages.galleryPage.autumn.text,
        autumnGalleryPageAuthor: state.languages.galleryPage.autumn.author,
        winterGalleryPageText: state.languages.galleryPage.winter.text,
        winterGalleryPageAuthor: state.languages.galleryPage.winter.author,
        springGalleryPageText: state.languages.galleryPage.spring.text,
        springGalleryPageAuthor: state.languages.galleryPage.spring.author,
        summerSeasonPhotos: state.content.seasonsGallerySection.summerSeasonPhotos,
        autumnSeasonPhotos: state.content.seasonsGallerySection.autumnSeasonPhotos,
        winterSeasonPhotos: state.content.seasonsGallerySection.winterSeasonPhotos,
        springSeasonPhotos: state.content.seasonsGallerySection.springSeasonPhotos
    }
}

export default connect(mapStateToProps, {})(AppContainer);