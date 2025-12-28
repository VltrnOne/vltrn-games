import React from 'react'
import GameCard from '../components/GameCard'
import '../styles/LandingPage.css'

const games = [
  {
    id: 'robot-lyric',
    title: 'Robot Lyric',
    description: 'Fly through obstacles and collect power-ups',
    icon: '/img/icons/robot lyric.png',
    path: '/robot-lyric/',
    gradient: null
  },
  {
    id: 'liljs-castle',
    title: "Lil J's Castle",
    description: 'Explore a magical castle adventure',
    icon: '/img/icons/lil js castle.png',
    path: '/liljs-castle/',
    gradient: null
  },
  {
    id: 'golden-castle',
    title: 'Golden Castle Suite',
    description: '7 games based on the golden ratio (φ) and mathematical sequences',
    icon: '/img/icons/golden castle.png',
    path: '/golden-castle-suite/',
    gradient: null
  },
  {
    id: 'game-builder',
    title: 'Game Builder',
    description: 'Customize and build your own version of any game!',
    icon: '/img/icons/game builder.png',
    path: '/game-builder',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    id: 'microstudio',
    title: 'microStudio V',
    description: 'VLTRN Edition with AI Code Assistant - create games with vibe coding!',
    icon: '/img/icons/micro studios.png',
    path: '/microstudio',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    id: 'gdevelop',
    title: 'GDevelop Editor',
    description: 'Create games with no-code visual editor - no programming required!',
    icon: '/img/icons/gStudios.png',
    path: '/gdevelop-editor',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  },
  {
    id: 'ai-agent',
    title: 'VLTRN AI Agent',
    description: 'Your intelligent game development assistant - powered by AI',
    icon: '/img/icons/vltrn bot icon128.png',
    path: '/browser-extension/popup.html',
    gradient: 'linear-gradient(135deg, #f5af19 0%, #f12711 100%)'
  },
  {
    id: 'vimm-vault',
    title: "Vimm's Vault",
    description: 'Ultimate gaming engine with built-in emulator - thousands of classic games!',
    icon: '🎮',
    path: '/vimm-vault',
    gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    isEmoji: true
  }
]

function LandingPage() {
  return (
    <div className="main-content">
      <div className="content-panel">
        <div className="content-placeholders">
          <div className="placeholder-small"></div>
          <div className="placeholder-small"></div>
          <div className="placeholder-large"></div>
        </div>
        
        <div className="content-area">
          <div className="landing-content">
            <h1>🎮 VLTRN Games</h1>
            <p className="subtitle">Where Mathematics Meets Magic</p>

            <div className="games-grid">
              {games.map(game => (
                <GameCard key={game.id} {...game} />
              ))}
            </div>

            <div className="phi">
              φ = 1.618033988749894848204586834365638117720309179805762862135...
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

