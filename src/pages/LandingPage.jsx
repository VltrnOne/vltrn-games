import React from 'react'
import GameCard from '../components/GameCard'
import '../styles/LandingPage.css'

const games = [
  {
    id: 'robot-lyric',
    title: 'Robot Lyric',
    type: 'Interactive Game',
    description: 'Musical rhythm meets robotic precision.',
    icon: '/img/icons/robot lyric.png',
    path: '/robot-lyric/',
    color: 'purple'
  },
  {
    id: 'liljs-castle',
    title: "Lil J's Castle",
    type: 'Adventure Game',
    description: 'Epic castle exploration adventure.',
    icon: '/img/icons/lil js castle.png',
    path: '/liljs-castle/',
    color: 'blue'
  },
  {
    id: 'golden-castle',
    title: 'Golden Castle Suite',
    type: '7 Games Collection',
    description: 'Ultimate gaming collection.',
    icon: '/img/icons/golden castle.png',
    path: '/golden-castle-suite/',
    color: 'orange'
  },
  {
    id: 'game-builder',
    title: 'Game Builder',
    type: 'Customization Tool',
    description: 'Design and customize your games.',
    icon: '/img/icons/game builder.png',
    path: '/game-builder',
    color: 'pink'
  },
  {
    id: 'microstudio',
    title: 'microStudio V',
    type: 'Code Engine with AI',
    description: 'Create games with AI assistance.',
    icon: '/img/icons/micro studios.png',
    path: '/microstudio',
    color: 'teal'
  },
  {
    id: 'gdevelop',
    title: 'GDevelop Editor',
    type: 'No-Code Editor',
    description: 'Build games without coding.',
    icon: '/img/icons/gStudios.png',
    path: '/gdevelop-editor',
    color: 'green'
  },
  {
    id: 'ai-agent',
    title: 'VLTRN AI Agent',
    type: 'AI Assistant',
    description: 'Your intelligent gaming companion.',
    icon: '/img/icons/vltrn bot icon128.png',
    path: '/browser-extension/popup.html',
    color: 'red'
  },
  {
    id: 'vimm-vault',
    title: "Vimm's Vault",
    type: 'Gaming Engine',
    description: 'Classic gaming emulation platform.',
    icon: '🎮',
    path: '/vimm-vault',
    color: 'brown',
    isEmoji: true
  }
]

const stats = [
  {
    icon: '+',
    number: '8',
    label: 'GAMING PLATFORMS',
    color: 'purple'
  },
  {
    icon: '∞',
    number: '∞',
    label: 'GAMING POSSIBILITIES',
    color: 'teal'
  },
  {
    icon: '⭐',
    number: '100%',
    label: 'PURE GAMING FUN',
    color: 'pink'
  }
]

function LandingPage() {
  return (
    <div className="gaming-dreamland">
      <div className="dreamland-header">
        <h1 className="main-title">VLTRN GAMES</h1>
        <div className="divider"></div>
        <h2 className="subtitle">GAMING DREAMLAND</h2>
        <p className="creators">Created by Lyric & Aria</p>
        <p className="description">
          From custom creations to retro classics - every gaming experience you can imagine, all in one epic location.
        </p>
      </div>

      <div className="games-grid">
        {games.map(game => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card ${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LandingPage
