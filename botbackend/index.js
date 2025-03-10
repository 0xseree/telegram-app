const express = require("express");
const cors = require("cors");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const { Markup } = require("telegraf");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Middleware
app.use(cors());
app.use(express.json());

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Welcome to the Seree Mini App 😁", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "🚀 Launch Mini App",
            web_app: { url: "https://3b3e-102-90-81-90.ngrok-free.app" },
          },
        ],
      ],
      resize_keyboard: true,
    },
  });
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  console.log(`Received message: ${message}`);
});

// Verify Telegram data
function verifyTelegramWebAppData(telegramInitData) {
  const initData = new URLSearchParams(telegramInitData);
  const hash = initData.get("hash");
  initData.delete("hash");

  const dataCheckString = Array.from(initData.entries())
    .sort()
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(BOT_TOKEN)
    .digest();

  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  return calculatedHash === hash;
}

// Endpoint to verify and provide user data
app.post("/api/auth", async (req, res) => {
  const { initData } = req.body;

  if (!initData) {
    return res.status(400).json({ error: "Missing init data" });
  }

  // Verify the data comes from Telegram
  if (!verifyTelegramWebAppData(initData)) {
    return res.status(403).json({ error: "Invalid authentication" });
  }

  // Extract user info from init data
  const parsedInitData = Object.fromEntries(new URLSearchParams(initData));
  const user = JSON.parse(parsedInitData.user);

  // Get additional user data using Telegram Bot API if needed
  try {
    // You can fetch more user details if needed
    const response = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getChat?chat_id=${user.id}`
    );
    const additionalUserData = response.data.result;

    return res.json({
      authenticated: true,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        photo_url: user.photo_url,
        // Add any additional fields from the getChat response
        bio: additionalUserData.bio,
        profile_photos: additionalUserData.photo,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Return basic data even if additional fetch fails
    return res.json({
      authenticated: true,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        photo_url: user.photo_url,
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
