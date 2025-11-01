import TelegramBot from "node-telegram-bot-api";

const TOKEN = "8216365587:AAFuVAJTmM-s5w6_KkNAGiXyB4esVc30wqU"; 

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name; -

    bot.sendMessage(
        chatId,
        `Salom ${firstName}! 😊Ishlaring yaxshimi? Qanday yordam bera olaman?`,
        {
            reply_markup: {
                keyboard: [
                    [{ text: "Boshlash" }],
                    [{ text: "Menyu" }, { text: "Sozlamalar" }],
                ],
                resize_keyboard: true, 
                one_time_keyboard: false, 
            },
        }
    );
});
