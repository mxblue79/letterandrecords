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
    const currentUrl = url || window.location.href;

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
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={currentUrl} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={currentUrl} />
        </Helmet>
    );
}
