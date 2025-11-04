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
  } else if (text === "Boshlash 🔥") {
    await bot.sendMessage(chatId, "Salom, sizga qanday yordam bera olaman?");
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
          await bot.sendMessage(chatId, "⚠️ Rasm topilmadi! (Neon Heroes in the Dark.png)");
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

console.log("✅ Bot ishga tushdi...");
