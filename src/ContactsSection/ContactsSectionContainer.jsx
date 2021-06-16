import {connect} from "react-redux";
import ContactsSection from "./ContactsSection";

let mapStateToProps = (state) => {
    return {
        title: state.languages.contactsSection.title,
        subtitle: state.languages.contactsSection.subtitle,
        infoBlock: state.languages.contactsSection.infoBlock,
        socialNetworksHeader: state.languages.contactsSection.socialNetworks.header,
        socialNetworksFacebook: state.languages.contactsSection.socialNetworks.facebook,
        socialNetworksInstagram: state.languages.contactsSection.socialNetworks.instagram,
        socialNetworksYoutube: state.languages.contactsSection.socialNetworks.youtube,
        contactsHeader: state.languages.contactsSection.contacts.header,
        contactsAddress: state.languages.contactsSection.contacts.address,
        contactsPhone: state.languages.contactsSection.contacts.phone,
        contactsEmail: state.languages.contactsSection.contacts.email,
        copyright: state.languages.contactsSection.copyright,
        madeBy: state.languages.contactsSection.madeBy,
        flagsXL: state.content.other.flagsXL,
        flagsL: state.content.other.flagsL,
        flagsM: state.content.other.flagsM,
        flagsS: state.content.other.flagsS,
        flagsXS: state.content.other.flagsXS
    }
}

export default connect(mapStateToProps, {})(ContactsSection);