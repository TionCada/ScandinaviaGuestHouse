// simple-react-lightbox imports Node's "process" module, which Vite does not polyfill.
// Remove this shim (and the alias in vite.config.js) once the lightbox is replaced.
export default {env: {NODE_ENV: import.meta.env.MODE}};
