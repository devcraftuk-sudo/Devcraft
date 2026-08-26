import Image from 'next/image';
import Link from 'next/link';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RisingBackground from '../components/RisingBackground';
import ServicesCarousel from '../components/ServicesCarousel';
import WhatsAppContact from '../components/WhatsAppContact';
import {
    benefits,
    maintenanceItems,
    processSteps,
    products
} from '../lib/siteData';

export default function HomePage() {
    return (
        <>
            <RisingBackground />

            <header className="hero" id="home">
                <Header />
                <div className="hero-content">
                    <p className="hero-eyebrow">Digital craftsmanship for modern businesses</p>
                    <h1>We build what your company needs to grow</h1>
                    <p className="hero-subtitle">
                        Custom websites, robust systems, and engaging blogs — crafted with
                        precision, delivered with care.
                    </p>
                    <div className="hero-actions">
                        <Link href="/#contact" className="btn btn-primary">Get a Free Quote</Link>
                        <span className="hero-or">or</span>
                        <WhatsAppContact />
                    </div>
                </div>
            </header>

            <main>
                <section className="section products" id="products">
                    <div className="container">
                        <div className="section-header">
                            <h2>Our Products</h2>
                            <p>
                                Everything you need to establish and scale your digital presence,
                                and supply your internal management needs.
                            </p>
                        </div>
                        <div className="product-grid">
                            {products.map(product => (
                                <article className="product-card" key={product.title}>
                                    <div className="product-image">
                                        <Image
                                            src={product.image}
                                            alt={product.alt}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            priority={product.title === 'Websites'}
                                        />
                                    </div>
                                    <div className="product-content">
                                        <h3>{product.title}</h3>
                                        <p>{product.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section improve" id="improve">
                    <div className="container">
                        <div className="section-header">
                            <h2>Built to Move Your Business Forward</h2>
                            <p>
                                Digital tools designed to strengthen your presence, simplify sales,
                                and create sustainable growth.
                            </p>
                        </div>
                        <div className="benefit-grid">
                            {benefits.map(benefit => (
                                <article className="benefit-card" key={benefit.number}>
                                    <span className="benefit-number">{benefit.number}</span>
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section process has-rise-3d" id="process">
                    <RisingBackground local cubeCount={8} />
                    <div className="container">
                        <div className="section-header">
                            <h2>Our Process</h2>
                            <p>
                                From your online brief to final delivery — a clear process designed
                                to respect your time.
                            </p>
                        </div>
                        <div className="process-steps">
                            {processSteps.map(step => (
                                <article className="process-step" key={step.number}>
                                    <div className="step-marker">
                                        <span className="step-num">{step.number}</span>
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section factors" id="factors">
                    <div className="container">
                        <div className="section-header">
                            <h2>Some of Our Services</h2>
                            <p>Purpose-built websites and systems tailored to how your industry works.</p>
                        </div>
                        <ServicesCarousel />
                    </div>
                </section>

                <section className="section seo" id="seo">
                    <div className="container seo-inner">
                        <div className="seo-content">
                            <p className="seo-eyebrow">Search visibility &amp; insight</p>
                            <h2>SEO, Google Ranking &amp; Analytics</h2>
                            <p>
                                Being online is only valuable when the right people can find you.
                                We build search-ready foundations and connect reliable measurement
                                tools so you can understand what attracts customers and where growth
                                comes from.
                            </p>
                            <ul className="seo-list">
                                <li>Technical and on-page SEO foundations</li>
                                <li>Google Search Console configuration</li>
                                <li>Google Analytics setup and conversion tracking</li>
                                <li>Local search and Google Business Profile guidance</li>
                            </ul>
                            <Link href="/#contact" className="btn btn-primary">
                                Improve My Visibility
                            </Link>
                        </div>
                        <div className="seo-dashboard" aria-label="SEO performance overview">
                            <div className="seo-dashboard-head">
                                <span>Organic visibility</span>
                                <span className="seo-live">Growing</span>
                            </div>
                            <div className="seo-chart" aria-hidden="true">
                                {['28%', '38%', '34%', '52%', '61%', '75%', '88%'].map(height => (
                                    <span style={{ '--height': height }} key={height} />
                                ))}
                            </div>
                            <div className="seo-metrics">
                                <div><strong>+82%</strong><span>Organic traffic</span></div>
                                <div><strong>24/7</strong><span>Performance data</span></div>
                                <div><strong>Google</strong><span>Best practices</span></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section maintenance" id="maintenance">
                    <div className="container">
                        <div className="maintenance-card has-rise-3d">
                            <RisingBackground local cubeCount={6} />
                            <div className="maintenance-content">
                                <p className="maintenance-eyebrow">Ongoing support</p>
                                <h2>Monthly Maintenance</h2>
                                <p>
                                    Your business evolves — your digital presence should too. Our
                                    monthly maintenance plan covers all the alterations your company
                                    needs, from content updates and design tweaks to performance
                                    checks and security patches.
                                </p>
                                <ul className="maintenance-list">
                                    {maintenanceItems.map(item => <li key={item}>{item}</li>)}
                                </ul>
                                <Link href="/#contact" className="btn btn-primary">Get started</Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section contact" id="contact">
                    <div className="container contact-inner">
                        <div className="contact-text">
                            <h2>Let&apos;s Work Together</h2>
                            <p>
                                Have a project in mind? Drop us a line and we&apos;ll get back to you
                                within 24 hours.
                            </p>
                        </div>
                        <ContactForm />
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
