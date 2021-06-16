import React, {useEffect, useState} from 'react';
import s1 from "./TransitionSection.module.css";
import s2 from "./TransitionSectionMobile.module.css";
import {useMediaQuery} from "react-responsive/src";
import AOS from "aos";
import 'aos/dist/aos.css';

const TransitionSection = (props) => {

    const isMobile = useMediaQuery({query: '(max-width: 900px)'})

    const [marginTop, setMarginTop] = useState(90)

    let s;
    isMobile ? s = s2 : s = s1;

    const updateMarginTop  = () => {
        if (!isMobile) {
            let iframeHeight = document.querySelector("iframe").offsetHeight;
            let containerHeight = document.getElementById("block").offsetHeight;
            setMarginTop((containerHeight - iframeHeight) / 2);
            document.querySelector("iframe").style.marginTop = marginTop + "px";
        } else if (isMobile) {
            document.querySelector("iframe").style.marginTop = 0 + "px";
        }
    }

    useEffect(() => {
        AOS.init({duration: 2000});
        updateMarginTop();
        window.addEventListener("resize", updateMarginTop);
        return () => {window.removeEventListener("resize", updateMarginTop)}
    });

    return (
        <div className={s.preContainer} id="block">
            <div className={s.container}>
                <div data-aos="fade-in" className={s.contentSecond}>
                    <h2>{props.header}</h2>
                    <h3>{props.subheader}</h3>
                </div>
                <iframe className={s.contentFirst}
                        src="https://www.youtube.com/embed/vm-dnFOMM64"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen>
                </iframe>
                <div data-aos="fade-in" className={s.contentThird}>
                    <div className={s.quote}>
                        <blockquote>
                            <p>{props.quote}</p>
                        </blockquote>
                        <p className={s.quoteAuthor}>{props.author}</p>
                        <div className={s.whoIsAuthor}>
                            <p className={s.quoteAuthor}>{props.whoIsAuthor}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransitionSection;