import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import InfoIcon from '@mui/icons-material/Info'
import { useColorMode } from '@/app/providers'
import { useState, useEffect } from 'react'
import soundManager from '@/lib/sounds'
import TopBar from '@/components/TopBar'
import AuthModal from '@/components/modals/AuthModal'

export default function MenuScreen({ user, onPlay, onAuth, onLogout, isOnline }) {
    const [showCredits, setShowCredits] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [activeSection, setActiveSection] = useState(null)
    const { mode } = useColorMode()
    const isDark = mode === 'dark'

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: { xs: 'flex-start', sm: 'center' },
            height: '100dvh',
            width: '100%',
            p: { xs: 2, sm: 4 },
            pt: { xs: 18, sm: 4 }, // Add top padding for mobile to clear TopBar
            bgcolor: 'background.default',
            fontFamily: '"Press Start 2P", cursive',
            overflow: 'hidden',
            position: 'fixed',
            top: 0,
            left: 0
        }}>

            {/* TopBar */}
            <TopBar
                title="25 SQUARES"
                user={user}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                onDeleteAccount={() => setShowDeleteModal(true)}
            />

            {/* Title Section */}
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 3, sm: 4 },
                textAlign: 'center',
                mb: 6,
                animation: 'titleFloat 3s ease-in-out infinite',
                '@keyframes titleFloat': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-8px)' }
                }
            }}>
                <Typography variant="h1" sx={{
                    color: 'text.primary',
                    textShadow: isDark ? '3px 4px 0 #d2003a' : '2px 2px 0 rgba(0,0,0,0.1)',
                    fontSize: { xs: '2.1rem', sm: '3.6rem' },
                    fontWeight: 900,
                    lineHeight: 1,
                    margin: 0
                }}>
                    25
                </Typography>
                <Typography variant="h1" sx={{
                    color: 'text.primary',
                    textShadow: isDark ? '3px 4px 0 #d2003a' : '2px 2px 0 rgba(0,0,0,0.1)',
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
                    <>
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
                    </>
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

            {/* Delete Account Modal (Reusing AuthModal) */}
            {showDeleteModal && user && (
                <AuthModal
                    onClose={() => setShowDeleteModal(false)}
                    onLogout={onLogout}
                    initialMode="delete_confirm"
                    userEmail={user.email}
                />
            )}

            {/* Tiny Credits */}
            <Box
                onClick={() => { soundManager.playClick(); setShowCredits(true) }}
                sx={{
                    position: 'absolute',
                    bottom: 20,
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
