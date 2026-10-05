import React from 'react';
import s from "../App.module.css";
import HomeSectionContainer from "../HomeSection/HomeSectionContainer";
import HousesSectionContainer from "../HousesSection/HousesSectionContainer";
import ExteriorSectionContainer from "../ExteriorSection/ExteriorSectionContainer";
import ContactsSectionContainer from "../ContactsSection/ContactsSectionContainer";

const MainPage = () => {

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
