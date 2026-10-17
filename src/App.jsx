import './App.module.css';
import React, {useEffect} from 'react';
import s from "./App.module.css"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import HousePageContainer from "./HousePage/HousePageContainer";
import {useMediaQuery} from "react-responsive";

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
            <div className={s.container}>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/bungalow' element={<HousePageContainer houseId='bungalow'/>}/>
                    <Route path='/camping' element={<HousePageContainer houseId='camping'/>}/>
                    {/* The season gallery pages were removed; send old links to the main page */}
                    <Route path='*' element={<Navigate to='/' replace/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;