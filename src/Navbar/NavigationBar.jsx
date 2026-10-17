import React from 'react';
import s from "./NavigationBar.module.css";

const GlobeIcon = () => (
    <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9"/>
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9M12 3c-2.5 2.6-3.8 5.6-3.8 9s1.3 6.4 3.8 9"/>
    </svg>
);

const PhoneIcon = () => (
    <svg className={s.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>
    </svg>
);

// Renders text in a box as wide as the widest of its variants, so switching language
// doesn't shift the header. Unused variants are invisible.
const StableLabel = ({text, variants}) => (
    <span className={s.stableLabel}>
        {variants.filter(v => v !== text).map(v => <span key={v} className={s.stableGhost} aria-hidden="true">{v}</span>)}
        <span>{text}</span>
    </span>
);

const NavigationBar = (props) => {

    const switchLanguage = () => {props.isEnglishLanguageActive ? props.switchToUkrainian() : props.switchToEnglish()};

    return (
        <header className={`${s.header} ${props.overVideo ? s.overVideo : ''}`}>
            <div className={s.left}>
                {/* Booking is done by phone: the button calls the guest house */}
                <a className={s.navItem} href={'tel:' + props.phoneNumber.replace(/\s/g, '')}
                   aria-label={props.bookLabel + ', ' + props.phoneNumber}>
                    <PhoneIcon/>
                    <span className={s.bookLabel}>
                        <StableLabel text={props.bookLabel} variants={props.labelVariants.book}/>
                    </span>
                </a>
            </div>
            <div className={s.logo}>
                <img alt={"Scandinavia logo"} src={props.logo}/>
            </div>
            <div className={s.right}>
                <button className={s.navItem} onClick={switchLanguage} aria-label={props.fourthLink}>
                    <GlobeIcon/>
                    <StableLabel text={props.languageCode} variants={props.labelVariants.language}/>
                </button>
            </div>
        </header>
    )
};

export default NavigationBar;
