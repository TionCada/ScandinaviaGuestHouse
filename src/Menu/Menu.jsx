import React from 'react';
import s from "./Menu.module.css"
import {HashLink as Link} from "react-router-hash-link";
import animateScrollTo from 'animated-scroll-to';
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavigationBar = (props) => {

    const defaultOptions = {
        cancelOnUserAction: false,
        easeOutQuad: (t) => { return t * (2 - t) },
        elementToScroll: window,
        horizontalOffset: 0,
        maxDuration: 1500,
        minDuration: 250,
        speed: 1000,
        verticalOffset: 0,
    };

    return (
        <div className={s.container}>
            <div className={s.linksList}>
                <Link to="#" onClick={() => {props.setMenuClosed(); animateScrollTo((document.getElementById("InteriorSection")), defaultOptions)}} className={s.link}>{props.firstLink}<img className={s.arrow} alt={""} src={props.right_arrow}/></Link>
                <Link to="#" onClick={() => {props.setMenuClosed(); animateScrollTo((document.getElementById("ExteriorSection")), defaultOptions)}} className={s.link}>{props.secondLink}<img className={s.arrow} alt={""} src={props.right_arrow}/></Link>
                <Link to="#" onClick={() => {props.setMenuClosed(); animateScrollTo((document.getElementById("ContactsSection")), defaultOptions)}} className={s.link}>{props.thirdLink}<img className={s.arrow} alt={""} src={props.right_arrow}/></Link>
                {props.isEnglishLanguageActive
                    ? <Link to="#" className={s.link} onClick={() => {
                        props.switchToUkrainian()
                    }}>{props.fourthLink}<FontAwesomeIcon className={s.icon} icon={faGlobeAmericas} /></Link>
                    : <Link to="#" className={s.link} onClick={() => {
                        props.switchToEnglish()
                    }}>{props.fourthLink}<FontAwesomeIcon className={s.icon} icon={faGlobeAmericas} /></Link>
                }
            </div>
        </div>
    )
};

export default NavigationBar;