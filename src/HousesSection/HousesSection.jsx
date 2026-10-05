import React, {useEffect} from 'react';
import s from "./HousesSection.module.css";
import ScrollFade from "../common/ScrollFade/scrollFade";

const HousesSection = (props) => {

    useEffect(() => {
        ScrollFade.init();
    }, []);

    const houses = [
        {id: 'bungalow', detailsFirst: true, name: props.bungalow, details: props.bungalowDetails, image: props.bungalowImage},
        {id: 'camping', name: props.camping, details: props.campingDetails, image: props.campingImage}
    ];

    return (
        <div id="HousesSection" className={s.container}>
            <div className={s.houses}>
                {houses.map(house => (
                    <div data-aos="fade-in" className={s.house} key={house.id}>
                        <div className={s.photo}>
                            <img alt={house.name} src={house.image}/>
                        </div>
                        {house.detailsFirst && <p className={s.details}>{house.details}</p>}
                        <h4>{house.name}</h4>
                        {!house.detailsFirst && <p className={s.details}>{house.details}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HousesSection;
