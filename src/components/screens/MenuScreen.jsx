import { Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import PersonIcon from '@mui/icons-material/Person'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import InfoIcon from '@mui/icons-material/Info'
import { useState, useEffect } from 'react'
import soundManager from '@/lib/sounds'
import SoundToggle from '../ui/SoundToggle'

export default function MenuScreen({ user, onPlay, onAuth, onLogout, muted, onToggleSound, isOnline }) {
    const [showCredits, setShowCredits] = useState(false)

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100dvh',
            width: '100%',
            p: 2,
            position: 'relative',
            overflow: 'hidden',
            fontFamily: '"Press Start 2P", cursive'
        }}>




            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h2" component="h1" sx={{
                    color: 'primary.main',
                    textShadow: '4px 4px 0 #001E1E',
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    lineHeight: 1.3
                }}>
                    25
                </Typography>
                <Typography variant="h2" component="h1" sx={{
                    color: 'primary.main',
                    textShadow: '4px 4px 0 #001E1E',
                    fontSize: { xs: '1.5rem', sm: '2rem' },
                    lineHeight: 1.3
                }}>
                    SQUARES
                </Typography>
            </Box>

            <Stack spacing={2} width="100%" maxWidth={{ xs: '280px', sm: '400px' }}>
                {/* PLAY (Campaign) */}
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => {
                        soundManager.playStart()
                        if (user) onPlay()
                        else onAuth()
                    }}
                    startIcon={<PlayArrowIcon />}
                    sx={{ height: 56, fontSize: '1.2rem' }}
                >
                    PLAY
                </Button>

                {/* FREE PLAY */}
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => { soundManager.playStart(); onPlay(true) }}
                    startIcon={<SportsEsportsIcon />}
                    sx={{ height: 56, fontSize: '1.2rem', borderWidth: 2, '&:hover': { borderWidth: 2 } }}
                >
                    FREE PLAY
                </Button>

                {/* LOGIN / LOGOUT */}
                {user ? (
                    <Button
                        startIcon={<LogoutIcon sx={{ color: '#FAEC3B' }} />}
                        onClick={() => { soundManager.playClick(); onLogout(); }}
                        sx={{ height: 56, fontSize: '1.2rem', color: '#FAEC3B', borderColor: '#FAEC3B', borderWidth: 1 }}
                        variant="outlined"
                        size="large"
                    >
                        LOGOUT
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => { soundManager.playClick(); onAuth() }}
                        startIcon={<LoginIcon />}
                        sx={{ height: 56, fontSize: '1.2rem' }}
                    >
                        LOGIN / REGISTER
                    </Button>
                )}

                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={2}>
                    <SoundToggle muted={muted} onToggle={onToggleSound} />
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => { soundManager.playClick(); setShowCredits(true) }}
                        sx={{ minWidth: '40px', width: '40px', height: '40px', p: 0 }}
                    >
                        <InfoIcon sx={{ fontSize: 20 }} />
                    </Button>
                </Stack>

                {/* Credits Dialog */}
                <Dialog
                    open={showCredits}
                    onClose={() => setShowCredits(false)}
                    PaperProps={{
                        sx: {
                            bgcolor: '#3C003C', // Standard purple
                            border: '4px solid #FAEC3B',
                            borderRadius: 0,
                            maxWidth: 'xs',
                            width: '100%',
                            m: 2,
                            boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                        }
                    }}
                >
                    <DialogTitle sx={{
                        textAlign: 'center',
                        fontFamily: '"Press Start 2P", cursive',
                        color: '#FAEC3B',
                        textShadow: '2px 2px 0 #000',
                        fontSize: '1.2rem',
                        pt: 4
                    }}>
                        CREDITS
                    </DialogTitle>
                    <DialogContent>
                        <CreditsContent show={showCredits} />
                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'center', pb: 4 }}>
                        <Button
                            onClick={() => setShowCredits(false)}
                            variant="contained"
                            sx={{
                                fontFamily: '"Press Start 2P", cursive',
                                bgcolor: '#FAEC3B',
                                color: '#000',
                                '&:hover': { bgcolor: '#F0D000' }
                            }}
                        >
                            CLOSE
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>
        </Box>
    )
}

function CreditsContent({ show }) {
    const [txtYasin, setTxtYasin] = useState('')
    const [txtCan, setTxtCan] = useState('')
    const [startCan, setStartCan] = useState(false)

    useEffect(() => {
        if (!show) {
            setTxtYasin('')
            setTxtCan('')
            setStartCan(false)
            return
        }

        let i = 0
        const name1 = "YASIN OZBINAR"
        const interval = setInterval(() => {
            setTxtYasin(name1.substring(0, i + 1))
            i++
            if (i === name1.length) {
                clearInterval(interval)
                setTimeout(() => setStartCan(true), 500)
            }
        }, 150)

        return () => clearInterval(interval)
    }, [show])

    useEffect(() => {
        if (!startCan) return

        let i = 0
        const name2 = "CAN MATIK"
        const interval = setInterval(() => {
            setTxtCan(name2.substring(0, i + 1))
            i++
            if (i === name2.length) clearInterval(interval)
        }, 150)

        return () => clearInterval(interval)
    }, [startCan])

    return (
        <Box sx={{ textAlign: 'center', py: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
                <Typography variant="caption" sx={{ display: 'block', fontFamily: '"Press Start 2P", cursive', color: 'rgba(255,255,255,0.7)', mb: 1, fontSize: '0.6rem' }}>GAME CONCEPT</Typography>
                <Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive', color: '#FFF', textShadow: '3px 3px 0 #000', fontSize: '0.9rem', lineHeight: 1.5, minHeight: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {txtYasin}{!startCan && show && <Cursor />}
                </Typography>
            </Box>
            <Box>
                <Typography variant="caption" sx={{ display: 'block', fontFamily: '"Press Start 2P", cursive', color: 'rgba(255,255,255,0.7)', mb: 1, fontSize: '0.6rem' }}>DEVELOPED BY</Typography>
                <Typography variant="h6" sx={{ fontFamily: '"Press Start 2P", cursive', color: '#FFF', textShadow: '3px 3px 0 #000', fontSize: '0.9rem', lineHeight: 1.5, minHeight: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {txtCan}{startCan && <Cursor />}
                </Typography>
            </Box>
        </Box>
    )
}

function Cursor() {
    return (
        <Box component="span" sx={{
            display: 'inline-block',
            width: '10px',
            height: '20px',
            bgcolor: '#FAEC3B',
            ml: 1,
            animation: 'blink 0.75s step-end infinite',
            '@keyframes blink': { '50%': { opacity: 0 } }
        }}>&nbsp;</Box>
    )
}
