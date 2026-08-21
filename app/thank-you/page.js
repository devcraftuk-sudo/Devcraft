import Link from 'next/link';
import Footer from '../../components/Footer';
import RisingBackground from '../../components/RisingBackground';

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
            <RisingBackground />

            <header className="thank-you-header">
                <Link href="/" className="logo">
                    DEV<span>craft</span>
                </Link>
            </header>

            <main className="thank-you-main">
                <section className="thank-you-card">
                    <div className="success-mark" aria-hidden="true">
                        <span />
                    </div>
                    <div className="confirmation-message">
                        <p className="thank-you-eyebrow">Enquiry received</p>
                        <h1>Your message has been sent successfully.</h1>
                        <h2>Thank you for choosing DEVcraft.</h2>
                        <p>
                            Your message is now safely with our team. We appreciate the opportunity
                            to learn about your project and help move your business forward.
                        </p>
                    </div>
                    <p className="response-promise">
                        A DEVcraft specialist will respond to you within 24 hours.
                    </p>
                    <Link href="/" className="btn btn-primary">Return to Home Page</Link>
                </section>
            </main>

            <Footer compact />
        </div>
    );
}
