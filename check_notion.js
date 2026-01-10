import https from 'https';

const apiKey = 'ntn_J201410116260TkyJGiS0Z410W7X7z57UBWNao1keBi4E1';
const dbId = '2e30780c-beaa-80b6-93f7-dc0a1ef52933';

const options = {
    hostname: 'api.notion.com',
    path: `/v1/databases/${dbId}/query`,
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, res => {
    let data = '';
    res.on('data', chunk => { data += chunk; });
    res.on('end', () => {
        if (res.statusCode === 200) {
            const response = JSON.parse(data);
            console.log(`Total Projects Found: ${response.results.length}`);

            if (response.results.length > 0) {
                const firstPage = response.results[0];
                console.log('--- Property Keys Found in First Item ---');
                console.log(Object.keys(firstPage.properties).join(', '));

                response.results.forEach((p, index) => {
                    if (index !== 9) return; // Only show item 10
                    // Try to find title
                    let title = "Unable to find title";
                    for (const key in p.properties) {
                        if (p.properties[key].type === 'title') {
                            const titleArr = p.properties[key].title;
                            title = titleArr.length > 0 ? titleArr[0].plain_text : '(Empty Title)';
                        }
                    }

                    const priorityProp = p.properties['priority'] || p.properties['Priority'];
                    const priorityVal = priorityProp ? JSON.stringify(priorityProp) : 'N/A';

                    const videoProp = p.properties['Video'];
                    const videoVal = videoProp ? JSON.stringify(videoProp) : 'N/A';

                    console.log(`${index + 1}. ${title} (ID: ${p.id}) - Priority: ${priorityVal} - Video: ${videoVal}`);
                });
            } else {
                console.log("No projects found. Check if the database is empty or if the integration is invited to the specific database page.");
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
