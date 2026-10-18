// The texts the admin can edit, grouped as on the site. "path" is where the text sits in each
// language's texts (src/redux/ukrainianLanguage.js); every field is edited in both languages
// side by side, except "shared" ones, which are the same in both (one input sets both).
//   multiline: a larger box, where line breaks are kept
//   type "amenities": the lists of what each room has, edited per language

const houseFields = (id) => [
    {path: `housesSection.${id}Info.title`, label: 'Заголовок сторінки'},
    {path: `housesSection.${id}Info.rules`, label: 'Заїзд і виїзд'},
    {path: `housesSection.${id}Info.description`, label: 'Опис', multiline: true},
    {path: `housesSection.${id}Info.amenities`, label: 'Що є в будиночку', type: 'amenities'}
];

const textSections = [
    {
        title: 'Головна сторінка',
        fields: [
            {path: 'homeSection.firstTextBlock', label: 'Заголовок на відео', multiline: true,
                hint: 'Переноси рядків зберігаються'},
            {path: 'homeSection.secondTextBlock', label: 'Текст під заголовком', multiline: true}
        ]
    },
    {
        title: 'Будиночки на головній',
        fields: [
            {path: 'housesSection.bungalow', label: 'Бунгало: назва'},
            {path: 'housesSection.bungalowDetails', label: 'Бунгало: гості, кімнати, площа'},
            {path: 'housesSection.camping', label: 'Кемпінг: назва'},
            {path: 'housesSection.campingDetails', label: 'Кемпінг: гості, кімнати, площа'}
        ]
    },
    {title: 'Сторінка бунгало', fields: houseFields('bungalow')},
    {title: 'Сторінка кемпінгу', fields: houseFields('camping')},
    {
        title: 'Моменти',
        fields: [
            {path: 'exteriorSection.title', label: 'Заголовок каруселі'}
        ]
    },
    {
        title: 'Контакти (внизу кожної сторінки)',
        fields: [
            {path: 'contactsSection.contacts.phone', label: 'Номер телефону', shared: true,
                hint: 'Той самий номер для дзвінка й Viber, в обох мовах'},
            {path: 'contactsSection.contacts.address', label: 'Адреса', multiline: true},
            {path: 'contactsSection.contacts.header', label: 'Заголовок'},
            {path: 'contactsSection.contacts.addressLabel', label: 'Підпис над адресою'},
            {path: 'contactsSection.contacts.phoneLabel', label: 'Підпис над телефоном'},
            {path: 'contactsSection.contacts.messengersLabel', label: 'Підпис над Viber'},
            {path: 'contactsSection.contacts.viber', label: 'Текст посилання на Viber'},
            {path: 'contactsSection.copyright', label: 'Копірайт'}
        ]
    },
    {
        title: 'Шапка',
        fields: [
            {path: 'navigationMenu.contactsLabel', label: 'Кнопка контактів'},
            {path: 'navigationMenu.languageCode', label: 'Кнопка мови',
                hint: 'Мова, на яку вона перемикає: на українській сторінці «EN»'}
        ]
    }
];

export default textSections;
