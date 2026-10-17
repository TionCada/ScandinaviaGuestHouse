import './scrollFade.css';

// Minimal replacement for the unmaintained "aos" package, covering the subset this site
// uses: data-aos="fade-*" elements fade in once the bottom of the window passes 120px
// below their top, and fade out again when scrolled back above that point.
// Like aos, positions are measured on init and on resize, and the last init() call sets
// the fade duration for the whole page.

const OFFSET = 120;
const SCROLL_THROTTLE_MS = 99;
const RESIZE_DEBOUNCE_MS = 50;

let elements = [];
let listening = false;

// Same position measurement as aos: sum of offsetTop up the offsetParent chain
const getOffsetTop = (node) => {
    let top = 0;
    while (node && !isNaN(node.offsetTop)) {
        top += node.offsetTop - (node.tagName !== 'BODY' ? node.scrollTop : 0);
        node = node.offsetParent;
    }
    return top;
};

const handleScroll = () => {
    const windowBottom = window.pageYOffset + window.innerHeight;
    elements.forEach(({node, position}) => {
        node.classList.toggle('aos-animate', windowBottom > position);
    });
};

const refresh = () => {
    elements = Array.from(document.querySelectorAll('[data-aos]'), (node) => {
        node.classList.add('aos-init');
        return {node, position: getOffsetTop(node) + OFFSET};
    });
    handleScroll();
};

// Runs at most once per interval, including a final call after the last event
const throttle = (fn, wait) => {
    let last = 0;
    let timer = null;
    return () => {
        const remaining = wait - (Date.now() - last);
        if (remaining <= 0) {
            clearTimeout(timer);
            timer = null;
            last = Date.now();
            fn();
        } else if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                last = Date.now();
                fn();
            }, remaining);
        }
    };
};

const debounce = (fn, wait) => {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, wait);
    };
};

const init = ({duration = 400} = {}) => {
    document.body.style.setProperty('--aos-duration', `${duration}ms`);
    refresh();
    if (!listening) {
        listening = true;
        window.addEventListener('scroll', throttle(handleScroll, SCROLL_THROTTLE_MS));
        window.addEventListener('resize', debounce(refresh, RESIZE_DEBOUNCE_MS));
        window.addEventListener('orientationchange', debounce(refresh, RESIZE_DEBOUNCE_MS));
    }
};

const ScrollFade = {init};

export default ScrollFade;
