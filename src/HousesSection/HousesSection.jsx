import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import s from "./HousesSection.module.css";
import ScrollFade from "../common/ScrollFade/scrollFade";
import right_arrow from "../assets/images/other/right_arrow.png";

const HousesSection = (props) => {

    useEffect(() => {
        ScrollFade.init();
    }, []);

    const houses = [
        {id: 'bungalow', name: props.bungalow, details: props.bungalowDetails, image: props.bungalowImage},
        {id: 'camping', name: props.camping, details: props.campingDetails, image: props.campingImage}
    ];

    return (
        <div id="HousesSection" className={s.container}>
            <div className={s.houses}>
                {houses.map(house => (
                    // The photo and the caption under it lead to the house's own page
                    <Link className={s.house} to={'/' + house.id} key={house.id}>
                        {/* The photo fades in as it is scrolled to; the caption stays */}
                        <div data-aos="fade-in" className={s.photo}>
                            <img alt={house.name} src={house.image}/>
                        </div>
                        <div className={s.caption}>
                            <div>
                                <h4>{house.name}</h4>
                                <p className={s.details}>{house.details}</p>
                            </div>
                            <img className={s.arrow} alt="" src={right_arrow}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HousesSection;
