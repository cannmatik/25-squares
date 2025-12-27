
const fs = require('fs');
const path = require('path');

// Load all world levels
const world1 = require('../world1_levels.json');
const world2 = require('../world2_levels.json');
const world3 = require('../world3_levels.json');
const outputPath = path.join(__dirname, '../src/lib/levels.js');

const fileContent = `// Game levels data - Generated via Backtracking
// Guaranteed Solvable Paths

export const WORLDS = [
    { id: 1, name: "World 1", requiredStars: 0, levels: 25 },
    { id: 2, name: "World 2", requiredStars: 30, levels: 25 },
    { id: 3, name: "World 3", requiredStars: 60, levels: 25 }
];

export const LEVELS = {
    1: ${JSON.stringify(world1, null, 4)},
    2: ${JSON.stringify(world2, null, 4)},
    3: ${JSON.stringify(world3, null, 4)}
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
console.log('Updated src/lib/levels.js with World 1, 2, and 3 levels.');
