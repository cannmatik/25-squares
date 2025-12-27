import { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack, TextField, Typography, Button, Box, IconButton, InputAdornment } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoginIcon from '@mui/icons-material/Login'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead'
import soundManager from '@/lib/sounds'
import { useColorMode } from '@/app/providers'

export default function AuthModal({ onClose, onLogin }) {
    const { mode: themeMode } = useColorMode()
    const isDark = themeMode === 'dark'
    const [mode, setMode] = useState('login') // login, register, verify
    const [email, setEmail] = useState('')
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

    useEffect(() => {
        let interval
        if (mode === 'verify' && resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [mode, resendTimer])

    // Reset timer when entering verify mode
    useEffect(() => {
        if (mode === 'verify') {
            // If we just entered verify, we might want to start with 30s?
            // But if we switch back and forth? Let's relying on initial 30 or reset manually on transition.
        }
    }, [mode])

    const handleResend = async () => {
        if (resendTimer > 0) return
        setLoading(true)
        setResendMessage('')
        setError('')

        try {
            const res = await fetch('/api/auth/resend-otp', {
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


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        // Password confirmation check for register
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
            }

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const data = await res.json()

            if (!res.ok) {
                if (res.status === 403 && data.code === 'EMAIL_NOT_VERIFIED') {
                    setMode('verify')
                    setLoading(false)
                    setError('')
                    soundManager.playUnlock()
                    return
                }
                throw new Error(data.details || data.error || 'Operation failed')
            }

            if (mode === 'register') {
                // Registration successful, switch to Verify mode
                setMode('verify')
                setLoading(false)
                soundManager.playUnlock() // Or some other sound
                return
            } else if (mode === 'verify') {
                // Verification successful, now login automatically or ask to login
                // Let's force login or use the token if the verify endpoint returned one (it usually doesn't, so we might need to login)

                // Auto-login after verify is cleaner:
                const loginRes = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                })
                const loginData = await loginRes.json()

                if (loginRes.ok) {
                    localStorage.setItem('token', loginData.token)
                    localStorage.setItem('user', JSON.stringify(loginData.user))
                    soundManager.playUnlock()
                    onLogin(loginData.user, loginData.token)
                    onClose()
                } else {
                    setMode('login') // Fallback to login screen
                }
                return
            }

            // Login Mode
            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            soundManager.playUnlock()
            onLogin(data.user, data.token)
            onClose()
        } catch (err) {
            setError(err.message)
            soundManager.playInvalid()
            setLoading(false)
        } finally {
            if (mode !== 'register' && mode !== 'verify') {
                setLoading(false)
            }
        }
    }

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
            '& fieldset': {
                borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            },
            '&:hover fieldset': {
                borderColor: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'primary.main',
            }
        },
        '& .MuiInputLabel-root': {
            color: 'text.secondary',
            fontWeight: 'bold',
            fontSize: '0.85rem'
        }
    }

    return (
        <Dialog
            open={true}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: isDark ? 'rgba(20, 20, 30, 0.85)' : 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                    boxShadow: isDark
                        ? '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)',
                    backgroundImage: 'none'
                }
            }}
        >
            <DialogTitle sx={{
                textAlign: 'center',
                color: 'primary.main',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '1.1rem',
                pt: 3,
                pb: 1
            }}>
                {mode === 'login' ? 'LOGIN' : mode === 'register' ? 'REGISTER' : 'VERIFY EMAIL'}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ mt: 1 }}>

                        {mode === 'verify' && (
                            <>
                                <Typography variant="body2" sx={{ textAlign: 'center', mb: 1, color: 'text.secondary' }}>
                                    Enter the code sent to <b>{email}</b>
                                </Typography>
                                <TextField
                                    label="OTP CODE"
                                    type="text"
                                    fullWidth
                                    value={otp}
                                    onChange={e => setOtp(e.target.value)}
                                    required
                                    variant="outlined"
                                    size="medium"
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
                                        {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend Code'}
                                    </Button>
                                    {resendMessage && <Typography variant="caption" color="success.main" display="block">{resendMessage}</Typography>}
                                </Box>
                            </>
                        )}

                        {(mode === 'login' || mode === 'register') && (
                            <TextField
                                label="EMAIL"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                variant="outlined"
                                size="medium"
                                sx={inputSx}
                            />
                        )}

                        {mode === 'register' && (
                            <TextField
                                label="USERNAME"
                                type="text"
                                fullWidth
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                                size="medium"
                                sx={inputSx}
                            />
                        )}
                        {(mode === 'login' || mode === 'register') && (
                            <TextField
                                label="PASSWORD"
                                type={showPassword ? 'text' : 'password'}
                                fullWidth
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                size="medium"
                                sx={inputSx}
                                inputProps={{ minLength: 6 }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                                size="small"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                        {mode === 'register' && (
                            <TextField
                                label="CONFIRM PASSWORD"
                                type={showConfirmPassword ? 'text' : 'password'}
                                fullWidth
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                                size="medium"
                                sx={inputSx}
                                inputProps={{ minLength: 6 }}
                                error={confirmPassword.length > 0 && password !== confirmPassword}
                                helperText={confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match' : ''}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                                size="small"
                                                sx={{ color: 'text.secondary' }}
                                            >
                                                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                        {error && (
                            <Typography color="error.main" variant="caption" sx={{
                                display: 'block',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                bgcolor: isDark ? 'rgba(255,0,0,0.1)' : 'rgba(255,0,0,0.05)',
                                p: 1,
                                borderRadius: 1
                            }}>
                                {error}
                            </Typography>
                        )}
                        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5} sx={{ mt: 1 }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={onClose}
                                startIcon={<CloseIcon />}
                                sx={{
                                    height: 48,
                                    fontWeight: 'bold',
                                    borderColor: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)',
                                    color: 'text.primary',
                                    '&:hover': {
                                        borderColor: 'text.primary',
                                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
                                    }
                                }}
                            >
                                CANCEL
                            </Button>
                            <Button
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                startIcon={mode === 'login' ? <LoginIcon /> : mode === 'register' ? <PersonAddIcon /> : <MarkEmailReadIcon />}
                                sx={{
                                    height: 48,
                                    fontWeight: 'bold',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                                }}
                            >
                                {loading ? 'WAIT...' : (mode === 'login' ? 'LOGIN' : mode === 'register' ? 'REGISTER' : 'VERIFY')}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
                {mode !== 'verify' && (
                    <Box textAlign="center" mt={2} mb={1}>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={() => {
                                setMode(mode === 'login' ? 'register' : 'login')
                                setError('')
                                setConfirmPassword('')
                                soundManager.playClick()
                            }}
                            sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}
                        >
                            {mode === 'login' ? 'NO ACCOUNT? REGISTER' : 'HAVE ACCOUNT? LOGIN'}
                        </Button>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    )
}
