const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '../src/lib/levels.js');
const scriptDir = __dirname; // scripts folder

// Find all world level files
const allFiles = fs.readdirSync(scriptDir).filter(f => f.match(/^world\d+_levels\.json$/));

// Sort them numerically by world ID
allFiles.sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)/)[0]);
    const numB = parseInt(b.match(/(\d+)/)[0]);
    return numA - numB;
});

const WORLDS = [];
const LEVELS = {};

allFiles.forEach(file => {
    const worldId = parseInt(file.match(/(\d+)/)[0]);
    const levels = require(path.join(scriptDir, file));

    LEVELS[worldId] = levels;

    // Config World Metadata
    WORLDS.push({
        id: worldId,
        name: `World ${worldId}`,
        requiredStars: Math.max(0, (worldId - 1) * 30), // 0, 30, 60, 90...
        levels: levels.length
    });
});

const fileContent = `// Game levels data - Generated Dynamically
// Worlds: ${WORLDS.length}

export const WORLDS = ${JSON.stringify(WORLDS, null, 4)};

export const LEVELS = ${JSON.stringify(LEVELS, null, 4)};

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
console.log(`Updated src/lib/levels.js with ${WORLDS.length} worlds.`);
