import React, {useEffect} from 'react';
import s from "./ExteriorSection.module.css";
import ScrollFade from "../common/ScrollFade/scrollFade";
import SliderNavigationContainer from "../common/SliderNavigation/SliderNavigationContainer";

// Nature around the guest house: the same carousel as on the house pages, with its arrows
// over the sides of the photos and no counter
const ExteriorSection = (props) => {

    useEffect(() => {
        ScrollFade.init();
    }, []);

    return (
        <div id="ExteriorSection" className={s.container}>
            <h2 className={s.heading}>{props.title}</h2>
            <div className={s.gallery}>
                <SliderNavigationContainer style1={s} images={props.photos} fullImages={props.fullPhotos}/>
            </div>
        </div>
    );
}

export default ExteriorSection;
