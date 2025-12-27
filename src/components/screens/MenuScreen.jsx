import { Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Switch, Paper } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import InfoIcon from '@mui/icons-material/Info'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MusicOffIcon from '@mui/icons-material/MusicOff'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import { useColorMode } from '@/app/providers'
import { useState, useEffect } from 'react'
import soundManager from '@/lib/sounds'

export default function MenuScreen({ user, onPlay, onAuth, onLogout, muted, onToggleSound, bgmMuted, onToggleBGM, isOnline }) {
    const [showCredits, setShowCredits] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { mode, toggleColorMode } = useColorMode()
    const isDark = mode === 'dark'

    // Mount effect to prevent hydration mismatch for browser-only APIs
    useEffect(() => {
        setMounted(true)
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement)
        document.addEventListener('fullscreenchange', handleFsChange)
        return () => document.removeEventListener('fullscreenchange', handleFsChange)
    }, [])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(e => {
                console.warn("Fullscreen not supported or blocked", e)
            })
        } else {
            document.exitFullscreen()
        }
    }

    // Check if fullscreen is supported (client-side only logic)
    const isFullscreenSupported = mounted &&
        (document.documentElement.requestFullscreen ||
            document.documentElement.webkitRequestFullscreen)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100dvh',
            width: '100%',
            p: { xs: 2, sm: 4 },
            py: { xs: 5, sm: 6 },
            bgcolor: 'background.default',
            fontFamily: '"Press Start 2P", cursive',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0
        }}>

            {/* Title Section */}
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 3, sm: 4 }, // Use gap for reliable spacing
                textAlign: 'center',
                animation: 'titleFloat 3s ease-in-out infinite',
                '@keyframes titleFloat': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' }
                }
            }}>
                <Typography variant="h1" sx={{
                    color: 'text.primary',
                    textShadow: isDark ? '3px 4px 0 #000' : '2px 2px 0 rgba(0,0,0,0.1)',
                    fontSize: { xs: '2.1rem', sm: '3.6rem' },
                    fontWeight: 900,
                    lineHeight: 1,
                    margin: 0
                }}>
                    25
                </Typography>
                <Typography variant="h1" sx={{
                    color: 'text.primary',
                    textShadow: isDark ? '3px 4px 0 #000' : '2px 2px 0 rgba(0,0,0,0.1)',
                    fontSize: { xs: '2.1rem', sm: '3.6rem' },
                    fontWeight: 900,
                    lineHeight: 1,
                    margin: 0
                }}>
                    SQUARES
                </Typography>
            </Box>

            {/* Main Action Stack */}
            <Box sx={{ width: '100%', maxWidth: { xs: '280px', sm: '400px' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                        soundManager.playStart()
                        if (user) onPlay()
                        else onAuth()
                    }}
                    startIcon={<PlayArrowIcon />}
                    sx={{
                        height: { xs: 52, sm: 60 },
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: 0,
                        boxShadow: '4px 4px 0 #000',
                        fontWeight: 'bold',
                        '&:active': { transform: 'translate(2px, 2px)', boxShadow: '2px 2px 0 #000' }
                    }}
                >
                    LEVELS
                </Button>

                <Button
                    variant="contained"
                    fullWidth
                    onClick={() => { soundManager.playStart(); onPlay(true) }}
                    startIcon={<SportsEsportsIcon />}
                    sx={{
                        height: { xs: 52, sm: 60 },
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        bgcolor: 'secondary.main',
                        color: 'secondary.contrastText',
                        borderRadius: 0,
                        boxShadow: '4px 4px 0 #000',
                        fontWeight: 'bold',
                        '&:active': { transform: 'translate(2px, 2px)', boxShadow: '2px 2px 0 #000' }
                    }}
                >
                    FREE PLAY
                </Button>

                {user ? (
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => { soundManager.playClick(); onLogout() }}
                        startIcon={<LogoutIcon />}
                        sx={{
                            height: { xs: 52, sm: 60 },
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : '#eee',
                            color: 'text.primary',
                            borderRadius: 0,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow: '4px 4px 0 #000',
                            fontWeight: 'bold',
                            '&:active': { transform: 'translate(2px, 2px)', boxShadow: '2px 2px 0 #000' },
                            '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.1)' : '#ddd' }
                        }}
                    >
                        LOGOUT: {user.username}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={() => { soundManager.playClick(); onAuth() }}
                        startIcon={<LoginIcon fontSize="small" />}
                        sx={{
                            height: { xs: 52, sm: 60 },
                            fontSize: { xs: '1rem', sm: '1.2rem' },
                            bgcolor: isDark ? '#333' : '#eee',
                            color: 'text.primary',
                            borderRadius: 0,
                            boxShadow: '4px 4px 0 #000',
                            fontWeight: 'bold',
                            '&:active': { transform: 'translate(2px, 2px)', boxShadow: '2px 2px 0 #000' }
                        }}
                    >
                        LOGIN
                    </Button>
                )}
            </Box>

            {/* Bottom Controls Panel */}
            <Box sx={{ width: '100%', maxWidth: { xs: '280px', sm: '400px' } }}>
                <Paper elevation={0} sx={{
                    p: 2,
                    bgcolor: isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.03)',
                    border: '2px solid',
                    borderColor: 'text.primary',
                    borderRadius: 0,
                    mb: 1
                }}>
                    <Stack spacing={2}>
                        <Stack direction="row" spacing={1}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => { soundManager.playClick(); onToggleBGM() }}
                                startIcon={mounted ? (bgmMuted ? <MusicOffIcon sx={{ fontSize: 14 }} /> : <MusicNoteIcon sx={{ color: isDark ? '#FAEC3B' : 'primary.main', fontSize: 14 }} />) : <MusicNoteIcon sx={{ fontSize: 14 }} />}
                                sx={{
                                    fontSize: '0.6rem',
                                    p: 0,
                                    height: 36,
                                    borderColor: 'divider',
                                    color: 'text.primary',
                                    borderRadius: 0,
                                    minWidth: 0
                                }}
                            >
                                MUSIC
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => { soundManager.playClick(); onToggleSound() }}
                                startIcon={mounted ? (muted ? <VolumeOffIcon sx={{ fontSize: 14 }} /> : <VolumeUpIcon sx={{ color: isDark ? '#FAEC3B' : 'primary.main', fontSize: 14 }} />) : <VolumeUpIcon sx={{ fontSize: 14 }} />}
                                sx={{
                                    fontSize: '0.6rem',
                                    p: 0,
                                    height: 36,
                                    borderColor: 'divider',
                                    color: 'text.primary',
                                    borderRadius: 0,
                                    minWidth: 0
                                }}
                            >
                                SFX
                            </Button>
                            {/* Fullscreen Button - Now in the same row */}
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => { soundManager.playClick(); toggleFullscreen() }}
                                startIcon={mounted ? (isFullscreen ? <FullscreenExitIcon sx={{ fontSize: 14 }} /> : <FullscreenIcon sx={{ fontSize: 14 }} />) : <FullscreenIcon sx={{ fontSize: 14 }} />}
                                sx={{
                                    fontSize: '0.6rem',
                                    p: 0,
                                    height: 36,
                                    borderColor: 'divider',
                                    color: 'text.primary',
                                    borderRadius: 0,
                                    minWidth: 0,
                                    visibility: (mounted && isFullscreenSupported) ? 'visible' : 'hidden'
                                }}
                            >
                                FULL
                            </Button>
                        </Stack>

                        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ px: 0.5 }}>
                            <Box
                                onClick={() => { soundManager.playClick(); toggleColorMode() }}
                                sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
                            >
                                {isDark ? <Brightness4Icon sx={{ color: '#FAEC3B', fontSize: 14 }} /> : <Brightness7Icon sx={{ fontSize: 14 }} />}
                                <Typography sx={{ fontSize: '0.65rem', color: 'text.primary' }}>{isDark ? 'DEEP DARK' : 'PAPER LIGHT'}</Typography>
                            </Box>

                            <Switch
                                size="small"
                                checked={isDark}
                                onChange={() => { soundManager.playClick(); toggleColorMode() }}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#FAEC3B' },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#FAEC3B' }
                                }}
                            />
                        </Stack>
                    </Stack>
                </Paper>

                {/* Tiny Credits */}
                <Box
                    onClick={() => { soundManager.playClick(); setShowCredits(true) }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 0.5,
                        cursor: 'pointer',
                        opacity: 0.5,
                        transition: 'opacity 0.2s',
                        '&:hover': { opacity: 1 }
                    }}
                >
                    <InfoIcon sx={{ fontSize: 12 }} />
                    <Typography sx={{ fontSize: '0.5rem' }}>CREDITS</Typography>
                </Box>
            </Box>

            {/* Credits Dialog */}
            <Dialog
                open={showCredits}
                onClose={() => setShowCredits(false)}
                PaperProps={{
                    sx: {
                        bgcolor: isDark ? '#1A1A1A' : '#FFF',
                        border: '2px solid #FAEC3B',
                        borderRadius: 0,
                        maxWidth: 'xs',
                        width: '100%',
                        m: 2
                    }
                }}
            >
                <DialogTitle sx={{ textAlign: 'center', fontFamily: '"Press Start 2P", cursive', color: '#FAEC3B', fontSize: '1rem', pt: 4 }}>
                    CREDITS
                </DialogTitle>
                <DialogContent>
                    <CreditsContent show={showCredits} mode={mode} />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
                    <Button
                        onClick={() => setShowCredits(false)}
                        variant="contained"
                        sx={{
                            fontFamily: '"Press Start 2P", cursive',
                            bgcolor: '#FAEC3B',
                            color: '#000',
                            borderRadius: 0
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

function CreditsContent({ show, mode }) {
    const [txtYasin, setTxtYasin] = useState('')
    const [txtCan, setTxtCan] = useState('')
    const [startCan, setStartCan] = useState(false)

    useEffect(() => {
        if (!show) {
            setTxtYasin(''); setTxtCan(''); setStartCan(false)
            return
        }
        let i = 0
        const name1 = "YASIN OZBINAR"
        const interval = setInterval(() => {
            setTxtYasin(name1.substring(0, i + 1)); i++
            if (i === name1.length) { clearInterval(interval); setTimeout(() => setStartCan(true), 500) }
        }, 80)
        return () => clearInterval(interval)
    }, [show])

    useEffect(() => {
        if (!startCan) return
        let i = 0
        const name2 = "CAN MATIK"
        const interval = setInterval(() => {
            setTxtCan(name2.substring(0, i + 1)); i++
            if (i === name2.length) clearInterval(interval)
        }, 80)
        return () => clearInterval(interval)
    }, [startCan])

    return (
        <Box sx={{ textAlign: 'center', py: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Typography variant="caption" sx={{ display: 'block', fontFamily: '"Press Start 2P", cursive', color: 'text.secondary', mb: 1.5, fontSize: '0.55rem' }}>CONCEPT</Typography>
                <Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive', color: 'text.primary', fontSize: '0.8rem' }}>
                    {txtYasin}{!startCan && show && <Cursor />}
                </Typography>
            </Box>
            <Box>
                <Typography variant="caption" sx={{ display: 'block', fontFamily: '"Press Start 2P", cursive', color: 'text.secondary', mb: 1.5, fontSize: '0.55rem' }}>DEVELOPMENT</Typography>
                <Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive', color: 'text.primary', fontSize: '0.8rem' }}>
                    {txtCan}{startCan && <Cursor />}
                </Typography>
            </Box>
        </Box>
    )
}

function Cursor() {
    return <Box component="span" sx={{ display: 'inline-block', width: '8px', height: '16px', bgcolor: '#FAEC3B', ml: 1, animation: 'blink 0.7s step-end infinite', '@keyframes blink': { '50%': { opacity: 0 } } }}>&nbsp;</Box>
}
