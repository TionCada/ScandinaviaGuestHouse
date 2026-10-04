import React, {useEffect, useState} from 'react';
import s from "./NavigationBar.module.css";
import {Modal} from "react-responsive-modal";
import {HashLink as Link} from 'react-router-hash-link';
import {Nav, Navbar} from "react-bootstrap";
import {useMediaQuery} from "react-responsive";
import MenuContainer from "../Menu/MenuContainer";

const NavigationBar = (props) => {

    const isMobileDevice = useMediaQuery({query: '(max-width: 500px)'})
    const isSmallScreen = useMediaQuery({ query: '(max-width: 1200px)' })

    const [openModal, setOpenModal] = useState(false);
    const onOpenModal = () => {setOpenModal(true)};
    const onCloseModal = () => setOpenModal(false);

    useEffect(() => {

        const handleResize = () => {props.setMenuClosed()}
        window.addEventListener('resize', handleResize)

        if (props.isMenuOpened === true) {
            if (isSmallScreen === false) {
                props.setMenuClosed();
            }
            document.body.style.position = 'fixed';
            document.body.style.overflowY = 'scroll';
            document.body.style.width = '100%';
        }

        return () => {
            document.body.style.position = 'static';
            document.body.style.overflowY = 'auto';
            document.body.style.width = 'auto';
            window.removeEventListener('resize', handleResize)
        }
    });

    return (
        <div className={s.container}>
            {/* expand and variant were react-bootstrap 1.x defaultProps, which React 19 no longer applies */}
            <Navbar className={s.navbarContainer} bg="transparent" expand variant="light">
                <Navbar.Brand href="/" className={s.navbarBrand}>
                    <img alt={"Scandinavia logo"} src={props.logo}/>
                </Navbar.Brand>
                { !isSmallScreen && <Nav className={"mx-auto"}>
                    <div className={s.linksList}>
                        <Link smooth className={s.link} to="/#InteriorSection">{props.firstLink}</Link>
                        <Link smooth className={s.link} to="/#ExteriorSection">{props.secondLink}</Link>
                        <Link smooth className={s.link} to="/#ContactsSection">{props.thirdLink}</Link>
                        {props.isEnglishLanguageActive
                            ? <Link to="#" className={s.link} onClick={() =>
                            {props.switchToUkrainian()}}>{props.fourthLink}</Link>
                            : <Link to="#" className={s.link} onClick={() =>
                            {props.switchToEnglish()}}>{props.fourthLink}</Link>
                        }
                    </div>
                </Nav>}
                <Nav className="ml-auto">
                    <Modal classNames={{modal: s.customModal}}
                           showCloseIcon={true} open={openModal}
                           onClose={onCloseModal} center>
                        <div className={s.popupImage}>
                            <h3>{props.phoneCall}</h3>
                            <div className={s.phoneSection}>
                                <img alt={""} src={props.black_phone}/>
                                <p>{props.phoneNumber}</p>
                            </div>
                        </div>
                    </Modal>
                    <button className={s.phoneButton} onClick={() => { isMobileDevice ? window.open('tel:' + props.phoneNumber) : onOpenModal()}}>
                        <img alt={"See phone number"} tabIndex={0} src={props.black_phone}/>
                    </button>
                    {isSmallScreen && <div className={s.menuButton}>
                        <button className={[s.burger, s.menuButtonTab, props.isMenuOpened && s.burgerActive].filter(Boolean).join(' ')}
                                onClick={() => {props.isMenuOpened ? props.setMenuClosed() : props.setMenuOpened()}}>
                            <div className={s.burgerBox}>
                                <div className={s.burgerInner}/>
                            </div>
                        </button>
                    </div>}
                    { (props.isMenuOpened && isSmallScreen) && <MenuContainer/> }
                </Nav>
            </Navbar>
        </div>
    )
};

export default NavigationBar;