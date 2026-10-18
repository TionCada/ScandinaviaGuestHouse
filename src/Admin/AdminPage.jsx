import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import s from "./Admin.module.css";
import TextsEditor, {tidyTexts} from "./TextsEditor";
import MediaEditor from "./MediaEditor";
import {getSavedContent, getSignedInUser, saveContent, SignedOutError} from "./adminApi";
import {withDefaults} from "../content/defaults";
import {setContent} from "../redux/site-content";

// The admin panel at /admin: edits the site's texts and photos and saves them for every visitor.
// Cloudflare Access asks for sign-in before this page even loads (see README)

// Unsaved changes are kept in this browser too, so a reload (e.g. after the sign-in runs out)
// doesn't lose them
const DRAFT_KEY = 'scandinavia-admin-draft';

const readDraft = () => {
    try {
        return JSON.parse(localStorage.getItem(DRAFT_KEY));
    } catch {
        return null;
    }
};
const writeDraft = (draft) => {
    try {
        if (draft) localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
        else localStorage.removeItem(DRAFT_KEY);
    } catch {
        // Private mode or storage blocked: the draft just isn't kept
    }
};

const editable = (content) => ({texts: content.texts, media: content.media});
const sameContent = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const AdminPage = () => {
    const dispatch = useDispatch();
    const [state, setState] = useState('loading');
    const [user, setUser] = useState(null);
    const [hasSaved, setHasSaved] = useState(true);
    // What is saved (or built in), and what is being edited
    const [base, setBase] = useState(null);
    const [draft, setDraft] = useState(null);
    const [restored, setRestored] = useState(false);
    // The open tab is kept in the address (#media), so a reload stays on it
    const [tab, setTabState] = useState(() => window.location.hash === '#media' ? 'media' : 'texts');
    const setTab = (name) => {
        setTabState(name);
        window.history.replaceState(null, '', name === 'media' ? '#media' : window.location.pathname);
    };
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    const signedOut = () => setState('signedOut');

    useEffect(() => {
        document.title = 'Адмінка | Scandinavia Guest House';
        Promise.all([getSignedInUser(), getSavedContent()])
            .then(([signedIn, saved]) => {
                const current = editable(withDefaults(saved));
                const kept = readDraft();
                setUser(signedIn);
                setHasSaved(saved !== null);
                setBase(current);
                if (kept && !sameContent(kept, current)) {
                    setDraft(kept);
                    setRestored(true);
                } else {
                    setDraft(current);
                }
                setState('ready');
            })
            .catch(error => setState(error instanceof SignedOutError ? 'signedOut' : 'error'));
    }, []);

    const dirty = draft !== null && !sameContent(draft, base);

    useEffect(() => {
        if (state !== 'ready') return;
        writeDraft(dirty ? draft : null);
    }, [draft, dirty, state]);

    // "Saved" goes away with the next change
    useEffect(() => {
        if (dirty) setMessage(m => m?.type === 'ok' ? null : m);
    }, [dirty]);

    // Ask before leaving with unsaved changes
    useEffect(() => {
        if (!dirty) return;
        const warn = (e) => e.preventDefault();
        window.addEventListener('beforeunload', warn);
        return () => window.removeEventListener('beforeunload', warn);
    }, [dirty]);

    const save = async () => {
        const content = {version: 1, texts: tidyTexts(draft.texts), media: draft.media};
        setSaving(true);
        setMessage(null);
        try {
            await saveContent(content);
            const saved = editable(content);
            setBase(saved);
            setDraft(saved);
            setHasSaved(true);
            setRestored(false);
            dispatch(setContent(content));
            setMessage({type: 'ok', text: 'Збережено. Сайт уже показує зміни'});
        } catch (error) {
            if (error instanceof SignedOutError) signedOut();
            else setMessage({type: 'error', text: `Не вдалося зберегти: ${error.message}`});
        } finally {
            setSaving(false);
        }
    };

    const discard = () => {
        setDraft(base);
        setRestored(false);
        setMessage(null);
    };

    if (state === 'loading') {
        return <div className={s.page}><p className={s.status}>Завантаження…</p></div>;
    }
    if (state === 'signedOut') {
        return (
            <div className={s.page}>
                <div className={s.notice}>
                    <p>Вхід в адмінку закінчився або немає зв'язку. Оновіть сторінку, щоб увійти знову.
                        Незбережені зміни відновляться.</p>
                    <button type="button" className={s.primaryButton} onClick={() => window.location.reload()}>
                        Оновити сторінку
                    </button>
                </div>
            </div>
        );
    }
    if (state === 'error') {
        return (
            <div className={s.page}>
                <div className={s.notice}>
                    <p>Не вдалося завантажити адмінку. Спробуйте оновити сторінку пізніше.</p>
                    <button type="button" className={s.primaryButton} onClick={() => window.location.reload()}>
                        Оновити сторінку
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={s.page}>
            <header className={s.topBar}>
                <span className={s.user}>{user?.email}</span>
                <nav className={s.topBarLinks}>
                    <a href="/" target="_blank" rel="noreferrer">Відкрити сайт</a>
                    <a href="/cdn-cgi/access/logout">Вийти</a>
                </nav>
            </header>

            <div className={s.tabs} role="tablist">
                <button type="button" role="tab" aria-selected={tab === 'texts'}
                        className={tab === 'texts' ? s.tabActive : s.tab} onClick={() => setTab('texts')}>Тексти</button>
                <button type="button" role="tab" aria-selected={tab === 'media'}
                        className={tab === 'media' ? s.tabActive : s.tab} onClick={() => setTab('media')}>Фото та відео</button>
            </div>

            <main className={s.content}>
                {!hasSaved && (
                    <div className={s.notice}>
                        Зміни ще жодного разу не зберігались: сайт показує тексти й фото, вбудовані в код.
                        Перед першим збереженням вбудовані фото треба перенести в сховище (npm run seed, див. README),
                        інакше вони можуть зникнути після наступного оновлення сайту.
                    </div>
                )}
                {restored && (
                    <div className={s.notice}>
                        Відновлено незбережені зміни з минулого разу.{' '}
                        <button type="button" className={s.linkButton} onClick={discard}>Скасувати їх</button>
                    </div>
                )}
                {tab === 'texts'
                    ? <TextsEditor texts={draft.texts} onChange={texts => setDraft(d => ({...d, texts}))}/>
                    : <MediaEditor media={draft.media} onSignedOut={signedOut}
                                   onChange={update => setDraft(d => ({...d, media: update(d.media)}))}/>}
            </main>

            <footer className={s.saveBar}>
                {message && <span className={message.type === 'ok' ? s.ok : s.error}>{message.text}</span>}
                {!message && <span className={s.saveState}>{dirty ? 'Є незбережені зміни' : 'Усе збережено'}</span>}
                <div className={s.saveButtons}>
                    <button type="button" className={s.secondaryButton} disabled={!dirty || saving} onClick={discard}>
                        Скасувати зміни
                    </button>
                    <button type="button" className={s.primaryButton} disabled={!dirty || saving} onClick={save}>
                        {saving ? 'Збереження…' : 'Зберегти'}
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default AdminPage;
