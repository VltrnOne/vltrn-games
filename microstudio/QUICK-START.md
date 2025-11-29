# 🚀 Quick Start Guide - VLTRN Game Studio

## 5-Minute Setup

### Step 1: Install Dependencies

```bash
cd microstudio/server
npm install
```

### Step 2: Configure AI API Key

Create `.env` file in `microstudio/server/`:

```bash
AI_API_KEY=sk-your-openai-key-here
AI_PROVIDER=openai
PORT=8080
```

**Get API Key:**
- OpenAI: https://platform.openai.com/api-keys
- Anthropic: https://console.anthropic.com/

### Step 3: Start Server

**Option A: Use startup script**
```bash
cd microstudio
./start-server.sh
```

**Option B: Manual start**
```bash
cd microstudio/server
npm start
```

### Step 4: Access

Open browser: `http://localhost:8080`

---

## ✅ Verify Setup

1. **Server Running**: Should see "Server started" message
2. **AI Agent**: Click 🤖 button in code editor
3. **Test AI**: Try generating code with a prompt

---

## 🎨 Customization

### Change Branding

Edit `microstudio/config.json`:
```json
{
  "custom_branding": {
    "name": "VLTRN Game Studio",
    "primary_color": "#667eea",
    "secondary_color": "#764ba2"
  }
}
```

### Update Logo

Replace `microstudio/static/img/microstudiologo.svg` with your logo

---

## 🐛 Troubleshooting

### Server Won't Start
- Check Node.js version: `node --version` (need 16+)
- Check port 8080 is available
- Check `.env` file exists

### AI Agent Not Working
- Verify `AI_API_KEY` in `.env`
- Check API key is valid
- Check internet connection
- Review server logs for errors

### Branding Not Applied
- Clear browser cache
- Check CSS file loads
- Verify config.json is correct

---

## 📚 Next Steps

- [Full Setup Guide](SETUP-SELF-HOSTED.md)
- [AI Agent Documentation](server/ai-agent.js)
- [Branding Guide](static/css/vltrn-branding.css)

---

**Ready to create games! 🎮**

