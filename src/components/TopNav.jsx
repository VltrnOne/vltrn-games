import React from 'react'
import '../styles/TopNav.css'

function TopNav() {
  return (
    <nav className="top-nav">
      <div className="nav-left">
        <div className="logo">
          <div className="logo-icon">🎮</div>
          <span className="logo-text">VLTRN Games</span>
        </div>
        <select className="nav-dropdown">
          <option>VLTRN Mission Landing</option>
        </select>
      </div>
      
      <div className="nav-center">
        <button className="nav-button primary">
          <span>🎯</span>
          <span>Join Our Build-Off</span>
          <span>→</span>
        </button>
      </div>
      
      <div className="nav-right">
        <button className="nav-icon" title="Form">
          <span>📋</span>
        </button>
        <button className="nav-icon" title="SEO">
          <span>🔍</span>
        </button>
        <button className="nav-button secondary">
          <span>🚀</span>
          <span>Publish</span>
          <span>▼</span>
        </button>
        <button className="nav-icon" title="Help">
          <span>?</span>
        </button>
        <button className="nav-icon" title="Gift">
          <span>🎁</span>
        </button>
      </div>
    </nav>
  )
}

export default TopNav

