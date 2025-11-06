// src/index.js
import "dotenv/config";
import process from "process";
import qrcode from "qrcode-terminal";
import whatsappPkg from "whatsapp-web.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const { Client, MessageMedia, LocalAuth } = whatsappPkg;

// ✅ Gemini 2.5 Flash
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// === WhatsApp Client ===
const client = new Client({
  puppeteer: {
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth({ clientId: "bot-session" }),
});

const start = async () => {
  client.on("qr", (qr) => {
    console.log("[Whatsapp Gemini 2.5] Scan this QR code in WhatsApp to log in:");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => {
    console.log("[Whatsapp Gemini 2.5] Bot is online and ready to chat!");
  });

  client.on("message", async (message) => {
    // Ignore empty messages and status updates
    if (!message.body || message.from === "status@broadcast") return;

    // Avoid infinite loop (bot replying to itself)
    if (message.fromMe) return;

    const userMessage = message.body.trim();
    console.log(`[User ${message.from}] ${userMessage}`);

    // Determine if it's an image generation request
    if (/make|draw|generate.*image|show me|create.*picture/i.test(userMessage)) {
      await handleImage(message, userMessage);
    } else {
      await handleText(message, userMessage);
    }
  });

  client.initialize();
};

// === Text Reply ===
const handleText = async (message, prompt) => {
  try {
    await message.reply("_thinking..._");

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    console.log(`[Gemini Reply to ${message.from}]: ${reply}`);
    await message.reply(reply);
  } catch (err) {
    console.error("Error generating reply:", err);
    await message.reply("Sorry, I couldn't process that message.");
  }
};

// === Image Reply ===
const handleImage = async (message, prompt) => {
  try {
    await message.reply("_creating image..._");

    const result = await model.generateContent([
      { role: "user", parts: [{ text: `Generate an image of: ${prompt}` }] },
    ]);

    const imagePart = result.response.candidates?.[0]?.content?.parts?.find(
      (p) => p.inlineData
    );
    if (!imagePart) throw new Error("No image data received from Gemini");

    const base64 = imagePart.inlineData.data;
    const image = new MessageMedia("image/png", base64, "gemini.png");
    await message.reply(image);
  } catch (err) {
    console.error("Error creating image:", err);
    await message.reply("Couldn't generate the image right now.");
  }
};

start();
