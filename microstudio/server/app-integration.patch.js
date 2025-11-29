/**
 * Integration Patch for microStudio Server
 * 
 * Add this code to server/webapp.js or server/app.js
 * to integrate the AI code agent
 */

// Add after other route definitions, before app.listen:

// AI Code Agent Routes
const aiAgent = require('./ai-agent');
app.use('/api/ai/code', aiAgent);

// Load AI configuration
const configPath = require('path').join(__dirname, '../config.json');
let aiConfig = {};
try {
  aiConfig = require(configPath).ai_code_agent || {};
} catch (e) {
  console.warn('Could not load AI config from config.json');
}

// Set environment variables if not already set
if (!process.env.AI_API_KEY && aiConfig.api_key) {
  process.env.AI_API_KEY = aiConfig.api_key;
}

if (!process.env.AI_PROVIDER && aiConfig.provider) {
  process.env.AI_PROVIDER = aiConfig.provider;
}

console.log('AI Code Agent initialized:', {
  enabled: aiConfig.enabled !== false,
  provider: process.env.AI_PROVIDER || 'openai'
});
