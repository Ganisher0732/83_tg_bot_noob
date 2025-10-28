import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8216365587:AAFuVAJTmM-s5w6_KkNAGiXyB4esVc30wqU"

const bot = new TelegramBot(TOKEN, { polling: true })

bot.on("message",function (msg) {
    const chatId = msg.chat.id;
    const text = msg.text;
    bot.sendMessage(chatId, `Salom ${text} yaxshimisan ishlar yaxshimi qanday yordam bera olaman?`);
    console.log(msg);
    bot.sendMessage(chatId, `Salom  ${firstname} yaxshimisan ishlar yaxshimi qanday yordam bera olaman?`, {
        reply_markup: {
            keyboard: [
                [{ text: "Boshlash" }],
                [{ text: "Menyu" }, { text: "Sozlamalar" }],
            ],
            resize_keyboard: true
        },
    })

});

