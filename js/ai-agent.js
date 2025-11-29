/**
 * VLTRN AI Agent - Site-Wide Assistant
 * Provides AI assistance for game development, customization, building, and more
 */

class VLTRNAIAgent {
    constructor() {
        this.isOpen = false;
        this.currentContext = null;
        this.conversationHistory = [];
        this.apiEndpoint = '/api/ai/assistant';
        this.init();
    }

    init() {
        this.createUI();
        this.attachEventListeners();
        this.detectContext();
    }

    createUI() {
        // Create AI Agent button (floating)
        const button = document.createElement('button');
        button.id = 'ai-agent-button';
        button.className = 'ai-agent-button';
        button.innerHTML = '<img src="/img/icons/vltrn bot icon48.png" alt="AI" style="width: 100%; height: 100%; object-fit: contain;">';
        button.title = 'VLTRN AI Assistant - Click for help';
        button.onclick = () => this.toggle();
        document.body.appendChild(button);

        // Create AI Agent panel
        const panel = document.createElement('div');
        panel.id = 'ai-agent-panel';
        panel.className = 'ai-agent-panel';
        panel.innerHTML = `
            <div class="ai-agent-header">
                <div class="ai-agent-title">
                    <span class="ai-icon">🤖</span>
                    <span>VLTRN AI Assistant</span>
                </div>
                <button class="ai-agent-close" onclick="window.aiAgent.toggle()">×</button>
            </div>
            <div class="ai-agent-content">
                <div class="ai-context-info" id="aiContextInfo">
                    <span class="context-label">Context:</span>
                    <span class="context-value" id="contextValue">Detecting...</span>
                </div>
                
                <div class="ai-conversation" id="aiConversation">
                    <div class="ai-message ai-system">
                        <div class="message-content">
                            <strong>VLTRN AI Assistant</strong><br>
                            I can help you build, customize, create, adjust, or modify anything on this site!<br><br>
                            <strong>What I can do:</strong><br>
                            • Create or modify games<br>
                            • Customize game parameters<br>
                            • Write code (Pascal, JavaScript, etc.)<br>
                            • Build new features<br>
                            • Fix bugs or errors<br>
                            • Explain concepts<br>
                            • Generate assets<br><br>
                            Just tell me what you want to do!
                        </div>
                    </div>
                </div>
                
                <div class="ai-input-area">
                    <div class="ai-quick-actions">
                        <button class="quick-action" onclick="window.aiAgent.quickAction('create')">Create Game</button>
                        <button class="quick-action" onclick="window.aiAgent.quickAction('customize')">Customize</button>
                        <button class="quick-action" onclick="window.aiAgent.quickAction('build')">Build Feature</button>
                        <button class="quick-action" onclick="window.aiAgent.quickAction('code')">Write Code</button>
                    </div>
                    <div class="ai-input-wrapper">
                        <textarea 
                            id="aiInput" 
                            placeholder="What would you like to create, build, customize, or modify?"
                            rows="3"
                        ></textarea>
                        <button class="ai-send-btn" onclick="window.aiAgent.sendMessage()">
                            <span>Send</span>
                            <span class="send-icon">→</span>
                        </button>
                    </div>
                </div>
                
                <div class="ai-loading hidden" id="aiLoading">
                    <div class="ai-spinner"></div>
                    <span>AI is thinking...</span>
                </div>
            </div>
        `;
        document.body.appendChild(panel);
        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .ai-agent-button {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 1.8em;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
                z-index: 10000;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .ai-agent-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 30px rgba(102, 126, 234, 0.6);
            }
            
            .ai-agent-panel {
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 450px;
                max-height: 600px;
                background: white;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
                z-index: 10001;
                display: none;
                flex-direction: column;
                overflow: hidden;
            }
            
            .ai-agent-panel.open {
                display: flex;
            }
            
            .ai-agent-header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .ai-agent-title {
                display: flex;
                align-items: center;
                gap: 10px;
                font-weight: 600;
                font-size: 1.1em;
            }
            
            .ai-agent-close {
                background: rgba(255, 255, 255, 0.2);
                border: none;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.5em;
                line-height: 1;
                transition: background 0.2s;
            }
            
            .ai-agent-close:hover {
                background: rgba(255, 255, 255, 0.3);
            }
            
            .ai-agent-content {
                flex: 1;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }
            
            .ai-context-info {
                padding: 10px 20px;
                background: #f8f9fa;
                border-bottom: 1px solid #e9ecef;
                font-size: 0.85em;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .context-label {
                font-weight: 600;
                color: #666;
            }
            
            .context-value {
                color: #667eea;
                font-weight: 600;
            }
            
            .ai-conversation {
                flex: 1;
                overflow-y: auto;
                padding: 20px;
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .ai-message {
                padding: 12px 15px;
                border-radius: 10px;
                max-width: 85%;
                word-wrap: break-word;
            }
            
            .ai-message.ai-user {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                align-self: flex-end;
                margin-left: auto;
            }
            
            .ai-message.ai-assistant {
                background: #f0f0f0;
                color: #333;
                align-self: flex-start;
            }
            
            .ai-message.ai-system {
                background: #e7f3ff;
                color: #667eea;
                align-self: center;
                text-align: center;
                max-width: 100%;
            }
            
            .message-content {
                line-height: 1.5;
            }
            
            .ai-input-area {
                border-top: 2px solid #e9ecef;
                padding: 15px;
                background: #f8f9fa;
            }
            
            .ai-quick-actions {
                display: flex;
                gap: 8px;
                margin-bottom: 10px;
                flex-wrap: wrap;
            }
            
            .quick-action {
                padding: 6px 12px;
                background: white;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 0.85em;
                cursor: pointer;
                transition: all 0.2s;
                color: #667eea;
            }
            
            .quick-action:hover {
                background: #667eea;
                color: white;
                border-color: #667eea;
            }
            
            .ai-input-wrapper {
                display: flex;
                gap: 10px;
                align-items: flex-end;
            }
            
            #aiInput {
                flex: 1;
                padding: 10px;
                border: 2px solid #ddd;
                border-radius: 8px;
                font-size: 0.9em;
                resize: none;
                font-family: inherit;
            }
            
            #aiInput:focus {
                outline: none;
                border-color: #667eea;
            }
            
            .ai-send-btn {
                padding: 10px 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 5px;
                transition: transform 0.2s;
            }
            
            .ai-send-btn:hover {
                transform: translateY(-2px);
            }
            
            .ai-loading {
                padding: 20px;
                text-align: center;
                color: #666;
            }
            
            .ai-loading.hidden {
                display: none;
            }
            
            .ai-spinner {
                border: 3px solid #f3f3f3;
                border-top: 3px solid #667eea;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                animation: spin 1s linear infinite;
                margin: 0 auto 10px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @media (max-width: 768px) {
                .ai-agent-panel {
                    width: calc(100vw - 20px);
                    right: 10px;
                    bottom: 80px;
                    max-height: calc(100vh - 100px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    attachEventListeners() {
        const input = document.getElementById('aiInput');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
    }

    detectContext() {
        const path = window.location.pathname;
        const contextMap = {
            '/': 'Home Page',
            '/robot-lyric/': 'Robot Lyric Game',
            '/liljs-castle/': "Lil J's Castle Game",
            '/golden-castle-suite/': 'Golden Castle Suite',
            '/game-builder/': 'Game Builder Tool',
            '/microstudio/': 'microStudio Editor',
            '/gdevelop-editor/': 'GDevelop Editor'
        };

        this.currentContext = contextMap[path] || 'General Site';
        const contextEl = document.getElementById('contextValue');
        if (contextEl) {
            contextEl.textContent = this.currentContext;
        }
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const panel = document.getElementById('ai-agent-panel');
        if (panel) {
            panel.classList.toggle('open', this.isOpen);
        }
        
        if (this.isOpen) {
            const input = document.getElementById('aiInput');
            if (input) {
                setTimeout(() => input.focus(), 100);
            }
        }
    }

    quickAction(action) {
        const prompts = {
            create: 'Create a new game for me',
            customize: 'Help me customize this game',
            build: 'Build a new feature',
            code: 'Write code for me'
        };
        
        const input = document.getElementById('aiInput');
        if (input) {
            input.value = prompts[action];
            input.focus();
        }
    }

    async sendMessage() {
        const input = document.getElementById('aiInput');
        const message = input?.value.trim();
        
        if (!message) return;

        // Add user message to conversation
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show loading
        this.showLoading(true);
        
        try {
            const response = await this.processRequest(message);
            this.addMessage(response, 'assistant');
        } catch (error) {
            this.addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
            console.error('AI Agent Error:', error);
        } finally {
            this.showLoading(false);
        }
    }

    addMessage(content, type) {
        const conversation = document.getElementById('aiConversation');
        if (!conversation) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-${type}`;
        messageDiv.innerHTML = `<div class="message-content">${this.formatMessage(content)}</div>`;
        
        conversation.appendChild(messageDiv);
        conversation.scrollTop = conversation.scrollHeight;
        
        this.conversationHistory.push({ content, type, timestamp: Date.now() });
    }

    formatMessage(content) {
        // Format code blocks
        content = content.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
        // Format inline code
        content = content.replace(/`([^`]+)`/g, '<code>$1</code>');
        // Format line breaks
        content = content.replace(/\n/g, '<br>');
        return content;
    }

    showLoading(show) {
        const loading = document.getElementById('aiLoading');
        if (loading) {
            loading.classList.toggle('hidden', !show);
        }
    }

    async processRequest(message) {
        // Build context for AI
        const context = {
            currentPage: window.location.pathname,
            pageContext: this.currentContext,
            conversationHistory: this.conversationHistory.slice(-5), // Last 5 messages
            userRequest: message
        };

        try {
            // Try to use backend API if available
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, context })
            });

            if (response.ok) {
                const data = await response.json();
                return data.response || data.message || 'I understand your request.';
            }
        } catch (error) {
            console.log('Using fallback AI processing');
        }

        // Fallback: Process locally with pattern matching
        return this.processLocally(message, context);
    }

    processLocally(message, context) {
        const lowerMessage = message.toLowerCase();
        
        // Pattern matching for common requests
        if (lowerMessage.includes('create') || lowerMessage.includes('make') || lowerMessage.includes('build')) {
            return `I can help you create a new game! Based on your request, I'll help you:
            
1. **Choose a game type** (platformer, shooter, puzzle, etc.)
2. **Set up the project structure**
3. **Write the initial code**
4. **Add game mechanics**

What type of game would you like to create?`;
        }
        
        if (lowerMessage.includes('customize') || lowerMessage.includes('modify') || lowerMessage.includes('change')) {
            return `I can help you customize this game! I can:
            
1. **Adjust game parameters** (speed, colors, difficulty)
2. **Modify game mechanics**
3. **Change visual elements**
4. **Update code**

What specifically would you like to customize?`;
        }
        
        if (lowerMessage.includes('code') || lowerMessage.includes('program') || lowerMessage.includes('script')) {
            return `I can write code for you! I support:
            
• **Pascal** (Castle Engine)
• **JavaScript** (web games)
• **microscript** (microStudio)
• **GDevelop events**

What code would you like me to write?`;
        }
        
        if (lowerMessage.includes('fix') || lowerMessage.includes('error') || lowerMessage.includes('bug')) {
            return `I can help fix issues! Please share:
            
1. **The error message** (if any)
2. **What you were trying to do**
3. **The code** (if relevant)

I'll help you debug and fix it!`;
        }
        
        if (lowerMessage.includes('explain') || lowerMessage.includes('how') || lowerMessage.includes('what')) {
            return `I'd be happy to explain! I can help you understand:
            
• **Game development concepts**
• **Code and programming**
• **Mathematical concepts** (like the golden ratio φ)
• **Game mechanics**

What would you like me to explain?`;
        }
        
        // Default response
        return `I understand you want to: "${message}"

I can help you with:
• Creating games
• Customizing existing games
• Writing code
• Building features
• Fixing issues
• Explaining concepts

Can you provide more details about what you'd like to accomplish?`;
    }
}

// Initialize AI Agent when DOM is ready
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        window.aiAgent = new VLTRNAIAgent();
    });
}

