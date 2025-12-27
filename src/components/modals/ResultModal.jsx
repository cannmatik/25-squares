import { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack, Typography, Button } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ShareIcon from '@mui/icons-material/Share'
import soundManager from '@/lib/sounds'
import Stars from '../ui/Stars'

export default function ResultModal({ stars, score, isNewBest, onRetry, onNext, onLevels, hasNext, isLastLevel, onUndo, canUndo, onShare }) {
    useEffect(() => {
        if (stars > 0) {
            for (let i = 1; i <= stars; i++) setTimeout(() => soundManager.playStar(i), i * 300)
        }
    }, [stars])

    return (
        <Dialog
            open={true}
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
                color: 'primary.main',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: { xs: '1rem', sm: '1.2rem' },
                pt: { xs: 2, sm: 3 },
                px: 1
            }}>
                {stars > 0 ? 'LEVEL COMPLETE!' : 'TRY AGAIN!'}
            </DialogTitle>
            <DialogContent sx={{ pb: { xs: 2, sm: 3 }, px: { xs: 2, sm: 3 } }}>
                <Stack alignItems="center" spacing={{ xs: 2, sm: 3 }}>
                    <Stars count={stars} total={3} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                        {score} SQUARES
                    </Typography>
                    {isNewBest && (
                        <Typography color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 'bold', fontSize: '0.9rem' }}>
                            <EmojiEventsIcon sx={{ fontSize: 18 }} /> NEW BEST!
                        </Typography>
                    )}
                    <Stack direction="column" spacing={1} width="100%">
                        {stars === 0 && canUndo && (
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
                        <Button
                            fullWidth
                            variant="contained"
                            color="warning"
                            onClick={() => { soundManager.playClick(); if (onShare) onShare() }}
                            sx={{ height: { xs: 40, sm: 48 }, fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                            startIcon={<ShareIcon />}
                        >
                            SHARE RESULT
                        </Button>
                        {hasNext && stars > 0 && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => { soundManager.playClick(); onNext() }}
                                sx={{ height: { xs: 40, sm: 48 }, fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                            >
                                {isLastLevel ? 'WORLD COMPLETE!' : 'NEXT LEVEL'}
                            </Button>
                        )}
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
                        >
                            RESTART
                        </Button>
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
                            LEVEL SELECTION
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}
