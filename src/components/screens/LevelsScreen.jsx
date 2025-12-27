import { Box, Typography, Button, Stack } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LockIcon from '@mui/icons-material/Lock'
import soundManager from '@/lib/sounds'
import { WORLDS } from '@/lib/levels'

// Stars Component with MUI icons
// dark prop: use dark colors for completed (yellow background) levels
const Stars = ({ count, total = 3, size = 12, dark = false }) => (
    <Box sx={{ display: 'flex', gap: 0.25, justifyContent: 'center' }}>
        {[...Array(total)].map((_, i) => {
            const filled = i < count
            const color = dark
                ? (filled ? '#001E1E' : 'rgba(0, 30, 30, 0.4)')
                : (filled ? '#FAEC3B' : 'rgba(236, 236, 236, 0.4)')
            return filled ? (
                <StarIcon key={i} sx={{ fontSize: size, color }} />
            ) : (
                <StarBorderIcon key={i} sx={{ fontSize: size, color }} />
            )
        })}
    </Box>
)

export default function LevelsScreen({ currentWorld, levels, progress, onSelectLevel, onBack, isOnline }) {
    const world = WORLDS.find(w => w.id === currentWorld)
    const worldStars = (progress[currentWorld] && Object.values(progress[currentWorld]).reduce((a, b) => a + (b.stars || 0), 0)) || 0

    // Use API levels if available, otherwise fallback to standard 25
    // API returns 'id' property (numeric levelId)
    const apiLevelIds = levels && levels.length > 0
        ? levels.map(l => l.id).filter(id => id !== null && id !== undefined && typeof id === 'number')
        : []



    const fallbackIds = Array.from({ length: world?.levels || 25 }, (_, i) => i + 1)

    // Use API IDs if we have them, otherwise fallback
    const finalLevelIds = apiLevelIds.length > 0 ? apiLevelIds : fallbackIds

    // Deduplicate and Sort
    const levelList = [...new Set(finalLevelIds)].sort((a, b) => a - b)

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

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: 1,
                width: '100%',
                maxWidth: { xs: '280px', sm: '400px' }
            }}>
                {levelList.map((levelId) => {
                    const passed = progress[currentWorld]?.[levelId]?.stars > 0
                    const stars = progress[currentWorld]?.[levelId]?.stars || 0
                    // Unlock logic: Level 1 is always unlocked. Others need previous passed.
                    const locked = levelId > 1 && !progress[currentWorld]?.[levelId - 1]?.stars

                    return (
                        <Button
                            key={levelId}
                            variant={passed ? 'contained' : 'outlined'}
                            color={passed ? 'primary' : 'secondary'}
                            disabled={locked}
                            onClick={() => { soundManager.playStart(); onSelectLevel(levelId) }}
                            sx={{
                                aspectRatio: '1 / 1',
                                minWidth: 0,
                                width: '100%',
                                p: 0.5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 0.25,
                                opacity: locked ? 0.5 : 1,
                                borderRadius: 0,
                                '& .MuiButton-root': {
                                    padding: 0
                                }
                            }}
                        >
                            {locked ? (
                                <LockIcon sx={{ fontSize: 18, color: '#ECECEC' }} />
                            ) : (
                                <>
                                    <Typography variant="body2" sx={{ fontSize: '1rem', fontWeight: 'bold', lineHeight: 1 }}>
                                        {levelId}
                                    </Typography>
                                    <Stars count={stars} total={3} size={10} dark={passed} />
                                </>
                            )}
                        </Button>
                    )
                })}
            </Box>
        </Box>
    )
}
