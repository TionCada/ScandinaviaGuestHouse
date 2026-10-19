import React from 'react';
import s from "./Admin.module.css";
import textSections from "./textFields";

const LANGUAGES = [
    {code: 'uk', name: 'Українська'},
    {code: 'en', name: 'English'}
];

export const getIn = (object, path) => path.split('.').reduce((value, key) => value?.[key], object);

// A copy of the object with the value at the path replaced; the rest is shared, not copied
export const setIn = (object, path, value) => {
    const [key, ...rest] = path.split('.');
    return {...object, [key]: rest.length === 0 ? value : setIn(object?.[key] ?? {}, rest.join('.'), value)};
};

// A text box that grows with its text
const TextArea = (props) => (
    <textarea {...props} className={s.textarea}
              rows={Math.max(2, (props.value || '').split('\n').length + 1)}/>
);

const TextField = ({field, texts, onChange}) => {
    const setText = (language, value) => onChange(setIn(texts, `${language}.${field.path}`, value));
    const Input = field.multiline ? TextArea : 'input';

    if (field.shared) {
        const setBoth = (value) => onChange(setIn(setIn(texts, `uk.${field.path}`, value), `en.${field.path}`, value));
        return (
            <div className={s.field}>
                <label className={s.fieldLabel}>{field.label}</label>
                {field.hint && <p className={s.hint}>{field.hint}</p>}
                <Input className={s.input} value={getIn(texts.uk, field.path) ?? ''}
                       onChange={e => setBoth(e.target.value)}/>
            </div>
        );
    }

    return (
        <div className={s.field}>
            <label className={s.fieldLabel}>{field.label}</label>
            {field.hint && <p className={s.hint}>{field.hint}</p>}
            <div className={s.languages}>
                {LANGUAGES.map(language => (
                    <div key={language.code}>
                        <span className={s.languageName}>{language.name}</span>
                        <Input className={s.input} value={getIn(texts[language.code], field.path) ?? ''}
                               onChange={e => setText(language.code, e.target.value)}/>
                    </div>
                ))}
            </div>
        </div>
    );
};

// The rooms of one house in one language: a title and what it has, one item per line. The rooms
// themselves are fixed: they can be edited, not added or removed
const AmenitiesList = ({rooms, onChange}) => {
    const setRoom = (index, room) => onChange(rooms.map((r, i) => i === index ? room : r));

    return (
        <div className={s.rooms}>
            {rooms.map((room, index) => (
                <div key={index} className={s.room}>
                    <input className={`${s.input} ${s.roomTitle}`} value={room.title} placeholder="Назва кімнати"
                           onChange={e => setRoom(index, {...room, title: e.target.value})}/>
                    <TextArea value={room.items.join('\n')} placeholder="Один пункт на рядок"
                              onChange={e => setRoom(index, {...room, items: e.target.value.split('\n')})}/>
                </div>
            ))}
        </div>
    );
};

const AmenitiesField = ({field, texts, onChange}) => (
    <div className={s.field}>
        <label className={s.fieldLabel}>{field.label}</label>
        <p className={s.hint}>Кожна мова має свій список. Один пункт на рядок</p>
        <div className={s.languages}>
            {LANGUAGES.map(language => (
                <div key={language.code}>
                    <span className={s.languageName}>{language.name}</span>
                    <AmenitiesList rooms={getIn(texts[language.code], field.path) || []}
                                   onChange={rooms => onChange(setIn(texts, `${language.code}.${field.path}`, rooms))}/>
                </div>
            ))}
        </div>
    </div>
);

// Empty lines left while typing in the lists are dropped before saving
export const tidyTexts = (texts) => {
    const tidy = {...texts};
    textSections.flatMap(section => section.fields).filter(field => field.type === 'amenities').forEach(field => {
        LANGUAGES.forEach(({code}) => {
            const rooms = getIn(tidy[code], field.path);
            if (Array.isArray(rooms)) {
                tidy[code] = setIn(tidy[code], field.path, rooms.map(room => ({
                    ...room,
                    items: room.items.map(item => item.trim()).filter(Boolean)
                })));
            }
        });
    });
    return tidy;
};

const TextsEditor = ({texts, onChange}) => (
    <div>
        {textSections.map(section => (
            <section key={section.title} className={s.card}>
                <h2 className={s.cardTitle}>{section.title}</h2>
                {section.fields.map(field => field.type === 'amenities'
                    ? <AmenitiesField key={field.path} field={field} texts={texts} onChange={onChange}/>
                    : <TextField key={field.path} field={field} texts={texts} onChange={onChange}/>)}
            </section>
        ))}
    </div>
);

export default TextsEditor;
