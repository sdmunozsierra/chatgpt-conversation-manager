// parseConvos.js

import fs from 'fs';
import readline from 'readline';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

import { HEADERS } from './globals.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchConversationDetails(convo) {
    const id = convo.id;
    const url = `https://chatgpt.com/backend-api/conversation/${id}`;

    try {
        const response = await fetch(url, { HEADERS });
        if (!response.ok) {
            throw new Error(`Error fetching conversation ${id}: ${response.statusText}`);
        }
        const conversation = await response.json();

        // Concatenate convo information with fetched conversation details
        const completeConversation = {
            ...convo,
            ...conversation
        };

        const conversationTitle = conversation.title.replace(/[^a-zA-Z0-9]/g, '_');
        const createDate = new Date(conversation.create_time * 1000);
        const filePrefix = `${createDate.getHours()}-${createDate.getMinutes()}-${createDate.getSeconds()}`;
        const folderName = `${createDate.getFullYear()}-${createDate.getMonth() + 1}-${createDate.getDate()}`;
        const fileName = `${filePrefix}_${conversationTitle}.json`;

        const folderPath = path.join(__dirname, folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        fs.writeFileSync(path.join(folderPath, fileName), JSON.stringify(completeConversation, null, 2));
        console.log(`Saved conversation ${id} to ${folderPath}/${fileName}`);
    } catch (error) {
        console.error('Error fetching conversation details:', error);
    }
}

function extractConvos(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(data);

        // Adjust based on the actual structure of the parsedData
        const conversations = parsedData.conversations || parsedData.items || parsedData;

        if (Array.isArray(conversations)) {
            return conversations;
        } else {
            console.error('Expected an array of conversations.');
            return [];
        }
    } catch (error) {
        console.error('Error reading or parsing file:', error);
        return [];
    }
}

async function main() {
    const convos = extractConvos('convos.json');
    for (const convo of convos) {
        await fetchConversationDetails(convo);
        await new Promise(resolve => setTimeout(resolve, 1300)); // Wait for 3 seconds between calls
    }
}

main();

