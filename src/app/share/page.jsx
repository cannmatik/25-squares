
import { Box, Button, Typography, Stack } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Link from 'next/link'

export async function generateMetadata({ searchParams }) {
    const { world, level, score, stars } = searchParams

    // Construct the OG Image URL
    const params = new URLSearchParams()
    if (world) params.set('world', world)
    if (level) params.set('level', level)
    if (score) params.set('score', score)
    if (stars) params.set('stars', stars)

    // Use the deployed URL for production, or relative for now (Next.js handles absolute URL resolution in metadata usually, but OG often needs absolute)
    // For now we rely on Next.js resolving it relative to base URL
    const ogUrl = `/api/og?${params.toString()}`

    return {
        title: '25 SQUARES - Can you beat my score?',
        description: `I scored ${score || 0} on World ${world || 1} Level ${level || 1}! Play now.`,
        openGraph: {
            title: '25 SQUARES - LEVEL COMPLETED',
            description: `Score: ${score} | Stars: ${stars}/3`,
            images: [
                {
                    url: ogUrl,
                    width: 1200,
                    height: 630,
                    alt: 'Level Completion',
                },
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: '25 SQUARES',
            description: `I scored ${score} on Level ${world}-${level}!`,
            images: [ogUrl],
        },
    }
}

export default function SharePage({ searchParams }) {
    const { world, level, score, stars } = searchParams

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
                    <Box>
                        <Typography variant="caption" color="#aaa" display="block">STARS</Typography>
                        <Typography variant="h4" color="#FAEC3B" sx={{ fontWeight: 'bold', fontSize: { xs: '1.8rem', sm: '2.125rem' } }}>{stars}/3</Typography>
                    </Box>
                </Stack>

                <Typography color="#ccc" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    Can you do better?
                </Typography>
            </Box>

            <Link href="/" passHref style={{ textDecoration: 'none' }}>
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
