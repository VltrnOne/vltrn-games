import React, { useState } from 'react'
import '../styles/Sidebar.css'

function Sidebar({ activeTab = 'chat' }) {
  const [currentTab, setCurrentTab] = useState(activeTab)

  return (
    <div className="sidebar">
      <div className="sidebar-tabs">
        <button 
          className={`tab ${currentTab === 'chat' ? 'active' : ''}`}
          onClick={() => setCurrentTab('chat')}
        >
          Chat
        </button>
        <button 
          className={`tab ${currentTab === 'code' ? 'active' : ''}`}
          onClick={() => setCurrentTab('code')}
        >
          Code
        </button>
      </div>
      
      <div className="sidebar-content">
        {currentTab === 'chat' ? (
          <div className="chat-panel">
            <div className="chat-header">
              <div className="chat-logo">
                <span className="logo-icon">🎮</span>
                <span className="logo-text">VLTRN Games</span>
              </div>
            </div>
            
            <div className="chat-messages">
              <div className="message assistant">
                <div className="message-content">
                  I'll transform this into an exciting gaming dreamland designed by Lyric and Aria! 
                  Let me create a vibrant, playful, and immersive gaming hub.
                </div>
                <a href="#" className="view-more">View More ↓</a>
              </div>
              
              <div className="version-box">
                <span className="refresh-icon">🔄</span>
                <span>Version 3</span>
                <span className="more-icon">⋮</span>
              </div>
            </div>
            
            <div className="chat-input-area">
              <textarea
                className="chat-input"
                placeholder="Tell me what to change, specific and clear. One task at a time. Use the Selector for better efficiency."
                rows="3"
              />
              <div className="input-actions">
                <button className="selector-btn">
                  <span>🎯</span>
                  <span>Selector</span>
                </button>
                <div className="input-icons">
                  <button className="icon-btn">↶</button>
                  <button className="icon-btn">&lt;/&gt;</button>
                  <button className="icon-btn">🎤</button>
                  <button className="icon-btn">🖼️</button>
                  <button className="icon-btn send">→</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="code-panel">
            <div className="code-header">
              <h3>Code</h3>
            </div>
            <div className="code-content">
              <p>Code editor will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar

