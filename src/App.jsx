import './App.module.css';
import React, {useEffect, useRef} from 'react';
import s from "./App.module.css"
import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import HousePageContainer from "./HousePage/HousePageContainer";
import {useMediaQuery} from "react-responsive";

// The page fades in when the site opens and on every move to a house page, hiding its carousel
// settling into place while the page is still blank. Coming back to the main page shows it
// straight away. The new key makes React create the block anew on every move to another page
// (not on jumps to a section of the same page), which restarts the fade
const FadingPage = ({children}) => {
    const {pathname} = useLocation();
    const firstPathname = useRef(pathname);
    const hasMoved = useRef(false);
    if (pathname !== firstPathname.current) {
        hasMoved.current = true;
    }
    const fades = !hasMoved.current || pathname !== '/';
    return <div key={pathname} className={`${s.container} ${fades ? s.fadeIn : ''}`}>{children}</div>;
}

const App = () => {

    const isMobile = useMediaQuery({query: '(max-width: 900px)'})

    useEffect(() => {
        if (isMobile === false) {
            document.body.style = 'background-color: #ffffff;';
        }
        return () => {
            document.body.style = 'background-color: #ffffff;';
        }
    });

    return (
        <BrowserRouter>
            <FadingPage>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/bungalow' element={<HousePageContainer houseId='bungalow'/>}/>
                    <Route path='/camping' element={<HousePageContainer houseId='camping'/>}/>
                    {/* The season gallery pages were removed; send old links to the main page */}
                    <Route path='*' element={<Navigate to='/' replace/>}/>
                </Routes>
            </FadingPage>
        </BrowserRouter>
    );
}

export default App;