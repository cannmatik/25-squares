
const fs = require('fs');
const path = require('path');

const levels = require('../generated_levels.json');
const outputPath = path.join(__dirname, '../src/lib/levels.js');

const world1Levels = levels.map(l => ({
    id: l.id,
    ruleSet: 7, // Fixed to 'Hit the required positions' as it matches the generated style
    stars: l.stars,
    fixedStart: l.fixedStart,
    blockedSquares: l.blockedSquares,
    timeLimit: 120,
    requiredMoves: l.requiredMoves,
    tutorial: l.id === 1 ? [
        { move: 0, text: "Welcome! Click the START square to begin.", highlight: l.fixedStart },
        { move: 1, text: "Move to the next highlighted square to continue!", highlight: { x: l.fullPath[1].x, y: l.fullPath[1].y } }
    ] : undefined
}));

const fileContent = `// Game levels data - Generated via Backtracking
// Guaranteed Solvable Paths used for World 1

export const WORLDS = [
    { id: 1, name: "World 1", requiredStars: 0, levels: 25 },
    { id: 2, name: "World 2", requiredStars: 30, levels: 25 }
];

export const LEVELS = {
    1: ${JSON.stringify(world1Levels, null, 4)},
    2: [] // Placeholder for World 2
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
`;

fs.writeFileSync(outputPath, fileContent);
console.log('Updated src/lib/levels.js with generated levels.');
