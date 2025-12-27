import { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, Stack, TextField, Typography, Button, Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import LoginIcon from '@mui/icons-material/Login'
import soundManager from '@/lib/sounds'

export default function AuthModal({ onClose, onLogin }) {
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
        <Dialog open={true} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', color: 'primary.main', textShadow: '2px 2px 0 #001E1E' }}>
                {mode === 'login' ? 'LOGIN' : 'REGISTER'}
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="EMAIL"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
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
                            <Typography color="error" variant="caption" sx={{ display: 'block' }}>
                                {error}
                            </Typography>
                        )}
                        <Stack direction={{ xs: 'column-reverse', sm: 'row' }} spacing={2} sx={{ mt: 2 }}>
                            <Button fullWidth variant="contained" color="secondary" onClick={onClose} startIcon={<CloseIcon />}>
                                CANCEL
                            </Button>
                            <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading} startIcon={<LoginIcon />}>
                                {loading ? 'WAIT...' : (mode === 'login' ? 'LOGIN' : 'REGISTER')}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
                <Box textAlign="center" mt={2}>
                    <Button variant="text" color="primary" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); soundManager.playClick() }}>
                        {mode === 'login' ? 'NO ACCOUNT? REGISTER' : 'HAVE ACCOUNT? LOGIN'}
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
