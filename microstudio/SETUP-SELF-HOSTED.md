# 🚀 Self-Hosted microStudio Setup Guide

## Overview

This guide covers setting up microStudio for self-hosting on vltrngames.com with custom branding and AI code agent integration.

---

## 📋 Prerequisites

- Node.js 16+ installed
- npm or yarn package manager
- Server with Node.js support (or local development)
- AI API key (OpenAI or Anthropic)

---

## 🔧 Installation Steps

### Step 1: Install Dependencies

```bash
cd microstudio/server
npm install
```

### Step 2: Configure microStudio

Edit `microstudio/config.json`:

```json
{
  "realm": "production",
  "dev_domain": "https://vltrngames.com",
  "run_domain": "https://vltrngames.com",
  "default_project_language": "microscript_v2"
}
```

### Step 3: Set Environment Variables

Create `.env` file in `microstudio/server/`:

```bash
# AI API Configuration
AI_API_KEY=your_openai_api_key_here
AI_PROVIDER=openai  # or 'anthropic'

# Server Configuration
PORT=8080
NODE_ENV=production
```

### Step 4: Integrate AI Agent

The AI agent is already integrated. Make sure the server includes it:

```javascript
// In server/app.js, add:
const aiAgent = require('./ai-agent');
app.use('/api/ai/code', aiAgent);
```

### Step 5: Add AI UI to microStudio

Copy `static/js/ai-agent-ui.js` to microStudio's static directory and include it in templates:

```pug
// In templates/code.pug, add before closing body:
script(src="/js/ai-agent-ui.js")
```

### Step 6: Start Server

```bash
cd microstudio/server
npm start
```

Or for development:

```bash
npm run dev
```

---

## 🎨 Custom Branding

### Update Templates

Edit `microstudio/templates/home.pug` and other templates to replace:

- `microStudio` → `VLTRN Game Studio`
- Logo paths → Your logo paths
- Colors → Your brand colors (#667eea, #764ba2)

### Custom CSS

Create `microstudio/static/css/vltrn-branding.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --accent-color: #f093fb;
}

/* Override microStudio default styles */
.header {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}
```

Include in templates:

```pug
link(rel="stylesheet" href="/css/vltrn-branding.css")
```

---

## 🤖 AI Code Agent Setup

### OpenAI Setup

1. Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Set in `.env`: `AI_API_KEY=sk-...`
3. Set provider: `AI_PROVIDER=openai`

### Anthropic Setup

1. Get API key from [Anthropic Console](https://console.anthropic.com/)
2. Set in `.env`: `AI_API_KEY=sk-ant-...`
3. Set provider: `AI_PROVIDER=anthropic`

### Test AI Agent

```bash
curl -X POST http://localhost:8080/api/ai/code/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Create a player sprite that moves with arrow keys",
    "language": "microscript_v2"
  }'
```

---

## 🌐 Deployment Options

### Option 1: VPS/Cloud Server

1. Clone repository to server
2. Install Node.js
3. Set up PM2 or similar process manager
4. Configure reverse proxy (nginx)
5. Set up SSL certificate

### Option 2: GitHub Actions + Server

1. Set up GitHub Actions workflow
2. Deploy to server on push
3. Use server for Node.js hosting

### Option 3: Docker

Create `Dockerfile`:

```dockerfile
FROM node:18
WORKDIR /app
COPY microstudio/server/package*.json ./
RUN npm install
COPY microstudio/ ./
EXPOSE 8080
CMD ["node", "server/app.js"]
```

---

## 🔐 Security Considerations

### API Key Security

- Never commit API keys to repository
- Use environment variables
- Rotate keys regularly
- Set usage limits on API provider

### Rate Limiting

Add rate limiting to AI endpoints:

```javascript
const rateLimit = require('express-rate-limit');

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50 // limit each IP to 50 requests per windowMs
});

app.use('/api/ai/code', aiLimiter);
```

### Input Validation

- Validate all user inputs
- Sanitize code before sending to AI
- Limit prompt length
- Check for malicious content

---

## 📊 Monitoring

### Logging

Set up logging for AI requests:

```javascript
app.use('/api/ai/code', (req, res, next) => {
  console.log(`AI Request: ${req.method} ${req.path}`, {
    timestamp: new Date(),
    ip: req.ip,
    language: req.body.language
  });
  next();
});
```

### Analytics

Track usage:
- Number of AI requests
- Success/failure rates
- Average response time
- Most used features

---

## 🐛 Troubleshooting

### AI Agent Not Working

1. Check API key is set correctly
2. Verify API endpoint is accessible
3. Check server logs for errors
4. Test API key directly with curl

### microStudio Not Loading

1. Check server is running
2. Verify port is correct
3. Check firewall settings
4. Review server logs

### Branding Not Applied

1. Clear browser cache
2. Check CSS file paths
3. Verify template includes CSS
4. Check for CSS conflicts

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] Dependencies installed
- [ ] Configuration file created
- [ ] Environment variables set
- [ ] AI API key configured
- [ ] Server starts successfully
- [ ] microStudio loads correctly
- [ ] AI agent UI appears
- [ ] AI code generation works
- [ ] Custom branding applied
- [ ] Security measures in place

---

## 📚 Additional Resources

- [microStudio GitHub](https://github.com/pmgl/microstudio)
- [microStudio Documentation](https://microstudio.dev/doc/)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [Anthropic API Docs](https://docs.anthropic.com/)

---

**φ = 1.618033988749... ✨**

