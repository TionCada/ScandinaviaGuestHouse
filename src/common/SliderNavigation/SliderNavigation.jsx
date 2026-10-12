import React, {useEffect, useRef, useState} from 'react';
import SlickModule from "react-slick";
import left_arrow from "../../assets/images/other/left_arrow.png";
import right_arrow from "../../assets/images/other/right_arrow.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import l from "./SliderNavigation.module.css";

// react-slick is CommonJS; under Vite the default import can arrive as {default: Slider}
const Slider = SlickModule.default ?? SlickModule;

// Photos that have already loaded on this visit: a carousel whose first photos are among them
// is shown at once, without fading in
const loadedPhotos = new Set();

// The photos the row's place depends on: the first and the two before it (the last two, as the
// row goes round)
const firstPhotos = (images) =>
    [...new Set([images[0], images[images.length - 1], images[images.length - 2]])].filter(Boolean);

const SliderNavigation = (props) => {

    const customSlider = useRef();
    const [slide, setSlide] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(-1);
    const lightboxOpen = lightboxIndex >= 0;
    const [ready, setReady] = useState(() => firstPhotos(props.images).every(src => loadedPhotos.has(src)));

    // The carousel places the photos before they have loaded, when their widths are still
    // unknown, so the first time it is kept invisible, in its place on the page, until it can
    // be centred: once its first photos have loaded it is re-centred and faded in. The rest load
    // after, to the right, without moving it. On a slow connection it is shown regardless
    useEffect(() => {
        if (ready) return;
        let cancelled = false;
        const timers = [];
        const show = () => {
            if (!cancelled) setReady(true);
        };
        Promise.all(firstPhotos(props.images).map(src => new Promise(resolve => {
            const image = new Image();
            image.onload = () => {
                loadedPhotos.add(src);
                resolve();
            };
            image.onerror = resolve;
            image.src = src;
        }))).then(() => {
            if (cancelled) return;
            // Re-centre now, rather than once all the photos have loaded and 50ms after, and
            // show it from the next frame, once the new positions are on the page
            customSlider.current?.innerSlider?.resizeWindow();
            requestAnimationFrame(() => requestAnimationFrame(show));
        });
        timers.push(setTimeout(show, 2500));
        return () => {
            cancelled = true;
            timers.forEach(clearTimeout);
        };
    }, [props.images]);

    // While the photos are open full screen, keep the page behind from scrolling, without
    // changing the page at all: the lightbox's own way hides the scrollbar and pads the page
    // in its place, and the carousels, which reach the window's edge, jump as it opens and closes
    useEffect(() => {
        if (!lightboxOpen) return;
        const scrollY = window.scrollY;
        const scrollKeys = [' ', 'PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown'];
        const prevent = (event) => event.preventDefault();
        const preventKeys = (event) => {
            if (scrollKeys.includes(event.key)) event.preventDefault();
        };
        // Anything that still scrolls it, such as dragging the scrollbar, is put back
        const stay = () => {
            if (window.scrollY !== scrollY) window.scrollTo({top: scrollY, behavior: 'instant'});
        };
        document.addEventListener('wheel', prevent, {passive: false});
        document.addEventListener('touchmove', prevent, {passive: false});
        document.addEventListener('keydown', preventKeys);
        window.addEventListener('scroll', stay);
        return () => {
            document.removeEventListener('wheel', prevent);
            document.removeEventListener('touchmove', prevent);
            document.removeEventListener('keydown', preventKeys);
            window.removeEventListener('scroll', stay);
        };
    }, [lightboxOpen]);

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
        <div className={`${l.carousel} ${ready ? l.ready : ''}`}>
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
                <Lightbox open={lightboxOpen} noScroll={{disabled: true}} index={lightboxIndex} close={() => setLightboxIndex(-1)}
                          slides={(props.fullImages || props.images).map(image => ({src: image}))}
                          // Opaque, so nothing of the page shows behind the photo
                          styles={{container: {backgroundColor: 'rgb(30, 30, 30)'}}}
                          render={{
                              iconPrev: () => <img alt="" className={l.lightboxArrow} src={left_arrow}/>,
                              iconNext: () => <img alt="" className={l.lightboxArrow} src={right_arrow}/>,
                              // A cross of the same thin white lines as the arrows
                              iconClose: () => (
                                  <svg className={l.lightboxClose} viewBox="0 0 32 32" aria-hidden="true">
                                      <path d="M4 4 L28 28 M28 4 L4 28" stroke="currentColor" strokeWidth="2"/>
                                  </svg>
                              )
                          }}/>
            </div>
            <div className={props.s1.navigationSection}>
                <div className={props.s1.navArrows}>
                    <button onClick={() => customSlider.current.slickPrev()}>
                        <img alt={"Previous slide"} className={props.s1.leftArrowWrapper} src={left_arrow}/>
                    </button>
                    <button onClick={() => customSlider.current.slickNext()}>
                        <img alt={"Next slide"} className={props.s1.rightArrowWrapper} src={right_arrow}/>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default SliderNavigation;
