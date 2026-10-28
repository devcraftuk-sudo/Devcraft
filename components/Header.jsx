'use client';

import { useEffect, useId, useRef, useState } from 'react';
import NavLink from './NavLink';

const navigation = [
    { href: '/#work', label: 'Work' },
    { href: '/#services', label: 'Services' },
    { href: '/#process', label: 'Process' },
    { href: '/#contact', label: 'Contact' }
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const menuId = useId();
    const toggleRef = useRef(null);

    useEffect(() => {
        const updateNavbar = () => setScrolled(window.scrollY > 8);
        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });
        return () => window.removeEventListener('scroll', updateNavbar);
    }, []);

    useEffect(() => {
        function handleKey(event) {
            if (event.key === 'Escape') {
                setMenuOpen(false);
                toggleRef.current?.focus();
            }
        }

        if (!menuOpen) {
            document.body.style.overflow = '';
            return undefined;
        }

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [menuOpen]);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
            <a className="skip-link" href="#main">Skip to content</a>
            <nav className="navbar" aria-label="Primary">
                <NavLink href="/#home" className="logo" onClick={closeMenu}>
                    DEV<span>craft</span>
                </NavLink>
                <button
                    ref={toggleRef}
                    type="button"
                    className={`nav-toggle${menuOpen ? ' open' : ''}`}
                    aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
                    aria-expanded={menuOpen}
                    aria-controls={menuId}
                    onClick={() => setMenuOpen(current => !current)}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <div
                    className={`nav-overlay${menuOpen ? ' open' : ''}`}
                    onClick={closeMenu}
                    aria-hidden={!menuOpen}
                />
                <ul id={menuId} className={`nav-links${menuOpen ? ' open' : ''}`}>
                    {navigation.map(item => (
                        <li key={item.href}>
                            <NavLink href={item.href} onClick={closeMenu}>
                                {item.label}
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <NavLink href="/#contact" className="nav-cta" onClick={closeMenu}>
                            Let&apos;s talk
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
