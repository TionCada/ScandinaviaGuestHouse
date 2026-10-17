const englishLanguage = {
    navigationMenu: {
        // Scrolls to the contacts at the bottom of the page
        contactsLabel: "Contact",
        fourthLink: "Українська",
        // Code of the language the switch leads to
        languageCode: "UA"
    },
    homeSection: {
        firstTextBlock: "Welcome to the \n" +
            "SCANDINAVIA \n" +
            "guest houses",
        secondTextBlock: "We invite everyone looking for \n" +
            "a cozy family vacation to stay \n" +
            "in our modern Scandinavian \n" +
            "houses near the forest"
    },
    housesSection: {
        bungalow: "Bungalow",
        bungalowDetails: "2 guests • 2 rooms • 30 m²",
        camping: "Camping",
        housePage: {
            allHouses: "All houses"
        },
        // DRAFT: the prices and everything about the camping below are placeholders, replace with real ones.
        // An empty price is not shown.
        bungalowInfo: {
            title: "Bungalow",
            price: "",
            priceNote: "",
            description: "A cozy bungalow with two bedrooms, a terrace, and a private barbecue " +
                "area. A perfect place for a couple to relax in comfort, away from the city and surrounded by " +
                "nature. During the colder months, underfloor heating and electric heaters keep the house warm. " +
                "In case of a short power outage, we provide a gas heater, a portable gas stove, and a camping " +
                "lantern. Pets are allowed by prior arrangement. Free Wi-Fi is available throughout the house.",
            rules: "Check-in from 13:00. Check-out by 11:00.",
            amenities: [
                {title: "Studio", items: ["Sofa bed", "Projector for movie nights", "Dining table",
                        "Electric cooktop", "Refrigerator", "Electric kettle", "Microwave",
                        "Dishes and cutlery"]},
                {title: "Bedroom", items: ["Smart TV", "Double bed", "Bed linens", "Pillows and comforters",
                        "Small workspace"]},
                {title: "Bathroom", items: ["Shower", "Hair dryer", "Towels", "Toiletries"]},
                {title: "Outdoor Area", items: ["Free parking", "Private terrace with a coffee table",
                        "Separate covered patio with a barbecue", "Outdoor swing"]}
            ]
        },
        campingInfo: {
            title: "Camping",
            price: "",
            priceNote: "",
            description: "A modern tiny house with a well-designed studio, a terrace, and outdoor space to relax, right " +
                "in the middle of the forest — a great place to enjoy nature and recharge, even over a weekend. " +
                "During the colder months, underfloor heating and electric heaters keep the house warm. In case " +
                "of a short power outage, we provide a gas heater, a portable gas stove, and a camping lantern. Pets are " +
                "allowed by prior arrangement. Free Wi-Fi is available throughout the house.",
            rules: "Check-in from 13:00. Check-out by 11:00.",
            amenities: [
                {title: "Studio", items: ["Smart TV", "Coffee table", "Sofa bed", "Bed linens",
                        "Pillows and comforters", "Electric cooktop", "Refrigerator", "Electric kettle",
                        "Dishes and cutlery"]},
                {title: "Bathroom", items: ["Shower", "Hair dryer", "Towels", "Toiletries"]},
                {title: "Outdoor Area", items: ["Free parking", "Private terrace with a coffee table",
                        "Separate seating area with a fire pit", "Covered barbecue area", "Hammock"]}
            ]
        },
        campingDetails: "1–2 guests • 1 room • 11 m²"
    },
    exteriorSection: {
        title: "Moments",
        summer: {
            header: "Sommar",
            subheader: "Summer"
        },
        autumn: {
            header: "Höst",
            subheader: "Autumn"
        },
        winter: {
            header: "Vinter",
            subheader: "Winter"
        },
        spring: {
            header: "Vår",
            subheader: "Spring"
        }
    },
    contactsSection: {
        contacts: {
            header: "Contact",
            addressLabel: "Address",
            phoneLabel: "Call",
            messengersLabel: "Message",
            viber: "Chat on Viber",
            // The line break is kept in the footer
            address: "Kam'yana Hora,\nRivne Oblast",
            phone: "+380 63 596 89 74"
        },
        copyright: "© 2026 SCANDINAVIA. All rights reserved.",
        madeBy: "Website by Anton Novak"
    }
};

export default englishLanguage;