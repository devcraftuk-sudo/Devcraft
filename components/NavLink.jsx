'use client';

import Link from 'next/link';

export default function NavLink({ href, className, children, onClick }) {
    function handleClick(event) {
        const id = href.split('#')[1];
        const target = id ? document.getElementById(id) : null;

        if (target) {
            event.preventDefault();
            const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
            window.history.pushState(null, '', href.startsWith('/') ? href : `/${href}`);
        }

        onClick?.(event);
    }

    return (
        <Link href={href} className={className} onClick={handleClick}>
            {children}
        </Link>
    );
}
