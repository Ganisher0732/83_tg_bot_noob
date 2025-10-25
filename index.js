import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8216365587:AAFuVAJTmM-s5w6_KkNAGiXyB4esVc30wqU"

const bot = new TelegramBot(TOKEN, {polling: true})

bot.on("message",function (msg) {
    const chatId = msg.chat.id;
    const text = msg.text;
    bot.sendMessage(chatId, `Hello Bro -> ${text}`);
    console.log(msg);
});

