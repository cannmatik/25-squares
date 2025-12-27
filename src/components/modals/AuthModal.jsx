import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack, TextField, Typography, Button, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoginIcon from '@mui/icons-material/Login'
import soundManager from '@/lib/sounds'
import { useColorMode } from '@/app/providers'

export default function AuthModal({ onClose, onLogin }) {
    const { mode: themeMode } = useColorMode()
    const isDark = themeMode === 'dark'
    const [mode, setMode] = useState('login')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        soundManager.playClick()

        try {
            const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
            const body = mode === 'login' ? { email, password } : { email, username, password }

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            })

            const data = await res.json()
            if (!res.ok) throw new Error(data.details || data.error || 'Operation failed')

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            soundManager.playUnlock()
            onLogin(data.user, data.token)
            onClose()
        } catch (err) {
            setError(err.message)
            soundManager.playInvalid()
        } finally {
            setLoading(false)
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
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'text.primary',
                    backgroundImage: 'none'
                }
            }}
        >
            <DialogTitle sx={{
                textAlign: 'center',
                color: 'primary.main',
                fontFamily: '"Press Start 2P", cursive',
                fontSize: '1.2rem',
                pt: 3
            }}>
                {mode === 'login' ? 'LOGIN' : 'REGISTER'}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2.5} sx={{ mt: 1 }}>
                        <TextField
                            label="EMAIL"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            variant="outlined"
                        />
                        {mode === 'register' && (
                            <TextField
                                label="USERNAME"
                                type="text"
                                fullWidth
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        )}
                        <TextField
                            label="PASSWORD"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            inputProps={{ minLength: 6 }}
                        />
                        {error && (
                            <Typography color="error.main" variant="caption" sx={{ display: 'block', fontWeight: 'bold' }}>
                                {error}
                            </Typography>
                        )}
                        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={1.5} sx={{ mt: 1 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="secondary"
                                onClick={onClose}
                                startIcon={<CloseIcon />}
                                sx={{
                                    height: 48,
                                    fontWeight: 'bold',
                                    bgcolor: 'secondary.main',
                                    color: 'secondary.contrastText',
                                    border: '2px solid',
                                    borderColor: 'text.primary'
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
                                startIcon={<LoginIcon />}
                                sx={{ height: 48, fontWeight: 'bold' }}
                            >
                                {loading ? 'WAIT...' : (mode === 'login' ? 'LOGIN' : 'REGISTER')}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
                <Box textAlign="center" mt={2} mb={1}>
                    <Button
                        variant="text"
                        color="primary"
                        onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); soundManager.playClick() }}
                        sx={{ fontWeight: 'bold' }}
                    >
                        {mode === 'login' ? 'NO ACCOUNT? REGISTER' : 'HAVE ACCOUNT? LOGIN'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
