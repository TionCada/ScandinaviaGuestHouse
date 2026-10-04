import React, {useRef, useState} from 'react';
import SlickModule from "react-slick";
import left_arrow from "../../assets/images/other/left_arrow.png";
import right_arrow from "../../assets/images/other/right_arrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-responsive-modal/styles.css';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// react-slick is CommonJS; under Vite the default import can arrive as {default: Slider}
const Slider = SlickModule.default ?? SlickModule;

const SliderNavigation = (props) => {

    const customSlider = useRef();
    const [slide, setSlide] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        swipe: true,
        accessibility: false,
        beforeChange: (currentIndex, nextIndex) => setSlide(nextIndex)
    };

    return (
        <div>
            <div className={props.s1.imageBlock}>
                <div className={props.s1.cardContainer}>
                        <Slider {...settings} ref={slider => (customSlider.current = slider)}>
                            {props.images.map((image, index) => (
                                    <div key={index} className={props.s1.card}>
                                        <img alt={"Interior of the house"} src={image}
                                             onClick={() => setLightboxIndex(index)}/>
                                    </div>
                                )
                            )}
                        </Slider>
                </div>
                <Lightbox open={lightboxIndex >= 0} index={lightboxIndex} close={() => setLightboxIndex(-1)}
                          slides={props.images.map(image => ({src: image}))}
                          styles={{container: {backgroundColor: 'rgba(30, 30, 30, 0.9)'}}}/>
            </div>
            <div className={props.s1.navigationSection}>
                <div className={props.s1.navArrows}>
                    <button onClick={() => customSlider.current.slickPrev()}>
                        <img alt={"Next slide"} className={props.s1.leftArrowWrapper} src={left_arrow}/>
                    </button>
                    <button onClick={() => customSlider.current.slickNext()}>
                        <img alt={"Previous slide"} className={props.s1.rightArrowWrapper} src={right_arrow}/>
                    </button>
                </div>
                <div className={props.s1.navNumbers}>
                    <p className={props.s1.firstNumber}>{(slide >= 9) ? (slide + 1) : ("0" + (slide + 1))}</p>
                    <p className={props.s1.secondNumber}>{(props.images.length > 9) ? ("/" + props.images.length) : ("/0" + props.images.length)}</p>
                </div>
            </div>
        </div>
    );
}
export default SliderNavigation;
