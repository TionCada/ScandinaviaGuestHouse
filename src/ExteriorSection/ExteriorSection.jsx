import React, {useEffect} from 'react';
import s1 from "./ExteriorSection.module.css";
import s2 from "./ExteriorSectionMobile.module.css";
import {useMediaQuery} from "react-responsive";
import ScrollFade from "../common/ScrollFade/scrollFade";

const ExteriorSection = (props) => {

    const isMobile = useMediaQuery({query: '(max-width: 900px)'})

    let s;
    isMobile ? s = s2 : s = s1;

    useEffect(() => {
        ScrollFade.init();
    }, []);

    return (
        <div id="ExteriorSection" className={s.container}>
            <div className={s.innerContainer}>
                <div className={s.thirdMainColumn}>
                    <div data-aos="fade-in" className={s.secondBlock}>
                        <div className={s.firstColumn}>
                            <h3>{props.AutumnHeader}</h3>
                            <h2>{props.AutumnSubheader}</h2>
                            <div className={s.camouflageForDiv}>&nbsp;</div>
                        </div>
                        <div className={s.secondColumn}>
                            <img alt={""} src={props.autumnImage}/>
                        </div>
                    </div>
                    <div data-aos="fade-in" className={s.fourthBlock}>
                        <div className={s.firstColumn}>
                            <h3>{props.SpringHeader}</h3>
                            <h2>{props.SpringSubheader}</h2>
                            <div className={s.camouflageForDiv}>&nbsp;</div>
                        </div>
                        <div className={s.secondColumn}>
                            <img alt={""} src={props.springImage}/>
                        </div>
                    </div>
                </div>
                <div className={s.secondMainColumn}>
                    <div data-aos="fade-in" className={s.firstBlock}>
                        <div className={s.firstColumn}>
                            <h3>{props.SummerHeader}</h3>
                            <h2>{props.SummerSubheader}</h2>
                            <div className={s.camouflageForDiv}>&nbsp;</div>
                        </div>
                        <div className={s.secondColumn}>
                            <img alt={""} src={props.summerImage}/>
                        </div>
                    </div>
                    <div data-aos="fade-in" className={s.thirdBlock}>
                        <div className={s.firstColumn}>
                            <h3>{props.WinterHeader}</h3>
                            <h2>{props.WinterSubheader}</h2>
                            <div className={s.camouflageForDiv}>&nbsp;</div>
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