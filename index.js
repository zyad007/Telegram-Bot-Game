const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '7480365930:AAFEG4KbYFYgY2K7A834NSN71HYU5g4qkOo';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
    {command: 'test', description: 'Test command for sending game link'}
])

// Matches "/echo [whatever]"
bot.onText(/\/start/, (msg) => {
    // const chatId = msg.chat.id;
    // const resp = 'Welcome to our game \nHere is the link: https://cheerful-raindrop-1cc61c.netlify.app/' // the captured "whatever"

    // // send back the matched "whatever" to the chat
    // bot.sendMessage(chatId, resp);

    bot.sendGame(msg.chat.id, 'gameZyad')

});

bot.on('callback_query', (c) => {
    console.log('CB');
    bot.answerCallbackQuery(c.id, {url: 'https://cheerful-raindrop-1cc61c.netlify.app/'})
})

// // Listen for any kind of message. There are different kinds of
// // messages.
// bot.on('message', (msg) => {
//     const chatId = msg.chat.id;

//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Received your message');
// });
