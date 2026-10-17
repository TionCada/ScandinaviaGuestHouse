import React from 'react';
import {Link} from "react-router-dom";

// Replacement for react-router-hash-link, which only supports React Router v5.
// After a plain left click it scrolls to the element named by the link's hash,
// or to the top of the page for a bare "#".
const scrollToHash = (hash, smooth) => {
    const element = hash === '#' ? document.body : document.getElementById(hash.slice(1));
    if (element) {
        element.scrollIntoView(smooth ? {behavior: 'smooth'} : undefined);
    }
};

const HashLink = React.forwardRef(({smooth, onClick, ...props}, ref) => {
    const hashIndex = typeof props.to === 'string' ? props.to.indexOf('#') : -1;
    const hash = hashIndex >= 0 ? props.to.slice(hashIndex) : '';

    const handleClick = (e) => {
        if (onClick) onClick(e);
        if (hash !== '' && !e.defaultPrevented && e.button === 0 &&
            (!props.target || props.target === '_self') &&
            !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)) {
            // Wait for the navigation to render before scrolling
            window.setTimeout(() => scrollToHash(hash, smooth), 0);
        }
    };

    return <Link {...props} onClick={handleClick} ref={ref}/>;
});

export default HashLink;
