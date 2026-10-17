import React, {useEffect, useRef} from 'react';
import NavbarContainer from "../Navbar/NavigationBarContainer";
import s from "./HomeSection.module.css";
import ScrollFade from "../common/ScrollFade/scrollFade";

const HomeSection = (props) => {

    useEffect(() => {
        ScrollFade.init();
    }, []);

    const videoRef = useRef(null);

    // When the phone blocks autoplay (for example, iPhone in Low Power Mode), a tap anywhere on
    // the video area starts it: browsers allow playback after a tap
    const playVideo = () => {
        const video = videoRef.current;
        if (video.paused) {
            video.play().catch(() => {});
        }
    };

    return (
        <div className={s.container}>
            <NavbarContainer/>
            <div className={s.hero} onClick={playVideo}>
                <video ref={videoRef} className={s.video} src={props.backgroundVideo}
                       poster={props.backgroundImage} autoPlay muted loop playsInline/>
                <div className={s.overlay}/>
                <div className={s.content}>
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
