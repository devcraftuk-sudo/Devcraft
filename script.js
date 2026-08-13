document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const track = document.querySelector('.slider-track');
    const cards = document.querySelectorAll('.factor-card');
    const contactForm = document.querySelector('.contact-form');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    });

    // Mobile nav toggle
    navToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        navToggle.classList.toggle('open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Businesses infinite carousel
    if (track && cards.length) {
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });
    }

    // Send contact enquiries through the Vercel API.
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const status = contactForm.querySelector('.form-status');
            const formData = new FormData(contactForm);

            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            status.className = 'form-status';
            status.textContent = '';

            try {
                const contactEndpoint = window.location.hostname === 'devcraftuk.co.uk'
                    ? 'https://www.devcraftuk.co.uk/api/contact'
                    : '/api/contact';
                const response = await fetch(contactEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: formData.get('email'),
                        projectType: formData.get('project-type'),
                        objective: formData.get('objective'),
                        companyWebsite: formData.get('companyWebsite')
                    })
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Your message could not be sent.');
                }

                contactForm.reset();
                status.classList.add('success');
                status.textContent = 'Thank you. Your message has been sent successfully.';
                window.location.assign('thank-you.html');
            } catch (error) {
                status.classList.add('error');
                status.textContent = error.message;
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send message';
            }
        });
    }
});
