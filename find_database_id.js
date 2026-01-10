import https from 'https';

const apiKey = 'ntn_J201410116260TkyJGiS0Z410W7X7z57UBWNao1keBi4E1';
// This is the Page ID the user gave us
const pageId = '14b0780cbeaa808ab5cacc7df9586959';

const options = {
    hostname: 'api.notion.com',
    path: `/v1/blocks/${pageId}/children`,
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
    }
};

const req = https.request(options, res => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
        if (res.statusCode === 200) {
            const response = JSON.parse(data);
            console.log(`Scanning page for database...`);

            const dbBlock = response.results.find(block => block.type === 'child_database');

            if (dbBlock) {
                console.log(`FOUND_DATABASE_ID: ${dbBlock.id}`);
                console.log(`Database Name: ${dbBlock.child_database.title}`);
            } else {
                console.log("No child database found on this page. It might be a linked view or the page itself is expected to be the db.");
                // List types found to help debugging
                console.log("Block types found:", response.results.map(b => b.type).join(', '));
            }

        } else {
            console.log('API Error:', res.statusCode);
            console.log('Details:', data);
        }
    });
});

req.on('error', error => {
    console.error('Network Error:', error);
});

req.end();
