import { Box, Typography, Button, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import LockIcon from '@mui/icons-material/Lock'
import soundManager from '@/lib/sounds'
import { WORLDS } from '@/lib/levels'
import { useColorMode } from '@/app/providers'

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

    // Create 25 slots for worlds (5x5 grid)
    const worldList = Array.from({ length: 25 }, (_, i) => i + 1)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100dvh',
            width: '100%',
            p: { xs: 2, sm: 3 },
            position: 'relative',
            overflow: 'hidden',
            bgcolor: 'background.default'
        }}>
            {/* Offline Banner */}
            {!isOnline && (
                <Box sx={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    bgcolor: 'error.main', color: '#FFF',
                    p: 1, textAlign: 'center', zIndex: 9999,
                    fontWeight: 'bold', fontSize: '0.8rem',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                    OFFLINE MODE
                </Box>
            )}

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: { xs: 1, sm: 1.5 },
                width: '100%',
                maxWidth: { xs: '320px', sm: '480px' },
                mx: 'auto'
            }}>
                {worldList.map((worldId) => {
                    const world = WORLDS.find(w => w.id === worldId)
                    const exists = !!world

                    if (!exists) {
                        // Empty slot for future worlds
                        return (
                            <Box
                                key={worldId}
                                sx={{
                                    width: '100%',
                                    aspectRatio: '1 / 1',
                                    minWidth: 0,
                                    minHeight: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'rgba(128, 128, 128, 0.05)',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    opacity: 0.3
                                }}
                            >
                                <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                                    {worldId}
                                </Typography>
                            </Box>
                        )
                    }

                    // Existing world
                    const totalLevels = world.levels || 25
                    const worldProgress = progress[worldId] || {}
                    const completedLevels = Object.keys(worldProgress).length
                    const totalStars = Object.values(worldProgress).reduce((a, b) => a + (b.stars || 0), 0)
                    const maxStars = totalLevels * 3

                    // World is unlocked if it's World 1, or if previous world has at least 1 completed level
                    const prevWorldId = worldId - 1
                    const prevProgress = progress[prevWorldId] || {}
                    const locked = worldId > 1 && Object.keys(prevProgress).length === 0
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
                                opacity: locked ? 0.4 : 1,
                                borderRadius: 1,
                                border: hasProgress ? 'none' : '2px solid',
                                borderColor: 'secondary.main',
                                bgcolor: hasProgress ? 'primary.main' : 'transparent',
                                color: hasProgress ? 'primary.contrastText' : 'text.primary',
                                '&:hover': {
                                    bgcolor: hasProgress ? 'primary.dark' : 'rgba(0,0,0,0.05)',
                                    borderColor: 'secondary.main'
                                }
                            }}
                        >
                            {locked ? (
                                <LockIcon sx={{ fontSize: 20, color: 'text.secondary', opacity: 0.5 }} />
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
