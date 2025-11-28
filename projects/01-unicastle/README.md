# 🏰 UniCastle

**Game 1 of the Fibonacci Castle Suite**
*"One Tower Rises"*

---

## Overview

UniCastle is the first and simplest game in the Fibonacci Castle Suite. It introduces players to the core concept of Fibonacci numbers through simple, engaging gameplay.

### Core Concept
- **One Tower**: A single golden tower stands in the center
- **One Hero**: The player controls a single character (👑)
- **Fibonacci Jumps**: Each jump's power follows the Fibonacci sequence

---

## Fibonacci Integration

### Jump Mechanics
Every time the player jumps, the jump height follows the Fibonacci sequence:
1. First jump: Height × 1
2. Second jump: Height × 1
3. Third jump: Height × 2
4. Fourth jump: Height × 3
5. Fifth jump: Height × 5
6. Sixth jump: Height × 8
7. Seventh jump: Height × 13
8. Eighth jump: Height × 21

After the 8th jump, the sequence cycles back to the beginning.

### Collectibles
Golden spirals appear at heights determined by Fibonacci numbers:
- Spiral 1: Worth 1 point, at Fib(1) × 15 pixels high
- Spiral 2: Worth 1 point, at Fib(2) × 15 pixels high
- Spiral 3: Worth 2 points, at Fib(3) × 15 pixels high
- ... and so on

### Visual Design
- Tower dimensions use golden ratio (width/height = φ)
- Golden spirals rotate at the golden angle (≈137.5°)
- Color palette: Pure gold (#FFD700) with brown background
- UI elements positioned using golden section points

---

## Controls

- **SPACE**: Jump (power follows Fibonacci sequence)
- **ESC**: Return to menu

---

## Gameplay

1. Player starts on the ground next to the golden tower
2. Press SPACE to jump - each successive jump is more powerful
3. Collect golden spirals floating in the air
4. Score points based on Fibonacci values of collected spirals
5. Watch as your jumps grow following 1, 1, 2, 3, 5, 8, 13, 21...

---

## Educational Value

Players naturally learn:
- **Sequence Recognition**: 1, 1, 2, 3, 5, 8, 13, 21...
- **Pattern Addition**: Each number is the sum of the previous two
- **Exponential Growth**: Jump heights grow rapidly
- **Visual Proportions**: Golden ratio in tower design
- **Natural Angles**: Golden angle in spiral rotations

---

## Technical Details

### Files
```
01-unicastle/
├── CastleEngineManifest.xml    # Project configuration
├── unicastle_standalone.dpr     # Entry point
├── code/
│   ├── gameinitialize.pas       # Initialization
│   ├── gameviewmenu.pas         # Main menu with golden tower
│   └── gameviewmain.pas         # Core gameplay
├── data/                        # Assets directory
└── README.md                    # This file
```

### Dependencies
- Castle Game Engine
- FibonacciCore.pas (shared library)
- GoldenColors.pas (shared library)

### Building

**Web Build:**
```bash
cd projects/01-unicastle
castle-engine compile --target=web --mode=release
```

**Desktop Build:**
```bash
cd projects/01-unicastle
castle-engine compile
castle-engine run
```

---

## Design Philosophy

UniCastle embodies simplicity:
- **One** tower (Fib: 1)
- **One** player
- **One** primary mechanic (jumping)
- **One** core lesson (Fibonacci sequence)

This minimalism helps players focus on understanding the Fibonacci concept before moving to more complex games in the suite.

---

## Progression

After mastering UniCastle, players advance to:
- **DuoCastle** (Game 2): Introduces choice and duality
- **TriCastle** (Game 3): Adds pattern recognition with 3 towers
- And beyond...

---

## Scoring

Points are awarded based on Fibonacci values:
- Collect Spiral 1 (Fib 1): +1 point
- Collect Spiral 2 (Fib 1): +1 point
- Collect Spiral 3 (Fib 2): +2 points
- Collect Spiral 4 (Fib 3): +3 points
- Collect Spiral 5 (Fib 5): +5 points
- Collect Spiral 6 (Fib 8): +8 points
- Collect Spiral 7 (Fib 13): +13 points
- Collect Spiral 8 (Fib 21): +21 points

**Perfect Score**: 55 points (which is Fib(10)!)

---

## Fun Facts for Players

💡 **Did you know?**
- The spiral pattern golden spirals make is found in seashells, galaxies, and sunflowers!
- The golden ratio (φ ≈ 1.618) appears in art, architecture, and nature
- Your jump heights grow just like rabbit populations in Fibonacci's original problem
- The perfect score (55) is itself a Fibonacci number!

---

**Part of the Fibonacci Castle Suite by VLTRN Games**
*Where Mathematics Meets Magic* ✨

φ = 1.618033988749...
