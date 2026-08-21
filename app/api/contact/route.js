const ALLOWED_PROJECT_TYPES = new Set([
    'Website',
    'System',
    'App',
    'Blog',
    'Landing Pages',
    'Other'
]);

const ALLOWED_ORIGINS = new Set([
    'https://devcraftuk.co.uk',
    'https://www.devcraftuk.co.uk'
]);

function escapeHtml(value) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

function corsHeaders(request) {
    const origin = request.headers.get('origin');

    if (!ALLOWED_ORIGINS.has(origin)) {
        return {};
    }

    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Vary': 'Origin'
    };
}

function json(data, status, headers = {}) {
    return Response.json(data, { status, headers });
}

export async function OPTIONS(request) {
    return new Response(null, {
        status: 204,
        headers: corsHeaders(request)
    });
}

export async function POST(request) {
    const headers = corsHeaders(request);
    let body;

    try {
        body = await request.json();
    } catch {
        return json({ error: 'Invalid request body.' }, 400, headers);
    }

    const cleanEmail = String(body.email ?? '').trim().toLowerCase();
    const cleanProjectType = String(body.projectType ?? '').trim();
    const cleanObjective = String(body.objective ?? '').trim();
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);

    if (!emailIsValid) {
        return json({ error: 'Please enter a valid email address.' }, 400, headers);
    }

    if (!ALLOWED_PROJECT_TYPES.has(cleanProjectType)) {
        return json({ error: 'Please choose a valid project type.' }, 400, headers);
    }

    if (cleanObjective.length < 10 || cleanObjective.length > 3000) {
        return json({
            error: 'Please describe your objective using between 10 and 3,000 characters.'
        }, 400, headers);
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.CONTACT_TO_EMAIL;
    const sender = process.env.CONTACT_FROM_EMAIL
        || 'DEVcraft Website <onboarding@resend.dev>';

    if (!apiKey || !recipient) {
        console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL.');
        return json({ error: 'Email service is not configured yet.' }, 500, headers);
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
        const resendResult = await resendResponse.json();

        if (!resendResponse.ok) {
            console.error(
                'Resend request failed:',
                resendResponse.status,
                JSON.stringify(resendResult)
            );
            return json({ error: 'The message could not be sent.' }, 502, headers);
        }

        return json({ success: true, id: resendResult.id }, 200, headers);
    } catch (error) {
        console.error('Contact email failed:', error);
        return json({ error: 'The message could not be sent.' }, 500, headers);
    }
}
