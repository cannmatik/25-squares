import { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack, Typography, Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import IosShareIcon from '@mui/icons-material/IosShare'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive'
import soundManager from '@/lib/sounds'
import Stars from '../ui/Stars'

export default function ResultModal({ stars, score, isNewBest, levelConfig, completedCheckpoints, onRetry, onNext, onLevels, hasNext, isLastLevel, onUndo, canUndo, onShare }) {
    const isInfinite = !!levelConfig?.levelNumber // Infinite levels have levelNumber
    const isFreePlay = !levelConfig // Free Play has no levelConfig
    const showStars = !isInfinite && !isFreePlay // Only show stars for regular levels

    useEffect(() => {
        if (stars > 0 && showStars) {
            for (let i = 1; i <= stars; i++) setTimeout(() => soundManager.playStar(i), i * 300)
        }
    }, [stars, showStars])

    return (
        <Dialog
            open={true}
            sx={{ zIndex: 2000 }}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'text.primary',
                    backgroundImage: 'none'
                }
            }}
        >
            <DialogTitle sx={{
                textAlign: 'center',
                color: isInfinite ? 'error.main' : 'primary.main',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: { xs: '1rem', sm: '1.2rem' },
                pt: { xs: 2, sm: 3 },
                px: 1
            }}>
                {isInfinite
                    ? (stars > 0 ? 'LEVEL CLEARED!' : 'GAME OVER!')
                    : (stars > 0 ? 'LEVEL COMPLETE!' : 'TRY AGAIN!')
                }
            </DialogTitle>
            <DialogContent sx={{ pb: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
                <Stack alignItems="center" spacing={{ xs: 2, sm: 3 }}>
                    {/* Stars for regular levels only */}
                    {showStars && <Stars count={stars} total={3} />}

                    {/* Infinite Play: Show Level Reached */}
                    {isInfinite && (
                        <Stack alignItems="center" spacing={1}>
                            <AllInclusiveIcon sx={{ fontSize: 48, color: 'error.main' }} />
                            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                                LEVEL {levelConfig.levelNumber}
                            </Typography>
                            {stars === 0 && (
                                <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                                    Your run has ended. {isNewBest ? 'New high score!' : 'Keep trying!'}
                                </Typography>
                            )}
                        </Stack>
                    )}

                    {/* Objectives for regular levels */}
                    {!isInfinite && levelConfig && (levelConfig.minMoves || levelConfig.minCheckpoints) && (
                        <Stack spacing={0.5} alignItems="center" sx={{ my: 1, bgcolor: 'rgba(0,0,0,0.05)', p: 1, borderRadius: 1, width: '100%' }}>
                            <Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.secondary', letterSpacing: 1 }}>OBJECTIVES</Typography>
                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2 }} alignItems="center">
                                {levelConfig.minCheckpoints !== null && (
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: (completedCheckpoints >= levelConfig.minCheckpoints) ? 'success.main' : 'error.main', fontSize: { xs: '0.8rem', sm: '0.875rem' }, textAlign: 'center' }}>
                                        Checks: {completedCheckpoints ?? 0}/{levelConfig.requiredMoves?.length || 0} (Min: {levelConfig.minCheckpoints})
                                    </Typography>
                                )}
                                {levelConfig.minMoves !== null && (
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: (score >= levelConfig.minMoves) ? 'success.main' : 'error.main', fontSize: { xs: '0.8rem', sm: '0.875rem' }, textAlign: 'center' }}>
                                        Moves: {score}/{levelConfig.minMoves} (Min)
                                    </Typography>
                                )}
                            </Stack>
                        </Stack>
                    )}

                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                        {score} SQUARES
                    </Typography>
                    {isNewBest && (
                        <Typography color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 'bold', fontSize: '0.9rem' }}>
                            <EmojiEventsIcon sx={{ fontSize: 18 }} /> NEW BEST!
                        </Typography>
                    )}
                    <Stack direction="column" spacing={1} width="100%">
                        {/* Undo button - NOT for infinite */}
                        {!isInfinite && stars === 0 && canUndo && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => { soundManager.playClick(); onUndo() }}
                                sx={{ height: { xs: 40, sm: 48 }, fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                            >
                                UNDO LAST MOVE
                            </Button>
                        )}

                        {/* Share button */}
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => { soundManager.playClick(); if (onShare) onShare() }}
                            sx={{
                                height: { xs: 40, sm: 48 },
                                fontWeight: 'bold',
                                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                bgcolor: '#D32F2F',
                                color: '#FFF',
                                '&:hover': { bgcolor: '#B71C1C' }
                            }}
                            startIcon={<IosShareIcon />}
                        >
                            SHARE RESULT
                        </Button>

                        {/* Next Level - Infinite: only if won | Regular: if hasNext and won */}
                        {stars > 0 && (isInfinite || hasNext) && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => { soundManager.playClick(); onNext() }}
                                sx={{ height: { xs: 40, sm: 48 }, fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                            >
                                {isInfinite ? 'NEXT LEVEL' : (isLastLevel ? 'WORLD COMPLETE!' : 'NEXT LEVEL')}
                            </Button>
                        )}

                        {/* Restart - NOT for infinite */}
                        {!isInfinite && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={() => { soundManager.playClick(); onRetry() }}
                                sx={{
                                    height: { xs: 40, sm: 48 },
                                    fontWeight: 'bold',
                                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                    bgcolor: 'secondary.main',
                                    color: 'secondary.contrastText',
                                    border: '2px solid',
                                    borderColor: 'text.primary'
                                }}
                                startIcon={<RefreshIcon />}
                            >
                                RESTART
                            </Button>
                        )}

                        {/* Level Selection / Main Menu */}
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => { soundManager.playClick(); onLevels() }}
                            sx={{
                                height: { xs: 40, sm: 48 },
                                fontWeight: 'bold',
                                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                                borderColor: 'text.primary',
                                color: 'text.primary'
                            }}
                        >
                            {isInfinite ? 'MAIN MENU' : (levelConfig ? 'LEVEL SELECTION' : 'MAIN MENU')}
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}
