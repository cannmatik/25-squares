// Guarantee Level 1 Tutorial
import world1Data from '../../world1_levels.json'
import world2 from '../../world2_levels.json'
import world3 from '../../world3_levels.json'

// Game levels data
export const WORLDS = [
    { id: 1, name: "World 1", requiredStars: 0, levels: 25 },
    { id: 2, name: "World 2", requiredStars: 30, levels: 25 },
    { id: 3, name: "World 3", requiredStars: 60, levels: 25 }
]

// Ensure we use the latest JSON data
export const LEVELS = {
    1: world1Data,
    2: world2,
    3: world3
}

export const RULE_DESCRIPTIONS = {
    1: "REACH ANY NUMBER!",
    2: "AVOID BLOCKED SQUARES!",
    3: "SOME MOVES REVEALED!",
    4: "AVOID ROW 1 EARLY!",
    5: "DON'T MAKE MISTAKES!",
    6: "BEAT THE CLOCK!",
    7: "FIND THE PATH!"
}

export const getLevelConfig = (worldId, levelId) => {
    const worldLevels = LEVELS[worldId]
    if (!worldLevels) return null
    return worldLevels.find(l => l.id === parseInt(levelId))
}
