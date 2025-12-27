import { Box, Typography, Button, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import LockIcon from '@mui/icons-material/Lock'
import soundManager from '@/lib/sounds'
import { WORLDS } from '@/lib/levels'

export default function WorldsScreen({ progress, onSelectWorld, onBack, isOnline }) {
    // Create 25 slots for worlds (5x5 grid)
    const worldSlots = Array.from({ length: 25 }, (_, i) => {
        const worldId = i + 1
        const world = WORLDS.find(w => w.id === worldId)
        return { id: worldId, exists: !!world, world }
    })

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100dvh',
            width: '100%',
            p: 2,
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Offline Banner */}
            {!isOnline && (
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    bgcolor: '#FF0000', color: '#FFF',
                    p: 1, textAlign: 'center', zIndex: 9999,
                    fontWeight: 'bold', fontSize: '0.9rem',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}>
                    NO CONNECTION - PLAYING OFFLINE
                </Box>
            )}

            {/* Header moved to global Top Bar */}

            {/* 5x5 Grid - 25 world slots */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 1,
                width: '100%',
                maxWidth: { xs: '280px', sm: '400px' }
            }}>
                {worldSlots.map((slot) => {
                    const { id: worldId, exists, world } = slot

                    if (!exists) {
                        // Non-existent world - gray placeholder
                        return (
                            <Box
                                key={worldId}
                                sx={{
                                    aspectRatio: '1 / 1',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(60, 60, 60, 0.3)',
                                    border: '1px solid rgba(100, 100, 100, 0.3)',
                                    borderRadius: 0,
                                    opacity: 0.4,
                                    minHeight: 0
                                }}
                            >
                                <Typography sx={{ fontSize: '0.6rem', color: 'rgba(150,150,150,0.5)' }}>
                                    {worldId}
                                </Typography>
                            </Box>
                        )
                    }

                    // Existing world
                    const totalLevels = world.levels
                    const completedLevels = progress[worldId] ? Object.keys(progress[worldId]).length : 0
                    const totalStars = progress[worldId] ? Object.values(progress[worldId]).reduce((a, b) => a + (b.stars || 0), 0) : 0
                    const maxStars = totalLevels * 3

                    // World is unlocked if it's World 1, or if previous world has at least 1 completed level
                    const prevWorldId = worldId - 1
                    const locked = worldId > 1 && (!progress[prevWorldId] || Object.keys(progress[prevWorldId]).length === 0)
                    const hasProgress = completedLevels > 0

                    return (
                        <Button
                            key={worldId}
                            variant={hasProgress ? 'contained' : 'outlined'}
                            color={hasProgress ? 'primary' : 'secondary'}
                            disabled={locked}
                            onClick={() => { soundManager.playClick(); onSelectWorld(worldId) }}
                            sx={{
                                aspectRatio: '1 / 1',
                                minWidth: 0,
                                width: '100%',
                                p: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 0.25,
                                opacity: locked ? 0.5 : 1,
                                borderRadius: 0,
                                minHeight: 0,
                            }}
                        >
                            {locked ? (
                                <LockIcon sx={{ fontSize: 18, color: '#ECECEC' }} />
                            ) : (
                                <>
                                    <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: 1 }}>
                                        {worldId}
                                    </Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <Typography variant="caption" sx={{ fontSize: '0.55rem', fontWeight: 'bold' }}>
                                            {totalStars}/{maxStars}
                                        </Typography>
                                        <StarIcon sx={{ fontSize: 12 }} />
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
