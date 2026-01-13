import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Skip scroll to top for Portfolio (Home) page to preserve scroll position
        if (pathname === '/' || pathname === '/portfolio') {
            return;
        }

        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
