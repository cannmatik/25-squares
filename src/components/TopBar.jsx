import { Box, IconButton, Typography, Collapse, Stack, Slider, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import PersonIcon from '@mui/icons-material/Person'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SettingsIcon from '@mui/icons-material/Settings'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import MusicOffIcon from '@mui/icons-material/MusicOff'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit'
import IosShareIcon from '@mui/icons-material/IosShare'
import AddBoxIcon from '@mui/icons-material/AddBox'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SmartphoneIcon from '@mui/icons-material/Smartphone'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useState, useEffect } from 'react'
import soundManager from '@/lib/sounds'
import { useColorMode } from '@/app/providers'

export default function TopBar({
    title,
    onBack,
    user,
    activeSection,
    setActiveSection,
    customTitleClick,
    customActions,
    secondaryInfo,
    onDeleteAccount,
    children
}) {
    const { mode, toggleColorMode } = useColorMode()
    const isDark = mode === 'dark'

    // Sound states
    const [sfxMuted, setSfxMuted] = useState(false)
    const [bgmMuted, setBgmMuted] = useState(true)
    const [sfxVolume, setSfxVolume] = useState(0.5)
    const [bgmVolume, setBgmVolume] = useState(0.3)

    // Fullscreen state
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [canFullscreen, setCanFullscreen] = useState(true)
    const [isIOS, setIsIOS] = useState(false)
    const [isStandalone, setIsStandalone] = useState(false)

    // Initialize states on mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setSfxMuted(soundManager.isMuted())
            setBgmMuted(soundManager.isBgmMuted())
            setSfxVolume(soundManager.getVolume())
            setBgmVolume(soundManager.bgmVolume || 0.3)

            // Check fullscreen availability
            setCanFullscreen(!!document.documentElement.requestFullscreen)

            // Check iOS
            const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
                (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
            setIsIOS(ios)

            // Check if running as PWA
            setIsStandalone(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone)

            // Listen for fullscreen changes
            const handleFullscreenChange = () => {
                setIsFullscreen(!!document.fullscreenElement)
            }
            document.addEventListener('fullscreenchange', handleFullscreenChange)
            return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
        }
    }, [])

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen?.()
        } else {
            document.exitFullscreen?.()
        }
    }

    return (
        <>
            {/* Backdrop for easy closing */}
            {activeSection && (
                <Box
                    onClick={() => { soundManager.playClick(); setActiveSection(null) }}
                    sx={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        zIndex: 99998,
                        bgcolor: 'rgba(0,0,0,0.1)'
                    }}
                />
            )}

            {/* Main Bar */}
            <Box sx={{
                userSelect: 'none',
                position: 'fixed',
                top: { xs: 'max(48px, calc(env(safe-area-inset-top, 0px) + 48px))', sm: 16 },
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'calc(100% - 16px)',
                maxWidth: '500px',
                zIndex: 99999,
                bgcolor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.85)',
                borderRadius: 2,
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'text.primary',
                boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.3)' : '0 4px 15px rgba(0,0,0,0.05)'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 1.5, sm: 2 }, py: { xs: 1, sm: 1.5 }, gap: { xs: 1, sm: 1.5 } }}>
                    {/* Left Side: Back + Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0, flex: '0 1 auto' }}>
                        {onBack && (
                            <IconButton
                                size="small"
                                sx={{ color: 'text.primary', p: { xs: 0.75, sm: 1 }, minWidth: 40, minHeight: 40 }}
                                onClick={() => { soundManager.playNav(); onBack(); }}
                            >
                                <ArrowBackIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
                            </IconButton>
                        )}
                        <Box
                            onClick={() => {
                                if (customTitleClick) customTitleClick()
                            }}
                            sx={{ display: 'flex', alignItems: 'center', cursor: customTitleClick ? 'pointer' : 'default', userSelect: 'none', minWidth: 0 }}
                        >
                            <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'bold', fontSize: { xs: '0.8rem', sm: '0.95rem' }, ml: 0.5, whiteSpace: 'nowrap' }}>
                                {title}
                            </Typography>
                            {customTitleClick && (
                                <ExpandMoreIcon sx={{ fontSize: { xs: 20, sm: 22 }, color: 'text.primary', transform: activeSection === 'rules' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                            )}
                        </Box>
                    </Box>

                    {/* Right Side: Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, flex: '0 0 auto' }}>
                        {customActions}

                        <IconButton
                            onClick={() => { soundManager.playClick(); setActiveSection(prev => prev === 'settings' ? null : 'settings') }}
                            size="small"
                            sx={{ color: activeSection === 'settings' ? 'primary.main' : 'text.primary', p: { xs: 0.75, sm: 1 }, minWidth: 40, minHeight: 40 }}
                        >
                            <SettingsIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
                        </IconButton>
                        <IconButton
                            onClick={() => { soundManager.playClick(); setActiveSection(prev => prev === 'help' ? null : 'help') }}
                            size="small"
                            sx={{ color: activeSection === 'help' ? 'primary.main' : 'text.primary', p: { xs: 0.75, sm: 1 }, minWidth: 40, minHeight: 40 }}
                        >
                            <HelpOutlineIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
                        </IconButton>
                        <IconButton
                            onClick={() => { soundManager.playClick(); setActiveSection(prev => prev === 'profile' ? null : 'profile') }}
                            size="small"
                            sx={{ color: activeSection === 'profile' ? 'primary.main' : 'text.primary', p: { xs: 0.75, sm: 1 }, minWidth: 40, minHeight: 40 }}
                        >
                            <PersonIcon sx={{ fontSize: { xs: 22, sm: 24 } }} />
                        </IconButton>
                    </Box>
                </Box>

                {/* Secondary Info Row (Stars, Timer etc) */}
                {secondaryInfo && (
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: { xs: 0.75, sm: 2 },
                        py: { xs: 0.5, sm: 0.75 },
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        gap: 2
                    }}>
                        {secondaryInfo}
                    </Box>
                )}

                {/* Accordion Content */}
                <Collapse in={!!activeSection}>
                    <Box sx={{ px: 2, pb: 2, borderTop: '1px solid', borderColor: 'divider', maxHeight: '60vh', overflowY: 'auto' }}>

                        {/* Custom Content (e.g. Rules) */}
                        <Box sx={{ color: 'text.primary' }}>
                            {children}
                        </Box>

                        {/* SETTINGS Section */}
                        {activeSection === 'settings' && (
                            <Box sx={{ pt: 1.5, color: 'text.primary' }}>
                                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1.5, textAlign: 'center', fontWeight: 'bold' }}>SETTINGS</Typography>

                                {/* Theme Toggle */}
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between" sx={{ mb: 1.5, pb: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>THEME</Typography>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        onClick={() => { soundManager.playClick(); toggleColorMode(); }}
                                        startIcon={isDark ? <LightModeIcon sx={{ fontSize: 14 }} /> : <DarkModeIcon sx={{ fontSize: 14 }} />}
                                        sx={{
                                            fontSize: '0.65rem',
                                            py: 0.25,
                                            px: 1,
                                            borderColor: 'divider',
                                            color: 'text.primary'
                                        }}
                                    >
                                        {isDark ? 'LIGHT' : 'DARK'}
                                    </Button>
                                </Stack>

                                {/* Sound Controls */}
                                <Box sx={{ mb: 2 }}>
                                    {/* SFX Row */}
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                const newMuted = soundManager.toggleMute()
                                                setSfxMuted(newMuted)
                                                if (!newMuted) soundManager.playClick()
                                            }}
                                            sx={{
                                                color: sfxMuted ? 'text.secondary' : 'primary.main',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 1,
                                                p: 0.5
                                            }}
                                        >
                                            {sfxMuted ? <VolumeOffIcon sx={{ fontSize: 16 }} /> : <VolumeUpIcon sx={{ fontSize: 16 }} />}
                                        </IconButton>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', minWidth: 30 }}>SFX</Typography>
                                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                            <Slider
                                                size="small"
                                                value={sfxVolume}
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                disabled={sfxMuted}
                                                onChange={(e, val) => {
                                                    setSfxVolume(val)
                                                    soundManager.setVolume(val)
                                                }}
                                                sx={{
                                                    color: sfxMuted ? 'text.disabled' : 'primary.main',
                                                    '& .MuiSlider-thumb': { width: 10, height: 10 }
                                                }}
                                            />
                                        </Box>
                                    </Stack>

                                    {/* BGM Row */}
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                soundManager.initBGM()
                                                const newMuted = soundManager.toggleBGM()
                                                setBgmMuted(newMuted)
                                            }}
                                            sx={{
                                                color: bgmMuted ? 'text.secondary' : 'primary.main',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 1,
                                                p: 0.5
                                            }}
                                        >
                                            {bgmMuted ? <MusicOffIcon sx={{ fontSize: 16 }} /> : <MusicNoteIcon sx={{ fontSize: 16 }} />}
                                        </IconButton>
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem', minWidth: 30 }}>BGM</Typography>
                                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                                            <Slider
                                                size="small"
                                                value={bgmVolume}
                                                min={0}
                                                max={1}
                                                step={0.1}
                                                disabled={bgmMuted}
                                                onChange={(e, val) => {
                                                    setBgmVolume(val)
                                                    if (soundManager.bgm) {
                                                        soundManager.bgm.volume = val
                                                        soundManager.bgmVolume = val
                                                    }
                                                }}
                                                sx={{
                                                    color: bgmMuted ? 'text.disabled' : 'primary.main',
                                                    '& .MuiSlider-thumb': { width: 10, height: 10 }
                                                }}
                                            />
                                        </Box>
                                    </Stack>
                                </Box>

                                {/* Fullscreen / iOS PWA Guide */}
                                <Box sx={{ borderTop: '1px solid', borderColor: 'divider', pt: 1.5 }}>
                                    {canFullscreen && !isIOS ? (
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            size="small"
                                            onClick={toggleFullscreen}
                                            startIcon={isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                                            sx={{
                                                borderColor: 'divider',
                                                color: 'text.primary',
                                                fontSize: '0.7rem'
                                            }}
                                        >
                                            {isFullscreen ? 'EXIT FULLSCREEN' : 'FULLSCREEN'}
                                        </Button>
                                    ) : isIOS && !isStandalone ? (
                                        <Box sx={{
                                            bgcolor: 'action.hover',
                                            borderRadius: 1.5,
                                            p: 1.5,
                                            border: '1px solid',
                                            borderColor: 'divider'
                                        }}>
                                            <Typography variant="caption" sx={{
                                                display: 'block',
                                                fontWeight: 'bold',
                                                color: 'primary.main',
                                                mb: 1,
                                                textAlign: 'center'
                                            }}>
                                                <SmartphoneIcon sx={{ fontSize: 14, mr: 0.5 }} /> BEST EXPERIENCE
                                            </Typography>
                                            <Typography variant="caption" sx={{
                                                display: 'block',
                                                color: 'text.secondary',
                                                fontSize: '0.65rem',
                                                lineHeight: 1.4
                                            }}>
                                                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                                                    <IosShareIcon sx={{ fontSize: 14 }} />
                                                    <span>Tap the <strong>Share</strong> button in Safari</span>
                                                </Stack>
                                                <Stack direction="row" alignItems="center" spacing={0.5}>
                                                    <AddBoxIcon sx={{ fontSize: 14 }} />
                                                    <span>Select <strong>Add to Home Screen</strong></span>
                                                </Stack>
                                            </Typography>
                                            <Typography variant="caption" sx={{
                                                display: 'block',
                                                color: 'text.disabled',
                                                fontSize: '0.6rem',
                                                mt: 1,
                                                textAlign: 'center',
                                                fontStyle: 'italic'
                                            }}>
                                                Open as app for fullscreen experience
                                            </Typography>
                                        </Box>
                                    ) : isStandalone ? (
                                        <Typography variant="caption" sx={{
                                            display: 'block',
                                            color: 'success.main',
                                            textAlign: 'center',
                                            fontWeight: 'bold'
                                        }}>
                                            <CheckCircleIcon sx={{ fontSize: 14, mr: 0.5 }} /> Running in app mode
                                        </Typography>
                                    ) : null}
                                    {/* Delete Account (Only for logged in users) */}
                                    {user && onDeleteAccount && (
                                        <Box sx={{ mt: 2, pt: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                                            <Button
                                                fullWidth
                                                variant="text"
                                                color="warning"
                                                size="small"
                                                onClick={() => {
                                                    soundManager.playClick()
                                                    setActiveSection(null) // Close menu
                                                    onDeleteAccount()     // Trigger modal
                                                }}
                                                sx={{
                                                    fontSize: '0.65rem',
                                                    opacity: 0.8,
                                                    '&:hover': { opacity: 1, bgcolor: 'warning.main', color: 'warning.contrastText' }
                                                }}
                                            >
                                                DELETE ACCOUNT
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        )}

                        {/* HELP Section */}
                        {activeSection === 'help' && (
                            <Box sx={{ pt: 1, color: 'text.primary', fontSize: '0.8rem' }}>
                                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1, textAlign: 'center', fontWeight: 'bold' }}>HOW TO PLAY</Typography>

                                <Box sx={{ mb: 1.5 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', display: 'block' }}>OBJECTIVE</Typography>
                                    <Typography variant="caption">Visit every square on the 5x5 grid exactly once.</Typography>
                                </Box>

                                <Box sx={{ mb: 1.5 }}>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', display: 'block' }}>MOVES</Typography>
                                    <Typography variant="caption" display="block">• <strong>Straight:</strong> 3 squares (skip 2)</Typography>
                                    <Typography variant="caption" display="block">• <strong>Diagonal:</strong> 2 squares (skip 1)</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 'bold', display: 'block' }}>TIPS</Typography>
                                    <Typography variant="caption">Colored squares are valid moves. Watch out for dead ends!</Typography>
                                </Box>
                            </Box>
                        )}

                        {/* PROFILE Section */}
                        {activeSection === 'profile' && (
                            <Box sx={{ pt: 1, color: 'text.primary', textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 0.5, fontWeight: 'bold' }}>PROFILE</Typography>
                                <Typography variant="body2" sx={{ mb: 2, fontWeight: 'bold' }}>{user?.username || 'Guest'}</Typography>

                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Box sx={{ p: 1, bgcolor: 'action.hover', borderRadius: 2, minWidth: 80, border: '1px solid', borderColor: 'divider' }}>
                                        <Typography variant="caption" display="block" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>HINTS</Typography>
                                        <Typography variant="h6" sx={{ color: 'primary.main', lineHeight: 1, fontWeight: 'bold' }}>{user?.hintCount || 0}</Typography>
                                    </Box>
                                    <Box sx={{ p: 1, bgcolor: 'action.hover', borderRadius: 2, minWidth: 80, border: '1px solid', borderColor: 'divider' }}>
                                        <Typography variant="caption" display="block" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>UNDOS</Typography>
                                        <Typography variant="h6" sx={{ color: 'primary.main', lineHeight: 1, fontWeight: 'bold' }}>{user?.undoCount || 0}</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        )}

                        {/* Close Indicator */}
                        <Box sx={{ textAlign: 'center', pt: 1, pb: 0.5 }}>
                            <IconButton size="small" onClick={() => setActiveSection(null)} sx={{ color: 'text.secondary', opacity: 0.4, p: 0 }}>
                                <ExpandMoreIcon sx={{ transform: 'rotate(180deg)' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Collapse>
            </Box>
        </>
    )
}
