import { Plus_Jakarta_Sans } from 'next/font/google';
import MotionRoot from '../components/MotionRoot';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
    variable: '--font-sans'
});

export const metadata = {
    title: {
        default: 'DEVcraft — Websites, Systems & Blogs',
        template: '%s — DEVcraft'
    },
    description: 'Custom websites, business systems, blogs, SEO, and ongoing digital support for modern companies.'
};

export default function RootLayout({ children }) {
    return (
        <html lang="en-GB" className={plusJakarta.variable}>
            <body className={plusJakarta.className}>
                <MotionRoot />
                {children}
            </body>
        </html>
    );
}
