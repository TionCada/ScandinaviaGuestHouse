# "Scandinavia" Guest House

---

## About the project

This is a commercial freelance project for "Scandinavia" guest house. It is a green tourism-oriented small business located in Rivne, Ukraine. You can read more about them at https://www.facebook.com/guest.house.scandinavia or you can visit https://guest-house-scandinavia.web.app/ as this project is already hosted.

## Project and technologies

- React
- Redux
- Javascript
- HTML/CSS
- Bootstrap
- Slick Carousel
- Simple React Lightbox
- React Responsive

## How to start the project locally

Clone or download the project from https://github.com/TionCada/ScandinaviaGuestHouse

- install Node.js v10.19.0+
- install npm packages
- run local: open terminal, write to start: npm start

## Deploy to Cloudflare

The site is served by Cloudflare Workers as static files (config in `wrangler.jsonc`).

- one time: `npx wrangler login`
- deploy: `npm run deploy` (builds and uploads)
- check the built site locally on Cloudflare's runtime: `npm run preview:cf`
