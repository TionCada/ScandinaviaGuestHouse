// The texts the admin can edit, grouped as on the site. "path" is where the text sits in each
// language's texts (src/redux/ukrainianLanguage.js); every field is edited in both languages
// side by side, except "shared" ones, which are the same in both (one input sets both).
//   multiline: a larger box, where line breaks are kept
//   type "amenities": the lists of what each room has, edited per language

const houseFields = (id) => [
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
            {path: 'housesSection.bungalowDetails', label: 'Бунгало: короткий опис'},
            {path: 'housesSection.campingDetails', label: 'Кемпінг: короткий опис'}
        ]
    },
    {title: 'Сторінка бунгало', fields: houseFields('bungalow')},
    {title: 'Сторінка кемпінгу', fields: houseFields('camping')},
    {
        title: 'Контакти (внизу кожної сторінки)',
        fields: [
            {path: 'contactsSection.contacts.phone', label: 'Номер телефону', shared: true,
                hint: 'Той самий номер для дзвінка й Viber, в обох мовах'},
            {path: 'contactsSection.contacts.address', label: 'Адреса', multiline: true},
            {path: 'contactsSection.contacts.viber', label: 'Текст посилання на Viber'},
            {path: 'contactsSection.copyright', label: 'Копірайт'}
        ]
    }
];

export default textSections;
