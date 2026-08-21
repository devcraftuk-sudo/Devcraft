import Image from 'next/image';
import { services } from '../lib/siteData';

function ServiceCard({ service, duplicate = false }) {
    return (
        <article className="factor-card business-card" aria-hidden={duplicate || undefined}>
            <div className="business-image">
                <Image
                    src={service.image}
                    alt={duplicate ? '' : service.alt}
                    fill
                    sizes="(max-width: 768px) 235px, (max-width: 900px) 260px, 280px"
                />
            </div>
            <div className="business-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
            </div>
        </article>
    );
}

export default function ServicesCarousel() {
    return (
        <div className="slider-wrapper">
            <div className="slider-viewport">
                <div className="slider-track">
                    {services.map(service => (
                        <ServiceCard service={service} key={service.title} />
                    ))}
                    {services.map(service => (
                        <ServiceCard
                            service={service}
                            duplicate
                            key={`${service.title}-duplicate`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
