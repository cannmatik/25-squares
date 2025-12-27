
// src/lib/infiniteLevelGenerator.js

import { MOVES } from './levels.js'

const RANDOM_MOVES = [
    { dx: 3, dy: 0 }, { dx: -3, dy: 0 },
    { dx: 0, dy: 3 }, { dx: 0, dy: -3 },
    { dx: 2, dy: 2 }, { dx: -2, dy: -2 },
    { dx: 2, dy: -2 }, { dx: -2, dy: 2 }
];

const isValidPos = (x, y, blockedSet) => {
    return x >= 0 && x < 5 && y >= 0 && y < 5 && !blockedSet.has(`${x},${y}`)
}

const generateRandomPath = (length, blockedSet) => {
    for (let attempt = 0; attempt < 10; attempt++) {
        let x = Math.floor(Math.random() * 5)
        let y = Math.floor(Math.random() * 5)

        if (blockedSet.has(`${x},${y}`)) continue

        let path = [{ x, y }]
        let visited = new Set([`${x},${y}`])
        let current = { x, y }

        for (let i = 0; i < length - 1; i++) {
            const moves = [...RANDOM_MOVES].sort(() => Math.random() - 0.5)
            let found = false
            for (const m of moves) {
                const nx = current.x + m.dx
                const ny = current.y + m.dy
                if (isValidPos(nx, ny, blockedSet) && !visited.has(`${nx},${ny}`)) {
                    current = { x: nx, y: ny }
                    path.push(current)
                    visited.add(`${nx},${ny}`)
                    found = true
                    break
                }
            }
            if (!found) break
        }

        if (path.length >= Math.max(5, length * 0.7)) {
            return path
        }
    }
    return null
}


export const generateInfiniteLevel = (levelNumber) => {
    // 1. Blocked Squares: Random 0-3 defined by user
    // "blocked kare oyunu zorlaştırmıyor max 3 olmalı abi 0-3 arası random"
    let blockedCount = Math.floor(Math.random() * 4)

    // "Level 1-5: 0 Blocked."
    if (levelNumber <= 5) blockedCount = 0

    // 2. Blocked Squares Generation
    const blockedSquares = []
    const blockedSet = new Set()

    while (blockedSquares.length < blockedCount) {
        const x = Math.floor(Math.random() * 5)
        const y = Math.floor(Math.random() * 5)
        const key = `${x},${y}`
        if (!blockedSet.has(key)) {
            blockedSquares.push({ x, y })
            blockedSet.add(key)
        }
    }

    // 3. Generate a Solvable Path
    const targetLength = 25 - blockedCount
    const path = generateRandomPath(targetLength, blockedSet)

    if (!path) {
        // Fallback
        return {
            id: `infinite-${levelNumber}`,
            levelNumber: levelNumber,
            gridSize: 5,
            blockedSquares: [],
            requiredMoves: [],
            stars: [5, 10, 15],
            ruleSet: 1,
            fixedStart: null
        }
    }

    // 4. Checkpoints (Predefined Moves)
    const requiredMoves = []

    if (levelNumber >= 6) {
        const pathLen = path.length

        // "ilk predefined kare 4. hamleden başlayarak... minimum 4-5 olsun ama... 13 e kadar artsın"
        // Start around move 4-5. Increase slowly. Cap at 13.
        let baseMove = 4 + Math.floor((levelNumber - 6) / 2) // Increases every 2 levels
        if (Math.random() > 0.5) baseMove += 1 // Randomize slightly (4-5 start)

        if (baseMove > 13) baseMove = 13 // Cap at 13

        // Ensure index is valid (0-based index = moveNum - 1)
        const firstIdx = baseMove - 1

        if (firstIdx < pathLen && firstIdx >= 0) {
            requiredMoves.push({
                moveNumber: baseMove,
                x: path[firstIdx].x,
                y: path[firstIdx].y
            })

            // 2nd Checkpoint (Level 16+)
            if (levelNumber >= 16) {
                // "Level 16+: 2 Checkpoints (Gap 4+, increasing)"
                const gapIncrease = Math.floor((levelNumber - 16) / 3)
                const gap = 4 + gapIncrease
                const secondIdx = firstIdx + gap

                if (secondIdx < pathLen) {
                    requiredMoves.push({
                        moveNumber: secondIdx + 1,
                        x: path[secondIdx].x,
                        y: path[secondIdx].y
                    })
                }
            }
        }
    }

    // Calculate minMoves with gradual difficulty (same curve as regular levels)
    let minMoves
    if (levelNumber <= 2) {
        minMoves = Math.max(10, path.length - 13)
    } else if (levelNumber <= 5) {
        minMoves = Math.max(12, path.length - 10)
    } else if (levelNumber <= 10) {
        minMoves = Math.max(15, path.length - 8)
    } else if (levelNumber <= 15) {
        minMoves = Math.max(17, path.length - 6)
    } else if (levelNumber <= 20) {
        minMoves = Math.max(18, path.length - 5)
    } else {
        minMoves = Math.max(20, path.length - 4)
    }

    // Calculate minCheckpoints: N-1 for flexibility, unless only 1 checkpoint
    let minCheckpoints = requiredMoves.length
    if (requiredMoves.length > 1) {
        minCheckpoints = requiredMoves.length - 1 // Allow missing 1 checkpoint
    }
    // If no checkpoints, minCheckpoints should be 0, not 1!
    if (requiredMoves.length === 0) {
        minCheckpoints = 0
    }

    return {
        id: `infinite-${levelNumber}`,
        levelNumber: levelNumber,
        gridSize: 5,
        blockedSquares,
        requiredMoves,
        stars: [
            minMoves, // 1 star = pass condition
            Math.floor((minMoves + path.length) / 2), // 2 star = middle
            path.length // 3 star = perfect
        ],
        ruleSet: levelNumber >= 6 ? 3 : 1, // 1=Basic, 3=Checkpoints
        timeLimit: Math.max(60, 120 - (levelNumber * 2)), // Starts at 120s, decreases, min 60s
        minMoves,
        minCheckpoints,
        fullPath: path,
        fixedStart: null
    }
}
