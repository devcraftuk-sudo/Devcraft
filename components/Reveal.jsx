'use client';

import { useEffect, useRef, useState } from 'react';

export default function Reveal({
    as: Component = 'div',
    children,
    className = '',
    delay = 0,
    once = true
}) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) {
            return undefined;
        }

        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (motionQuery.matches) {
            setVisible(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    if (once) {
                        observer.disconnect();
                    }
                } else if (!once) {
                    setVisible(false);
                }
            },
            { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [once]);

    return (
        <Component
            ref={ref}
            className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
            style={{ '--reveal-delay': `${delay}ms` }}
        >
            {children}
        </Component>
    );
}
