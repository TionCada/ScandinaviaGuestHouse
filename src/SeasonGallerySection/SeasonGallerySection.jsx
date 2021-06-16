import SliderNavigationContainer from "../common/SliderNavigation/SliderNavigationContainer";
import {useMediaQuery} from "react-responsive/src";
import s2 from "./SeasonGallerySectionMobile.module.css";
import s1 from "./SeasonGallerySection.module.css";
import {useHistory} from 'react-router-dom';
import {useEffect} from "react";

const SeasonGallerySection = (props) => {

    const history = useHistory();
    const isSmallScreen = useMediaQuery({query: '(max-width: 900px)'})

    let s;
    isSmallScreen ? s = s2 : s = s1;

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className={s.preContainer}>
            <div className={s.loaderDiv}>
                <img src={props.loader}/>
            </div>
            <div className={s.container}>
                <div className={s.firstColumn}>
                    <div className={s.subColumn}>
                        <button onClick={() => history.goBack()}>
                            <img alt={"Go to the main page"} src={props.left_arrow}/>
                        </button>
                        <div className={s.text}>
                            <div className={s.quote}>
                                <blockquote>
                                    <p>{props.text}</p>
                                </blockquote>
                                <p className={s.quoteAuthor}>{props.author}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.secondColumn}>
                    <SliderNavigationContainer style1={s} images={props.galleryImages}/>
                </div>
            </div>
        </div>
    )
}

export default SeasonGallerySection;