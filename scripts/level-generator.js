const fs = require('fs');

// EXACT MOVES FROM page.jsx
const MOVES = [
    { dx: 3, dy: 0 }, { dx: -3, dy: 0 },
    { dx: 0, dy: 3 }, { dx: 0, dy: -3 },
    { dx: 2, dy: 2 }, { dx: -2, dy: -2 },
    { dx: 2, dy: -2 }, { dx: -2, dy: 2 }
];

const GRID_SIZE = 5;

function isValid(x, y, visited) {
    return x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && !visited.has(`${x},${y}`);
}

function findPath(x, y, visited, path) {
    visited.add(`${x},${y}`);
    path.push({ x, y });

    if (path.length === GRID_SIZE * GRID_SIZE) {
        return true; // Found a full path
    }

    // Randomize moves to get different levels
    const shuffledMoves = [...MOVES].sort(() => Math.random() - 0.5);

    for (const move of shuffledMoves) {
        const nx = x + move.dx;
        const ny = y + move.dy;

        if (isValid(nx, ny, visited)) {
            if (findPath(nx, ny, visited, path)) {
                return true;
            }
        }
    }

    // Backtrack
    visited.delete(`${x},${y}`);
    path.pop();
    return false;
}

function generateLevels() {
    console.log("Generating 5 solvable levels...");
    const levels = [];

    for (let i = 1; i <= 5; i++) {
        // Random start position
        // Try all starts until one works if random fails? 
        // Backtracking should generally find a path if one exists.
        const startX = Math.floor(Math.random() * GRID_SIZE);
        const startY = Math.floor(Math.random() * GRID_SIZE);

        const visited = new Set();
        const path = [];

        if (findPath(startX, startY, visited, path)) {
            // Pick required moves.
            const requiredMoves = [];
            // We want milestones at roughly 25%, 50%, 75%
            const checkpoints = [6, 12, 18, 24];

            checkpoints.forEach(chk => {
                if (Math.random() > 0.4) {
                    requiredMoves.push({ moveNumber: chk, x: path[chk - 1].x, y: path[chk - 1].y });
                }
            });

            if (requiredMoves.length === 0) {
                requiredMoves.push({ moveNumber: 13, x: path[12].x, y: path[12].y });
            }

            levels.push({
                id: i,
                ruleSet: 7,
                stars: [15, 20, 25],
                fixedStart: { x: startX, y: startY },
                blockedSquares: [],
                timeLimit: 120,
                requiredMoves: requiredMoves
            });
        }
    }

    console.log(JSON.stringify(levels, null, 2));
}

generateLevels();
