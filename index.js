const TelegramBot = require('node-telegram-bot-api');
const express = require('express')

// replace the value below with the Telegram token you receive from @BotFather
const TOKEN = '7480365930:AAFEG4KbYFYgY2K7A834NSN71HYU5g4qkOo';
const GAME_NAME = 'gameZyad';
const GAME_URL = 'https://cheerful-raindrop-1cc61c.netlify.app/';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands([
    {command: '/start', description: 'Start the game'}
])

// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg) => {
    const chat_id = msg.chat.id;
    bot.sendGame(chat_id, GAME_NAME);
});

bot.on('callback_query', (c) => {
    console.log('callback_query:' + c);

    const user = c.from;
    const user_id = user.id;
    const chat_instance = c.chat_instance;
    const chat_id = c.chat_id;
    const game_name = c.game_short_name;
    console.log(`callback_query data: ${user}//${user_id}//${chat_instance}//${chat_id}//${game_name}`);

    // TODO: sanitize
    const url = `${GAME_URL}index.html?user_id=${user_id}&chat_id=${chat_id}`;
    bot.answerCallbackQuery(c.id, {url: GAME_URL})
})

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;

//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });

const app = express()
app.listen(10000, () => {
    console.log(`Example app listening at http://localhost:${10000}`)
})