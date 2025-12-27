import { Box, IconButton, Typography, Collapse, Stack } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import PersonIcon from '@mui/icons-material/Person'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import soundManager from '@/lib/sounds'

export default function TopBar({
    title,
    onBack,
    user,
    activeSection,
    setActiveSection,
    customTitleClick,
    customActions,
    children
}) {
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
                position: 'fixed', top: { xs: 8, sm: 16 }, left: '50%', transform: 'translateX(-50%)',
                width: 'calc(100% - 16px)',
                maxWidth: '500px',
                zIndex: 99999,
                bgcolor: 'rgba(0,0,0,0.7)', borderRadius: 2,
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 0.75, sm: 2 }, py: { xs: 0.5, sm: 1 }, gap: { xs: 0.5, sm: 1 } }}>
                    {/* Left Side: Back + Title */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, minWidth: 0, flex: '0 1 auto' }}>
                        {onBack && (
                            <IconButton
                                size="small"
                                sx={{ color: '#FFF', p: { xs: 0.25, sm: 0.5 } }}
                                onClick={() => { soundManager.playNav(); onBack(); }}
                            >
                                <ArrowBackIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                            </IconButton>
                        )}
                        <Box
                            onClick={() => {
                                if (customTitleClick) customTitleClick()
                            }}
                            sx={{ display: 'flex', alignItems: 'center', cursor: customTitleClick ? 'pointer' : 'default', userSelect: 'none', minWidth: 0 }}
                        >
                            <Typography variant="body2" sx={{ color: '#FAEC3B', fontWeight: 'bold', fontSize: { xs: '0.65rem', sm: '0.85rem' }, ml: 0.25, whiteSpace: 'nowrap' }}>
                                {title}
                            </Typography>
                            {customTitleClick && (
                                <ExpandMoreIcon sx={{ fontSize: { xs: 16, sm: 20 }, color: '#FAEC3B', transform: activeSection === 'rules' ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
                            )}
                        </Box>
                    </Box>

                    {/* Right Side: Actions */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.25, sm: 1 }, flex: '0 0 auto' }}>
                        {customActions}

                        <IconButton
                            onClick={() => { soundManager.playClick(); setActiveSection(prev => prev === 'help' ? null : 'help') }}
                            size="small"
                            sx={{ color: activeSection === 'help' ? '#FAEC3B' : '#FFF', p: { xs: 0.25, sm: 0.5 } }}
                        >
                            <HelpOutlineIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                        </IconButton>
                        <IconButton
                            onClick={() => { soundManager.playClick(); setActiveSection(prev => prev === 'profile' ? null : 'profile') }}
                            size="small"
                            sx={{ color: activeSection === 'profile' ? '#FAEC3B' : '#FFF', p: { xs: 0.25, sm: 0.5 } }}
                        >
                            <PersonIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
                        </IconButton>
                    </Box>
                </Box>

                {/* Accordion Content */}
                <Collapse in={!!activeSection}>
                    <Box sx={{ px: 2, pb: 2, borderTop: '1px solid rgba(255,255,255,0.1)', maxHeight: '60vh', overflowY: 'auto' }}>

                        {/* Custom Content (e.g. Rules) */}
                        {children}

                        {/* HELP Section (Unified) */}
                        {activeSection === 'help' && (
                            <Box sx={{ pt: 1, color: '#DDD', fontSize: '0.8rem' }}>
                                <Typography variant="subtitle2" sx={{ color: '#FAEC3B', mb: 1, textAlign: 'center', fontWeight: 'bold' }}>HOW TO PLAY</Typography>

                                <Box sx={{ mb: 1.5 }}>
                                    <Typography variant="caption" sx={{ color: '#AAA', fontWeight: 'bold', display: 'block' }}>OBJECTIVE</Typography>
                                    <Typography variant="caption" sx={{ color: '#FFF' }}>Visit every square on the 5x5 grid exactly once.</Typography>
                                </Box>

                                <Box sx={{ mb: 1.5 }}>
                                    <Typography variant="caption" sx={{ color: '#AAA', fontWeight: 'bold', display: 'block' }}>MOVES</Typography>
                                    <Typography variant="caption" display="block" sx={{ color: '#FFF' }}>• <strong>Straight:</strong> 3 squares (skip 2)</Typography>
                                    <Typography variant="caption" display="block" sx={{ color: '#FFF' }}>• <strong>Diagonal:</strong> 2 squares (skip 1)</Typography>
                                </Box>

                                <Box>
                                    <Typography variant="caption" sx={{ color: '#AAA', fontWeight: 'bold', display: 'block' }}>TIPS</Typography>
                                    <Typography variant="caption" sx={{ color: '#FFF' }}>Green squares are valid moves. Watch out for dead ends!</Typography>
                                </Box>
                            </Box>
                        )}

                        {/* PROFILE Section (Unified) */}
                        {activeSection === 'profile' && (
                            <Box sx={{ pt: 1, color: '#DDD', textAlign: 'center' }}>
                                <Typography variant="subtitle2" sx={{ color: '#FAEC3B', mb: 0.5, fontWeight: 'bold' }}>PROFILE</Typography>
                                <Typography variant="body2" sx={{ mb: 2, color: '#FFF', fontWeight: 'bold' }}>{user?.username || 'Guest'}</Typography>
                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, minWidth: 80, border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <Typography variant="caption" display="block" sx={{ color: '#888', fontSize: '0.65rem' }}>HINTS</Typography>
                                        <Typography variant="h6" sx={{ color: '#FAEC3B', lineHeight: 1, fontWeight: 'bold' }}>{user?.hintCount || 0}</Typography>
                                    </Box>
                                    <Box sx={{ p: 1, bgcolor: 'rgba(255,255,255,0.05)', borderRadius: 2, minWidth: 80, border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <Typography variant="caption" display="block" sx={{ color: '#888', fontSize: '0.65rem' }}>UNDOS</Typography>
                                        <Typography variant="h6" sx={{ color: '#FAEC3B', lineHeight: 1, fontWeight: 'bold' }}>{user?.undoCount || 0}</Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        )}

                        {/* Close Indicator */}
                        <Box sx={{ textAlign: 'center', pt: 1, pb: 0.5 }}>
                            <IconButton size="small" onClick={() => setActiveSection(null)} sx={{ color: 'rgba(255,255,255,0.3)', p: 0 }}>
                                <ExpandMoreIcon sx={{ transform: 'rotate(180deg)' }} />
                            </IconButton>
                        </Box>
                    </Box>
                </Collapse>
            </Box>
        </>
    )
}
