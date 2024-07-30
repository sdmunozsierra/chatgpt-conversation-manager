// fetchConversations

import fs from 'fs';
import fetch from 'node-fetch';
import { HEADERS } from './globals.js';

async function fetchConversations(offset = 0, limit = 28) {
    const url = `https://chatgpt.com/backend-api/conversations?offset=${offset}&limit=${limit}&order=updated`;
    console.log(`Fetching conversations with offset: ${offset}, limit: ${limit}`);

    try {
        const response = await fetch(url, { HEADERS });
        if (!response.ok) {
            throw new Error(`Error fetching conversations: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`Fetched ${data.items.length} conversations`);
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function saveAllConversations() {
    const limit = 28;
    let offset = 0;
    let allConversations = [];
    let hasMore = true;

    while (hasMore) {
        const data = await fetchConversations(offset, limit);
        if (data && data.items && data.items.length > 0) {
            console.log(`Adding ${data.items.length} conversations to the list`);
            allConversations = allConversations.concat(data.items);
            offset += limit;
            hasMore = data.items.length === limit; // if less than limit, no more data
            console.log(`Waiting for 3 seconds before the next fetch...`);
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for 3 seconds between calls
        } else {
            hasMore = false;
        }
    }

    console.log(`Total conversations fetched: ${allConversations.length}`);
    fs.writeFileSync('convos.json', JSON.stringify(allConversations, null, 2));
    console.log('All conversations saved to convos.json');
}

saveAllConversations();

