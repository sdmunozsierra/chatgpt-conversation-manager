import fetch from 'node-fetch';
import { HEADERS } from './globals.js';

async function deleteAllConversations() {
    const url = `https://chatgpt.com/backend-api/conversations`;

    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                ...HEADERS,
                'Content-Type': 'application/json' // Ensure Content-Type is set
            },
            body: JSON.stringify({ is_visible: false })
        });

        const responseBody = await response.json();
        console.log(responseBody); // Log the response body for debugging

        if (!response.ok) {
            throw new Error(`Error deleting conversations: ${response.statusText}`);
        }

        console.log(`All conversations marked as deleted`);
    } catch (error) {
        console.error('Error deleting conversations:', error);
    }
}

deleteAllConversations();

