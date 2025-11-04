import TelegramBot from "node-telegram-bot-api";
import fs from "fs";

const TOKEN = "8216365587:AAFuVAJTmM-s5w6_KkNAGiXyB4esVc30wqU"; 
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  const firstname = msg.chat.first_name;
  const menuPhoto = "./Neon Heroes in the Dark.png";

  if (text === "/start") {
    await bot.sendMessage(chatId, `Xush kelibsiz, ${firstname}!`, {
      reply_markup: {
        keyboard: [
          [{ text: "Boshlash 🔥" }],
          [{ text: "Menu 😜" }, { text: "Sozlamalar ⚙️" }],
        ],
        resize_keyboard: true,
      },
    });
  } else if (text == "Boshlash 🔥") {
    bot.sendPhoto(chatId, "./m5.jpg", {
      caption: "BMW M5 F90",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "info", callback_data: "info" },
            { text: "photes", callback_data: "photes" },
          ],
          [{ text: "price", callback_data: "price" }],
        ],
      },
    })
  } else if (text === "Menu 😜") {
    const kutingXabari = await bot.sendMessage(chatId, "Iltimos, kuting...");
    setTimeout(async () => {
      try {
        await bot.deleteMessage(chatId, kutingXabari.message_id);
        if (fs.existsSync(menuPhoto)) {
          await bot.sendPhoto(chatId, menuPhoto, {
            caption: "🔥 PVP jangchilar menyusi:",
            reply_markup: {
              keyboard: [
                [{ text: "Manti" }, { text: "Karam" }],
                [{ text: "Shashlik" }, { text: "Hotdog" }],
                [{ text: "Orqaga 🔙" }],
              ],
              resize_keyboard: true,
            },
          });
        } else {
          await bot.sendPhoto(chatId, "./m5.jpg", );
        }
      } catch (err) {
        console.error("Xatolik:", err);
      }
    }, 1000);
  } else if (text === "Orqaga 🔙") {
    await bot.sendMessage(chatId, "Asosiy menuga qaytdingiz 👇", {
      reply_markup: {
        keyboard: [
          [{ text: "Boshlash 🔥" }],
          [{ text: "Menu 😜" }, { text: "Sozlamalar ⚙️" }],
        ],
        resize_keyboard: true,
      },
    });
  }

  console.log(msg);
});


bot.on("callback_query", function (query){

  console.log(query);

  if (data == "info") {
    bot.sendMessage(chatId, "BMW M5 F90 haqida ma'lumotlar...");
  } else if (data == "photes") {
    bot.sendPhoto(chatId, "./m5.jpg");
  } else if (data == "price") {
  bot.sendMessage(chatId, "100,000 dollar", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Sotib ol", callback_data: "buy" }
          ],
        ],
      },
    });
  } else if (data == "buy") {
    bot.sendMessage(chatId, "Puling busa kel");
  }
}); 
  

console.log("✅ Bot ishga tushdi...");
