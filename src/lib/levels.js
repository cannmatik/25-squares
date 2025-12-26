// Game levels data - Simplified Difficulty

export const WORLDS = [
    { id: 1, name: "World 1", requiredStars: 0, levels: 25 },
    { id: 2, name: "World 2", requiredStars: 30, levels: 25 } // Lowered required stars to unlock
];

export const LEVELS = {
    1: [
        // RuleSet 1: Basic traversal (Easier stars)
        { id: 1, ruleSet: 1, stars: [5, 10, 15], fixedStart: null, blockedSquares: [], timeLimit: null },
        { id: 2, ruleSet: 1, stars: [6, 11, 16], fixedStart: null, blockedSquares: [], timeLimit: null },
        { id: 3, ruleSet: 1, stars: [7, 12, 17], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: null },
        { id: 4, ruleSet: 1, stars: [8, 13, 18], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: null },
        { id: 5, ruleSet: 1, stars: [10, 15, 20], fixedStart: { x: 4, y: 0 }, blockedSquares: [], timeLimit: null },
        { id: 6, ruleSet: 1, stars: [10, 15, 20], fixedStart: { x: 2, y: 4 }, blockedSquares: [], timeLimit: null },
        { id: 7, ruleSet: 1, stars: [12, 18, 22], fixedStart: { x: 4, y: 4 }, blockedSquares: [], timeLimit: null },

        // RuleSet 2: Blocked Squares (Fewer blocked squares for early levels)
        { id: 8, ruleSet: 2, stars: [10, 15, 20], fixedStart: null, blockedSquares: [{ x: 2, y: 2 }], timeLimit: null },
        { id: 9, ruleSet: 2, stars: [10, 15, 20], fixedStart: null, blockedSquares: [{ x: 0, y: 4 }], timeLimit: null },
        { id: 10, ruleSet: 2, stars: [12, 16, 21], fixedStart: null, blockedSquares: [{ x: 4, y: 0 }], timeLimit: null },
        { id: 11, ruleSet: 2, stars: [12, 16, 21], fixedStart: null, blockedSquares: [{ x: 1, y: 1 }], timeLimit: null },
        { id: 12, ruleSet: 2, stars: [14, 18, 22], fixedStart: null, blockedSquares: [{ x: 3, y: 3 }], timeLimit: null },
        { id: 13, ruleSet: 2, stars: [14, 18, 22], fixedStart: null, blockedSquares: [{ x: 2, y: 0 }], timeLimit: null },
        { id: 14, ruleSet: 2, stars: [10, 15, 20], fixedStart: null, blockedSquares: [{ x: 1, y: 1 }], timeLimit: null }, // Removed one blocked square
        { id: 15, ruleSet: 2, stars: [10, 15, 20], fixedStart: null, blockedSquares: [{ x: 0, y: 2 }], timeLimit: null }, // Removed one blocked square

        // Slightly harder blocked
        { id: 16, ruleSet: 2, stars: [12, 16, 21], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 2 }, { x: 2, y: 0 }], timeLimit: null },
        { id: 17, ruleSet: 2, stars: [12, 16, 21], fixedStart: { x: 4, y: 4 }, blockedSquares: [{ x: 1, y: 3 }, { x: 3, y: 1 }], timeLimit: null },
        { id: 18, ruleSet: 2, stars: [14, 18, 22], fixedStart: { x: 2, y: 2 }, blockedSquares: [{ x: 0, y: 0 }, { x: 4, y: 4 }], timeLimit: null },
        { id: 19, ruleSet: 2, stars: [14, 18, 22], fixedStart: { x: 0, y: 4 }, blockedSquares: [{ x: 4, y: 0 }, { x: 2, y: 2 }], timeLimit: null },
        { id: 20, ruleSet: 2, stars: [10, 14, 18], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 2 }, { x: 1, y: 3 }, { x: 3, y: 1 }], timeLimit: null },

        // RuleSet 6: Time Attack (Increased limits)
        { id: 21, ruleSet: 6, stars: [15, 20, 24], fixedStart: null, blockedSquares: [], timeLimit: 150 }, // +30s
        { id: 22, ruleSet: 6, stars: [15, 20, 24], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: 120 }, // +30s
        { id: 23, ruleSet: 6, stars: [18, 22, 25], fixedStart: null, blockedSquares: [], timeLimit: 120 }, // +30s
        { id: 24, ruleSet: 6, stars: [20, 23, 25], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: 90 }, // +15s
        { id: 25, ruleSet: 6, stars: [22, 24, 25], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: 80 } // +20s
    ],
    2: [
        // World 2: Advanced Mechanics - Required Moves & generated solvable paths
        { id: 1, ruleSet: 7, stars: [15, 20, 25], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 5, x: 0, y: 0 }] },
        { id: 2, ruleSet: 7, stars: [15, 20, 25], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 3, y: 0 }, { moveNumber: 8, x: 1, y: 3 }] },
        { id: 3, ruleSet: 7, stars: [15, 20, 25], fixedStart: { x: 4, y: 4 }, blockedSquares: [], timeLimit: 120, requiredMoves: [{ moveNumber: 4, x: 2, y: 2 }, { moveNumber: 10, x: 0, y: 4 }] },
        { id: 4, ruleSet: 7, stars: [14, 18, 21], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 2 }], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 3, y: 0 }] },
        { id: 5, ruleSet: 7, stars: [15, 18, 21], fixedStart: { x: 4, y: 4 }, blockedSquares: [{ x: 1, y: 1 }], timeLimit: null, requiredMoves: [{ moveNumber: 2, x: 2, y: 2 }] },

        { id: 6, ruleSet: 7, stars: [16, 19, 22], fixedStart: { x: 2, y: 0 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 0, y: 2 }] },
        { id: 7, ruleSet: 7, stars: [16, 20, 22], fixedStart: { x: 0, y: 2 }, blockedSquares: [{ x: 4, y: 2 }], timeLimit: null, requiredMoves: [{ moveNumber: 2, x: 2, y: 0 }] },
        { id: 8, ruleSet: 7, stars: [16, 20, 23], fixedStart: { x: 4, y: 0 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 1, y: 0 }] },

        { id: 9, ruleSet: 6, stars: [18, 22, 24], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 2 }], timeLimit: 90 }, // +30s
        { id: 10, ruleSet: 6, stars: [18, 22, 24], fixedStart: { x: 4, y: 4 }, blockedSquares: [], timeLimit: 75 }, // +30s
        { id: 11, ruleSet: 6, stars: [20, 23, 25], fixedStart: null, blockedSquares: [{ x: 1, y: 1 }], timeLimit: 120 }, // +30s
        { id: 12, ruleSet: 6, stars: [20, 23, 25], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: 100 }, // +25s
        { id: 13, ruleSet: 6, stars: [22, 24, 25], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: 80 }, // +20s

        { id: 14, ruleSet: 2, stars: [15, 19, 22], fixedStart: null, blockedSquares: [{ x: 2, y: 2 }, { x: 0, y: 0 }], timeLimit: null },
        { id: 15, ruleSet: 2, stars: [15, 19, 22], fixedStart: { x: 2, y: 2 }, blockedSquares: [{ x: 0, y: 4 }, { x: 4, y: 0 }], timeLimit: null },
        { id: 16, ruleSet: 2, stars: [14, 18, 21], fixedStart: null, blockedSquares: [{ x: 1, y: 1 }, { x: 3, y: 3 }, { x: 2, y: 2 }], timeLimit: null },
        { id: 17, ruleSet: 2, stars: [14, 18, 21], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 0 }, { x: 2, y: 4 }, { x: 4, y: 2 }], timeLimit: null },
        { id: 18, ruleSet: 2, stars: [12, 16, 20], fixedStart: { x: 4, y: 4 }, blockedSquares: [{ x: 0, y: 0 }, { x: 0, y: 4 }, { x: 4, y: 0 }, { x: 2, y: 2 }], timeLimit: null },

        { id: 19, ruleSet: 6, stars: [18, 21, 23], fixedStart: null, blockedSquares: [{ x: 2, y: 2 }], timeLimit: 80 }, // +30s
        { id: 20, ruleSet: 6, stars: [18, 22, 24], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: 70 }, // +30s

        { id: 21, ruleSet: 7, stars: [15, 19, 23], fixedStart: { x: 2, y: 0 }, blockedSquares: [{ x: 0, y: 0 }], timeLimit: null, requiredMoves: [{ moveNumber: 2, x: 4, y: 2 }, { moveNumber: 5, x: 2, y: 4 }] },
        { id: 22, ruleSet: 7, stars: [16, 20, 23], fixedStart: { x: 0, y: 4 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 2, y: 2 }, { moveNumber: 6, x: 4, y: 0 }] },

        { id: 23, ruleSet: 6, stars: [20, 23, 24], fixedStart: { x: 2, y: 2 }, blockedSquares: [{ x: 0, y: 0 }], timeLimit: 85 }, // +30s
        { id: 24, ruleSet: 6, stars: [21, 23, 25], fixedStart: null, blockedSquares: [], timeLimit: 60 }, // +25s
        { id: 25, ruleSet: 6, stars: [22, 24, 25], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: 50 } // +20s
    ]
};

export const RULE_DESCRIPTIONS = {
    1: "Visit as many squares as possible!",
    2: "Avoid the blocked squares!",
    3: "Follow the pre-revealed path!",
    4: "Get a low number in the first row!",
    5: "Stop exactly at the target move!",
    6: "Race against time!",
    7: "Hit the required positions!"
};

export function getLevelConfig(worldId, levelId) {
    const worldLevels = LEVELS[worldId];
    if (!worldLevels) return null;
    return worldLevels.find(l => l.id === levelId) || null;
}

export function getWorldConfig(worldId) {
    return WORLDS.find(w => w.id === worldId) || null;
}
