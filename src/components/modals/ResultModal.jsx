import { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack, Typography, Button } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import soundManager from '@/lib/sounds'
import Stars from '../ui/Stars'

export default function ResultModal({ stars, score, isNewBest, onRetry, onNext, onLevels, hasNext, isLastLevel, onUndo, canUndo }) {
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
                fontSize: '1.2rem',
                pt: 3
            }}>
                {stars > 0 ? 'LEVEL COMPLETE!' : 'TRY AGAIN!'}
            </DialogTitle>
            <DialogContent sx={{ pb: 3 }}>
                <Stack alignItems="center" spacing={3}>
                    <Stars count={stars} total={3} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                        {score} SQUARES
                    </Typography>
                    {isNewBest && (
                        <Typography color="primary.main" sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontWeight: 'bold' }}>
                            <EmojiEventsIcon sx={{ fontSize: 20 }} /> NEW BEST!
                        </Typography>
                    )}
                    <Stack direction="column" spacing={1.5} width="100%">
                        {stars === 0 && canUndo && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => { soundManager.playClick(); onUndo() }}
                                sx={{ height: 48, fontWeight: 'bold' }}
                            >
                                UNDO LAST MOVE
                            </Button>
                        )}
                        {hasNext && stars > 0 && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => { soundManager.playClick(); onNext() }}
                                sx={{ height: 48, fontWeight: 'bold' }}
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
                                height: 48,
                                fontWeight: 'bold',
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
                                height: 48,
                                fontWeight: 'bold',
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
