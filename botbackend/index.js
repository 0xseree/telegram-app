const express = require("express");
const cors = require("cors");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const { ethers } = require("ethers");
const { InitData, validateInitData } = require("@telegram-apps/init-data-node");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Middleware
app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, "Welcome to the Seree Mini App 😁", {
    reply_markup: {
      keyboard: [
        [
          {
            text: "🚀 Launch Mini App",
            web_app: { url: "https://87e0-89-116-154-84.ngrok-free.app" },
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

// Endpoint to verify and provide user data
app.post("/api/auth", async (req, res) => {
  const { initData } = req.body;

  if (!initData) {
    return res.status(400).json({ error: "Missing init data" });
  }

  console.log("Received init data:", initData);

  try {
    const parsedInitData = new InitData(initData);

    const isValid = await validateInitData(parsedInitData, BOT_TOKEN);

    if (!isValid) {
      console.log("Invalid init data");
      return res.status(403).json({ error: "Invalid authentication" });
    }

    console.log("Valid init data");

    const user = parsedInitData.user;

    try {
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
          language_code: user.language_code,
          bio: additionalUserData.bio,
          profile_photos: additionalUserData.photo,
        },
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      return res.json({
        authenticated: true,
        user: {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          language_code: user.language_code,
        },
      });
    }
  } catch (error) {
    console.error("Error processing init data:", error);
    return res.status(400).json({ error: "Invalid init data" });
  }
});

// Endpoint to get balance
app.get("/api/getBalance", async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.SCROLL_RPC_URL);
    console.log("Provider connected");
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Private key is not defined");
    }
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractAddress = process.env.SETB_CONTRACT_ADDRESS;

    if (!contractAddress) {
      throw new Error("Contract address is not defined");
    }

    const abi = ["function balanceOf(address owner) view returns (uint256)"];

    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const balance = await contract.balanceOf(wallet.address);
    console.log("Balance:", ethers.formatUnits(balance, 18));

    res.setHeader("Content-Type", "application/json");
    res.json({ balance: ethers.formatUnits(balance, 10) });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ error: "Error fetching balance" });
  }
});

app.post("/transfer", async (req, res) => {
  const { amount } = req.body;
  const receiverAddress = "0xa25347e4fd683dA05C849760b753a4014265254e";

  try {
    const provider = new ethers.JsonRpcProvider(
      process.env.SCROLL_RPC_URL
    );
    console.log("Provider connected for transfer");
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Private key is not defined");
    }
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractAddress = process.env.SETB_CONTRACT_ADDRESS;

    if (!contractAddress) {
      throw new Error("Contract address is not defined");
    }

    const abi = [
      "function transfer(address to, uint256 amount) public returns (bool)",
    ];

    const contract = new ethers.Contract(contractAddress, abi, wallet);
    const amountInWei = ethers.parseUnits(amount.toString(), 10);
    const tx = await contract.transfer(receiverAddress, amountInWei);
    await tx.wait();

    res.json({ success: true, transactionHash: tx.hash });
  } catch (error) {
    console.error("Error processing transfer:", error);
    res.status(500).json({ error: "Error processing transfer" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
