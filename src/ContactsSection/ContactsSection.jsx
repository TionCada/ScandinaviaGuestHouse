import React from 'react';
import {useMediaQuery} from "react-responsive";
import s2 from "./ContactsSectionMobile.module.css"
import s1 from "./ContactsSection.module.css";
import c from "./ContactsLayout.module.css";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Opens the village in Google Maps (the app on phones), whatever the page language
const MAP_URL = "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Кам'яна Гора, Рівненська область");

const ContactsSection = (props) => {

    const isSmallScreen = useMediaQuery({query: '(max-width: 740px)'})

    const isFlagsXL = useMediaQuery({query: '(min-width: 1200px)'})
    const isFlagsL = useMediaQuery({query: '(min-width: 900px)'})
    const isFlagsM = useMediaQuery({query: '(min-width: 850px)'})
    const isFlagsS = useMediaQuery({query: '(min-width: 550px)'})
    const isFlagsXS = useMediaQuery({query: '(min-width: 200px)'})

    let s;
    isSmallScreen ? s = s2 : s = s1;

    return (
        <div id="ContactsSection" className={s.container}>
            {/* Large heading, then columns of a small label over a large value */}
            <div className={c.contacts}>
                <h2 className={c.heading}>{props.contactsHeader}</h2>
                <div>
                    <p className={c.label}>{props.addressLabel}</p>
                    {/* Opens the village in Google Maps */}
                    <a className={c.value} href={MAP_URL} target={"_blank"} rel={"noreferrer"}>{props.contactsAddress}</a>
                </div>
                <div>
                    <p className={c.label}>{props.phoneLabel}</p>
                    {/* Opens the phone app with the number filled in; tel: links take no spaces */}
                    <a className={c.value} href={"tel:" + props.contactsPhone.replace(/\s/g, '')}>{props.contactsPhone}</a>
                </div>
                <div>
                    <p className={c.label}>{props.messengersLabel}</p>
                    {/* Opens a Viber chat with this number (needs Viber installed) */}
                    <a className={c.value} href={"viber://chat?number=" + encodeURIComponent(props.contactsPhone.replace(/\s/g, ''))}>
                        {props.contactsViber}
                    </a>
                </div>
            </div>
            <div className={s.flags}>
                <img alt={"Scandinavian flags"} src={(isFlagsXL && props.flagsXL) || (isFlagsL && props.flagsL)
                || (isFlagsM && props.flagsM) || (isFlagsS && props.flagsS)
                || (isFlagsXS && props.flagsXS)}/>
            </div>
            <div className={s.copyrights}>
                <p className={s.copyright1}>{props.copyright}</p>
                <a href="https://github.com/TionCada" target={"_blank"} rel={"noreferrer"} className={s.copyright2}><FontAwesomeIcon widthAuto className={s.creditIcon} icon={faCode} /> <span>{props.madeBy}</span></a>
            </div>
        </div>
    );
}

export default ContactsSection;
