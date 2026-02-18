'use client';

import { useLayoutEffect } from 'react';

export default function ScrollToTop() {
    useLayoutEffect(() => {
        // Force scroll to top immediately before paint
        window.history.scrollRestoration = 'manual';
        window.scrollTo(0, 0);
    }, []);

    return null;
}
