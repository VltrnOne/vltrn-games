import React from 'react'
import '../styles/IframePage.css'

function VimmVault() {
  return (
    <div className="main-content">
      <div className="content-panel">
        <div className="info-banner">
          <strong>Ultimate Gaming Engine</strong> - Built-in emulator with thousands of classic games.
        </div>
        <div className="iframe-container">
          <iframe
            src="https://vimm.net/vault"
            title="Vimm's Vault"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default VimmVault

