'use client';

import { useEffect } from 'react';

export default function MotionRoot() {
    useEffect(() => {
        document.documentElement.dataset.enhanced = 'true';
    }, []);

    return null;
}
