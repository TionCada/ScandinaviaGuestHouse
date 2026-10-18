// Moves the texts and photos built into the site into the admin's storage, once, before the admin
// is first used: uploads every photo and the video to R2 and saves the texts with links to them
// in D1. After this the admin edits them, and photos removed in the admin can really go away.
//
//   npm run seed -- --local     into the local storage of `wrangler dev`
//   npm run seed -- --remote    into the real storage on Cloudflare
//   add --force                 to overwrite content already saved in the admin
//
// Run it from master, so the texts match what the site shows now.

import {execFileSync} from 'node:child_process';
import {mkdtempSync, readdirSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join, relative} from 'node:path';
import ukrainianLanguage from '../src/redux/ukrainianLanguage.js';
import englishLanguage from '../src/redux/englishLanguage.js';

const DATABASE = 'scandinavia-guest-house-content';
const BUCKET = 'scandinavia-guest-house-media';
const ASSETS = 'src/assets';

const where = process.argv.includes('--remote') ? '--remote' : process.argv.includes('--local') ? '--local' : null;
const force = process.argv.includes('--force');
if (!where) {
    console.error('Say where to: npm run seed -- --local, or npm run seed -- --remote');
    process.exit(1);
}

const wrangler = (args, options = {}) =>
    execFileSync('npx', ['wrangler', ...args, where], {encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'], ...options});

// The same photos, in the same order, as src/content/defaults.js
const jpgsIn = (folder) => readdirSync(join(ASSETS, folder))
    .filter(name => name.endsWith('.jpg'))
    .map(name => join(ASSETS, folder, name));
const byName = (paths) => [...paths].sort((a, b) => a.localeCompare(b));
const imageNumber = (path) => parseInt(path.match(/image(\d+)\.jpg$/)[1]);
const byNumber = (paths) => [...paths].filter(path => /image\d+\.jpg$/.test(path))
    .sort((a, b) => imageNumber(a) - imageNumber(b));

const files = {
    heroVideo: join(ASSETS, 'videos/homeSection/video1.mp4'),
    heroPoster: join(ASSETS, 'images/homeSection/image1.jpg'),
    bungalowCover: join(ASSETS, 'images/housesSection/bungalow.jpg'),
    campingCover: join(ASSETS, 'images/housesSection/camping.jpg'),
    bungalowPhotos: byName(jpgsIn('images/housesSection/bungalow')),
    campingPhotos: byName(jpgsIn('images/housesSection/camping')),
    moments: byNumber(jpgsIn('images/exteriorSection')),
    momentsFull: byNumber(jpgsIn('images/exteriorSection/full'))
};

const existing = JSON.parse(wrangler(['d1', 'execute', DATABASE, '--json',
    '--command', 'SELECT COUNT(*) AS saved FROM content']));
if (existing[0].results[0].saved > 0 && !force) {
    console.error('Content is already saved in the admin; seeding would overwrite it. Add --force to do it anyway.');
    process.exit(1);
}

// Uploads a file and returns its link. The keys follow the file paths, so running this again
// replaces the same files instead of adding copies
const upload = (path) => {
    const key = 'seed/' + relative(ASSETS, path);
    const type = path.endsWith('.mp4') ? 'video/mp4' : 'image/jpeg';
    console.log(`Uploading ${path}`);
    wrangler(['r2', 'object', 'put', `${BUCKET}/${key}`, '--file', path, '--content-type', type]);
    return `/media/${key}`;
};

const momentsFull = files.momentsFull.map(upload);
const content = {
    version: 1,
    texts: {uk: ukrainianLanguage, en: englishLanguage},
    media: {
        heroVideo: upload(files.heroVideo),
        heroPoster: upload(files.heroPoster),
        bungalowCover: upload(files.bungalowCover),
        campingCover: upload(files.campingCover),
        bungalowPhotos: files.bungalowPhotos.map(upload),
        campingPhotos: files.campingPhotos.map(upload),
        moments: files.moments.map(upload).map((src, index) => ({src, full: momentsFull[index] || src}))
    }
};

const sqlString = (text) => `'${text.replaceAll("'", "''")}'`;
const folder = mkdtempSync(join(tmpdir(), 'seed-'));
const sqlFile = join(folder, 'seed.sql');
writeFileSync(sqlFile, `INSERT INTO content (id, data, updated_at, updated_by)
VALUES (1, ${sqlString(JSON.stringify(content))}, ${sqlString(new Date().toISOString())}, 'seed')
ON CONFLICT (id) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at, updated_by = excluded.updated_by;
`);
try {
    wrangler(['d1', 'execute', DATABASE, '--file', sqlFile, '--yes']);
} finally {
    rmSync(folder, {recursive: true, force: true});
}
console.log(`Done: the texts and ${Object.values(files).flat().length} files are in the admin's storage (${where.slice(2)}).`);
