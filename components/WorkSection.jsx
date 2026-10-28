import Reveal from './Reveal';
import ProjectMedia from './ProjectMedia';
import { selectedWork } from '../lib/siteData';

export default function WorkSection() {
    const [featured, ...rest] = selectedWork;

    return (
        <section className="section work" id="work">
            <div className="container">
                <Reveal className="section-header section-header-left">
                    <p className="section-eyebrow">Selected work</p>
                    <h2>Designs that show the standard of finish.</h2>
                    <p>
                        These are concept designs from the studio, used here to show layout,
                        tone and interface craft. Live client work can be added when project
                        assets and links are available.
                    </p>
                </Reveal>

                <Reveal className="work-featured">
                    <ProjectMedia
                        image={featured.image}
                        alt={featured.alt}
                        frame="phone"
                        className="work-featured-media"
                        sizes="(max-width: 768px) 70vw, 280px"
                    />
                    <div className="work-copy">
                        <p className="work-status">{featured.status}</p>
                        <h3>{featured.name}</h3>
                        <p className="work-type">{featured.type}</p>
                        <p>{featured.description}</p>
                    </div>
                </Reveal>

                <div className="work-grid">
                    {rest.map((project, index) => (
                        <Reveal as="article" className="work-card" delay={index * 80} key={project.name}>
                            <ProjectMedia
                                image={project.image}
                                alt={project.alt}
                                frame="phone"
                                sizes="(max-width: 768px) 70vw, 260px"
                            />
                            <div className="work-copy">
                                <p className="work-status">{project.status}</p>
                                <h3>{project.name}</h3>
                                <p className="work-type">{project.type}</p>
                                <p>{project.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
