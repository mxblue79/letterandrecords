import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-38RCYW2EXZ';

export function GoogleAnalytics() {
    const location = useLocation();

    useEffect(() => {
        // Initialize GA4
        if (!window.ga_initialized) {
            ReactGA.initialize(GA_MEASUREMENT_ID);
            window.ga_initialized = true;
        }
    }, []);

    useEffect(() => {
        // Send pageview on route change
        ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }, [location]);

    return null;
}

// Add type for global flag
declare global {
    interface Window {
        ga_initialized?: boolean;
    }
}
