import TelegramBot from "node-telegram-bot-api";
import fs from "fs";

const TOKEN = "8216365587:AAFuVAJTmM-s5w6_KkNAGiXyB4esVc30wqU";
const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim(); 
  const firstname = msg.chat.first_name;
  const menuPhoto = "./f.webp";
  const sozlamaPhoto = "./da.jpg";

  
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
  }

  
  else if (text === "Boshlash 🔥") {
    await bot.sendPhoto(chatId, "./m5.jpg", {
      caption: "BMW M5 F90",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Info", callback_data: "info" },
            { text: "Photos", callback_data: "photos" },
          ],
          [{ text: "Price", callback_data: "price" }],
        ],
      },
    });
  }

  
  else if (text === "Sozlamalar ⚙️") {
    const photoPath = fs.existsSync(sozlamaPhoto) ? sozlamaPhoto : "./da.jpg";
    await bot.sendPhoto(chatId, photoPath, {
      caption: "⚙️ Sozlamalar menyusi",
      reply_markup: {
        keyboard: [
          [{ text: "Ekranni qora qilish" }],
          [{ text: "Bot nomini o‘zgartirish" }],
          [{ text: "Orqaga 🔙" }],
        ],
        resize_keyboard: true,
      },
    });
  }

  
  else if (text === "Ekranni qora qilish" || text === "Bot nomini o‘zgartirish") {
    await bot.sendMessage(chatId, "O‘zgartirish uchun ishlash kerak, bomj 😄");
  }

  
  else if (text === "Menu 😜") {
    const kuting = await bot.sendMessage(chatId, "Iltimos, kuting...");
    setTimeout(async () => {
      try {
        await bot.deleteMessage(chatId, kuting.message_id);
        const photoPath = fs.existsSync(menuPhoto) ? menuPhoto : "./m5.jpg";
        await bot.sendPhoto(chatId, photoPath, {
          caption: "🍽 Qaysini buyurtma qilasiz?",
          reply_markup: {
            keyboard: [
              [{ text: "Manti" }, { text: "Karam" }],
              [{ text: "Shashlik" }, { text: "Hotdog" }],
              [{ text: "Orqaga 🔙" }],
            ],
            resize_keyboard: true,
          },
        });
      } catch (err) {
        console.error("Xatolik:", err);
      }
    }, 1000);
  }

  
  else if (["Manti", "Karam", "Shashlik", "Hotdog"].includes(text)) {
    await bot.sendMessage(chatId, "Yeyish uchun ishlash kerak, bo‘mij 😄");
  }

  
  else if (text === "Orqaga 🔙") {
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
});


bot.on("callback_query", async (query) => {
  const data = query.data;
  const chatId = query.message.chat.id;

  if (data === "info") {
    await bot.sendMessage(chatId, "BMW M5 F90 — 4.4L Twin-Turbo V8, 600hp, 0-100km/h 3.4s ⚡️");
  } 
  else if (data === "photos") {
    await bot.sendPhoto(chatId, "./m5.jpg", { caption: "BMW M5 F90 rasmi 😎" });
  } 
  else if (data === "price") {
    await bot.sendMessage(chatId, "💰 Narxi: 100,000 dollar", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Sotib ol", callback_data: "buy" }],
        ],
      },
    });
  } 
  else if (data === "buy") {
    await bot.sendMessage(chatId, "💸 Puling busa kel 😄");
  }

  await bot.answerCallbackQuery(query.id);
});

console.log("✅ Bot ishga tushdi...");

