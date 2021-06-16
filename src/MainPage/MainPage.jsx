import React from 'react';
import s from "../App.module.css";
import HomeSectionContainer from "../HomeSection/HomeSectionContainer";
import TransitionSectionContainer from "../TransitionSection/TransitionSectionContainer";
import ExteriorSectionContainer from "../ExteriorSection/ExteriorSectionContainer";
import InteriorSectionContainer from "../InteriorSection/InteriorSectionContainer";
import ContactsSectionContainer from "../ContactsSection/ContactsSectionContainer";

const MainPage = () => {

    return (
        <div>
            <div className={s.homeSection}>
                <HomeSectionContainer/>
            </div>
            <div className={s.transitionSection}>
                <TransitionSectionContainer/>
            </div>
            <div className={s.exteriorSection}>
                <ExteriorSectionContainer/>
            </div>
            <div className={s.exteriorSection}>
                <InteriorSectionContainer/>
            </div>
            <div className={s.ContactsSection}>
                <ContactsSectionContainer/>
            </div>
        </div>
    );
}

export default MainPage;
