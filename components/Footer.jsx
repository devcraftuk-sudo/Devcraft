import Link from 'next/link';

const footerLinks = [
    { href: '/#products', label: 'Products' },
    { href: '/#improve', label: 'Benefits' },
    { href: '/#factors', label: 'Services' },
    { href: '/#process', label: 'Process' },
    { href: '/#seo', label: 'SEO' },
    { href: '/#maintenance', label: 'Maintenance' },
    { href: '/#contact', label: 'Contact' }
];

export default function Footer({ compact = false }) {
    const links = compact
        ? footerLinks.filter(link => link.label !== 'Benefits' && link.label !== 'Maintenance')
        : footerLinks;

    return (
        <footer className={`footer${compact ? ' thank-you-footer' : ''}`}>
            <div className="container footer-inner">
                <div className="footer-brand">
                    <Link href="/#home" className="logo">
                        DEV<span>craft</span>
                    </Link>
                    <p>Crafting digital experiences that matter.</p>
                </div>
                <div className="footer-links">
                    {links.map(link => (
                        <Link href={link.href} key={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </div>
                <p className="footer-copy">&copy; 2026 DEVcraft. All rights reserved.</p>
            </div>
        </footer>
    );
}
