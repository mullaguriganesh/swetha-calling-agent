# 🎙️ Swetha — AI Personal Calling Assistant

![Swetha](https://img.shields.io/badge/Swetha-AI%20Calling%20Agent-ff6b35?style=for-the-badge&logo=twilio&logoColor=white)

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)

![Groq](https://img.shields.io/badge/Groq-Llama%203.3-f55036?style=for-the-badge)

![Twilio](https://img.shields.io/badge/Twilio-Voice-F22F46?style=for-the-badge&logo=twilio&logoColor=white)

![Made in India](https://img.shields.io/badge/Made%20in-India%20🇮🇳-orange?style=for-the-badge)

> Swetha is an AI-powered multilingual personal phone receptionist built using Node.js, Twilio, Groq Llama 3.3, and Google TTS.  
> She can answer calls, talk naturally in Indian languages, take messages, and transfer urgent calls automatically.

---

# ✨ Features

- 🎙️ Natural Indian female AI voice
- 🌐 Supports 10 Indian languages
- 🤖 AI conversation using Groq Llama 3.3 70B
- 📞 Smart incoming call handling
- 🔄 Urgent call transfer to owner
- 📝 Message taking system
- 🔇 Silence handling
- ⚡ Ultra-fast AI responses
- 📱 Built entirely on Android using Termux

---

# 🌐 Supported Languages

| Language | Voice |
|---|---|
| 🇮🇳 Hindi | Google.hi-IN-Wavenet-A |
| 🇮🇳 Tamil | Google.ta-IN-Wavenet-A |
| 🇮🇳 Telugu | Google.te-IN-Standard-A |
| 🇮🇳 Kannada | Google.kn-IN-Wavenet-A |
| 🇮🇳 Malayalam | Google.ml-IN-Wavenet-A |
| 🇮🇳 Bengali | Google.bn-IN-Wavenet-A |
| 🇮🇳 Gujarati | Google.gu-IN-Wavenet-A |
| 🇮🇳 Marathi | Google.mr-IN-Wavenet-A |
| 🇮🇳 Punjabi | Google.pa-IN-Standard-A |
| 🇮🇳 English | Polly.Aditi |

---

# 🧠 How It Works

```text
Incoming Call
     ↓
Twilio Voice Webhook
     ↓
Node.js Server
     ↓
Speech-to-Text
     ↓
Language Detection
     ↓
Groq Llama 3.3
     ↓
Google TTS / Polly
     ↓
Voice Response to Caller
```

---

# 🛠️ Tech Stack

- Node.js
- Express.js
- Twilio Voice API
- Groq Llama 3.3
- Google Text-to-Speech
- Amazon Polly
- Termux
- Ngrok / Cloudflare Tunnel

---

# 📂 Project Structure

```text
swetha-calling-agent/
│
├── routes/
├── services/
├── utils/
├── audio/
├── server.js
├── package.json
├── .env
└── README.md
```

---

# 🚀 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/swetha-calling-agent.git

cd swetha-calling-agent
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create `.env`

```env
PORT=3000

TWILIO_ACCOUNT_SID=

TWILIO_AUTH_TOKEN=

TWILIO_PHONE_NUMBER=

GROQ_API_KEY=

GOOGLE_APPLICATION_CREDENTIALS=

OWNER_PHONE_NUMBER=
```

---

## 4️⃣ Start Server

```bash
npm start
```

---

# ☎️ Twilio Setup

1. Buy a Twilio phone number

2. Configure incoming voice webhook

```text
https://your-ngrok-url.ngrok-free.app/voice
```

3. Enable incoming voice calls

---

# 📱 Running on Android (Termux)

## Install Packages

```bash
pkg update && pkg upgrade

pkg install nodejs git
```

---

## Clone and Run

```bash
git clone https://github.com/yourusername/swetha-calling-agent.git

cd swetha-calling-agent

npm install

npm start
```

---

# 🔥 Example Use Cases

- Personal AI receptionist
- Spam call filtering
- Business inquiry handling
- Smart call forwarding
- Multilingual customer interaction
- AI assistant experimentation

---

# ⚠️ Current Limitations

- Requires internet connection
- Voice latency depends on API speed
- Limited conversational memory
- Not fully offline yet
- Works best with stable network

---

# 🛣️ Roadmap

- [x] AI call answering
- [x] Multi-language support
- [x] Groq integration
- [x] Twilio voice support
- [ ] WhatsApp integration
- [ ] Offline AI mode
- [ ] Android automation
- [ ] Wake word support
- [ ] Real-time voice streaming

---

# 📸 Demo

## Incoming AI Call
Coming Soon

## Terminal Preview
Coming Soon

## Demo Video
Coming Soon

---

# 🤝 Contributions

Pull requests, suggestions, and improvements are welcome.

---

# 📄 License

MIT License

---

# ❤️ Credits

Built by Ganesh Mullaguri using open-source AI technologies and cloud voice APIs.

---

# ⭐ Support

If you like this project, give it a star on GitHub ⭐
