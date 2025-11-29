/**
 * AI Code Agent for VLTRN Game Studio
 * Integrates AI assistance into microStudio code editor
 */

const express = require('express');
const router = express.Router();

// AI Provider configurations
const AI_PROVIDERS = {
  openai: {
    endpoint: 'https://api.openai.com/v1/chat/completions',
    headers: (apiKey) => ({
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    })
  },
  anthropic: {
    endpoint: 'https://api.anthropic.com/v1/messages',
    headers: (apiKey) => ({
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    })
  }
};

/**
 * Generate code using AI
 */
async function generateCode(prompt, context, language, provider = 'openai') {
  const config = require('../config.json');
  const apiKey = process.env.AI_API_KEY || config.ai_code_agent?.api_key;
  
  if (!apiKey) {
    throw new Error('AI API key not configured');
  }

  const providerConfig = AI_PROVIDERS[provider];
  if (!providerConfig) {
    throw new Error(`Unsupported AI provider: ${provider}`);
  }

  // Build system prompt for game development
  const systemPrompt = buildSystemPrompt(language);
  
  // Build user prompt with context
  const userPrompt = buildUserPrompt(prompt, context, language);

  const requestBody = buildRequestBody(provider, systemPrompt, userPrompt);

  try {
    const response = await fetch(providerConfig.endpoint, {
      method: 'POST',
      headers: providerConfig.headers(apiKey),
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`AI API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return extractCode(data, provider);
  } catch (error) {
    console.error('AI Code Generation Error:', error);
    throw error;
  }
}

/**
 * Build system prompt for game development
 */
function buildSystemPrompt(language) {
  const languageDocs = {
    microscript_v2: 'microscript v2 syntax',
    javascript: 'JavaScript/ES6+',
    lua: 'Lua 5.3',
    python: 'Python 3'
  };

  return `You are an expert game development assistant for VLTRN Game Studio. 
You help users create games using ${languageDocs[language] || language}.

Guidelines:
- Write clean, well-commented code
- Use game development best practices
- Follow ${language} conventions
- Create reusable, modular code
- Include helpful comments explaining game logic
- Optimize for performance when possible
- Use microStudio-specific APIs when available

Always provide complete, runnable code examples.`;
}

/**
 * Build user prompt with context
 */
function buildUserPrompt(prompt, context, language) {
  let userPrompt = `Language: ${language}\n\n`;
  
  if (context.currentCode) {
    userPrompt += `Current code:\n\`\`\`${language}\n${context.currentCode}\n\`\`\`\n\n`;
  }
  
  if (context.gameType) {
    userPrompt += `Game type: ${context.gameType}\n\n`;
  }
  
  if (context.features) {
    userPrompt += `Required features: ${context.features.join(', ')}\n\n`;
  }
  
  userPrompt += `User request: ${prompt}`;
  
  return userPrompt;
}

/**
 * Build request body for different providers
 */
function buildRequestBody(provider, systemPrompt, userPrompt) {
  if (provider === 'openai') {
    return {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    };
  } else if (provider === 'anthropic') {
    return {
      model: 'claude-3-opus-20240229',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [
        { role: 'user', content: userPrompt }
      ]
    };
  }
}

/**
 * Extract code from AI response
 */
function extractCode(data, provider) {
  if (provider === 'openai') {
    const content = data.choices[0]?.message?.content || '';
    return extractCodeFromMarkdown(content);
  } else if (provider === 'anthropic') {
    const content = data.content[0]?.text || '';
    return extractCodeFromMarkdown(content);
  }
}

/**
 * Extract code blocks from markdown
 */
function extractCodeFromMarkdown(text) {
  // Try to extract code from markdown code blocks
  const codeBlockRegex = /```(?:\w+)?\n([\s\S]*?)```/g;
  const matches = [...text.matchAll(codeBlockRegex)];
  
  if (matches.length > 0) {
    return matches.map(m => m[1].trim()).join('\n\n');
  }
  
  // If no code blocks, return the text as-is
  return text.trim();
}

/**
 * API endpoint: Generate code
 */
router.post('/generate', async (req, res) => {
  try {
    const { prompt, context, language, provider } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const code = await generateCode(
      prompt,
      context || {},
      language || 'microscript_v2',
      provider || 'openai'
    );
    
    res.json({
      success: true,
      code: code,
      language: language || 'microscript_v2'
    });
  } catch (error) {
    console.error('Code generation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * API endpoint: Explain code
 */
router.post('/explain', async (req, res) => {
  try {
    const { code, language } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Code is required' });
    }
    
    const explanation = await generateCode(
      `Explain this code in detail, including what each part does and how it works:`,
      { currentCode: code },
      language || 'microscript_v2'
    );
    
    res.json({
      success: true,
      explanation: explanation
    });
  } catch (error) {
    console.error('Code explanation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * API endpoint: Fix code
 */
router.post('/fix', async (req, res) => {
  try {
    const { code, error, language } = req.body;
    
    if (!code || !error) {
      return res.status(400).json({ error: 'Code and error are required' });
    }
    
    const fixedCode = await generateCode(
      `Fix this code. The error is: ${error}\n\nProvide the corrected code:`,
      { currentCode: code },
      language || 'microscript_v2'
    );
    
    res.json({
      success: true,
      code: fixedCode
    });
  } catch (error) {
    console.error('Code fix error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

