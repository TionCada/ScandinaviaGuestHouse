// Calls to the Worker's admin API (worker/index.js). Cloudflare Access signs the requests in with
// the cookie it set when the admin page was opened

// The Access sign-in has run out: Access then answers with a redirect to its sign-in page, which
// fetch can't follow, or the Worker answers 401
export class SignedOutError extends Error {
}

const request = async (path, options = {}) => {
    let response;
    try {
        response = await fetch(path, {credentials: 'same-origin', cache: 'no-store', ...options});
    } catch {
        // The redirect to the sign-in page is on another domain and fails like a network error;
        // a real network problem looks the same, and reloading the page helps with both
        throw new SignedOutError();
    }
    if (response.status === 401 || response.redirected) {
        throw new SignedOutError();
    }
    const body = await response.json().catch(() => null);
    if (!response.ok) {
        throw new Error(body?.error || `HTTP ${response.status}`);
    }
    return body;
};

export const getSignedInUser = () => request('/api/admin/me');

// The saved content, or null when nothing has been saved yet
export const getSavedContent = () => request('/api/content');

export const saveContent = (content) => request('/api/admin/content', {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(content)
});

// Returns the uploaded file's link, /media/<key>
export const uploadFile = async (file, name) => {
    const result = await request(`/api/admin/media?name=${encodeURIComponent(name || file.name || '')}`, {
        method: 'POST',
        headers: {'content-type': file.type},
        body: file
    });
    return result.url;
};
