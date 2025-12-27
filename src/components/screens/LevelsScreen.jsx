import { Box, Typography, Button, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LockIcon from '@mui/icons-material/Lock'
import soundManager from '@/lib/sounds'
import { WORLDS } from '@/lib/levels'
import { useColorMode } from '@/app/providers'

// Stars Component with MUI icons
const Stars = ({ count, total = 3, size = 12, passed = false, isDark = true }) => (
    <Box sx={{ display: 'flex', gap: 0.25, justifyContent: 'center' }}>
        {[...Array(total)].map((_, i) => {
            const filled = i < count
            // On a "passed" level (filled solid button), icons should be dark or contrasting
            // On an "unpassed" level (outlined), icons follow theme secondary
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

export default function LevelsScreen({ currentWorld, levels, progress, onSelectLevel, onBack, isOnline }) {
    const { mode } = useColorMode()
    const isDark = mode === 'dark'
    const world = WORLDS.find(w => w.id === currentWorld)
    const worldStars = (progress[currentWorld] && Object.values(progress[currentWorld]).reduce((a, b) => a + (b.stars || 0), 0)) || 0

    // Use API levels if available, otherwise fallback to standard 25
    const apiLevelIds = levels && levels.length > 0
        ? levels.map(l => l.id).filter(id => id !== null && id !== undefined && typeof id === 'number')
        : []

    const fallbackIds = Array.from({ length: world?.levels || 25 }, (_, i) => i + 1)
    const finalLevelIds = apiLevelIds.length > 0 ? apiLevelIds : fallbackIds
    const levelList = [...new Set(finalLevelIds)].sort((a, b) => a - b)

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
            pt: { xs: 2, sm: 16 } // Add padding for desktop TopBar
        }}>


            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: { xs: 1, sm: 1.5 },
                width: '100%',
                maxWidth: { xs: '320px', sm: '480px' },
                mx: 'auto'
            }}>
                {levelList.map((levelId) => {
                    const stars = progress[currentWorld]?.[levelId]?.stars || 0
                    const passed = stars > 0
                    const locked = levelId > 1 && !progress[currentWorld]?.[levelId - 1]?.stars

                    return (
                        <Button
                            key={levelId}
                            variant={passed ? 'contained' : 'outlined'}
                            disabled={locked}
                            onClick={() => { soundManager.playClick(); onSelectLevel(levelId) }}
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
                                border: passed ? 'none' : '2px solid',
                                borderColor: 'secondary.main',
                                bgcolor: passed ? 'primary.main' : 'transparent',
                                color: passed ? 'primary.contrastText' : 'text.primary',
                                '&:hover': {
                                    bgcolor: passed ? 'primary.dark' : 'rgba(0,0,0,0.05)',
                                    borderColor: 'secondary.main'
                                }
                            }}
                        >
                            {locked ? (
                                <LockIcon sx={{ fontSize: 20, color: 'text.secondary', opacity: 0.5 }} />
                            ) : (
                                <>
                                    <Typography variant="body2" sx={{ fontSize: { xs: '0.85rem', sm: '1.2rem' }, fontWeight: 'bold', lineHeight: 1 }}>
                                        {levelId}
                                    </Typography>
                                    <Stars count={stars} total={3} size={8} passed={passed} isDark={isDark} />
                                </>
                            )}
                        </Button>
                    )
                })}
            </Box>
        </Box>
    )
}
