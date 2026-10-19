import React, {useCallback, useEffect, useLayoutEffect, useRef} from 'react';
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

// Text boxes for the same text in both languages: each grows with its text, and both take the
// height of the taller one, so the two languages line up side by side. Returns a ref for each
const useAlignedHeights = (values, minHeight) => {
    const areas = useRef([]);
    const fit = useCallback(() => {
        const present = areas.current.filter(Boolean);
        present.forEach(area => {
            area.style.height = 'auto';
        });
        // scrollHeight leaves out the 1px borders
        const height = Math.max(minHeight, ...present.map(area => area.scrollHeight + 2));
        present.forEach(area => {
            area.style.height = `${height}px`;
        });
    }, [minHeight]);

    useLayoutEffect(fit, [fit, ...values]);
    // Narrower or wider columns wrap the text differently
    useEffect(() => {
        window.addEventListener('resize', fit);
        return () => window.removeEventListener('resize', fit);
    }, [fit]);

    return values.map((value, index) => (area) => {
        areas.current[index] = area;
    });
};

// Smallest heights: long texts such as the house descriptions get more room to read them whole
const MIN_HEIGHT = 64;
const LARGE_MIN_HEIGHT = 240;

const TextField = ({field, texts, onChange}) => {
    const setText = (language, value) => onChange(setIn(texts, `${language}.${field.path}`, value));
    const values = LANGUAGES.map(language => getIn(texts[language.code], field.path) ?? '');
    const refs = useAlignedHeights(field.multiline ? values : [], field.large ? LARGE_MIN_HEIGHT : MIN_HEIGHT);
    const inputProps = (index) => field.multiline
        ? {as: 'textarea', className: s.textarea, ref: refs[index]}
        : {as: 'input', className: s.input};

    if (field.shared) {
        const setBoth = (value) => onChange(setIn(setIn(texts, `uk.${field.path}`, value), `en.${field.path}`, value));
        return (
            <div className={s.field}>
                <label className={s.fieldLabel}>{field.label}</label>
                {field.hint && <p className={s.hint}>{field.hint}</p>}
                <input className={s.input} value={values[0]} onChange={e => setBoth(e.target.value)}/>
            </div>
        );
    }

    return (
        <div className={s.field}>
            <label className={s.fieldLabel}>{field.label}</label>
            {field.hint && <p className={s.hint}>{field.hint}</p>}
            <div className={s.languages}>
                {LANGUAGES.map((language, index) => {
                    const {as: Input, ...props} = inputProps(index);
                    return (
                        <div key={language.code}>
                            <span className={s.languageName}>{language.name}</span>
                            <Input {...props} value={values[index]}
                                   onChange={e => setText(language.code, e.target.value)}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// One room in both languages side by side: its name and what it has, one item per line. The
// rooms themselves are fixed: they can be edited, not added or removed
const RoomRow = ({rooms, index, setRoom}) => {
    const items = rooms.map(list => (list[index]?.items || []).join('\n'));
    const refs = useAlignedHeights(items, MIN_HEIGHT);
    return (
        <div className={`${s.languages} ${s.roomRow}`}>
            {LANGUAGES.map((language, column) => {
                const room = rooms[column][index];
                if (!room) return <div key={language.code}/>;
                return (
                    <div key={language.code} className={s.room}>
                        <span className={s.languageName}>{language.name}</span>
                        <input className={`${s.input} ${s.roomTitle}`} value={room.title} placeholder="Назва кімнати"
                               onChange={e => setRoom(column, index, {...room, title: e.target.value})}/>
                        <textarea ref={refs[column]} className={s.textarea} value={items[column]}
                                  placeholder="Один пункт на рядок"
                                  onChange={e => setRoom(column, index, {...room, items: e.target.value.split('\n')})}/>
                    </div>
                );
            })}
        </div>
    );
};

const AmenitiesField = ({field, texts, onChange}) => {
    const rooms = LANGUAGES.map(language => getIn(texts[language.code], field.path) || []);
    const setRoom = (column, index, room) => {
        const code = LANGUAGES[column].code;
        onChange(setIn(texts, `${code}.${field.path}`, rooms[column].map((r, i) => i === index ? room : r)));
    };
    const count = Math.max(...rooms.map(list => list.length));

    return (
        <div className={s.field}>
            <label className={s.fieldLabel}>{field.label}</label>
            <p className={s.hint}>Один пункт на рядок</p>
            {Array.from({length: count}, (_, index) => (
                <RoomRow key={index} rooms={rooms} index={index} setRoom={setRoom}/>
            ))}
        </div>
    );
};

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
