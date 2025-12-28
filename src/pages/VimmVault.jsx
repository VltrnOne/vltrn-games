import React, { useState, useEffect } from 'react'
import '../styles/IframePage.css'
import '../styles/VimmVault.css'

function VimmVault() {
  const [iframeError, setIframeError] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if iframe loaded successfully
    const timer = setTimeout(() => {
      setLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const handleIframeError = () => {
    setIframeError(true)
    setLoading(false)
  }

  const openInNewTab = () => {
    window.open('https://vimm.net/vault', '_blank', 'noopener,noreferrer')
  }

  if (iframeError) {
    return (
      <div className="main-content">
        <div className="content-panel">
          <div className="info-banner">
            <strong>Ultimate Gaming Engine</strong> - Built-in emulator with thousands of classic games.
          </div>
          <div className="iframe-error-container">
            <div className="error-content">
              <div className="error-icon">🚫</div>
              <h2>Unable to Load in Frame</h2>
              <p>
                Vimm's Vault cannot be displayed in an iframe due to security restrictions.
                Click the button below to open it in a new tab.
              </p>
              <button onClick={openInNewTab} className="open-button">
                🎮 Open Vimm's Vault in New Tab →
              </button>
              <p className="error-note">
                You'll be able to access all the classic games and emulators directly on Vimm's Vault.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="main-content">
      <div className="content-panel">
        <div className="info-banner">
          <strong>Ultimate Gaming Engine</strong> - Built-in emulator with thousands of classic games.
          {loading && <span style={{ marginLeft: '10px', fontSize: '0.85em' }}>Loading...</span>}
        </div>
        <div className="iframe-container">
          {loading && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Loading Vimm's Vault...</p>
            </div>
          )}
          <iframe
            src="https://vimm.net/vault"
            title="Vimm's Vault"
            allow="fullscreen"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads"
            onError={handleIframeError}
            onLoad={() => setLoading(false)}
            style={{ display: loading ? 'none' : 'block' }}
          />
        </div>
        <div className="fallback-link" style={{ textAlign: 'center', padding: '20px' }}>
          <button onClick={openInNewTab} className="open-button-secondary">
            🎮 Open Vimm's Vault in New Tab →
          </button>
        </div>
      </div>
    </div>
  )
}

export default VimmVault

