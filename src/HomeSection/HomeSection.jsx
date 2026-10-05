import React, {useEffect} from 'react';
import NavbarContainer from "../Navbar/NavigationBarContainer";
import s from "./HomeSection.module.css";
import ScrollFade from "../common/ScrollFade/scrollFade";

const HomeSection = (props) => {

    useEffect(() => {
        ScrollFade.init();
    }, []);

    return (
        <div className={s.container}>
            <NavbarContainer/>
            <div className={s.hero}>
                <video className={s.video} src={props.backgroundVideo} poster={props.backgroundImage}
                       autoPlay muted loop playsInline/>
                <div className={s.overlay}/>
                <div data-aos="fade-in" className={s.content}>
                    <h1>{props.firstTextBlock}</h1>
                    <p>{props.secondTextBlock}</p>
                </div>
                <div className={s.down_arrow}>
                    <img alt={""} src={props.down_arrow}/>
                </div>
            </div>
        </div>
    );
}

export default HomeSection;
