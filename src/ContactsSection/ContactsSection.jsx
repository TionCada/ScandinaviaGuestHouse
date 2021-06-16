import React from 'react';
import {useMediaQuery} from "react-responsive/src";
import s2 from "./ContactsSectionMobile.module.css"
import s1 from "./ContactsSection.module.css";
import { faCamera, faPhoneAlt, faEnvelope, faMapMarkerAlt, faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faFacebookF } from "@fortawesome/free-brands-svg-icons";

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
                <h2>{props.subtitle}</h2>
                <p>{props.infoBlock}</p>
            </div>
            <div className={s.contacts}>
                <p  className={s.header}>{props.contactsHeader}</p>
                <p>
                    <FontAwesomeIcon className={s.icon} icon={faMapMarkerAlt} />
                    <a href="https://goo.gl/maps/Tn9ZTVf9xRgfjYCC6" target={"_blank"} rel={"noreferrer"}>{props.contactsAddress}</a>
                </p>
                <p>
                    <FontAwesomeIcon className={s.icon} icon={faPhoneAlt} />
                    <a href={"tel:" + props.contactsPhone}>{props.contactsPhone}</a>
                </p>
                <p>
                    <FontAwesomeIcon className={s.icon} icon={faEnvelope} />
                    <a href={"mailto:" + props.contactsEmail}>{props.contactsEmail}</a>
                </p>
            </div>
            <div className={s.socialNetworks}>
                <p className={s.header}>{props.socialNetworksHeader}</p>
                <p>
                    <FontAwesomeIcon className={s.icon} icon={faFacebookF} />
                    <a href="https://www.facebook.com/guest.house.scandinavia" target={"_blank"} rel={"noreferrer"}>{props.socialNetworksFacebook}</a>
                </p>
                <p>
                    <FontAwesomeIcon className={s.icon} icon={faCamera} />
                    <a href="https://www.instagram.com/guest.house.scandinavia" target={"_blank"} rel={"noreferrer"}>{props.socialNetworksInstagram}</a>
                </p>
                <p>
                    <FontAwesomeIcon className={s.icon} icon={faYoutube} />
                    <a href="https://www.youtube.com/channel/UC0rO9DD7zGdKYW5ZWlDvu2w" target={"_blank"} rel={"noreferrer"}>{props.socialNetworksYoutube}</a>
                </p>
            </div>
            <div className={s.flags}>
                <img alt={"Scandinavian flags"} src={(isFlagsXL && props.flagsXL) || (isFlagsL && props.flagsL)
                || (isFlagsM && props.flagsM) || (isFlagsS && props.flagsS)
                || (isFlagsXS && props.flagsXS)}/>
            </div>
            <div className={s.copyrights}>
                <p className={s.copyright1}>{props.copyright}</p>
                <a href="https://novak-anton.web.app/" target={"_blank"} rel={"noreferrer"} className={s.copyright2}><FontAwesomeIcon icon={faCode} /> {props.madeBy}</a>
            </div>
        </div>
    );
}

export default ContactsSection;
