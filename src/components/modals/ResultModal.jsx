import { useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack, Typography, Button } from '@mui/material'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import soundManager from '@/lib/sounds'
import Stars from '../ui/Stars'

export default function ResultModal({ stars, score, isNewBest, onRetry, onNext, onLevels, hasNext, onUndo, canUndo }) {
    useEffect(() => {
        if (stars > 0) {
            for (let i = 1; i <= stars; i++) setTimeout(() => soundManager.playStar(i), i * 300)
        }
    }, [stars])

    return (
        <Dialog open={true} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', color: 'primary.main' }}>
                {stars > 0 ? 'LEVEL COMPLETE!' : 'TRY AGAIN!'}
            </DialogTitle>
            <DialogContent>
                <Stack alignItems="center" spacing={2}>
                    <Stars count={stars} total={3} />
                    <Typography>SQUARES: {score}</Typography>
                    {isNewBest && (
                        <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <EmojiEventsIcon sx={{ fontSize: 20 }} /> NEW BEST!
                        </Typography>
                    )}
                    <Stack direction="column" spacing={1} width="100%">
                        {stars === 0 && canUndo && (
                            <Button fullWidth variant="contained" color="primary" onClick={() => { soundManager.playClick(); onUndo() }}>
                                UNDO LAST MOVE
                            </Button>
                        )}
                        <Button fullWidth variant="contained" color="secondary" onClick={() => { soundManager.playClick(); onRetry() }}>
                            RESTART
                        </Button>
                        {hasNext && stars > 0 && (
                            <Button fullWidth variant="contained" color="primary" onClick={() => { soundManager.playClick(); onNext() }}>
                                NEXT
                            </Button>
                        )}
                        <Button fullWidth variant="outlined" color="secondary" onClick={() => { soundManager.playClick(); onLevels() }}>
                            LEVELS
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}
