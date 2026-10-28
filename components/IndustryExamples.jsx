'use client';

import { useRef } from 'react';
import ProjectMedia from './ProjectMedia';
import { industryExamples } from '../lib/siteData';

export default function IndustryExamples() {
    const viewportRef = useRef(null);

    function scrollByCard(direction) {
        const viewport = viewportRef.current;
        if (!viewport) {
            return;
        }

        const card = viewport.querySelector('.industry-card');
        const amount = (card?.offsetWidth || 280) + 20;
        viewport.scrollBy({ left: direction * amount, behavior: 'smooth' });
    }

    function handleKeyDown(event) {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollByCard(1);
        }
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollByCard(-1);
        }
    }

    return (
        <div className="industry-slider">
            <div className="industry-toolbar">
                <p className="industry-note">Concept designs. Use the arrows to browse, or view a full screenshot.</p>
                <div className="industry-buttons">
                    <button
                        type="button"
                        className="slider-btn"
                        aria-label="Previous example"
                        onClick={() => scrollByCard(-1)}
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        className="slider-btn"
                        aria-label="Next example"
                        onClick={() => scrollByCard(1)}
                    >
                        →
                    </button>
                </div>
            </div>
            <div
                className="industry-viewport"
                ref={viewportRef}
                tabIndex={0}
                onKeyDown={handleKeyDown}
                aria-label="Industry concept designs"
            >
                <div className="industry-track">
                    {industryExamples.map(example => (
                        <article className="industry-card" key={example.title}>
                            <ProjectMedia
                                image={example.image}
                                alt={example.alt}
                                frame="crop"
                                sizes="(max-width: 700px) 78vw, 260px"
                            />
                            <div className="industry-copy">
                                <p className="work-status">Concept design</p>
                                <h3>{example.title}</h3>
                                <p>{example.description}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
