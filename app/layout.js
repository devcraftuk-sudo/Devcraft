import './globals.css';

export const metadata = {
    title: {
        default: 'DEVcraft — Websites, Systems & Blogs',
        template: '%s — DEVcraft'
    },
    description: 'Custom websites, business systems, blogs, SEO, and ongoing digital support for modern companies.'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
