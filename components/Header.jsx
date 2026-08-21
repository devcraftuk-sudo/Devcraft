'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const navigation = [
    { href: '/#products', label: 'Products' },
    { href: '/#improve', label: 'Benefits' },
    { href: '/#factors', label: 'Services' },
    { href: '/#process', label: 'Process' },
    { href: '/#seo', label: 'SEO' }
];

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const updateNavbar = () => setScrolled(window.scrollY > 20);
        updateNavbar();
        window.addEventListener('scroll', updateNavbar, { passive: true });
        return () => window.removeEventListener('scroll', updateNavbar);
    }, []);

    function closeMenu() {
        setMenuOpen(false);
    }

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
            <Link href="/#home" className="logo" onClick={closeMenu}>
                DEV<span>craft</span>
            </Link>
            <button
                type="button"
                className={`nav-toggle${menuOpen ? ' open' : ''}`}
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(current => !current)}
            >
                <span />
                <span />
                <span />
            </button>
            <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
                {navigation.map(item => (
                    <li key={item.href}>
                        <Link href={item.href} onClick={closeMenu}>
                            {item.label}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href="/#contact" className="nav-cta" onClick={closeMenu}>
                        Contact
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
