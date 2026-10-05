import React from 'react';
import {useMediaQuery} from "react-responsive";
import s2 from "./ContactsSectionMobile.module.css"
import s1 from "./ContactsSection.module.css";
import { faPhone, faLocationDot, faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <div className={s.generalInfo}>
                <h1>{props.title}</h1>
                <p>{props.infoBlock}</p>
            </div>
            <div className={s.contacts}>
                <p  className={s.header}>{props.contactsHeader}</p>
                <p>
                    <FontAwesomeIcon widthAuto className={s.icon} icon={faPhone} />
                    <a href={"tel:" + props.contactsPhone}>{props.contactsPhone}</a>
                </p>
                <p>
                    <FontAwesomeIcon widthAuto className={s.icon} icon={faLocationDot} />
                    <a href="https://goo.gl/maps/Tn9ZTVf9xRgfjYCC6" target={"_blank"} rel={"noreferrer"}>{props.contactsAddress}</a>
                </p>
            </div>
            <div className={s.flags}>
                <img alt={"Scandinavian flags"} src={(isFlagsXL && props.flagsXL) || (isFlagsL && props.flagsL)
                || (isFlagsM && props.flagsM) || (isFlagsS && props.flagsS)
                || (isFlagsXS && props.flagsXS)}/>
            </div>
            <div className={s.copyrights}>
                <p className={s.copyright1}>{props.copyright}</p>
                <a href="https://github.com/TionCada" target={"_blank"} rel={"noreferrer"} className={s.copyright2}><FontAwesomeIcon widthAuto icon={faCode} /> {props.madeBy}</a>
            </div>
        </div>
    );
}

export default ContactsSection;
