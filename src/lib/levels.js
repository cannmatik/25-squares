// Game levels data

export const WORLDS = [
    { id: 1, name: "World 1", requiredStars: 0, levels: 25 },
    { id: 2, name: "World 2", requiredStars: 40, levels: 25 }
];

export const LEVELS = {
    1: [
        { id: 1, ruleSet: 1, stars: [10, 12, 15], fixedStart: null, blockedSquares: [], timeLimit: null },
        { id: 2, ruleSet: 1, stars: [12, 16, 20], fixedStart: null, blockedSquares: [], timeLimit: null },
        { id: 3, ruleSet: 1, stars: [14, 18, 22], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: null },
        { id: 4, ruleSet: 1, stars: [16, 20, 23], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: null },
        { id: 5, ruleSet: 1, stars: [18, 21, 23], fixedStart: { x: 4, y: 0 }, blockedSquares: [], timeLimit: null },
        { id: 6, ruleSet: 1, stars: [20, 22, 24], fixedStart: { x: 2, y: 4 }, blockedSquares: [], timeLimit: null },
        { id: 7, ruleSet: 1, stars: [22, 23, 24], fixedStart: { x: 4, y: 4 }, blockedSquares: [], timeLimit: null },
        { id: 8, ruleSet: 2, stars: [14, 18, 22], fixedStart: null, blockedSquares: [{ x: 2, y: 2 }], timeLimit: null },
        { id: 9, ruleSet: 2, stars: [14, 18, 22], fixedStart: null, blockedSquares: [{ x: 0, y: 4 }], timeLimit: null },
        { id: 10, ruleSet: 2, stars: [16, 20, 23], fixedStart: null, blockedSquares: [{ x: 4, y: 0 }], timeLimit: null },
        { id: 11, ruleSet: 2, stars: [16, 20, 23], fixedStart: null, blockedSquares: [{ x: 1, y: 1 }], timeLimit: null },
        { id: 12, ruleSet: 2, stars: [18, 21, 23], fixedStart: null, blockedSquares: [{ x: 3, y: 3 }], timeLimit: null },
        { id: 13, ruleSet: 2, stars: [18, 21, 23], fixedStart: null, blockedSquares: [{ x: 2, y: 0 }], timeLimit: null },
        { id: 14, ruleSet: 2, stars: [14, 18, 22], fixedStart: null, blockedSquares: [{ x: 1, y: 1 }, { x: 3, y: 3 }], timeLimit: null },
        { id: 15, ruleSet: 2, stars: [14, 18, 22], fixedStart: null, blockedSquares: [{ x: 0, y: 2 }, { x: 4, y: 2 }], timeLimit: null },
        { id: 16, ruleSet: 2, stars: [16, 20, 23], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 2 }, { x: 2, y: 0 }], timeLimit: null },
        { id: 17, ruleSet: 2, stars: [16, 20, 23], fixedStart: { x: 4, y: 4 }, blockedSquares: [{ x: 1, y: 3 }, { x: 3, y: 1 }], timeLimit: null },
        { id: 18, ruleSet: 2, stars: [18, 21, 23], fixedStart: { x: 2, y: 2 }, blockedSquares: [{ x: 0, y: 0 }, { x: 4, y: 4 }], timeLimit: null },
        { id: 19, ruleSet: 2, stars: [18, 21, 23], fixedStart: { x: 0, y: 4 }, blockedSquares: [{ x: 4, y: 0 }, { x: 2, y: 2 }], timeLimit: null },
        { id: 20, ruleSet: 2, stars: [14, 16, 20], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 2 }, { x: 1, y: 3 }, { x: 3, y: 1 }], timeLimit: null },
        { id: 21, ruleSet: 6, stars: [22, 23, 25], fixedStart: null, blockedSquares: [], timeLimit: 120 },
        { id: 22, ruleSet: 6, stars: [22, 24, 25], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: 90 },
        { id: 23, ruleSet: 6, stars: [23, 24, 25], fixedStart: null, blockedSquares: [], timeLimit: 90 },
        { id: 24, ruleSet: 6, stars: [24, 24, 25], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: 75 },
        { id: 25, ruleSet: 6, stars: [25, 25, 25], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: 60 }
    ],
    2: [
        { id: 1, ruleSet: 7, stars: [18, 21, 24], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 3, y: 0 }] },
        { id: 2, ruleSet: 7, stars: [18, 21, 24], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 2, x: 4, y: 4 }] },
        { id: 3, ruleSet: 7, stars: [19, 22, 24], fixedStart: { x: 4, y: 0 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 1, y: 0 }] },
        { id: 4, ruleSet: 7, stars: [16, 19, 22], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 2 }], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 3, y: 0 }] },
        { id: 5, ruleSet: 7, stars: [17, 20, 22], fixedStart: { x: 4, y: 4 }, blockedSquares: [{ x: 1, y: 1 }], timeLimit: null, requiredMoves: [{ moveNumber: 2, x: 2, y: 2 }] },
        { id: 6, ruleSet: 7, stars: [18, 20, 23], fixedStart: { x: 2, y: 0 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 0, y: 2 }] },
        { id: 7, ruleSet: 7, stars: [18, 21, 23], fixedStart: { x: 0, y: 2 }, blockedSquares: [{ x: 4, y: 2 }], timeLimit: null, requiredMoves: [{ moveNumber: 2, x: 2, y: 0 }] },
        { id: 8, ruleSet: 7, stars: [19, 21, 24], fixedStart: { x: 4, y: 0 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 1, y: 0 }] },
        { id: 9, ruleSet: 6, stars: [22, 23, 25], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 2 }], timeLimit: 60 },
        { id: 10, ruleSet: 6, stars: [22, 24, 25], fixedStart: { x: 4, y: 4 }, blockedSquares: [], timeLimit: 45 },
        { id: 11, ruleSet: 6, stars: [23, 24, 25], fixedStart: null, blockedSquares: [{ x: 1, y: 1 }], timeLimit: 90 },
        { id: 12, ruleSet: 6, stars: [24, 24, 25], fixedStart: { x: 2, y: 2 }, blockedSquares: [], timeLimit: 75 },
        { id: 13, ruleSet: 6, stars: [25, 25, 25], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: 60 },
        { id: 14, ruleSet: 2, stars: [18, 21, 23], fixedStart: null, blockedSquares: [{ x: 2, y: 2 }, { x: 0, y: 0 }], timeLimit: null },
        { id: 15, ruleSet: 2, stars: [18, 21, 23], fixedStart: { x: 2, y: 2 }, blockedSquares: [{ x: 0, y: 4 }, { x: 4, y: 0 }], timeLimit: null },
        { id: 16, ruleSet: 2, stars: [16, 20, 22], fixedStart: null, blockedSquares: [{ x: 1, y: 1 }, { x: 3, y: 3 }, { x: 2, y: 2 }], timeLimit: null },
        { id: 17, ruleSet: 2, stars: [16, 20, 22], fixedStart: { x: 0, y: 0 }, blockedSquares: [{ x: 2, y: 0 }, { x: 2, y: 4 }, { x: 4, y: 2 }], timeLimit: null },
        { id: 18, ruleSet: 2, stars: [15, 18, 21], fixedStart: { x: 4, y: 4 }, blockedSquares: [{ x: 0, y: 0 }, { x: 0, y: 4 }, { x: 4, y: 0 }, { x: 2, y: 2 }], timeLimit: null },
        { id: 19, ruleSet: 6, stars: [20, 22, 24], fixedStart: null, blockedSquares: [{ x: 2, y: 2 }], timeLimit: 50 },
        { id: 20, ruleSet: 6, stars: [21, 23, 25], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: 40 },
        { id: 21, ruleSet: 7, stars: [18, 21, 24], fixedStart: { x: 2, y: 0 }, blockedSquares: [{ x: 0, y: 0 }], timeLimit: null, requiredMoves: [{ moveNumber: 2, x: 4, y: 2 }, { moveNumber: 5, x: 2, y: 4 }] },
        { id: 22, ruleSet: 7, stars: [19, 22, 24], fixedStart: { x: 0, y: 4 }, blockedSquares: [], timeLimit: null, requiredMoves: [{ moveNumber: 3, x: 2, y: 2 }, { moveNumber: 6, x: 4, y: 0 }] },
        { id: 23, ruleSet: 6, stars: [23, 24, 25], fixedStart: { x: 2, y: 2 }, blockedSquares: [{ x: 0, y: 0 }], timeLimit: 55 },
        { id: 24, ruleSet: 6, stars: [24, 24, 25], fixedStart: null, blockedSquares: [], timeLimit: 35 },
        { id: 25, ruleSet: 6, stars: [25, 25, 25], fixedStart: { x: 0, y: 0 }, blockedSquares: [], timeLimit: 30 }
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
