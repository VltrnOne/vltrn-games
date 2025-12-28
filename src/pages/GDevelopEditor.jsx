import React from 'react'
import '../styles/IframePage.css'

function GDevelopEditor() {
  return (
    <div className="main-content">
      <div className="content-panel">
        <div className="info-banner">
          <strong>Create games with no-code!</strong> GDevelop uses visual events instead of programming.
        </div>
        <div className="iframe-container">
          <iframe
            src="https://editor.gdevelop.io"
            title="GDevelop Editor"
            allow="fullscreen"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals"
          />
        </div>
      </div>
    </div>
  )
}

export default GDevelopEditor

