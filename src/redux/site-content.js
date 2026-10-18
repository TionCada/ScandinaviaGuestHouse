import {withDefaults} from "../content/defaults";

// Replaces the site's texts, photos and video with the saved content (or the built-in one).
// Both the language and the content reducers take their part of it
export const SET_CONTENT = 'scandinavia/content/SET_CONTENT';

export const setContent = (saved) => ({type: SET_CONTENT, content: withDefaults(saved)});

// Waits this long for the saved content before showing the site with the built-in one
const LOAD_TIMEOUT_MS = 3000;

// The content saved in the admin, or null when there is none or it can't be loaded (for example
// under `npm start`, which has no Worker)
export const loadSavedContent = async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), LOAD_TIMEOUT_MS);
    try {
        const response = await fetch('/api/content', {signal: controller.signal, cache: 'no-store'});
        if (!response.ok || !(response.headers.get('content-type') || '').includes('application/json')) {
            return null;
        }
        return await response.json();
    } catch {
        return null;
    } finally {
        clearTimeout(timer);
    }
};
