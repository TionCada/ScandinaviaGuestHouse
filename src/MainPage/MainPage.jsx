import React, {useEffect} from 'react';
import {useLocation} from "react-router-dom";
import s from "../App.module.css";
import HomeSectionContainer from "../HomeSection/HomeSectionContainer";
import HousesSectionContainer from "../HousesSection/HousesSectionContainer";
import ExteriorSectionContainer from "../ExteriorSection/ExteriorSectionContainer";
import ContactsSectionContainer from "../ContactsSection/ContactsSectionContainer";

const MainPage = () => {

    const {hash} = useLocation();

    // A link from another page can name a section in the
    // hash: scroll to it once the page has rendered
    useEffect(() => {
        const section = hash && document.getElementById(hash.slice(1));
        if (section) section.scrollIntoView();
    }, [hash]);

    return (
        <div>
            <div className={s.homeSection}>
                <HomeSectionContainer/>
            </div>
            <div>
                <HousesSectionContainer/>
            </div>
            <div className={s.exteriorSection}>
                <ExteriorSectionContainer/>
            </div>
            <div className={s.ContactsSection}>
                <ContactsSectionContainer/>
            </div>
        </div>
    );
}

export default MainPage;
