'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const projectTypes = [
    'Website',
    'System',
    'App',
    'Blog',
    'Landing Pages',
    'Not sure yet',
    'Other'
];

export default function ContactForm() {
    const router = useRouter();
    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        setSubmitting(true);
        setStatus({ type: '', message: '' });

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.get('email'),
                    projectType: formData.get('project-type'),
                    objective: formData.get('objective')
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Your message could not be sent.');
            }

            form.reset();
            router.push('/thank-you');
        } catch (error) {
            setStatus({
                type: 'error',
                message: error instanceof Error
                    ? error.message
                    : 'Your message could not be sent. Please try again, or use WhatsApp instead.'
            });
            setSubmitting(false);
        }
    }

    return (
        <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
            <div className="form-group">
                <label htmlFor="email">Your email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                    aria-invalid={status.type === 'error' ? 'true' : undefined}
                />
            </div>
            <div className="form-group">
                <label htmlFor="project-type">What does your company need?</label>
                <div className="select-wrapper">
                    <select id="project-type" name="project-type" defaultValue="" required>
                        <option value="" disabled>Choose a project type</option>
                        {projectTypes.map(type => (
                            <option value={type} key={type}>{type}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="objective">What would you like help with?</label>
                <textarea
                    id="objective"
                    name="objective"
                    rows="5"
                    minLength="10"
                    maxLength="3000"
                    placeholder="A sentence or two about the website, system or support you need is enough to start."
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send message'}
            </button>
            <p
                className={`form-status${status.type ? ` ${status.type}` : ''}`}
                role="status"
                aria-live="polite"
            >
                {status.message}
            </p>
        </form>
    );
}
