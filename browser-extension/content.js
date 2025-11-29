// VLTRN Game Code Assistant - Content Script
// Runs on vltrngames.com pages and communicates with game engines

console.log('🎮 VLTRN Game Code Assistant loaded');

// Detect which game engine is currently active
function detectActiveEngine() {
  const url = window.location.href;

  if (url.includes('/microstudio')) {
    return {
      type: 'microstudio',
      iframe: document.querySelector('#microstudioFrame'),
      name: 'microStudio V'
    };
  } else if (url.includes('/game-builder')) {
    return {
      type: 'game-builder',
      iframe: null, // Game Builder runs directly on page
      name: 'Game Builder'
    };
  } else if (url.includes('/liljs-castle') || url.includes('/castle')) {
    return {
      type: 'castle',
      iframe: document.querySelector('#game-iframe'),
      name: "Lil J's Castle"
    };
  }

  return null;
}

// Listen for code injection requests from the AI chat
window.addEventListener('message', function(event) {
  // Only accept messages from same origin
  if (event.origin !== window.location.origin) {
    return;
  }

  if (event.data.type === 'INJECT_CODE') {
    const { code, engine } = event.data;
    injectCodeToEngine(code, engine);
  }
});

// Inject code into the appropriate game engine
function injectCodeToEngine(code, engineType) {
  console.log(`💉 Injecting code into ${engineType}...`);

  const engine = detectActiveEngine();

  if (!engine || engine.type !== engineType) {
    console.error('❌ Engine mismatch or not found');
    showNotification('Error: Wrong game engine active', 'error');
    return;
  }

  switch (engineType) {
    case 'microstudio':
      injectToMicroStudio(code, engine.iframe);
      break;
    case 'game-builder':
      injectToGameBuilder(code);
      break;
    case 'castle':
      injectToCastle(code, engine.iframe);
      break;
    default:
      console.error('❌ Unknown engine type:', engineType);
  }
}

// Inject code to microStudio iframe
async function injectToMicroStudio(code, iframe) {
  if (!iframe) {
    console.error('❌ microStudio iframe not found');
    showNotification('Error: microStudio not loaded', 'error');
    return;
  }

  try {
    // Inject script into iframe that will handle code insertion
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        try {
          // Try to access microStudio's code editor
          // This requires the iframe to allow same-origin access
          const codeToInsert = ${JSON.stringify(code)};

          // Attempt to find Monaco editor or textarea
          const editor = document.querySelector('.monaco-editor, textarea, #code-editor');

          if (editor) {
            // For Monaco editor (microStudio uses this)
            if (window.monaco && window.monaco.editor) {
              const editorInstance = window.monaco.editor.getModels()[0];
              if (editorInstance) {
                editorInstance.setValue(codeToInsert);
                console.log('✅ Code injected via Monaco');
              }
            } else if (editor.tagName === 'TEXTAREA') {
              editor.value = codeToInsert;
              editor.dispatchEvent(new Event('input', { bubbles: true }));
              console.log('✅ Code injected via textarea');
            }

            // Try to click Run button
            setTimeout(() => {
              const runBtn = document.querySelector('[title*="Run"], button.run-btn, #run-button');
              if (runBtn) {
                runBtn.click();
                console.log('🚀 Run button clicked');
              }
            }, 500);

            return true;
          }
        } catch (e) {
          console.error('❌ Injection error:', e);
          return false;
        }
      })();
    `;

    // Due to cross-origin restrictions, we'll show instructions instead
    showInjectionInstructions(code, 'microStudio');

  } catch (error) {
    console.error('❌ Error injecting to microStudio:', error);
    showNotification('Using copy-paste mode (cross-origin restriction)', 'warning');
    showInjectionInstructions(code, 'microStudio');
  }
}

// Inject code to Game Builder
function injectToGameBuilder(code) {
  try {
    // Game Builder runs directly on the page, so we can access it
    const codeEditor = document.querySelector('#code-editor, textarea[name="code"], .code-input');

    if (codeEditor) {
      codeEditor.value = code;
      codeEditor.dispatchEvent(new Event('input', { bubbles: true }));
      showNotification('✅ Code injected to Game Builder!', 'success');

      // Try to preview/run
      setTimeout(() => {
        const previewBtn = document.querySelector('#preview-btn, .preview-button');
        if (previewBtn) {
          previewBtn.click();
        }
      }, 300);
    } else {
      showInjectionInstructions(code, 'Game Builder');
    }
  } catch (error) {
    console.error('❌ Error injecting to Game Builder:', error);
    showInjectionInstructions(code, 'Game Builder');
  }
}

// Inject code to Castle
function injectToCastle(code, iframe) {
  // Castle Game Engine - similar to microStudio approach
  showInjectionInstructions(code, 'Castle');
}

// Show injection instructions overlay
function showInjectionInstructions(code, engineName) {
  // Copy code to clipboard
  navigator.clipboard.writeText(code).then(() => {
    const overlay = document.createElement('div');
    overlay.className = 'vltrn-injection-overlay';
    overlay.innerHTML = `
      <div class="vltrn-injection-modal">
        <div class="vltrn-injection-header">
          <h2>🤖 Code Ready for ${engineName}</h2>
          <button class="vltrn-close-btn" onclick="this.closest('.vltrn-injection-overlay').remove()">✕</button>
        </div>
        <div class="vltrn-injection-body">
          <div class="success-message">✅ Code copied to clipboard!</div>
          <ol class="injection-steps">
            <li>Click the <strong>Code</strong> tab in ${engineName}</li>
            <li>Select all existing code (Ctrl+A / Cmd+A)</li>
            <li>Paste the new code (Ctrl+V / Cmd+V)</li>
            <li>Click the <strong>▶ Run</strong> button</li>
          </ol>
          <button class="vltrn-copy-btn" onclick="navigator.clipboard.writeText(${JSON.stringify(code)})">
            📋 Copy Again
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Add styles if not already added
    if (!document.querySelector('#vltrn-injection-styles')) {
      const styles = document.createElement('style');
      styles.id = 'vltrn-injection-styles';
      styles.textContent = `
        .vltrn-injection-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999999;
          animation: fadeIn 0.3s;
        }

        .vltrn-injection-modal {
          background: white;
          border-radius: 12px;
          max-width: 500px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .vltrn-injection-header {
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 12px 12px 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .vltrn-injection-header h2 {
          margin: 0;
          font-size: 1.3em;
        }

        .vltrn-close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.2em;
          transition: all 0.2s;
        }

        .vltrn-close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .vltrn-injection-body {
          padding: 25px;
        }

        .success-message {
          background: #48bb78;
          color: white;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 500;
        }

        .injection-steps {
          background: #f7fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }

        .injection-steps li {
          margin: 10px 0;
          line-height: 1.6;
        }

        .injection-steps strong {
          color: #667eea;
        }

        .vltrn-copy-btn {
          width: 100%;
          padding: 12px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1em;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .vltrn-copy-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(styles);
    }
  });
}

// Show notification
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `vltrn-notification vltrn-notification-${type}`;
  notification.textContent = message;

  const styles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '15px 20px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    zIndex: '1000000',
    animation: 'slideIn 0.3s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
  };

  Object.assign(notification.style, styles);

  if (type === 'success') {
    notification.style.background = '#48bb78';
  } else if (type === 'error') {
    notification.style.background = '#f56565';
  } else if (type === 'warning') {
    notification.style.background = '#ed8936';
  } else {
    notification.style.background = '#667eea';
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Expose API for AI chat to trigger code injection
window.VLTRNCodeAssistant = {
  injectCode: function(code, engineType) {
    injectCodeToEngine(code, engineType);
  },
  detectEngine: function() {
    return detectActiveEngine();
  }
};

// Notify that extension is ready
console.log('✅ VLTRN Code Assistant ready');
const engine = detectActiveEngine();
if (engine) {
  console.log(`🎮 Detected: ${engine.name}`);
}
