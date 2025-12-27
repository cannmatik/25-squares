import { Box, Typography, Button, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import LockIcon from '@mui/icons-material/Lock'
import soundManager from '@/lib/sounds'
import { WORLDS } from '@/lib/levels'
import { useColorMode } from '@/app/providers'
import { useState, useEffect } from 'react'

// Stars Component with MUI icons
const Stars = ({ count, total = 3, size = 12, passed = false, isDark = true }) => (
    <Box sx={{ display: 'flex', gap: 0.25, justifyContent: 'center' }}>
        {[...Array(total)].map((_, i) => {
            const filled = i < count
            const color = passed
                ? (filled ? 'var(--btn-primary-text)' : 'rgba(0,0,0,0.2)')
                : (filled ? '#FAEC3B' : 'var(--text-color)')

            return filled ? (
                <StarIcon key={i} sx={{ fontSize: size, color }} />
            ) : (
                <StarBorderIcon key={i} sx={{ fontSize: size, color, opacity: 0.5 }} />
            )
        })}
    </Box>
)

export default function WorldsScreen({ progress, onSelectWorld, onBack, isOnline }) {
    const { mode } = useColorMode()
    const isDark = mode === 'dark'

    // Load World Config (Unlock Rules)
    const [worldRules, setWorldRules] = useState({})

    useEffect(() => {
        try {
            const cached = localStorage.getItem('cachedWorldsConfig')
            if (cached) {
                const rules = JSON.parse(cached)
                const ruleMap = {}
                rules.forEach(r => {
                    ruleMap[r.id] = r.requiredStars
                })
                setWorldRules(ruleMap)
            }
        } catch (e) {
            console.error('Failed to parse world config', e)
        }
    }, [])

    // Create 25 slots for worlds (5x5 grid)
    const worldList = Array.from({ length: 25 }, (_, i) => i + 1)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            height: '100dvh',
            width: '100%',
            p: { xs: 2, sm: 3 },
            position: 'relative',
            overflow: 'hidden',
            bgcolor: 'background.default',
            pt: { xs: 14, sm: 16 } // Standardized padding for TopBar clearance
        }}>


            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 1,
                width: '100%',
                maxWidth: { xs: '320px', sm: '400px' },
                mx: 'auto'
            }}>
                {worldList.map((worldId) => {
                    const world = WORLDS.find(w => w.id === worldId) || { id: worldId, levels: 25 } // Fallback if missing in WORLDS

                    // Existing world data
                    const totalLevels = world.levels || 25
                    const worldProgress = progress[worldId] || {}
                    const completedLevels = Object.keys(worldProgress).length
                    const totalStars = Object.values(worldProgress).reduce((a, b) => a + (b.stars || 0), 0)
                    const maxStars = totalLevels * 3

                    // Calculate Grand Total Stars across ALL worlds
                    const grandTotalStars = Object.values(progress).reduce((acc, worldP) => {
                        return acc + Object.values(worldP).reduce((a, b) => a + (b.stars || 0), 0)
                    }, 0)

                    // Unlock Condition
                    // Default Fallback Logic (if no DB config):
                    let fallbackRequired = 0
                    if (worldId > 1) {
                        let gap = 35
                        for (let j = 2; j <= worldId; j++) {
                            fallbackRequired += Math.floor(gap)
                            gap += 1.5
                        }
                    }

                    const requiredStarsToUnlock = worldRules[worldId] !== undefined ? worldRules[worldId] : fallbackRequired
                    const locked = worldId > 1 && grandTotalStars < requiredStarsToUnlock
                    const hasProgress = completedLevels > 0

                    return (
                        <Button
                            key={worldId}
                            variant={hasProgress ? 'contained' : 'outlined'}
                            disabled={locked}
                            onClick={() => { soundManager.playClick(); onSelectWorld(worldId) }}
                            sx={{
                                width: '100%',
                                aspectRatio: '1 / 1',
                                minWidth: 0,
                                minHeight: 0,
                                p: { xs: 0.5, sm: 1 },
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: { xs: 0.25, sm: 0.5 },
                                overflow: 'hidden',
                                opacity: locked ? 0.6 : 1,
                                borderRadius: 1,
                                border: hasProgress ? 'none' : '2px solid',
                                borderColor: locked ? 'text.disabled' : 'secondary.main',
                                bgcolor: hasProgress ? 'primary.main' : (locked ? 'action.disabledBackground' : 'transparent'),
                                color: hasProgress ? 'primary.contrastText' : 'text.primary',
                                '&:hover': {
                                    bgcolor: hasProgress ? 'primary.dark' : 'rgba(0,0,0,0.05)',
                                    borderColor: 'secondary.main'
                                }
                            }}
                        >
                            {locked ? (
                                <>
                                    <LockIcon sx={{ fontSize: 20, color: 'text.secondary', opacity: 0.7, mb: 0.5 }} />
                                    <Typography variant="caption" sx={{ fontSize: '0.65rem', color: 'text.secondary', fontWeight: 'bold', textAlign: 'center', lineHeight: 1.1 }}>
                                        {requiredStarsToUnlock} <StarIcon sx={{ fontSize: 10, verticalAlign: 'middle', mb: 0.2, color: '#FAEC3B' }} />
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', sm: '1.2rem' }, fontWeight: 'bold', lineHeight: 1 }}>
                                        {worldId}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.25}>
                                        <Typography variant="caption" sx={{ fontSize: { xs: '0.5rem', sm: '0.6rem' }, fontWeight: 'bold' }}>
                                            {totalStars}/{maxStars}
                                        </Typography>
                                        <StarIcon sx={{ fontSize: { xs: 6, sm: 8 } }} />
                                    </Stack>
                                </>
                            )}
                        </Button>
                    )
                })}
            </Box>
        </Box>
    )
}
