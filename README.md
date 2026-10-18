## About the project

This is a website for the “Scandinavia” guest houses, a small business focused on green tourism in Rivne, Ukraine.

## Project and technologies

- React & Redux
- React Router
- CSS modules
- Bootstrap
- Vite

## Hosting

The site runs on Cloudflare Workers at https://scandinaviastay.com (`www.` redirects there).
`npm run deploy` builds it and uploads it; the Worker in `worker/` serves the admin's API and uploaded photos.

## Admin panel

`/admin` edits the site's texts and its photos and video. Changes show on the site as soon as they are saved.

How it works:

- the Worker in `worker/` serves `/api/*` and `/media/*`; everything else is the built site
- texts and photo links are one JSON document in a D1 database, photos and videos are in an R2 bucket
- the site loads the saved document before it renders; without one it shows the texts and photos built into it (`src/content/defaults.js`)
- Cloudflare Access asks for sign-in (an email code) before `/admin` and `/api/admin/*` open, and the Worker checks the Access token on every admin request
- each save keeps the previous 10 versions in the `content_history` table, to undo a mistake by hand

## How to start the project locally

- install Node.js v20.19+
- install npm packages: `npm install`
- run `npm start`: the site with the texts and photos built into it

### With the admin panel and the Worker

- one time: `cp .dev.vars.example .dev.vars` (turns the sign-in off on localhost), `npm run db:migrate:local`, `npm run seed -- --local`
- run `npm run dev:worker` (the Worker with local copies of the database and the photo storage, on port 8787), and `npm start` alongside it
- the site then shows the content from the local database, and `/admin` on the Vite address opens without signing in
