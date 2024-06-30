const TelegramBot = require('node-telegram-bot-api');
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Pong!')
})

// replace the value below with the Telegram token you receive from @BotFather
const TOKEN = '7480365930:AAFEG4KbYFYgY2K7A834NSN71HYU5g4qkOo';
const GAME_NAME = 'gameZyad';
const GAME_URL = 'https://chipper-puffpuff-d03cbe.netlify.app/';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(TOKEN, { polling: true });

bot.setMyCommands([
    { command: '/start', description: 'Start the game' }
])



// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg) => {
    const chat_id = msg.chat.id;
    bot.sendGame(chat_id, GAME_NAME, {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Play',
                        callback_game: GAME_URL
                    }
                ],
                [
                    {
                        text: "Yes",
                        callback_data: "btn_yes",
                        
                    },
                    {
                        text: "No",
                        callback_data: "btn_no"
                    },

                ]
            ]
        }
    });
});

bot.on('callback_query', (c) => {
    
    console.log('Callback');
    console.log(c);

    const user = c.from;
    const user_id = user.id;

    const chat_instance = c.chat_instance;

    const chat_id = c.message.chat.id;
    const game_name = c.game_short_name;
    const message_id = c.message.message_id;

    console.log(`callback_query data: ${user.username}//${user_id}//${chat_instance}//${chat_id}//${game_name}`);

    if(c.data === 'btn_yes') {
        console.log('Yes');
        return
    }

    if(c.data === 'btn_no') {
        console.log('No');
        return
    }

    // TODO: sanitize
    const url = `${GAME_URL}index.html?user_id=${user_id}&chat_id=${chat_id}&message_id=${message_id}`;
    return bot.answerCallbackQuery(c.id, { url: url })
})

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;

//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });


app.listen(10000, () => {
    console.log(`Example app listening at http://localhost:${10000}`)
})