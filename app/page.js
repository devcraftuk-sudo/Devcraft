import ContactForm from '../components/ContactForm';
import NavLink from '../components/NavLink';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Hero from '../components/Hero';
import IndustryExamples from '../components/IndustryExamples';
import Reveal from '../components/Reveal';
import WhatsAppContact from '../components/WhatsAppContact';
import WorkSection from '../components/WorkSection';
import {
    maintenanceItems,
    offerings,
    outcomes,
    processSteps,
    seoPoints
} from '../lib/siteData';

export default function HomePage() {
    return (
        <>
            <Header />
            <main id="main">
                <Hero />
                <WorkSection />

                <section className="section services" id="services">
                    <div id="products" className="anchor-target" />
                    <div className="container">
                        <Reveal className="section-header section-header-left">
                            <p className="section-eyebrow">How I can help</p>
                            <h2>Websites, systems and support — without the clutter.</h2>
                            <p>
                                DEVcraft is a web design and development practice. I plan, design
                                and build custom websites and digital tools, then help keep them
                                useful after launch.
                            </p>
                        </Reveal>
                        <div className="offering-grid">
                            {offerings.map((offering, index) => (
                                <Reveal as="article" className="offering-card" delay={index * 80} key={offering.title}>
                                    <h3>{offering.title}</h3>
                                    <p>{offering.description}</p>
                                </Reveal>
                            ))}
                        </div>
                        <div className="outcome-row">
                            {outcomes.map((outcome, index) => (
                                <Reveal as="article" className="outcome-card" delay={index * 70} key={outcome.title}>
                                    <h3>{outcome.title}</h3>
                                    <p>{outcome.description}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section industries" id="factors">
                    <div className="container">
                        <Reveal className="section-header">
                            <p className="section-eyebrow">Industry examples</p>
                            <h2>A look at how different businesses could show up online.</h2>
                            <p>
                                These are concept designs, grouped by industry so you can browse
                                at your own pace. They are examples of direction, not live client
                                case studies.
                            </p>
                        </Reveal>
                        <IndustryExamples />
                    </div>
                </section>

                <section className="section process" id="process">
                    <div className="container">
                        <Reveal className="section-header">
                            <p className="section-eyebrow">Process</p>
                            <h2>A clear path from first chat to launch.</h2>
                            <p>Four steps, agreed in writing, with no surprises on scope or price.</p>
                        </Reveal>
                        <Reveal className="process-track">
                            {processSteps.map(step => (
                                <article className="process-step" key={step.number}>
                                    <div className="step-marker">
                                        <span className="step-num">{step.number}</span>
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </article>
                            ))}
                        </Reveal>
                    </div>
                </section>

                <section className="section seo" id="seo">
                    <div className="container seo-inner">
                        <Reveal className="seo-content">
                            <p className="section-eyebrow">Search &amp; insight</p>
                            <h2>Help people find you, then show you what is working.</h2>
                            <p>
                                Being online only helps when the right people can find you. I set
                                up practical search foundations and measurement tools so you can
                                see which pages attract visitors and where enquiries come from.
                            </p>
                            <ul className="check-list">
                                {seoPoints.map(item => <li key={item}>{item}</li>)}
                            </ul>
                            <NavLink href="/#contact" className="btn btn-primary">
                                Talk about visibility
                                <span aria-hidden="true">→</span>
                            </NavLink>
                        </Reveal>
                        <Reveal className="seo-panel" delay={90}>
                            <div className="seo-panel-head">
                                <span>What gets set up</span>
                                <span className="seo-badge">Illustrative</span>
                            </div>
                            <ul className="seo-setup">
                                <li>
                                    <strong>Search Console</strong>
                                    <span>See how Google understands the site.</span>
                                </li>
                                <li>
                                    <strong>Analytics</strong>
                                    <span>Follow visits, key pages and enquiries.</span>
                                </li>
                                <li>
                                    <strong>On-page SEO</strong>
                                    <span>Clear titles, headings and page structure.</span>
                                </li>
                            </ul>
                        </Reveal>
                    </div>
                </section>

                <section className="section maintenance" id="maintenance">
                    <div className="container">
                        <Reveal className="maintenance-panel">
                            <div className="maintenance-copy">
                                <p className="section-eyebrow">Ongoing support</p>
                                <h2>Monthly maintenance, within an agreed scope.</h2>
                                <p>
                                    Businesses change. A monthly plan covers the updates and care
                                    we have agreed in advance — content changes, small design
                                    tweaks, checks and fixes — rather than unlimited alterations.
                                </p>
                                <NavLink href="/#contact" className="btn btn-primary">
                                    Ask about support
                                </NavLink>
                            </div>
                            <ul className="check-list">
                                {maintenanceItems.map(item => <li key={item}>{item}</li>)}
                            </ul>
                        </Reveal>
                    </div>
                </section>

                <section className="section contact" id="contact">
                    <div className="container contact-inner">
                        <Reveal className="contact-text">
                            <p className="section-eyebrow">Contact</p>
                            <h2>Let&apos;s talk about what you need.</h2>
                            <p>
                                Send a short note about the project, or chat on WhatsApp if that
                                is easier. I will reply as soon as I can.
                            </p>
                            <WhatsAppContact />
                        </Reveal>
                        <Reveal className="contact-card" delay={80}>
                            <ContactForm />
                        </Reveal>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
