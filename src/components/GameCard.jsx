import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/GameCard.css'

function GameCard({ title, description, icon, path, gradient, isEmoji }) {
  const cardStyle = gradient ? { background: gradient, color: 'white' } : {}
  const textStyle = gradient ? { color: 'white' } : {}
  const descStyle = gradient ? { color: 'rgba(255, 255, 255, 0.9)' } : {}

  return (
    <Link to={path} className="game-card" style={cardStyle}>
      {isEmoji ? (
        <div className="game-icon emoji-icon" style={textStyle}>
          {icon}
        </div>
      ) : (
        <img src={icon} alt={title} className="game-icon" />
      )}
      <div className="game-title" style={textStyle}>{title}</div>
      <div className="game-desc" style={descStyle}>{description}</div>
    </Link>
  )
}

export default GameCard

