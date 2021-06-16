import React, {useEffect} from 'react';
import NavbarContainer from "../Navbar/NavigationBarContainer";
import {useMediaQuery} from "react-responsive/src";
import s2 from "./HomeSectionMobile.module.css";
import s1 from "./HomeSection.module.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomeSection = (props) => {

    const isMobile = useMediaQuery({query: '(max-width: 900px)'})

    let s;
    isMobile ? s = s2 : s = s1;

    useEffect(() => {
        AOS.init({duration: 2500});
    }, []);

    return (
        <div className={s.container}>
            <div className={s.navbr}>
                <NavbarContainer/>
            </div>
            <div data-aos="fade-in" className={s.firstColumn}>
                <div className={s.contentFirst}>
                    <h1>{props.firstTextBlock}</h1>
                </div>
                <div className={s.contentSecond}>
                    <p>{props.secondTextBlock}</p>
                </div>
                <div  className={s.down_arrow}>
                    <img alt={""} src={props.down_arrow}/>
                </div>
            </div>
            <div className={s.secondColumn}>
                <div className={s.background_image}>
                    <img alt={""} src={props.backgroundImage}/>
                </div>
            </div>
        </div>
    );
}

export default HomeSection;