import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import s from "./HousePage.module.css";
import NavbarContainer from "../Navbar/NavigationBarContainer";
import ContactsSectionContainer from "../ContactsSection/ContactsSectionContainer";
import SliderNavigationContainer from "../common/SliderNavigation/SliderNavigationContainer";
import g from "./HouseGallery.module.css";
import left_arrow from "../assets/images/other/left_arrow.png";

// Full description of one house: photos, price, check-in times, description and facilities by room
const HousePage = ({house, labels}) => {

    // Open at the top, not at the scroll position of the main page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [house.id]);

    useEffect(() => {
        const previousTitle = document.title;
        document.title = house.name + ' | Scandinavia Guest House';
        return () => {
            document.title = previousTitle;
        };
    }, [house.name]);

    const several = house.photos.length > 1;

    return (
        <div>
            <NavbarContainer/>
            <main className={s.page}>
                <div className={s.media}>
                    {several
                        ? <div className={g.gallery}><SliderNavigationContainer style1={g} images={house.photos}/></div>
                        : <img className={g.single} alt={house.name} src={house.photos[0]}/>}
                </div>

                <div className={s.top}>
                    <div>
                        {/* The house name, with an arrow back to the houses on the main page beside it */}
                        <div className={s.title}>
                            <Link className={s.back} to="/#HousesSection" aria-label={labels.allHouses}
                                  title={labels.allHouses}>
                                <img alt="" src={left_arrow}/>
                            </Link>
                            <h1>{house.title}</h1>
                        </div>
                        <p className={s.details}>{house.details}</p>
                        {house.price && <p className={s.price}>{house.price}</p>}
                        {house.priceNote && <p className={s.priceNote}>{house.priceNote}</p>}
                        <p className={s.rules}>{house.rules}</p>
                    </div>
                    <div>
                        <p className={s.description}>{house.description}</p>
                    </div>
                </div>

                <div className={s.amenities}>
                    {house.amenities.map(room => (
                        <div key={room.title}>
                            <h3>{room.title}</h3>
                            <ul>
                                {room.items.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </main>
            <ContactsSectionContainer/>
        </div>
    );
}

export default HousePage;
