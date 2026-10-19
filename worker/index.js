import {verifyAccess} from './access.js';

// The Worker in front of the site. It handles only /api/* and /media/* (see "run_worker_first"
// in wrangler.jsonc); every other request goes straight to the built site's files.
//
//   GET  /api/content         the site's texts and links to its photos, saved in the admin
//   GET  /media/<key>         a photo or video uploaded in the admin (from R2); with ?download,
//                             as a file to save, under the name it was uploaded with
//   GET  /api/admin/me        who is signed in to the admin
//   PUT  /api/admin/content   save the texts and photo links
//   POST /api/admin/media     upload a photo or video
//
// /api/admin/* is behind Cloudflare Access, and every request there is checked again here.

// Saved versions kept besides the current one
const HISTORY_LENGTH = 10;
// Uploads that no saved version uses are deleted after this long (time to press "Save")
const UNUSED_UPLOAD_GRACE_MS = 24 * 60 * 60 * 1000;
const MAX_CONTENT_BYTES = 1024 * 1024;
// Workers accept request bodies up to 100 MB
const MAX_UPLOAD_BYTES = 95 * 1024 * 1024;
const UPLOAD_TYPES = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'video/mp4': 'mp4'
};

const json = (data, status = 200) => new Response(JSON.stringify(data), {
    status,
    headers: {'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store'}
});

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        const method = request.method;

        try {
            if (path === '/api/content' && method === 'GET') {
                return await getContent(env);
            }
            if (path.startsWith('/media/') && (method === 'GET' || method === 'HEAD')) {
                return await getMedia(request, env, url, decodeURIComponent(path.slice('/media/'.length)));
            }
            if (path.startsWith('/api/admin/')) {
                const user = await verifyAccess(request, env);
                if (!user) {
                    return json({error: 'not signed in'}, 401);
                }
                if (path === '/api/admin/me' && method === 'GET') {
                    return json(user);
                }
                if (path === '/api/admin/content' && method === 'PUT') {
                    return await putContent(request, env, ctx, user);
                }
                if (path === '/api/admin/media' && method === 'POST') {
                    return await uploadMedia(request, env, url);
                }
            }
            if (path.startsWith('/api/') || path.startsWith('/media/')) {
                return json({error: 'not found'}, 404);
            }
            return env.ASSETS.fetch(request);
        } catch (error) {
            console.error(error);
            return json({error: 'server error'}, 500);
        }
    }
};

// null until the content is first saved: the site then shows the texts and photos built into it
const getContent = async (env) => {
    const row = await env.DB.prepare('SELECT data FROM content WHERE id = 1').first();
    return new Response(row ? row.data : 'null', {
        headers: {'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store'}
    });
};

const isValidContent = (content) =>
    content && typeof content === 'object' &&
    content.texts && typeof content.texts.uk === 'object' && typeof content.texts.en === 'object' &&
    content.media && typeof content.media === 'object';

const putContent = async (request, env, ctx, user) => {
    const body = await request.text();
    if (body.length > MAX_CONTENT_BYTES) {
        return json({error: 'content too large'}, 413);
    }
    let content;
    try {
        content = JSON.parse(body);
    } catch {
        return json({error: 'not JSON'}, 400);
    }
    if (!isValidContent(content)) {
        return json({error: 'unexpected content shape'}, 400);
    }

    const now = new Date().toISOString();
    const data = JSON.stringify(content);
    // The current version goes to the history, the new one takes its place, and only the last
    // HISTORY_LENGTH versions are kept, all in one transaction
    await env.DB.batch([
        env.DB.prepare(`INSERT INTO content_history (data, saved_at, saved_by)
                        SELECT data, updated_at, updated_by FROM content WHERE id = 1`),
        env.DB.prepare(`INSERT INTO content (id, data, updated_at, updated_by) VALUES (1, ?1, ?2, ?3)
                        ON CONFLICT (id) DO UPDATE SET data = ?1, updated_at = ?2, updated_by = ?3`)
            .bind(data, now, user.email),
        env.DB.prepare(`DELETE FROM content_history WHERE id NOT IN
                        (SELECT id FROM content_history ORDER BY id DESC LIMIT ?1)`)
            .bind(HISTORY_LENGTH)
    ]);

    ctx.waitUntil(deleteUnusedMedia(env).catch(error => console.error('media cleanup', error)));
    return json({ok: true, updatedAt: now});
};

// The R2 keys of every /media/ link anywhere in a content document
const mediaKeysIn = (data, keys) => {
    JSON.parse(data, (name, value) => {
        if (typeof value === 'string' && value.startsWith('/media/')) {
            keys.add(decodeURIComponent(value.slice('/media/'.length)));
        }
        return value;
    });
    return keys;
};

// Deletes uploads that neither the current version nor any kept older version uses: photos
// removed in the admin, once their versions have left the history, and uploads never saved
const deleteUnusedMedia = async (env) => {
    const used = new Set();
    const current = await env.DB.prepare('SELECT data FROM content WHERE id = 1').first();
    if (current) mediaKeysIn(current.data, used);
    const {results} = await env.DB.prepare('SELECT data FROM content_history').all();
    results.forEach(row => mediaKeysIn(row.data, used));

    const cutoff = Date.now() - UNUSED_UPLOAD_GRACE_MS;
    let cursor;
    do {
        const page = await env.MEDIA.list({cursor});
        const unused = page.objects
            .filter(object => !used.has(object.key) && object.uploaded.getTime() < cutoff)
            .map(object => object.key);
        if (unused.length > 0) await env.MEDIA.delete(unused);
        cursor = page.truncated ? page.cursor : undefined;
    } while (cursor);
};

const uploadMedia = async (request, env, url) => {
    const type = (request.headers.get('content-type') || '').split(';')[0].trim();
    const extension = UPLOAD_TYPES[type];
    if (!extension) {
        return json({error: 'only JPEG, PNG, WebP photos and MP4 videos'}, 415);
    }
    const size = Number(request.headers.get('content-length'));
    if (!size) {
        return json({error: 'empty file'}, 400);
    }
    if (size > MAX_UPLOAD_BYTES) {
        return json({error: 'file too large'}, 413);
    }

    // A new name for every upload, so a link always shows the same file and can be cached for good
    const key = `${crypto.randomUUID()}.${extension}`;
    await env.MEDIA.put(key, request.body, {
        httpMetadata: {contentType: type},
        customMetadata: {originalName: (url.searchParams.get('name') || '').slice(0, 200)}
    });
    return json({url: `/media/${key}`}, 201);
};

// Serves an uploaded file, with byte ranges: Safari on iPhone plays a video only if it can ask
// for parts of it
const getMedia = async (request, env, url, key) => {
    if (!key) {
        return json({error: 'not found'}, 404);
    }

    if (request.method === 'HEAD') {
        const object = await env.MEDIA.head(key);
        if (!object) return new Response(null, {status: 404});
        return new Response(null, {headers: mediaHeaders(object)});
    }

    const object = await env.MEDIA.get(key, {range: request.headers, onlyIf: request.headers});
    if (!object) {
        return json({error: 'not found'}, 404);
    }
    const headers = mediaHeaders(object);
    if (url.searchParams.has('download')) {
        headers.set('content-disposition', attachment(key, object.customMetadata?.originalName));
    }
    // The browser's copy is still current
    if (!('body' in object)) {
        return new Response(null, {status: 304, headers});
    }
    if (request.headers.has('range') && object.range) {
        // A range from the end ("the last N bytes") or from an offset, possibly to the end
        const suffix = object.range.suffix;
        const offset = typeof suffix === 'number' ? object.size - suffix : object.range.offset ?? 0;
        const length = typeof suffix === 'number' ? suffix : object.range.length ?? object.size - offset;
        headers.set('content-range', `bytes ${offset}-${offset + length - 1}/${object.size}`);
        headers.set('content-length', String(length));
        return new Response(object.body, {status: 206, headers});
    }
    headers.set('content-length', String(object.size));
    return new Response(object.body, {headers});
};

// "Save as" under the uploaded file's own name, with the extension of what is stored (photos are
// saved as JPEG on upload, whatever they were); files without a recorded name keep the key's
const attachment = (key, originalName) => {
    const extension = key.slice(key.lastIndexOf('.'));
    const base = (originalName || key.split('/').pop()).replace(/\.[^.]*$/, '') || 'file';
    const name = base + extension;
    const ascii = name.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');
    return `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(name)}`;
};

const mediaHeaders = (object) => {
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('accept-ranges', 'bytes');
    // Every upload has its own name and never changes
    headers.set('cache-control', 'public, max-age=31536000, immutable');
    return headers;
};
