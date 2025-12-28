import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/PageHeader.css'

function PageHeader({ title, children }) {
  return (
    <div className="page-header">
      <h1>{title}</h1>
      <div className="header-actions">
        {children}
        <Link to="/" className="back-link">🏠 Home</Link>
      </div>
    </div>
  )
}

export default PageHeader

