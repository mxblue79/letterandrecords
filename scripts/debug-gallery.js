import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'dcoqgmz1',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2023-05-03',
});

async function debug() {
    try {
        console.log("Fetching bookstore document...");
        const bookstore = await client.fetch(`*[_type == "bookstore"] | order(_updatedAt desc)[0]`);
        console.log("Raw Bookstore Document:", JSON.stringify(bookstore, null, 2));

        if (bookstore && bookstore.gallery) {
            console.log(`Found ${bookstore.gallery.length} images in gallery.`);
        } else {
            console.log("Gallery field is missing or empty.");
        }

        console.log("Fetching via getSettings pattern...");
        const queryResult = await client.fetch(`*[_type == "bookstore"] | order(_updatedAt desc)[0]{ "gallery": gallery }`);
        console.log("Query Result:", queryResult);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

debug();
