'use client'

import { Box, Button, Typography, Stack } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Link from 'next/link'
import Stars from '@/components/ui/Stars'

export default function ShareContent({ world, level, score, stars }) {
    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#14141E', // Dark theme consistent with game
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            textAlign: 'center'
        }}>
            <Typography variant="h3" sx={{
                fontFamily: '"Press Start 2P"',
                color: '#FAEC3B',
                mb: 4,
                textShadow: '4px 4px 0px #000',
                fontSize: { xs: '1.5rem', sm: '3rem' }
            }}>
                25 SQUARES
            </Typography>

            <Box sx={{
                p: { xs: 3, sm: 4 },
                bgcolor: 'rgba(255,255,255,0.05)',
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                mb: 4,
                maxWidth: 500,
                width: '100%'
            }}>
                <Typography variant="subtitle1" color="#4CAF50" sx={{ fontFamily: '"Press Start 2P"', mb: 2, fontSize: { xs: '0.8rem', sm: '1rem' } }}>
                    LEVEL COMPLETED!
                </Typography>

                <Typography variant="h5" color="white" sx={{ fontWeight: 'bold', mb: 1, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                    WORLD {world} • LEVEL {level}
                </Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, sm: 4 }} justifyContent="center" sx={{ my: 3 }}>
                    <Box>
                        <Typography variant="caption" color="#aaa" display="block">SCORE</Typography>
                        <Typography variant="h4" color="#FAEC3B" sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>{score}</Typography>
                    </Box>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Typography variant="caption" color="#aaa" display="block">STARS</Typography>
                        <Stars count={stars} size={32} />
                    </Box>
                </Stack>

                <Typography color="#ccc" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Can you do better?
                </Typography>
            </Box>

            <Link href="/" style={{ textDecoration: 'none' }}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    sx={{
                        fontFamily: '"Press Start 2P"',
                        bgcolor: '#FAEC3B',
                        color: '#000',
                        fontSize: { xs: '0.8rem', sm: '1rem' },
                        py: { xs: 1.5, sm: 2 },
                        px: { xs: 3, sm: 4 },
                        '&:hover': { bgcolor: '#fff' }
                    }}
                >
                    PLAY NOW
                </Button>
            </Link>
        </Box>
    )
}
