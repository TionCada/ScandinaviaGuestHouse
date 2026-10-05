import {connect} from "react-redux";
import ContactsSection from "./ContactsSection";

let mapStateToProps = (state) => {
    return {
        title: state.languages.contactsSection.title,
        infoBlock: state.languages.contactsSection.infoBlock,
        contactsHeader: state.languages.contactsSection.contacts.header,
        contactsAddress: state.languages.contactsSection.contacts.address,
        contactsPhone: state.languages.contactsSection.contacts.phone,
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