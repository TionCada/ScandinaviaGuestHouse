import React, {useRef, useState} from 'react';
import Slider from "react-slick";
import left_arrow from "../../assets/images/other/left_arrow.png";
import right_arrow from "../../assets/images/other/right_arrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-responsive-modal/styles.css';
import {SRLWrapper} from "simple-react-lightbox";

const SliderNavigation = (props) => {

    const customSlider = useRef();
    const [slide, setSlide] = useState(0);

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

    const options = {
        settings: {
            disablePanzoom: true,
            slideAnimationType: "both",
            slideTransitionSpeed: 0.1
        },
        buttons: {
            showAutoplayButton: false,
            showDownloadButton: false,
            showFullscreenButton: false,
            showThumbnailsButton: false,
            iconColor: 'rgba(255, 255, 255, 1)',
            backgroundColor: 'rgba(30,30,36,0)',
            size: '50px'
        },
        caption: {
            showCaption: false
        },
        thumbnails: {
            showThumbnails: false,
        },
        progressBar: {
            showProgressBar: false
        },
    };

    return (
        <div>
            <div className={props.s1.imageBlock}>
                <SRLWrapper options={options}>
                    <div className={props.s1.cardContainer}>
                            <Slider {...settings} ref={slider => (customSlider.current = slider)}>
                                {props.images.map((image, index) => (
                                        <div key={index} className={props.s1.card}>
                                            <img alt={"Interior of the house"} src={image}/>
                                        </div>
                                    )
                                )}
                            </Slider>
                    </div>
                </SRLWrapper>
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
