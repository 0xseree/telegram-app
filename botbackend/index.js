const express = require("express");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const { ethers } = require("ethers");
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

  bot.sendMessage(
    chatId,
    msg.chat.first_name + " Welcome to the Seree Mini App 😁",
    {
      reply_markup: {
        keyboard: [
          [
            {
              text: "🚀 Launch Mini App",
              web_app: { url: "https://telegram-app-o4q8.onrender.com" },
            },
          ],
        ],
        resize_keyboard: true,
      },
    }
  );
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  console.log(`Received message: ${message}`);
});

// Endpoint to get balance
app.get("/api/getBalance", async (req, res) => {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.SCROLL_RPC_URL);
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

    res.setHeader("Content-Type", "application/json");
    res.json({ balance: balance.toString() });
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ error: "Error fetching balance" });
  }
});

app.post("/transfer", async (req, res) => {
  const { amount } = req.body;
  const receiverAddress = "0xa25347e4fd683dA05C849760b753a4014265254e";

  try {
    const provider = new ethers.JsonRpcProvider(process.env.SCROLL_RPC_URL);
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
    const amountInWei = ethers.parseUnits(amount.toString(), 8);
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
