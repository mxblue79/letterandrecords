const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;
const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;
const BASE_URL = '/notion-api'; // Goes through Vite proxy

export interface NotionProject {
    id: string;
    title: string;
    categories: string[];
    image: string;
    videoUrl?: string;
    date: string;
    client?: string;
    role?: string;
    description?: string;
    aspectRatio: string;
}

async function fecthNotion(endpoint: string, method = 'GET', body?: any) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            'Authorization': `Bearer ${NOTION_API_KEY}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Notion API Error:', response.status, errorText);
        throw new Error(`Notion API Error: ${response.status}`);
    }
    return response.json();
}

export const getProjects = async (): Promise<NotionProject[]> => {
    if (!DATABASE_ID) {
        console.error("Database ID is missing");
        return [];
    }

    try {
        const response = await fecthNotion(`/databases/${DATABASE_ID}/query`, 'POST', {
            sorts: [
                {
                    property: 'Date',
                    direction: 'descending',
                },
            ],
        });

        const projects = await Promise.all(response.results.map(async (page: any, index: number) => {
            const props = page.properties;

            // 1. Title (Handle 'Name' or '이름')
            const titleProp = props.Name || props['이름'];
            const title = titleProp?.title?.[0]?.plain_text || 'Untitled';

            // 2. Categories (Multi-select)
            const categoryProp = props.Category || props['Category ']; // Handle potential trailing space
            const categories = categoryProp?.multi_select?.map((c: any) => c.name) || [];

            // 3. Date
            const date = props.Date?.date?.start || '';

            // 4. Video URL
            const videoUrl = props.Video?.url || undefined;

            // 5. Image (Files & Media)
            let image = '';
            const fileObj = props.Files?.files?.[0];
            if (fileObj) {
                if (fileObj.type === 'file') {
                    image = fileObj.file.url;
                } else if (fileObj.type === 'external') {
                    image = fileObj.external.url;
                }
            }

            // 5-1. If no File Image, try to fetch first image from page content (Priority 2)
            if (!image) {
                try {
                    // Fetch only first few blocks to assume image is near top
                    const blocks = await fecthNotion(`/blocks/${page.id}/children?page_size=5`, 'GET');
                    const imageBlock = blocks.results.find((b: any) => b.type === 'image');
                    if (imageBlock) {
                        image = imageBlock.image.type === 'external' ? imageBlock.image.external.url : imageBlock.image.file.url;
                    }
                } catch (error) {
                    console.warn(`Failed to fetch fallback image for ${title}`, error);
                }
            }

            // 5-2. If still no image, try Video Thumbnail (Priority 3)
            if (!image && videoUrl) {
                const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
                const match = videoUrl.match(regExp);
                if (match && match[2].length === 11) {
                    image = `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
                }
            }

            // 6. Metadata
            const client = props.Client?.rich_text?.[0]?.plain_text || '';
            const role = props.Role?.rich_text?.[0]?.plain_text || '';
            const description = props.Description?.rich_text?.[0]?.plain_text || '';

            // 7. Aspect Ratio (Controlled by 'Priority' property in Notion)
            // Priority 5 (High) -> Wider (Emphasized)
            // Priority 1 (Low)  -> Taller/Narrower (Less Emphasized)
            const priorityProp = props.Priority || props.priority;

            // Handle 'select' type (e.g., { id: '...', type: 'select', select: { name: '4', ... } })
            // Or 'number' type if user changes it back.
            let priority = 3;

            if (priorityProp?.type === 'select') {
                const val = parseInt(priorityProp.select?.name || '3', 10);
                if (!isNaN(val)) priority = val;
            } else if (priorityProp?.type === 'number') {
                priority = priorityProp.number || 3;
            }

            let aspectRatio = 'aspect-square';

            switch (priority) {
                case 5:
                    aspectRatio = 'aspect-[16/9]'; // Cinematic / Most Emphasized
                    break;
                case 4:
                    aspectRatio = 'aspect-[4/3]';  // Wide
                    break;
                case 3:
                    aspectRatio = 'aspect-square'; // Balanced
                    break;
                case 2:
                    aspectRatio = 'aspect-[4/5]';  // Portrait
                    break;
                case 1:
                    aspectRatio = 'aspect-[2/3]';  // Tall Strip / Least Emphasized
                    break;
                default:
                    aspectRatio = 'aspect-square';
            }

            // Exception: If it's a Video, we generally want to avoid extreme vertical crops (2:3)
            // User Request: Force videos to keep 16:9 ratio.
            if (categories.some((c: string) => c.includes('영상') || c.includes('Video')) || videoUrl) {
                aspectRatio = 'aspect-[16/9]';
            }

            return {
                id: page.id,
                title,
                categories,
                image,
                videoUrl,
                date,
                client,
                role,
                description,
                aspectRatio,
            };
        }));

        // Filter out projects that have no title or are 'Untitled'
        const validProjects = projects.filter((p: any) => p.title && p.title !== 'Untitled' && p.title.trim() !== '');

        return validProjects;

    } catch (error) {
        console.error("Failed to fetch Notion projects:", error);
        return [];
    }
};

export const getProject = async (id: string) => {
    try {
        const pageResponse = await fecthNotion(`/pages/${id}`, 'GET');
        const blocksResponse = await fecthNotion(`/blocks/${id}/children`, 'GET');

        const props = pageResponse.properties;
        const titleProp = props.Name || props['이름'];
        const title = titleProp?.title?.[0]?.plain_text || 'Untitled';

        const categoryProp = props.Category || props['Category '];
        const categories = categoryProp?.multi_select?.map((c: any) => c.name) || [];

        const date = props.Date?.date?.start || '';
        const client = props.Client?.rich_text?.[0]?.plain_text || '';
        const role = props.Role?.rich_text?.[0]?.plain_text || '';
        const description = props.Description?.rich_text?.[0]?.plain_text || '';

        const videoUrl = props.Video?.url || undefined;

        const content = blocksResponse.results.map((block: any) => {
            if (block.type === 'image') {
                const src = block.image.type === 'external' ? block.image.external.url : block.image.file.url;
                const caption = block.image.caption?.[0]?.plain_text || '';
                return { type: 'image', src, caption };
            }
            if (block.type === 'paragraph') {
                const text = block.paragraph.rich_text?.map((t: any) => t.plain_text).join('') || '';
                if (!text) return null;
                return { type: 'text', text };
            }
            if (block.type === 'video') {
                const src = block.video.type === 'external' ? block.video.external.url : block.video.file.url;
                return { type: 'video', src };
            }
            if (block.type === 'embed') {
                return { type: 'video', src: block.embed.url };
            }
            return null;
        }).filter(Boolean);

        return {
            id: pageResponse.id,
            title,
            categories,
            date,
            client,
            role,
            description,
            videoUrl,
            content
        };

    } catch (error) {
        console.error(`Failed to fetch project ${id}:`, error);
        return null;
    }
}
