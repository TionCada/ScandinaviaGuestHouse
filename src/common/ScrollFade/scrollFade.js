import './scrollFade.css';

// Scroll-linked fade for data-aos="fade-*" elements (the attribute is kept from the "aos"
// package this replaced): the photo and video blocks, not text. Instead of playing a timed
// animation at a trigger point, each element's opacity follows its position on screen, with
// no movement (DRIFT_PX is 0; above 0 it would also rise into place): it starts
// appearing as its top enters the bottom of the window and is fully shown after scrolling
// a further REVEAL_SHARE of the window height. Once shown, it stays: scrolling back up
// never fades it out again.
// Positions are read live on every frame, so photos loading and pushing content down
// can never leave them out of date.

const REVEAL_SHARE = 0.5;
const DRIFT_PX = 0;
const RESIZE_DEBOUNCE_MS = 50;

let elements = [];
let listening = false;
let frameRequested = false;
// Highest progress each element has reached, so the reveal never goes backwards
const revealed = new WeakMap();
// Drift currently applied to each element, to undo it when measuring its position
const drift = new WeakMap();

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Starts and ends gently, so there is no sudden change at either end of the reveal
const smoothstep = (t) => t * t * (3 - 2 * t);

const update = () => {
    frameRequested = false;
    const windowBottom = window.pageYOffset + window.innerHeight;
    const maxScrollBottom = document.documentElement.scrollHeight;
    const show = reducedMotion();
    elements.forEach((node) => {
        const top = node.getBoundingClientRect().top + window.pageYOffset - (drift.get(node) || 0);
        // Elements too close to the end of the page to reach the full reveal distance
        // get a shorter one, so they are fully shown at the bottom of the page
        const range = Math.max(1, Math.min(window.innerHeight * REVEAL_SHARE, maxScrollBottom - top));
        const current = show ? 1 : Math.min(1, Math.max(0, (windowBottom - top) / range));
        const progress = Math.max(current, revealed.get(node) || 0);
        revealed.set(node, progress);
        const eased = smoothstep(progress);
        node.style.opacity = eased.toFixed(3);
        const offset = DRIFT_PX * (1 - eased);
        drift.set(node, offset);
        node.style.transform = offset > 0 ? `translate3d(0, ${offset.toFixed(1)}px, 0)` : 'none';
        node.classList.toggle('aos-animate', progress >= 1);
    });
};

const requestUpdate = () => {
    if (!frameRequested) {
        frameRequested = true;
        window.requestAnimationFrame(update);
    }
};

const refresh = () => {
    elements = Array.from(document.querySelectorAll('[data-aos]'));
    elements.forEach(node => node.classList.add('aos-init'));
    update();
};

const debounce = (fn, wait) => {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, wait);
    };
};

// Re-measure when [data-aos] elements are added or removed (e.g. React re-creating them)
const touchesFadeElements = (nodes) => Array.from(nodes).some(node =>
    node.nodeType === 1 && (node.hasAttribute('data-aos') || node.querySelector('[data-aos]')));

const observeFadeElements = () => {
    new MutationObserver((mutations) => {
        if (mutations.some(m => touchesFadeElements(m.addedNodes) || touchesFadeElements(m.removedNodes))) {
            refresh();
        }
    }).observe(document.body, {childList: true, subtree: true});
};

const init = () => {
    refresh();
    if (!listening) {
        listening = true;
        window.addEventListener('scroll', requestUpdate, {passive: true});
        window.addEventListener('resize', debounce(requestUpdate, RESIZE_DEBOUNCE_MS));
        window.addEventListener('orientationchange', debounce(requestUpdate, RESIZE_DEBOUNCE_MS));
        // Content can move without scrolling (e.g. images loading): re-check once loaded
        window.addEventListener('load', requestUpdate);
        observeFadeElements();
    }
};

const ScrollFade = {init};

export default ScrollFade;
