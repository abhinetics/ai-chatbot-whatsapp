# 🤖 Gemini WhatsApp AI Bot

A 100% free Node.js-based WhatsApp chatbot powered by Google Gemini 2.5 Flash. It can chat naturally, generate AI images, and run 24×7 from your computer or a free cloud server.

## 🚀 Features
💬 Replies to every WhatsApp message like a real human (no prefixes or commands)
🧠 Powered by Gemini 2.5 Flash — fast, intelligent, and multimodal
🖼️ AI Image Generation — just type draw, make, or generate an image
🔐 Private — uses your personal WhatsApp session (never shared online)
⚡ 100% Free — runs with Google’s free Gemini API key
🧩 Works on Windows, macOS, Linux, and Android (via Termux)

## 🧩 Tech Stack
Component | Technology
-----------|-------------
AI Model | Google Gemini 2.5 Flash
Messaging | WhatsApp Web (whatsapp-web.js)
Runtime | Node.js (ESM)
Hosting | Local PC / Oracle Cloud / Termux

## ⚙️ Setup Instructions
1️⃣ Clone the Repository  
git clone https://github.com/yourusername/gemini-whatsapp-ai.git  
cd gemini-whatsapp-ai

2️⃣ Install Dependencies  
npm install

3️⃣ Create a .env File  
Add your Gemini API key:  
GEMINI_API_KEY=your_google_gemini_api_key_here  
You can get it free from https://makersuite.google.com/app/apikey

4️⃣ Run the Bot  
npm start

Scan the QR code shown in the terminal using:  
WhatsApp → Settings → Linked Devices → Link a Device

Once you see:  
[Whatsapp Gemini 2.5] Bot is online and ready to chat!  
✅ Your bot is live!

## 💬 Example Conversations
hey, how are you?  
write a poem about stars  
generate an image of a cyberpunk samurai  
who is the CEO of Google?

## 🧠 How It Works
- Connects to WhatsApp Web through a headless Chromium session  
- Listens for incoming messages in real time  
- Sends the text to Gemini 2.5 Flash via Google’s Generative AI API  
- Replies with text or an AI-generated image directly to WhatsApp

## 🔥 Run 24×7 for Free
🟩 Oracle Cloud Free VM (Forever Free)  
Run the bot permanently using Oracle’s Always Free tier:

sudo apt update && sudo apt install nodejs npm git -y  
git clone https://github.com/yourusername/gemini-whatsapp-ai  
cd gemini-whatsapp-ai && npm install  
npm install -g pm2  
pm2 start npm --name "whatsapp-bot" -- start  
pm2 save

🟨 Termux (Android)  
Install Termux from Play Store or F-Droid, then use the same commands above.  
Perfect for keeping your bot online 24×7 from your phone.

## 📁 Folder Structure
gemini-whatsapp-ai/  
├── src/index.js  
├── .env  
├── package.json  
├── .wwebjs_auth/  
└── README.md

## ⚠️ Notes
- Do not share your QR code or .wwebjs_auth folder — it contains your WhatsApp login  
- Delete .wwebjs_auth if you want to switch to another WhatsApp account  
- For personal or educational use only  
- Use PM2 or a cloud VM for stable 24×7 uptime
