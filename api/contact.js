const ALLOWED_PROJECT_TYPES = new Set([
    'Website',
    'System',
    'App',
    'Blog',
    'Landing Pages',
    'Other'
]);

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

export default async function handler(request, response) {
    const allowedOrigins = new Set([
        'https://devcraftuk.co.uk',
        'https://www.devcraftuk.co.uk'
    ]);
    const requestOrigin = request.headers.origin;

    if (allowedOrigins.has(requestOrigin)) {
        response.setHeader('Access-Control-Allow-Origin', requestOrigin);
        response.setHeader('Vary', 'Origin');
        response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    }

    if (request.method === 'OPTIONS') {
        return response.status(204).end();
    }

    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        return response.status(405).json({ error: 'Method not allowed.' });
    }

    const {
        email = '',
        projectType = '',
        objective = '',
        companyWebsite = ''
    } = request.body ?? {};

    // Honeypot: bots commonly complete fields hidden from real visitors.
    if (companyWebsite) {
        return response.status(200).json({ success: true });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const cleanProjectType = String(projectType).trim();
    const cleanObjective = String(objective).trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    if (!emailIsValid) {
        return response.status(400).json({ error: 'Please enter a valid email address.' });
    }

    if (!ALLOWED_PROJECT_TYPES.has(cleanProjectType)) {
        return response.status(400).json({ error: 'Please choose a valid project type.' });
    }

    if (cleanObjective.length < 10 || cleanObjective.length > 3000) {
        return response.status(400).json({
            error: 'Please describe your objective using between 10 and 3,000 characters.'
        });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_TO_EMAIL;
    const sender = process.env.CONTACT_FROM_EMAIL || 'DEVcraft Website <onboarding@resend.dev>';

    if (!apiKey || !recipient) {
        console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL.');
        return response.status(500).json({ error: 'Email service is not configured yet.' });
    }

    const safeEmail = escapeHtml(cleanEmail);
    const safeProjectType = escapeHtml(cleanProjectType);
    const safeObjective = escapeHtml(cleanObjective).replaceAll('\n', '<br>');

    try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                from: sender,
                to: [recipient],
                reply_to: cleanEmail,
                subject: `New ${cleanProjectType} enquiry from DEVcraft`,
                text: [
                    `Email: ${cleanEmail}`,
                    `Project type: ${cleanProjectType}`,
                    '',
                    'Objective:',
                    cleanObjective
                ].join('\n'),
                html: `
                    <h2>New DEVcraft enquiry</h2>
                    <p><strong>Email:</strong> ${safeEmail}</p>
                    <p><strong>Project type:</strong> ${safeProjectType}</p>
                    <p><strong>Objective:</strong></p>
                    <p>${safeObjective}</p>
                `
            })
        });

        if (!resendResponse.ok) {
            const resendError = await resendResponse.text();
            console.error('Resend request failed:', resendResponse.status, resendError);
            return response.status(502).json({ error: 'The message could not be sent.' });
        }

        return response.status(200).json({ success: true });
    } catch (error) {
        console.error('Contact email failed:', error);
        return response.status(500).json({ error: 'The message could not be sent.' });
    }
}
