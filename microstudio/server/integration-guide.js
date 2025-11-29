/**
 * Integration Guide for AI Agent in microStudio Server
 * 
 * Add this to your server/app.js file:
 */

// At the top with other requires:
const aiAgent = require('./ai-agent');

// In your Express app setup, add the AI routes:
app.use('/api/ai/code', aiAgent);

// Make sure to load config:
const config = require('../config.json');

// Set up environment variables:
process.env.AI_API_KEY = process.env.AI_API_KEY || config.ai_code_agent?.api_key;
process.env.AI_PROVIDER = process.env.AI_PROVIDER || config.ai_code_agent?.provider || 'openai';

