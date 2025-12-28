import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/GameCard.css'

const colorMap = {
  purple: '#8a2be2',
  blue: '#4169e1',
  orange: '#ff8c00',
  pink: '#ff1493',
  teal: '#40e0d0',
  green: '#32cd32',
  red: '#ff4500',
  brown: '#8b4513'
}

function GameCard({ title, type, description, icon, path, color, isEmoji }) {
  const bgColor = colorMap[color] || '#667eea'

  return (
    <Link to={path} className="dreamland-card" style={{ '--card-color': bgColor }}>
      <div className="card-icon">
        {isEmoji ? (
          <span className="emoji-icon">{icon}</span>
        ) : (
          <img src={icon} alt={title} />
        )}
      </div>
      <div className="card-type">{type}</div>
      <div className="card-title">{title}</div>
      <div className="card-description">{description}</div>
      <button className="play-button">
        PLAY NOW →
      </button>
    </Link>
  )
}

export default GameCard
