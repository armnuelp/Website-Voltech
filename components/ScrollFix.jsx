'use client';

import { useEffect } from 'react';

export default function ScrollFix() {
    useEffect(() => {
        // Disable default browser scroll restoration
        if (typeof window !== 'undefined') {
            window.history.scrollRestoration = 'manual';
            window.scrollTo(0, 0);
        }
    }, []);

    return null;
}
