import SliderNavigationContainer from "../common/SliderNavigation/SliderNavigationContainer";
import {useMediaQuery} from "react-responsive/src";
import s2 from "./InteriorSectionMobile.module.css";
import s1 from "./InteriorSection.module.css";
import {useEffect} from "react";
import AOS from "aos";
import 'aos/dist/aos.css';

const InteriorSection = (props) => {

    const isSmallScreen = useMediaQuery({query: '(max-width: 800px)'})

    let s;
    isSmallScreen ? s = s2 : s = s1;

    useEffect(() => {
        AOS.init({duration: 2000});
    }, []);


    return (
        <div id={"InteriorSection"} className={s.container}>
            <div className={s.differentColorBlock}>
                <div data-aos="fade-in" className={s.headerBlock}>
                    <h2>{props.header}</h2>
                    <h3>{props.subheader}</h3>
                </div>
                <div className={s.carousel}>
                    <SliderNavigationContainer style1={s} images={props.images}/>
                </div>
            </div>
            <div className={s.infoBlock}>
                <div className={s.firstTextBlock}>
                    <p data-aos="fade-in">{props.firstTextBlock}</p>
                </div>
                <div data-aos="fade-in" className={s.secondTextBlock}>
                        {props.secondTextBlock.map((textLine, index) => (
                            <p key={index}>{textLine}</p>))}
                </div>
            </div>
        </div>
    );
}

export default InteriorSection;
