import React from 'react'
import '../styles/VimmVault.css'

function VimmVault() {
  const openInNewTab = () => {
    window.open('https://vimm.net/vault', '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="main-content">
      <div className="content-panel">
        <div className="info-banner">
          <strong>Ultimate Gaming Engine</strong> - Built-in emulator with thousands of classic games.
        </div>
        <div className="vimm-vault-container">
          <div className="vimm-content">
            <div className="vimm-icon">🎮</div>
            <h2>Vimm's Vault</h2>
            <p className="vimm-description">
              Vimm's Vault is an amazing gaming platform with thousands of classic games and built-in emulators.
              Due to security restrictions, it cannot be embedded in an iframe.
            </p>
            <p className="vimm-note">
              Click the button below to open Vimm's Vault in a new tab where you'll have full access to all features!
            </p>
            <button onClick={openInNewTab} className="vimm-open-button">
              🎮 Open Vimm's Vault →
            </button>
            
            <div className="vimm-features">
              <h3>What you'll find:</h3>
              <ul>
                <li>Thousands of classic games</li>
                <li>Built-in emulators for multiple systems</li>
                <li>Retro gaming experience</li>
                <li>Full access to all gaming features</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VimmVault

