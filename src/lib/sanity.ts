import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'dcoqgmz1',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    return builder.image(source);
}

// Data fetching helper
export async function getSanityProjects() {
    return await client.fetch(`*[_type == "project"] | order(date desc)`);
}

export async function getSanityProject(id: string) {
    return await client.fetch(`*[_type == "project" && _id == $id][0]`, { id });
}

// Instagram Data Interface
export interface SanityInstagramPost {
    _id: string;
    image: any;
    caption?: string;
    link?: string;
    date: string;
    isPinned?: boolean;
}

export async function getInstagramPosts() {
    return await client.fetch(`*[_type == "instagram"] | order(coalesce(isPinned, false) desc, date desc)[0...99]`);
}

export async function getSettings() {
    const settings = await client.fetch(`*[_type == "settings"][0]{ "pdfUrl": companyProfile.asset->url }`);
    // Order by updated time to get the latest one
    const bookstore = await client.fetch(`*[_type == "bookstore"] | order(_updatedAt desc)[0]{ "gallery": gallery }`);

    return {
        ...(settings || {}),
        gallery: bookstore?.gallery || []
    };
}
