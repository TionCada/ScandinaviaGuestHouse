import React, {useRef, useState} from 'react';
import s from "./Admin.module.css";
import {isVideo, preparePhoto} from "./prepareUpload";
import {SignedOutError, uploadFile} from "./adminApi";

// Videos above this size load slowly on mobile data: the admin warns, but still uploads
const LARGE_VIDEO_BYTES = 30 * 1024 * 1024;

// Uploads the files one by one; each link is handed to onUploaded as soon as its file is up
const useUploads = (onSignedOut) => {
    const [pending, setPending] = useState(0);
    const [error, setError] = useState('');

    const upload = async (files, onUploaded) => {
        setError('');
        setPending(count => count + files.length);
        for (const file of files) {
            try {
                const prepared = isVideo(file) ? file : await preparePhoto(file);
                onUploaded(await uploadFile(prepared, file.name));
            } catch (e) {
                if (e instanceof SignedOutError) {
                    onSignedOut();
                } else {
                    setError(`Не вдалося завантажити «${file.name}»: ${e.message}`);
                }
            } finally {
                setPending(count => count - 1);
            }
        }
    };

    return {pending, error, upload};
};

const FilePicker = ({accept, multiple, label, onFiles, disabled}) => {
    const input = useRef(null);
    return (
        <>
            <button type="button" className={s.secondaryButton} disabled={disabled}
                    onClick={() => input.current.click()}>{label}</button>
            <input ref={input} type="file" accept={accept} multiple={multiple} hidden
                   onChange={e => {
                       const files = [...e.target.files];
                       e.target.value = '';
                       if (files.length > 0) onFiles(files);
                   }}/>
        </>
    );
};

// One photo or the video, replaced as a whole
const SingleMedia = ({title, hint, url, video, onReplace, onSignedOut}) => {
    const {pending, error, upload} = useUploads(onSignedOut);
    const [warning, setWarning] = useState('');

    const replace = (files) => {
        const file = files[0];
        setWarning(video && file.size > LARGE_VIDEO_BYTES
            ? `Відео важить ${Math.round(file.size / 1024 / 1024)} МБ: на мобільному інтернеті воно вантажитиметься довго`
            : '');
        upload([file], onReplace);
    };

    return (
        <div className={s.single}>
            <h3 className={s.mediaTitle}>{title}</h3>
            {hint && <p className={s.hint}>{hint}</p>}
            <div className={s.singlePreview}>
                {video
                    ? <video src={url} muted playsInline controls preload="metadata"/>
                    : <img src={url} alt=""/>}
                {pending > 0 && <div className={s.uploading}>Завантаження…</div>}
            </div>
            <FilePicker accept={video ? 'video/mp4' : 'image/*'} label={video ? 'Замінити відео' : 'Замінити фото'}
                        disabled={pending > 0} onFiles={replace}/>
            {warning && <p className={s.warning}>{warning}</p>}
            {error && <p className={s.error}>{error}</p>}
        </div>
    );
};

// A list of photos in the order the site shows them
const PhotoList = ({title, hint, items, toUrl, fromUrl, onChange, onSignedOut}) => {
    const {pending, error, upload} = useUploads(onSignedOut);

    const move = (index, by) => onChange(list => {
        const moved = [...list];
        [moved[index], moved[index + by]] = [moved[index + by], moved[index]];
        return moved;
    });
    const remove = (index) => onChange(list => list.filter((item, i) => i !== index));
    const add = (files) => upload(files, url => onChange(list => [...list, fromUrl(url)]));

    return (
        <section className={s.card}>
            <h2 className={s.cardTitle}>{title}</h2>
            {hint && <p className={s.hint}>{hint}</p>}
            <div className={s.photoGrid}>
                {items.map((item, index) => (
                    <figure key={toUrl(item) + index} className={s.photo}>
                        <img src={toUrl(item)} alt="" loading="lazy"/>
                        <figcaption className={s.photoActions}>
                            <span className={s.photoNumber}>{index + 1}</span>
                            <button type="button" className={s.iconButton} title="Раніше" aria-label="Раніше"
                                    disabled={index === 0} onClick={() => move(index, -1)}>←</button>
                            <button type="button" className={s.iconButton} title="Пізніше" aria-label="Пізніше"
                                    disabled={index === items.length - 1} onClick={() => move(index, 1)}>→</button>
                            <button type="button" className={s.iconButton} title="Прибрати" aria-label="Прибрати"
                                    onClick={() => remove(index)}>✕</button>
                        </figcaption>
                    </figure>
                ))}
                {Array.from({length: pending}, (_, index) => (
                    <div key={'pending' + index} className={`${s.photo} ${s.photoPending}`}>Завантаження…</div>
                ))}
            </div>
            <FilePicker accept="image/*" multiple label="+ Додати фото" onFiles={add}/>
            {error && <p className={s.error}>{error}</p>}
        </section>
    );
};

const same = url => url;

const MediaEditor = ({media, onChange, onSignedOut}) => {
    const setField = (name) => (value) => onChange(m => ({
        ...m,
        [name]: typeof value === 'function' ? value(m[name]) : value
    }));

    return (
        <div>
            <section className={s.card}>
                <h2 className={s.cardTitle}>Головна сторінка</h2>
                <div className={s.singles}>
                    <SingleMedia title="Відео на головній" video url={media.heroVideo}
                                 hint="MP4, без звуку, краще до 20–30 МБ"
                                 onReplace={setField('heroVideo')} onSignedOut={onSignedOut}/>
                    <SingleMedia title="Фото замість відео" url={media.heroPoster}
                                 hint="Видно, поки відео вантажиться або якщо телефон його не запускає"
                                 onReplace={setField('heroPoster')} onSignedOut={onSignedOut}/>
                </div>
            </section>
            <section className={s.card}>
                <h2 className={s.cardTitle}>Обкладинки будиночків</h2>
                <div className={s.singles}>
                    <SingleMedia title="Бунгало" url={media.bungalowCover} hint="На головній, обрізається до 3:2"
                                 onReplace={setField('bungalowCover')} onSignedOut={onSignedOut}/>
                    <SingleMedia title="Кемпінг" url={media.campingCover} hint="На головній, обрізається до 3:2"
                                 onReplace={setField('campingCover')} onSignedOut={onSignedOut}/>
                </div>
            </section>
            <PhotoList title="Галерея бунгало" items={media.bungalowPhotos} toUrl={same} fromUrl={same}
                       hint="Без фото сторінка показує обкладинку"
                       onChange={setField('bungalowPhotos')} onSignedOut={onSignedOut}/>
            <PhotoList title="Галерея кемпінгу" items={media.campingPhotos} toUrl={same} fromUrl={same}
                       hint="Без фото сторінка показує обкладинку"
                       onChange={setField('campingPhotos')} onSignedOut={onSignedOut}/>
            <PhotoList title="Моменти" items={media.moments}
                       toUrl={moment => moment.src} fromUrl={url => ({src: url, full: url})}
                       hint="У каруселі фото обрізаються до вертикальної форми по центру, на весь екран відкриваються цілими"
                       onChange={setField('moments')} onSignedOut={onSignedOut}/>
        </div>
    );
};

export default MediaEditor;
