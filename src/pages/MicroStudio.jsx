import React from 'react'
import '../styles/IframePage.css'

function MicroStudio() {
  return (
    <div className="main-content">
      <div className="content-panel">
        <div className="info-banner">
          <strong>microStudio V</strong> - VLTRN Edition with AI Code Assistant
        </div>
        <div className="iframe-container">
          <iframe
            src="https://microstudio.dev"
            title="microStudio V"
            allow="fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default MicroStudio

