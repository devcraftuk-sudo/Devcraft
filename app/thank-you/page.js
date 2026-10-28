import Link from 'next/link';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

export const metadata = {
    title: 'Message Sent',
    robots: {
        index: false,
        follow: false
    }
};

export default function ThankYouPage() {
    return (
        <div className="thank-you-page">
            <Header />
            <main id="main" className="thank-you-main">
                <section className="thank-you-card">
                    <div className="success-mark" aria-hidden="true">
                        <span />
                    </div>
                    <p className="thank-you-eyebrow">Enquiry received</p>
                    <h1>Your message has been sent.</h1>
                    <p>
                        Thank you for getting in touch with DEVcraft. I will read your note
                        and reply as soon as I can.
                    </p>
                    <Link href="/" className="btn btn-primary">Return to the homepage</Link>
                </section>
            </main>
            <Footer compact />
        </div>
    );
}
