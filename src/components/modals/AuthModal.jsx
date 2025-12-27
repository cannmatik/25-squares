import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack, TextField, Typography, Button, Box, IconButton, InputAdornment } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import DeleteIcon from '@mui/icons-material/Delete'
import soundManager from '@/lib/sounds'
import { useColorMode } from '@/app/providers'

export default function AuthModal({ open, onClose, onLogin, onLogout, initialMode = 'login', userEmail = '' }) {
    const { mode: themeMode } = useColorMode()
    const isDark = themeMode === 'dark'

    // Modes: 'login', 'register', 'verify', 'delete_confirm', 'delete_verify'
    const [mode, setMode] = useState(initialMode)

    const [email, setEmail] = useState(userEmail)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [otp, setOtp] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const [resendTimer, setResendTimer] = useState(30)
    const [resendMessage, setResendMessage] = useState('')

    // Timer logic
    useEffect(() => {
        let interval
        if ((mode === 'verify' || mode === 'delete_verify') && resendTimer > 0) {
            interval = setInterval(() => setResendTimer(p => p - 1), 1000)
        }
        return () => clearInterval(interval)
    }, [mode, resendTimer])

    // Reset timer on mode switch
    useEffect(() => {
        if (mode === 'verify' || mode === 'delete_verify') {
            // Keep existing timer if switching slightly? No, reset is safer.
        }
    }, [mode])

    const handleResend = async () => {
        if (resendTimer > 0) return
        setLoading(true)
        setResendMessage('')
        setError('')

        try {
            // Determine endpoint based on mode
            const endpoint = mode === 'delete_verify' ? '/api/auth/req-delete-otp' : '/api/auth/resend-otp'

            if (!navigator.onLine) throw new Error('You are offline. Please check your connection.')

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setResendMessage('Code sent!')
            setResendTimer(30)
            soundManager.playUnlock()
        } catch (err) {
            setError(err.message)
            soundManager.playInvalid()
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteRequest = async () => {
        setLoading(true)
        setError('')
        if (!navigator.onLine) {
            setError('You are offline.')
            setLoading(false)
            return
        }
        try {
            const res = await fetch('/api/auth/req-delete-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)

            setMode('delete_verify')
            setResendTimer(30)
            soundManager.playUnlock()
        } catch (err) {
            setError(err.message)
            soundManager.playInvalid()
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (mode === 'delete_confirm') {
            await handleDeleteRequest()
            return
        }

        if (mode === 'register' && password !== confirmPassword) {
            setError('Passwords do not match')
            soundManager.playInvalid()
            return
        }

        setLoading(true)
        soundManager.playClick()

        try {
            let endpoint = '/api/auth/login'
            let body = { email, password }

            if (mode === 'register') {
                endpoint = '/api/auth/register'
                body = { email, username, password }
            } else if (mode === 'verify') {
                endpoint = '/api/auth/verify-otp'
                body = { email, otp }
            } else if (mode === 'delete_verify') {
                endpoint = '/api/auth/delete-account'
                body = { email, otp }
            }

            if (!navigator.onLine) throw new Error('You are offline. Functionality limited.')

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 403 && data.code === 'EMAIL_NOT_VERIFIED' && mode === 'login') {
                    setMode('verify')
                    setLoading(false)
                    setError('')
                    soundManager.playUnlock()
                    return
                }
                throw new Error(data.details || data.error || 'Operation failed')
            }

            // Success Handlers
            soundManager.playUnlock()

            if (mode === 'delete_verify') {
                if (onLogout) onLogout() // Logout triggers close usually
                onClose()
                return
            }

            if (mode === 'register') {
                setMode('verify')
                setLoading(false)
                return
            }

            if (mode === 'verify') {
                // Auto login after verify (if we have password)
                const loginRes = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })
                const loginData = await loginRes.json()
                if (loginRes.ok) {
                    onLogin(loginData.user, loginData.token)
                    onClose()
                } else {
                    setMode('login')
                    setError('Verification success. Please login.')
                }
                return
            }

            // Login
            onLogin(data.user, data.token)
            onClose()

        } catch (err) {
            setError(err.message)
            soundManager.playInvalid()
            setLoading(false)
        } finally {
            if (mode !== 'register' && mode !== 'verify' && mode !== 'delete_confirm' && mode !== 'delete_verify') {
                setLoading(false)
            }
        }
    }

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' },
            '&:hover fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' },
            '&.Mui-focused fieldset': { borderColor: 'primary.main' }
        },
        '& .MuiInputLabel-root': { color: 'text.secondary', fontWeight: 'bold', fontSize: '0.85rem' }
    }

    const getTitle = () => {
        if (mode === 'login') return 'LOGIN'
        if (mode === 'register') return 'REGISTER'
        if (mode === 'verify') return 'VERIFY EMAIL'
        if (mode === 'delete_confirm') return 'DELETE ACCOUNT'
        if (mode === 'delete_verify') return 'CONFIRM DELETE'
        return ''
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            transitionDuration={{ enter: 100, exit: 100 }}
            slotProps={{
                backdrop: {
                    sx: {
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        transition: 'none !important'
                    }
                }
            }}
            PaperProps={{
                sx: {
                    position: 'relative',
                    backgroundColor: isDark ? 'rgba(20, 20, 30, 0.5)' : 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.5)'}`,
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    backgroundImage: 'none'
                }
            }}
        >
            <IconButton
                onClick={onClose}
                sx={{ position: 'absolute', right: 8, top: 8, color: 'text.secondary' }}
            >
                <CloseIcon />
            </IconButton>

            <DialogTitle sx={{ textAlign: 'center', color: mode.includes('delete') ? 'error.main' : 'primary.main', fontFamily: '"Press Start 2P", cursive', pt: 4 }}>
                {getTitle()}
            </DialogTitle>

            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ mt: 1 }}>

                        {/* DELETE CONFIRM MODE */}
                        {mode === 'delete_confirm' && (
                            <Typography textAlign="center" color="text.secondary">
                                Are you sure you want to delete your account? This action cannot be undone.
                                <br /><br />
                                We will send a code to <b>{email}</b> to confirm.
                            </Typography>
                        )}

                        {/* OTP INPUT (Verify or Delete Verify) */}
                        {(mode === 'verify' || mode === 'delete_verify') && (
                            <>
                                <Typography variant="body2" sx={{ textAlign: 'center', mb: 1, color: 'text.secondary' }}>
                                    Enter the code sent to <b>{email}</b>
                                </Typography>
                                <TextField
                                    label="OTP CODE"
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    required
                                    sx={inputSx}
                                    inputProps={{ style: { textAlign: 'center', letterSpacing: 5, fontSize: '1.2rem' } }}
                                />
                                <Box textAlign="center">
                                    <Button
                                        disabled={resendTimer > 0 || loading}
                                        onClick={handleResend}
                                        size="small"
                                        variant="text"
                                        sx={{ textTransform: 'none', color: 'text.secondary', minWidth: 150 }}
                                    >
                                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}
                                    </Button>
                                    {resendMessage && <Typography variant="caption" color="success.main" display="block">{resendMessage}</Typography>}
                                </Box>
                            </>
                        )}

                        {/* EMAIL & PASSWORD INPUTS */}
                        {(mode === 'login' || mode === 'register') && (
                            <>
                                <TextField
                                    label="EMAIL"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    sx={inputSx}
                                />
                                {mode === 'register' && (
                                    <TextField
                                        label="USERNAME"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        required
                                        sx={inputSx}
                                    />
                                )}
                                <TextField
                                    label="PASSWORD"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    sx={inputSx}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                {mode === 'register' && (
                                    <TextField
                                        label="CONFIRM PASSWORD"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        required
                                        sx={inputSx}
                                        error={confirmPassword.length > 0 && password !== confirmPassword}
                                        helperText={confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match' : ''}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                )}
                            </>
                        )}

                        {error && (
                            <Typography color="error.main" variant="caption" sx={{ display: 'block', fontWeight: 'bold', textAlign: 'center', bgcolor: isDark ? 'rgba(255,0,0,0.1)' : 'rgba(255,0,0,0.05)', p: 1, borderRadius: 1 }}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color={mode.includes('delete') ? 'error' : 'primary'}
                            disabled={loading}
                            startIcon={mode === 'login' ? <LoginIcon /> : mode === 'register' ? <PersonAddIcon /> : mode.includes('delete') ? <DeleteIcon /> : <MarkEmailReadIcon />}
                            sx={{ height: 48, fontWeight: 'bold', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                        >
                            {loading ? 'WAIT...' : getTitle().replace(' EMAIL', '').replace(' CONFIRM', '')}
                        </Button>

                        {(mode === 'login' || mode === 'register') && (
                            <Button
                                variant="text"
                                onClick={() => {
                                    setMode(mode === 'login' ? 'register' : 'login')
                                    setError('')
                                    soundManager.playClick()
                                }}
                                sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
                            >
                                {mode === 'login' ? 'NO ACCOUNT? REGISTER' : 'ALREADY HAVE ACCOUNT? LOGIN'}
                            </Button>
                        )}
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    )
}
