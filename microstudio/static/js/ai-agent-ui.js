/**
 * AI Code Agent UI for VLTRN Game Studio
 * Provides UI for interacting with AI code generation
 */

class AIAgentUI {
  constructor() {
    this.isOpen = false;
    this.currentLanguage = 'microscript_v2';
    this.init();
  }

  init() {
    this.createUI();
    this.attachEventListeners();
  }

  createUI() {
    // Create AI Agent panel
    const panel = document.createElement('div');
    panel.id = 'ai-agent-panel';
    panel.className = 'ai-agent-panel';
    panel.innerHTML = `
      <div class="ai-agent-header">
        <div class="ai-agent-title">
          <span class="ai-icon">🤖</span>
          <span>VLTRN AI Code Assistant</span>
        </div>
        <button class="ai-agent-close" onclick="aiAgentUI.toggle()">×</button>
      </div>
      <div class="ai-agent-content">
        <div class="ai-agent-tabs">
          <button class="ai-tab active" data-tab="generate">Generate Code</button>
          <button class="ai-tab" data-tab="explain">Explain Code</button>
          <button class="ai-tab" data-tab="fix">Fix Code</button>
        </div>
        
        <div class="ai-agent-tab-content" id="ai-tab-generate">
          <div class="ai-prompt-section">
            <label>What would you like to create?</label>
            <textarea 
              id="ai-prompt-input" 
              placeholder="e.g., Create a player that moves with arrow keys and jumps with spacebar"
              rows="4"
            ></textarea>
            <div class="ai-context-options">
              <label>
                <input type="checkbox" id="ai-include-context"> Include current code context
              </label>
              <label>
                <input type="checkbox" id="ai-include-game-type"> Include game type info
              </label>
            </div>
            <button class="ai-generate-btn" onclick="aiAgentUI.generateCode()">
              <span class="ai-btn-icon">✨</span>
              Generate Code
            </button>
          </div>
        </div>
        
        <div class="ai-agent-tab-content hidden" id="ai-tab-explain">
          <div class="ai-prompt-section">
            <label>Select code to explain:</label>
            <textarea 
              id="ai-explain-input" 
              placeholder="Paste code here or it will use selected code from editor"
              rows="6"
            ></textarea>
            <button class="ai-generate-btn" onclick="aiAgentUI.explainCode()">
              <span class="ai-btn-icon">💡</span>
              Explain Code
            </button>
          </div>
        </div>
        
        <div class="ai-agent-tab-content hidden" id="ai-tab-fix">
          <div class="ai-prompt-section">
            <label>Error message:</label>
            <textarea 
              id="ai-error-input" 
              placeholder="Paste the error message here"
              rows="3"
            ></textarea>
            <label>Code to fix:</label>
            <textarea 
              id="ai-fix-code-input" 
              placeholder="Paste code here or it will use selected code from editor"
              rows="6"
            ></textarea>
            <button class="ai-generate-btn" onclick="aiAgentUI.fixCode()">
              <span class="ai-btn-icon">🔧</span>
              Fix Code
            </button>
          </div>
        </div>
        
        <div class="ai-agent-result" id="ai-result">
          <div class="ai-result-header">
            <span>Generated Code</span>
            <div class="ai-result-actions">
              <button onclick="aiAgentUI.insertCode()">Insert</button>
              <button onclick="aiAgentUI.copyCode()">Copy</button>
            </div>
          </div>
          <pre id="ai-result-code"><code></code></pre>
          <div class="ai-loading hidden" id="ai-loading">
            <div class="ai-spinner"></div>
            <span>AI is thinking...</span>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(panel);
    this.injectStyles();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .ai-agent-panel {
        position: fixed;
        right: -400px;
        top: 0;
        width: 400px;
        height: 100vh;
        background: #252526;
        border-left: 2px solid #667eea;
        z-index: 10000;
        transition: right 0.3s ease;
        display: flex;
        flex-direction: column;
        box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
      }
      
      .ai-agent-panel.open {
        right: 0;
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
      
      .ai-icon {
        font-size: 1.3em;
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
        overflow-y: auto;
        padding: 20px;
      }
      
      .ai-agent-tabs {
        display: flex;
        gap: 5px;
        margin-bottom: 20px;
        border-bottom: 2px solid #3e3e42;
      }
      
      .ai-tab {
        flex: 1;
        padding: 10px;
        background: transparent;
        border: none;
        color: #cccccc;
        cursor: pointer;
        border-bottom: 2px solid transparent;
        transition: all 0.2s;
      }
      
      .ai-tab:hover {
        color: #667eea;
      }
      
      .ai-tab.active {
        color: #667eea;
        border-bottom-color: #667eea;
      }
      
      .ai-agent-tab-content {
        margin-bottom: 20px;
      }
      
      .ai-agent-tab-content.hidden {
        display: none;
      }
      
      .ai-prompt-section label {
        display: block;
        color: #cccccc;
        margin-bottom: 8px;
        font-size: 0.9em;
      }
      
      .ai-prompt-section textarea {
        width: 100%;
        padding: 10px;
        background: #1e1e1e;
        border: 1px solid #3e3e42;
        border-radius: 4px;
        color: #d4d4d4;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
        resize: vertical;
        margin-bottom: 15px;
      }
      
      .ai-prompt-section textarea:focus {
        outline: none;
        border-color: #667eea;
      }
      
      .ai-context-options {
        margin-bottom: 15px;
      }
      
      .ai-context-options label {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        font-size: 0.85em;
        cursor: pointer;
      }
      
      .ai-context-options input[type="checkbox"] {
        cursor: pointer;
      }
      
      .ai-generate-btn {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 1em;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: transform 0.2s;
      }
      
      .ai-generate-btn:hover {
        transform: translateY(-2px);
      }
      
      .ai-generate-btn:active {
        transform: translateY(0);
      }
      
      .ai-btn-icon {
        font-size: 1.2em;
      }
      
      .ai-agent-result {
        margin-top: 20px;
        border-top: 2px solid #3e3e42;
        padding-top: 20px;
      }
      
      .ai-result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        color: #cccccc;
        font-weight: 600;
      }
      
      .ai-result-actions {
        display: flex;
        gap: 8px;
      }
      
      .ai-result-actions button {
        padding: 6px 12px;
        background: #3e3e42;
        color: #cccccc;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85em;
        transition: background 0.2s;
      }
      
      .ai-result-actions button:hover {
        background: #505050;
      }
      
      .ai-result-code {
        background: #1e1e1e;
        border: 1px solid #3e3e42;
        border-radius: 4px;
        padding: 15px;
        overflow-x: auto;
        max-height: 300px;
        overflow-y: auto;
      }
      
      .ai-result-code code {
        color: #d4d4d4;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
        white-space: pre;
      }
      
      .ai-loading {
        text-align: center;
        padding: 20px;
        color: #cccccc;
      }
      
      .ai-loading.hidden {
        display: none;
      }
      
      .ai-spinner {
        border: 3px solid #3e3e42;
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
      
      .ai-toggle-btn {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.5em;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        z-index: 9999;
        transition: transform 0.2s;
      }
      
      .ai-toggle-btn:hover {
        transform: scale(1.1);
      }
    `;
    document.head.appendChild(style);
    
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'ai-toggle-btn';
    toggleBtn.innerHTML = '🤖';
    toggleBtn.title = 'Open AI Code Assistant';
    toggleBtn.onclick = () => this.toggle();
    document.body.appendChild(toggleBtn);
  }

  attachEventListeners() {
    // Tab switching
    document.querySelectorAll('.ai-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        this.switchTab(tabName);
      });
    });
  }

  toggle() {
    const panel = document.getElementById('ai-agent-panel');
    this.isOpen = !this.isOpen;
    panel.classList.toggle('open', this.isOpen);
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.ai-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Update tab content
    document.querySelectorAll('.ai-agent-tab-content').forEach(content => {
      content.classList.toggle('hidden', content.id !== `ai-tab-${tabName}`);
    });
  }

  async generateCode() {
    const prompt = document.getElementById('ai-prompt-input').value;
    if (!prompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    this.showLoading();
    
    try {
      const context = this.getContext();
      const response = await fetch('/api/ai/code/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: prompt,
          context: context,
          language: this.currentLanguage
        })
      });

      const data = await response.json();
      
      if (data.success) {
        this.showResult(data.code);
      } else {
        throw new Error(data.error || 'Failed to generate code');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      this.hideLoading();
    }
  }

  async explainCode() {
    let code = document.getElementById('ai-explain-input').value;
    
    // If no code in textarea, try to get selected code from editor
    if (!code.trim() && window.editor) {
      code = window.editor.getSelection() || window.editor.getValue();
    }
    
    if (!code.trim()) {
      alert('Please provide code to explain');
      return;
    }

    this.showLoading();
    
    try {
      const response = await fetch('/api/ai/code/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code,
          language: this.currentLanguage
        })
      });

      const data = await response.json();
      
      if (data.success) {
        this.showResult(data.explanation, true);
      } else {
        throw new Error(data.error || 'Failed to explain code');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      this.hideLoading();
    }
  }

  async fixCode() {
    const error = document.getElementById('ai-error-input').value;
    let code = document.getElementById('ai-fix-code-input').value;
    
    // If no code in textarea, try to get selected code from editor
    if (!code.trim() && window.editor) {
      code = window.editor.getSelection() || window.editor.getValue();
    }
    
    if (!error.trim() || !code.trim()) {
      alert('Please provide both error message and code');
      return;
    }

    this.showLoading();
    
    try {
      const response = await fetch('/api/ai/code/fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: code,
          error: error,
          language: this.currentLanguage
        })
      });

      const data = await response.json();
      
      if (data.success) {
        this.showResult(data.code);
      } else {
        throw new Error(data.error || 'Failed to fix code');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      this.hideLoading();
    }
  }

  getContext() {
    const context = {};
    
    if (document.getElementById('ai-include-context').checked && window.editor) {
      context.currentCode = window.editor.getValue();
    }
    
    if (document.getElementById('ai-include-game-type').checked) {
      // Try to detect game type from project
      context.gameType = this.detectGameType();
    }
    
    return context;
  }

  detectGameType() {
    // Try to detect game type from current project
    // This would need to integrate with microStudio's project system
    return 'platformer'; // Default
  }

  showLoading() {
    document.getElementById('ai-loading').classList.remove('hidden');
    document.getElementById('ai-result-code').style.display = 'none';
  }

  hideLoading() {
    document.getElementById('ai-loading').classList.add('hidden');
    document.getElementById('ai-result-code').style.display = 'block';
  }

  showResult(code, isExplanation = false) {
    const codeElement = document.getElementById('ai-result-code').querySelector('code');
    codeElement.textContent = code;
    this.generatedCode = code;
    this.isExplanation = isExplanation;
  }

  insertCode() {
    if (!this.generatedCode) return;
    
    if (window.editor && !this.isExplanation) {
      // Insert into code editor
      const cursor = window.editor.getCursor();
      window.editor.replaceRange(this.generatedCode, cursor);
    } else {
      // Copy to clipboard
      this.copyCode();
    }
  }

  copyCode() {
    if (!this.generatedCode) return;
    
    navigator.clipboard.writeText(this.generatedCode).then(() => {
      alert('Code copied to clipboard!');
    });
  }

  setLanguage(language) {
    this.currentLanguage = language;
  }
}

// Initialize AI Agent UI
let aiAgentUI;
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    aiAgentUI = new AIAgentUI();
    window.aiAgentUI = aiAgentUI; // Make globally available
  });
}

