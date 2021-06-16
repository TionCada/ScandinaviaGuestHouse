import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";
import s1 from "./ExteriorSection.module.css";
import s2 from "./ExteriorSectionMobile.module.css";
import {useMediaQuery} from "react-responsive/src";
import AOS from "aos";
import 'aos/dist/aos.css';

const ExteriorSection = (props) => {

    const isMobile = useMediaQuery({query: '(max-width: 900px)'})

    let s;
    isMobile ? s = s2 : s = s1;

    useEffect(() => {
        AOS.init({duration: 2000});
    }, []);

    return (
        <div id="ExteriorSection" className={s.container}>
            <div className={s.innerContainer}>
                <div className={s.thirdMainColumn}>
                    <div data-aos="fade-in" className={s.secondBlock}>
                        <div className={s.firstColumn}>
                            <h3>{props.AutumnSubheader}</h3>
                            <h2>{props.AutumnHeader}</h2>
                            <div className={s.camouflageForDiv}>&nbsp;</div>
                            <div className={s.linkWrapper}>
                                <NavLink to="/autumnSeason">
                                    <img alt={"Go to autumn season page"} src={props.right_arrow_white}/>
                                </NavLink>
                            </div>
                        </div>
                        <div className={s.secondColumn}>
                            <img alt={""} src={props.autumnImage}/>
                        </div>
                    </div>
                    <div data-aos="fade-in" className={s.fourthBlock}>
                        <div className={s.firstColumn}>
                            <h3>{props.SpringSubheader}</h3>
                            <h2>{props.SpringHeader}</h2>
                            <div className={s.camouflageForDiv}>&nbsp;</div>
                            <div className={s.linkWrapper}>
                                <NavLink to="/springSeason">
                                    <img alt={"Go to spring season page"} src={props.right_arrow_white}/>
                                </NavLink>
                            </div>
                        </div>
                        <div className={s.secondColumn}>
                            <img alt={""} src={props.springImage}/>
                        </div>
                    </div>
                </div>
                <div className={s.secondMainColumn}>
                    <div data-aos="fade-in" className={s.firstBlock}>
                        <div className={s.firstColumn}>
                            <h3>{props.SummerSubheader}</h3>
                            <h2>{props.SummerHeader}</h2>
                            <div className={s.camouflageForDiv}>&nbsp;</div>
                            <div className={s.linkWrapper}>
                                <NavLink to="/summerSeason">
                                    <img alt={"Go to summer season page"} src={props.right_arrow_white}/>
                                </NavLink>
                            </div>
                        </div>
                        <div className={s.secondColumn}>
                            <img alt={""} src={props.summerImage}/>
                        </div>
                    </div>
                    <div data-aos="fade-in" className={s.thirdBlock}>
                        <div className={s.firstColumn}>
                            <h3>{props.WinterSubheader}</h3>
                            <h2>{props.WinterHeader}</h2>
                            <div className={s.camouflageForDiv}>&nbsp;</div>
                            <div className={s.linkWrapper}>
                                <NavLink to="/winterSeason">
                                    <img alt={"Go to winter season page"} src={props.right_arrow_white}/>
                                </NavLink>
                            </div>
                        </div>
                        <div className={s.secondColumn}>
                            <img alt={""} src={props.winterImage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExteriorSection;