import NavLink from './NavLink';

const footerLinks = [
    { href: '/#work', label: 'Work' },
    { href: '/#services', label: 'Services' },
    { href: '/#process', label: 'Process' },
    { href: '/#seo', label: 'SEO' },
    { href: '/#maintenance', label: 'Maintenance' },
    { href: '/#contact', label: 'Contact' }
];

export default function Footer({ compact = false }) {
    const links = compact
        ? footerLinks.filter(link => link.label !== 'Maintenance' && link.label !== 'SEO')
        : footerLinks;

    return (
        <footer className={`footer${compact ? ' thank-you-footer' : ''}`}>
            <div className="container footer-inner">
                <div className="footer-brand">
                    <NavLink href="/#home" className="logo">
                        DEV<span>craft</span>
                    </NavLink>
                    <p>Websites and digital tools, built with care.</p>
                </div>
                <div className="footer-links">
                    {links.map(link => (
                        <NavLink href={link.href} key={link.href}>
                            {link.label}
                        </NavLink>
                    ))}
                </div>
                <p className="footer-copy">&copy; 2026 DEVcraft. All rights reserved.</p>
            </div>
        </footer>
    );
}
