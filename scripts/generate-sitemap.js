import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Setup Sanity Client
const client = createClient({
    projectId: 'dcoqgmz1',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2023-05-03',
});

// 2. Define Domain and Static Paths
const DOMAIN = 'https://letterandrecords.com';
const STATIC_ROUTES = [
    '',
    '/info',
    '/portfolio',
    '/bookstore',
    '/originals',
    '/originals/publishing',
    '/contact'
];

// 3. Helper to format date
const formatDate = (date) => new Date(date).toISOString();

async function generateSitemap() {
    try {
        console.log('🔍 Fetching projects from Sanity...');

        // Fetch all project IDs and updated dates
        const projects = await client.fetch(`*[_type == "project"]{ _id, _updatedAt }`);
        console.log(`✅ Found ${projects.length} projects.`);

        // Start XML string
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

        // Add Static Routes
        STATIC_ROUTES.forEach(route => {
            xml += `
  <url>
    <loc>${DOMAIN}${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`;
        });

        // Add Dynamic Project Routes
        projects.forEach(project => {
            xml += `
  <url>
    <loc>${DOMAIN}/project/${project._id}</loc>
    <lastmod>${formatDate(project._updatedAt)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
        });

        // Close XML
        xml += `
</urlset>`;

        // Write to file
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const publicDir = path.join(__dirname, '../public');
        const sitemapPath = path.join(publicDir, 'sitemap.xml');

        // Ensure public dir exists (should exist)
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir);
        }

        fs.writeFileSync(sitemapPath, xml);
        console.log(`🎉 Sitemap generated successfully at: ${sitemapPath}`);

    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
