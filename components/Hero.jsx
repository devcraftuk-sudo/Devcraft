import NavLink from './NavLink';
import ProjectMedia from './ProjectMedia';
import WhatsAppContact from './WhatsAppContact';
import { heroPreviews } from '../lib/siteData';

export default function Hero() {
    const desktopPreview = heroPreviews.browser;
    const mobilePreview = heroPreviews.phone;

    return (
        <section className="hero" id="home">
            <div className="hero-blobs" aria-hidden="true">
                <span className="blob blob-a" />
                <span className="blob blob-b" />
                <span className="blob blob-c" />
            </div>
            <div className="container hero-grid">
                <div className="hero-copy">
                    <p className="hero-eyebrow">Web design &amp; development</p>
                    <h1>Better websites. Smarter systems. More room to grow.</h1>
                    <p className="hero-subtitle">
                        Custom websites and digital tools that help your business attract
                        customers, simplify everyday work and grow with confidence.
                    </p>
                    <div className="hero-actions">
                        <NavLink href="/#contact" className="btn btn-primary">
                            Discuss your project
                        </NavLink>
                        <NavLink href="/#work" className="btn btn-secondary">
                            Explore our work
                            <span aria-hidden="true">→</span>
                        </NavLink>
                    </div>
                    <WhatsAppContact variant="link" />
                </div>
                <div className="hero-stage">
                    <ProjectMedia
                        image={desktopPreview.image}
                        alt={desktopPreview.alt}
                        frame="browser"
                        className="hero-browser"
                        priority
                        sizes="(max-width: 900px) 90vw, 540px"
                        showViewFull={false}
                    />
                    <ProjectMedia
                        image={mobilePreview.image}
                        alt={mobilePreview.alt}
                        frame="phone"
                        className="hero-phone"
                        sizes="(max-width: 900px) 180px, 210px"
                        showViewFull={false}
                    />
                </div>
            </div>
        </section>
    );
}
