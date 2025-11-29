# 🎮 VLTRN Game Studio

**Self-hosted microStudio with AI Code Agent**

VLTRN Game Studio is a customized version of microStudio, rebranded for vltrngames.com with integrated AI code generation capabilities.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- AI API key (OpenAI or Anthropic)

### Installation

```bash
# Install dependencies
cd microstudio/server
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your AI_API_KEY

# Start server
npm start
```

### Access
- Development: `http://localhost:8080`
- Production: `https://vltrngames.com/microstudio/`

---

## 🤖 AI Code Agent

### Features
- **Generate Code**: Create game code from natural language prompts
- **Explain Code**: Get detailed explanations of code functionality
- **Fix Code**: Automatically fix errors and bugs

### Usage

1. **Open AI Assistant**: Click the 🤖 button in the code editor
2. **Choose Mode**: 
   - Generate Code
   - Explain Code
   - Fix Code
3. **Enter Prompt**: Describe what you want
4. **Get Code**: AI generates code for you
5. **Insert**: Click "Insert" to add to your project

### Supported Languages
- microscript v2 (recommended)
- JavaScript
- Lua
- Python

---

## 🎨 Custom Branding

### Brand Colors
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Deep Purple)
- Accent: `#f093fb` (Pink)

### Brand Name
- **VLTRN Game Studio** (replaces "microStudio")

### Logo
- Replace `/img/microstudiologo.svg` with `/img/vltrn-logo.svg`

---

## 📁 Project Structure

```
microstudio/
├── config.json              # Configuration
├── server/
│   ├── ai-agent.js         # AI code agent backend
│   ├── app.js              # Main server file
│   └── package.json        # Dependencies
├── static/
│   ├── css/
│   │   └── vltrn-branding.css  # Custom styles
│   └── js/
│       └── ai-agent-ui.js      # AI UI frontend
└── templates/
    └── branding-override.pug   # Branding template
```

---

## 🔧 Configuration

### config.json

```json
{
  "realm": "production",
  "dev_domain": "https://vltrngames.com",
  "run_domain": "https://vltrngames.com",
  "default_project_language": "microscript_v2",
  "custom_branding": {
    "name": "VLTRN Game Studio",
    "primary_color": "#667eea",
    "secondary_color": "#764ba2"
  },
  "ai_code_agent": {
    "enabled": true,
    "provider": "openai",
    "model": "gpt-4"
  }
}
```

### Environment Variables

```bash
AI_API_KEY=your_api_key_here
AI_PROVIDER=openai  # or 'anthropic'
PORT=8080
NODE_ENV=production
```

---

## 🛠️ Development

### Local Development

```bash
npm run dev
```

This will:
- Compile CoffeeScript files
- Watch for changes
- Auto-reload server

### Building

```bash
npm run compile
```

---

## 📚 Documentation

- [Self-Hosted Setup Guide](SETUP-SELF-HOSTED.md)
- [microStudio Original Docs](https://microstudio.dev/doc/)
- [AI Agent API Documentation](server/ai-agent.js)

---

## 🔐 Security

- API keys stored in environment variables
- Rate limiting on AI endpoints
- Input validation and sanitization
- HTTPS required in production

---

## 📊 Features

### Game Development
- ✅ Code editor with syntax highlighting
- ✅ Sprite editor
- ✅ Map editor
- ✅ Sound editor
- ✅ Music editor
- ✅ Physics engines
- ✅ 3D support

### AI Features
- ✅ Code generation from prompts
- ✅ Code explanation
- ✅ Error fixing
- ✅ Context-aware suggestions

### Custom Features
- ✅ VLTRN branding
- ✅ Custom color scheme
- ✅ Integrated AI assistant
- ✅ Fibonacci theme elements

---

## 🌐 Deployment

### GitHub Pages (Current)
- Uses embedded microStudio.dev
- No server needed
- Limited customization

### Self-Hosted (Recommended)
- Full control
- Custom branding
- AI agent enabled
- Requires Node.js server

---

## 🤝 Contributing

This is a customized version of microStudio. For contributions to the original project, visit:
https://github.com/pmgl/microstudio

---

## 📝 License

microStudio is MIT licensed. See LICENSE.txt in the microStudio repository.

---

## 🙏 Credits

- **microStudio**: Original game engine by pmgl
- **VLTRN Games**: Customization and AI integration
- **OpenAI/Anthropic**: AI code generation

---

**φ = 1.618033988749... ✨**

**Where Mathematics Meets Magic**

