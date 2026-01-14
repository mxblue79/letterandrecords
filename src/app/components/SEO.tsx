import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export function SEO({
    title = '글자와기록사이',
    description = '필요에 가치를 더하는 문화예술기업, 글자와기록사이',
    image = '/og-image.png', // Default OG image (need to ensure this exists or use a logo)
    url
}: SEOProps) {
    const siteTitle = '글자와기록사이 | Letter & Records';
    const fullTitle = title === '글자와기록사이' ? siteTitle : `${title} | 글자와기록사이`;
    const domain = typeof window !== 'undefined' ? window.location.origin : 'https://letterandrecords.com';

    // Construct Canonical URL (Exclude query params & normalize paths)
    const currentUrl = useMemo(() => {
        if (url) return url;
        if (typeof window === 'undefined') return '';

        let pathname = window.location.pathname;

        // Normalize /portfolio to / to avoid duplicate content punishment
        if (pathname === '/portfolio') {
            pathname = '/';
        }

        // Remove trailing slash if not root
        if (pathname.length > 1 && pathname.endsWith('/')) {
            pathname = pathname.slice(0, -1);
        }

        return `${domain}${pathname}`;
    }, [url, domain]);

    // Ensure image is absolute URL
    const fullImage = image.startsWith('http') ? image : `${domain}${image}`;

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={fullImage} />

            {/* Canonical */}
            <link rel="canonical" href={currentUrl} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "글자와기록사이",
                    "url": "https://letterandrecords.com",
                    "logo": "https://letterandrecords.com/og-image.png",
                    "description": "필요에 가치를 더하는 문화예술기업, 글자와기록사이",
                    "sameAs": [
                        "https://instagram.com/bookstorethex"
                    ]
                })}
            </script>
        </Helmet>
    );
}
