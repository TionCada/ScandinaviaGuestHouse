## About the project

This is a website for the “Scandinavia” guest houses, a small business focused on green tourism in Rivne, Ukraine.

## Project and technologies

- React & Redux
- React Router
- CSS modules
- Bootstrap
- Vite

## How to start the project locally

- install Node.js v20.19+
- install npm packages
- run "npm start"

## Hosting

The site is served by Cloudflare Workers as static files.

## Admin panel

`/admin` edits the site's texts (Ukrainian and English) and its photos and video. Changes show on the site as soon as they are saved.

How it works:

- the Worker in `worker/` serves `/api/*` and `/media/*`; everything else is the built site
- texts and photo links are one JSON document in a D1 database, photos and videos are in an R2 bucket
- the site loads the saved document before it renders; without one it shows the texts and photos built into it (`src/content/defaults.js`)
- Cloudflare Access asks for sign-in (an email code) before `/admin` and `/api/admin/*` open, and the Worker checks the Access token on every admin request
- each save keeps the previous 10 versions in the `content_history` table, to undo a mistake by hand

### Setting it up on Cloudflare (once)

1. Enable R2 in the dashboard (needs a card on the account, the free tier is enough), then create the bucket: `npx wrangler r2 bucket create scandinavia-guest-house-media`
2. Create the database: `npx wrangler d1 create scandinavia-guest-house-content`, put the `database_id` it prints into `wrangler.jsonc`, then create its tables: `npm run db:migrate:remote`
3. Connect the site's own domain to the Worker (Workers & Pages → the project → Settings → Domains & Routes). Access can guard a path only on a domain in your Cloudflare account, not on `*.workers.dev`
4. In Zero Trust → Access → Applications, add a self-hosted application for that domain with the paths `admin` and `api/admin`, and a policy that allows the admins' emails. Put the team domain (`<team>.cloudflareaccess.com`) and the application's AUD tag into `ACCESS_TEAM_DOMAIN` and `ACCESS_AUD` in `wrangler.jsonc`
5. Deploy: `npm run deploy`
6. Move the built-in texts and photos into the admin's storage: `npm run seed -- --remote`

### Running it locally

- one time: `cp .dev.vars.example .dev.vars` (turns the sign-in off on localhost), `npm run db:migrate:local`, `npm run seed -- --local`
- `npm run dev:worker` (the Worker with local D1 and R2, on port 8787), and `npm start` alongside it; then open `/admin` on the Vite address
