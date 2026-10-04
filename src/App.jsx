import './App.module.css';
import React, {useEffect} from 'react';
import s from "./App.module.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import SeasonGallerySectionContainer from "./SeasonGallerySection/SeasonGallerySectionContainer";
import {useMediaQuery} from "react-responsive";

const App = (props) => {

    const isMobile = useMediaQuery({query: '(max-width: 900px)'})

    useEffect(() => {
        if (isMobile === false) {
            document.body.style = 'background-color: #f5f2ed;';
        }
        return () => {
            document.body.style = 'background-color: #ffffff;';
        }
    });

    return (
        <BrowserRouter>
            <div className={s.container}>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/summerSeason' element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <SeasonGallerySectionContainer
                                text={props.summerGalleryPageText} author={props.summerGalleryPageAuthor}
                                galleryImages={props.summerSeasonPhotos}/>
                        </React.Suspense>
                    }/>
                    <Route path='/autumnSeason' element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <SeasonGallerySectionContainer
                                text={props.autumnGalleryPageText} author={props.autumnGalleryPageAuthor}
                                galleryImages={props.autumnSeasonPhotos}/>
                        </React.Suspense>
                    }/>
                    <Route path='/winterSeason' element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <SeasonGallerySectionContainer
                                text={props.winterGalleryPageText} author={props.winterGalleryPageAuthor}
                                galleryImages={props.winterSeasonPhotos}/>
                        </React.Suspense>
                    }/>
                    <Route path='/springSeason' element={
                        <React.Suspense fallback={<div>Loading...</div>}>
                            <SeasonGallerySectionContainer
                                text={props.springGalleryPageText} author={props.springGalleryPageAuthor}
                                galleryImages={props.springSeasonPhotos}/>
                        </React.Suspense>
                    }/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;