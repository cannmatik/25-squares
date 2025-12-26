'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import soundManager from '@/lib/sounds'
import { WORLDS, LEVELS, RULE_DESCRIPTIONS, getLevelConfig } from '@/lib/levels'
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography, Stack, Grid, IconButton, Snackbar, Alert } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

// Move rules
const MOVES = [
    { dx: 3, dy: 0 }, { dx: -3, dy: 0 },
    { dx: 0, dy: 3 }, { dx: 0, dy: -3 },
    { dx: 2, dy: 2 }, { dx: -2, dy: -2 },
    { dx: 2, dy: -2 }, { dx: -2, dy: 2 }
]

const GRID_SIZE = 5

// Pixel Icons (Extracted from @hackernoon/pixel-icon-library)
const ICONS = {
    // Solid icons
    play: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7 5H6v14h1v-1h1v-1h1v-1h1v-1h1v-1h1v-1h1V9h-1V8h-1V7h-1V6H9V5H7z" /></svg>,
    shuffle: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h6v6h-2V6h-2v2h-2v2h-2v2h-2v2H8v2H6v2H2v-2h2v-2h2v-2h2v-2h2V8h2V6h2V4zm0 12h2v2h2v2h2v-6h-6v2zM2 6h2v2h2v2h2v2h2v-2H8V8H6V6H4V4H2v2z" /></svg>,
    star: <StarIcon sx={{ width: '100%', height: '100%' }} />,
    starEmpty: <StarBorderIcon sx={{ width: '100%', height: '100%', opacity: 0.5 }} />,
    lock: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 3h-1v2H9v2H7v2h2v2h2V9h2V7h2v2h2v2h2V9h-2V7h-2V5h-1V3zm-5 8H5v10h14V11H7zm2 2h10v6H9v-6z" /></svg>,
    arrowLeft: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M10 5h2v2H8v2H6v2H4v2h2v2h2v2h2v2h-2v-2H6v-2H4v-2H2v-2h2V9h2V7h2V5zM22 11v2h-8v-2h8z" /></svg>,
    arrowRight: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M14 5h-2v2h2v2h2v2h2v2h2v-2h-2V9h-2V7h-2V5zm-2 14v-2h2v-2h2v-2h2v-2h2v2h-2v2h-2v2h-2v2h-2zm-10-6h8v-2H2v2z" /></svg>,
    refresh: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 4H7v2h1v2h1v2h1V9h1V7h1V5h-1V4zm0 2h5V4h-5v2zm7 4v2h-2v-2h2zm2 2v4h-2v-4h2zM7 16H2V6h2v8h2v-2h2v2h2v2H7zM18 6v10h-2v-2h-2v-2h-2v2h-1v2h-1v2h1v1h5v-1h2v-2h2v-4h2v2h2V6h-4z" /></svg>,
    exit: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h14v2H6v12h12v2H4V4zm16 10h-2v-2h2v2zm0-2h-2V8h2v2h2v2h-2zM12 11v2H8v-2h4z" /></svg>,
    user: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 20v2h14v-2H5zm7-2h2v-2h2v-2h2v-2h-2v-2h-2V8h2V6h-2V4h-2V2h-2v2H9v2H7v2h2v2h-2v2H5v2h2v2h2v2h2v-2h1z" /></svg>,
    soundOn: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M2 9h4v6H2V9zm7-2H7v10h2l5 5V2l-5 5zm7 2v6h2v-2h2v-2h-2V9h-2zm4-4v14h2V5h-2z" /></svg>,
    soundOff: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21 5l-2-2-4 4-5-5-2 2 5 5-5 5 2 2 5-5 4 4 2-2-4-4 4-4zM7 7H5v10h2l5 5V2L7 7zm5 8v2l-2-2H8V9h2l2-2v5z" /></svg>,
    help: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M11 2h2v2h2v2h2v2h2v6h-2v2h-2v2H9v-2H7v-2H5V6h2V4h2V2h2zm0 4H9v2H7v2h2v2h2v-2h2V8h-2V6h-2zm0 10h2v2h-2v-2z" /></svg>,
    timer: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2h2v2H10V2h2zm-4 4h2v2H8V6h-2zm12 0h-2v2h2V6h2zM12 18h2v-2h-2v2zm-6-6h2v2H6v-2h-2zm12 0h-2v2h2v-2h2zm-6-4h2v6h-2V8z" /></svg>,
    trophy: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M6 4h12v2h2v2h2v4h-2v3h-3v3h-2v2H9v-2H7v-3H4v-3H2V8h2V6h2V4zm10 2H8v8h8V6zm4 4h-2v3h2v-3zM4 10h2v3H4v-3z" /></svg>,
    list: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5 8h16v2H5V8zm0 6h16v2H5v-2zM5 14h2v2H5v-2zm0-6h2v2H5V8z" /></svg>,
    cancel: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg>,
    login: <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" /></svg>
}

// Pixel Icon Component
const PixelIcon = ({ name, size = 20, className = "" }) => (
    <Box component="span" className={`pixel-icon ${className}`} sx={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', verticalAlign: 'middle', lineHeight: 0 }}>
        {ICONS[name] || null}
    </Box>
)

// Stars Component
const Stars = ({ count, total = 3 }) => (
    <Stack direction="row" spacing={0.5}>
        {[...Array(total)].map((_, i) => (
            <PixelIcon key={i} name={i < count ? 'star' : 'starEmpty'} size={16} />
        ))}
    </Stack>
)

function SoundToggle({ muted, onToggle }) {
    return (
        <Button variant="contained" color="secondary" onClick={onToggle} style={{ minWidth: '40px', padding: 8 }}>
            <PixelIcon name={muted ? 'soundOff' : 'soundOn'} size={20} />
        </Button>
    )
}

function AuthModal({ onClose, onLogin }) {
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
            onLogin(data.user, data.token) // Pass token
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
                {mode === 'login' ? '🔐 LOGIN' : '✨ REGISTER'}
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
                            <Button fullWidth variant="contained" color="secondary" onClick={onClose} startIcon={<PixelIcon name="cancel" />}>
                                CANCEL
                            </Button>
                            <Button fullWidth type="submit" variant="contained" color="primary" disabled={loading} startIcon={<PixelIcon name="login" />}>
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

function ResultModal({ stars, score, isNewBest, onRetry, onNext, onLevels, hasNext }) {
    useEffect(() => {
        if (stars > 0) {
            for (let i = 1; i <= stars; i++) setTimeout(() => soundManager.playStar(i), i * 300)
        }
    }, [stars])

    return (
        <Dialog open={true} maxWidth="xs" fullWidth>
            <DialogTitle sx={{ textAlign: 'center', color: 'primary.main' }}>
                {stars > 0 ? 'LEVEL COMPLETE!' : 'TRY AGAIN!'}
            </DialogTitle>
            <DialogContent>
                <Stack alignItems="center" spacing={2}>
                    <Stars count={stars} total={3} />
                    <Typography>SQUARES: {score}</Typography>
                    {isNewBest && <Typography color="primary"><PixelIcon name="trophy" /> NEW BEST!</Typography>}
                    <Stack direction="column" spacing={1} width="100%">
                        <Button fullWidth variant="contained" color="secondary" onClick={() => { soundManager.playClick(); onRetry() }} startIcon={<PixelIcon name="refresh" />}>
                            RETRY
                        </Button>
                        {hasNext && stars > 0 && (
                            <Button fullWidth variant="contained" color="primary" onClick={() => { soundManager.playClick(); onNext() }} endIcon={<PixelIcon name="arrowRight" />}>
                                NEXT
                            </Button>
                        )}
                        <Button fullWidth variant="outlined" color="secondary" onClick={() => { soundManager.playClick(); onLevels() }} startIcon={<PixelIcon name="list" />}>
                            LEVELS
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

function GameGrid({ levelConfig, onComplete }) {
    const [cells, setCells] = useState([])
    const [visited, setVisited] = useState(new Set())
    const [currentPos, setCurrentPos] = useState(null)
    const [moveCount, setMoveCount] = useState(0)
    const [gameActive, setGameActive] = useState(true)
    const [status, setStatus] = useState('CLICK ANY SQUARE TO BEGIN!')
    const [statusType, setStatusType] = useState('neutral')
    const [timeRemaining, setTimeRemaining] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [showRules, setShowRules] = useState(false)
    const [result, setResult] = useState(null)
    const lastTimerWarning = useRef(null)

    const blockedSet = new Set((levelConfig?.blockedSquares || []).map(sq => `${sq.x},${sq.y}`))

    const resetLevel = () => {
        setCells(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({ x: i % GRID_SIZE, y: Math.floor(i / GRID_SIZE), key: `${i % GRID_SIZE},${Math.floor(i / GRID_SIZE)}` })))
        setVisited(new Set(blockedSet))
        setCurrentPos(null)
        setMoveCount(0)
        setGameActive(true)
        setStatus(levelConfig?.fixedStart ? 'MAKE YOUR MOVE!' : 'CLICK ANY SQUARE TO BEGIN!')
        setStatusType('neutral')
        setShowResult(false)
        if (levelConfig?.timeLimit) setTimeRemaining(levelConfig.timeLimit)

        // Handle fixed start
        if (levelConfig?.fixedStart) {
            setTimeout(() => {
                startGame(levelConfig.fixedStart.x, levelConfig.fixedStart.y)
            }, 100)
        }
    }

    useEffect(() => {
        resetLevel()
    }, [levelConfig])

    useEffect(() => {
        if (!gameActive || timeRemaining === null) return
        if (timeRemaining <= 0) { endGame(false, 'TIME IS UP!'); return }
        if (timeRemaining <= 10 && lastTimerWarning.current !== Math.floor(timeRemaining)) {
            soundManager.playTimerWarning()
            lastTimerWarning.current = Math.floor(timeRemaining)
        }
        const timer = setInterval(() => setTimeRemaining(t => t - 1), 1000)
        return () => clearInterval(timer)
    }, [gameActive, timeRemaining])

    const isValidPos = (x, y) => x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE
    const isValidMove = useCallback((x, y) => {
        const key = `${x},${y}`
        if (visited.has(key) || !isValidPos(x, y) || !currentPos) return false
        return MOVES.some(m => currentPos.x + m.dx === x && currentPos.y + m.dy === y)
    }, [visited, currentPos])

    const startGame = (x, y) => {
        if (blockedSet.has(`${x},${y}`)) return
        setCurrentPos({ x, y })
        setVisited(prev => new Set([...prev, `${x},${y}`]))
        setMoveCount(1)
        setStatus('CLICK A YELLOW SQUARE!')
        soundManager.playStart()
    }

    const endGame = (won, message) => {
        setGameActive(false)
        const starsBreakdown = levelConfig?.stars || [10, 15, 20]
        let earnedStars = 0
        if (moveCount >= starsBreakdown[2]) earnedStars = 3
        else if (moveCount >= starsBreakdown[1]) earnedStars = 2
        else if (moveCount >= starsBreakdown[0]) earnedStars = 1

        const finalStars = won ? 3 : earnedStars
        if (finalStars > 0) {
            setStatus(message || `LEVEL COMPLETE! ${moveCount} MOVES`)
            setStatusType('won')
            soundManager.playWin()
        } else {
            setStatus(message || `GAME OVER! ${moveCount} MOVES`)
            setStatusType('lost')
            soundManager.playGameOver()
        }
        setResult({ stars: finalStars, score: moveCount, isNewBest: false })
        setTimeout(() => setShowResult(true), 1000)
        if (onComplete) onComplete(moveCount, finalStars)
    }

    const handleCellClick = (x, y) => {
        if (!gameActive || blockedSet.has(`${x},${y}`)) return
        if (moveCount === 0) { if (!levelConfig?.fixedStart) startGame(x, y); return }
        if (!isValidMove(x, y)) {
            // Silently ignore invalid moves as requested
            return
        }
        const nextMoveNumber = moveCount + 1
        // Check Required Moves
        if (levelConfig?.requiredMoves) {
            const req = levelConfig.requiredMoves.find(r => r.moveNumber === nextMoveNumber)
            if (req && (req.x !== x || req.y !== y)) {
                soundManager.playInvalid()
                setStatus(`MOVE ${nextMoveNumber} MUST BE HERE!`) // Hint is actually on the grid, but text feedback helps
                setStatusType('lost')
                // Fail immediately? Or just block? User said "fail if they don't press". 
                // "4. hamle belirlenen kareye basamazsa kaybeder". 
                // This implies if they click *another* valid square that isn't the required one, they lose.
                // Since this function is only called on valid clicks (we already checked isValidMove or start), 
                // if we are here, they clicked a valid square. If it's not the required one -> GAME OVER.
                setTimeout(() => endGame(false, 'MISSED REQUIRED MOVE!'), 500)
                return
            }
        }

        setCurrentPos({ x, y })
        const key = `${x},${y}`
        setVisited(prev => new Set([...prev, key]))
        setMoveCount(nextMoveNumber)
        soundManager.playMove(nextMoveNumber)

        const newVisited = new Set([...visited, key])
        const totalPlayable = 25 - (levelConfig?.blockedSquares?.length || 0)
        if (newVisited.size === totalPlayable) setTimeout(() => endGame(true), 100)
        else {
            const hasMoves = MOVES.some(m => {
                const nx = x + m.dx, ny = y + m.dy
                return isValidPos(nx, ny) && !newVisited.has(`${nx},${ny}`)
            })
            if (!hasMoves) setTimeout(() => endGame(false), 100)
        }
    }

    const getPossibleMoves = () => {
        if (!currentPos) return new Set()
        const moves = MOVES.map(m => ({ x: currentPos.x + m.dx, y: currentPos.y + m.dy }))
            .filter(pos => isValidPos(pos.x, pos.y) && !visited.has(`${pos.x},${pos.y}`))
        return new Set(moves.map(p => `${p.x},${p.y}`))
    }

    const possibleSet = getPossibleMoves()
    let statusColor = 'text.primary'
    if (statusType === 'won') statusColor = 'success.main'
    if (statusType === 'lost') statusColor = 'error.main'

    return (
        <Box sx={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%', mb: 1 }}>
                <Button variant="contained" color="secondary" onClick={() => { soundManager.playNav(); onComplete(0, -1) }} startIcon={<PixelIcon name="arrowLeft" />}>
                    BACK
                </Button>
                <Typography variant="h6" sx={{ color: 'primary.main', fontSize: '0.9rem', textAlign: 'center' }}>
                    {levelConfig ? `LEVEL ${levelConfig.id}` : 'FREE PLAY'}
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setShowRules(true)}
                    sx={{ minWidth: '40px', width: '40px', height: '40px', p: 0, borderRadius: 0, fontSize: '1.2rem', lineHeight: 1 }}
                >
                    ?
                </Button>
            </Stack>

            {/* Compact Stars Display */}
            {levelConfig?.stars && (
                <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
                    <Box display="flex" alignItems="center" gap={0.5} color="primary.main">
                        <PixelIcon name="star" size={14} />
                        <Typography variant="caption">{levelConfig.stars[0]}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5} color="primary.main">
                        <Stack direction="row" spacing={-0.5}><PixelIcon name="star" size={14} /><PixelIcon name="star" size={14} /></Stack>
                        <Typography variant="caption">{levelConfig.stars[1]}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5} color="primary.main">
                        <Stack direction="row" spacing={-0.5}><PixelIcon name="star" size={14} /><PixelIcon name="star" size={14} /><PixelIcon name="star" size={14} /></Stack>
                        <Typography variant="caption">{levelConfig.stars[2]}</Typography>
                    </Box>
                </Stack>
            )}

            {timeRemaining !== null && (
                <Box sx={{ bgcolor: 'error.main', border: 2, borderColor: 'secondary.contrastText', p: 0.5, px: 2, borderRadius: 1, mb: 1, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: 'white', fontSize: '0.9rem' }}>
                    <PixelIcon name="timer" /> {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </Box>
            )}

            <Stack spacing={1} sx={{ mb: 1, width: '100%' }}>
                <Box sx={{ p: 1, bgcolor: 'background.paper', border: 2, borderColor: 'secondary.main', borderRadius: 1, textAlign: 'center' }}>
                    <Typography sx={{ color: statusColor, fontSize: '0.8rem' }}>{status}</Typography>
                </Box>
                <Typography sx={{ textAlign: 'center', color: 'primary.main', fontSize: '0.8rem' }}>
                    VISITED: {moveCount} / {25 - (levelConfig?.blockedSquares?.length || 0)}
                </Typography>
            </Stack>

            {/* Rules Modal */}
            <Dialog open={showRules} onClose={() => setShowRules(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ textAlign: 'center', color: 'primary.main' }}>HOW TO PLAY</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.primary', mb: 2 }}>
                        {levelConfig ? (RULE_DESCRIPTIONS[levelConfig.ruleSet] || 'REACH THE GOAL!') : 'VISIT ALL 25 SQUARES!'}
                    </Typography>
                    <Button fullWidth variant="contained" color="primary" onClick={() => setShowRules(false)}>GOT IT!</Button>
                </DialogContent>
            </Dialog>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gap: { xs: '4px', sm: '8px' }, // Smaller gap on mobile
                width: '100%',
                maxWidth: { xs: '100%', sm: '400px' }, // Utilize full width on mobile
                bgcolor: 'transparent', // Grid itself transparent
                p: 0,
                mt: 1
            }}>
                {cells.map(cell => {
                    const isVisited = visited.has(cell.key), isCurrent = currentPos && currentPos.x === cell.x && currentPos.y === cell.y
                    const isBlocked = blockedSet.has(cell.key), isPossible = possibleSet.has(cell.key)

                    let bg = 'rgba(236,236,236,0.1)' // cell-bg
                    // Check if this cell is a required move
                    const reqMove = levelConfig?.requiredMoves?.find(r => r.x === cell.x && r.y === cell.y)

                    if (isBlocked) bg = '#D2003A'
                    else if (isCurrent) bg = 'rgba(236,236,236,0.2)'
                    else if (isVisited) bg = '#111111' // Darkest Gray
                    else if (reqMove) bg = 'rgba(17, 17, 17, 0.5)' // Low opacity 'visited' look
                    else if (isPossible) bg = '#FAEC3B'

                    // Pixel Art 3D Bevel Effect
                    // Light Top/Left, Dark Bottom/Right
                    // Reverting to solid borders as requested
                    let border = '2px solid #FAEC3B'
                    if (isCurrent) border = '4px solid #FAEC3B'
                    if (reqMove && !isVisited) border = '2px dashed #FAEC3B' // Dashed for required moves

                    return (
                        <Box key={cell.key}
                            onClick={() => handleCellClick(cell.x, cell.y)}
                            sx={{
                                width: '100%',
                                aspectRatio: '1/1', // Force square cells
                                bgcolor: bg,
                                border: border, // Consistent yellow border
                                borderRadius: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: { xs: '0.8rem', sm: '1rem' }, // Smaller font on mobile
                                color: isPossible ? '#001E1E' : '#ECECEC',
                                cursor: (isBlocked || (!isPossible && moveCount > 0)) ? 'default' : 'pointer',
                                touchAction: 'manipulation', // Better touch response
                                '&:active': (!isVisited && !isBlocked) ? { transform: 'scale(0.95)' } : {},
                            }}
                        >
                            {isBlocked ? <PixelIcon name="lock" size={16} /> : isVisited ?
                                <Typography sx={{ color: isCurrent ? '#ECECEC' : '#ECECEC', fontWeight: 'bold', fontSize: 'inherit' }}>
                                    {[...visited].indexOf(cell.key) >= blockedSet.size ? ([...visited].indexOf(cell.key) - blockedSet.size + 1) : ''}
                                </Typography>
                                :
                                // Show required move number if applicable
                                (() => {
                                    const req = levelConfig?.requiredMoves?.find(r => r.x === cell.x && r.y === cell.y)
                                    if (req) {
                                        return <Typography sx={{ color: '#FFFFFF', fontWeight: '900', fontSize: '0.9rem', textShadow: '1px 1px 0 #000' }}>{req.moveNumber}</Typography>
                                    }
                                    return ''
                                })()
                            }
                        </Box>
                    )
                })}
            </Box>

            {!gameActive && (
                <Button fullWidth variant="contained" color="primary" onClick={resetLevel} sx={{ mt: 2 }} startIcon={<PixelIcon name="refresh" />}>
                    TRY AGAIN
                </Button>
            )}

            {showResult && result && <ResultModal stars={result.stars} score={result.score} hasNext={true} onRetry={resetLevel} onNext={() => setShowResult(false)} onLevels={() => { setShowResult(false); onComplete(0, -1) }} />}
        </Box>
    )
}

export default function Home() {
    const [screen, setScreen] = useState('menu')
    const [user, setUser] = useState(null)
    const [showAuth, setShowAuth] = useState(false)
    const [currentWorld, setCurrentWorld] = useState(1)
    const [currentLevel, setCurrentLevel] = useState(1)
    const [progress, setProgress] = useState({})
    const [totalStars, setTotalStars] = useState(0)
    const [soundMuted, setSoundMuted] = useState(false)
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info' })

    const showNotification = (message, severity = 'info') => {
        setNotification({ open: true, message, severity })
    }

    const handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') return
        setNotification({ ...notification, open: false })
    }

    // Fetch progress from API
    const fetchProgress = async (token) => {
        if (!token) return
        try {
            const res = await fetch('/api/progress', {
                headers: { 'Authorization': `Bearer ${token}` }
            })

            if (res.status === 401 || res.status === 403) {
                // Token invalid or expired - logout user
                console.warn('Session expired, logging out')
                logout(true) // Silent logout
                showNotification('Session expired. Please login again.', 'warning')
                return
            }

            if (res.ok) {
                const data = await res.json()
                // Convert array to map: { worldId: { levelId: { stars, bestScore } } }
                const newProgress = {}
                data.progress.forEach(p => {
                    if (!newProgress[p.worldId]) newProgress[p.worldId] = {}
                    newProgress[p.worldId][p.levelId] = { stars: p.stars, bestScore: p.bestScore }
                })
                setProgress(newProgress)
                setTotalStars(data.totalStars || 0)
                localStorage.setItem('gameProgress', JSON.stringify(newProgress)) // Sync local
            } else {
                console.error('Failed to fetch progress:', res.statusText)
            }
        } catch (e) { console.error('Failed to fetch progress', e) }
    }

    // Load user and initial progress
    useEffect(() => {
        try {
            const u = JSON.parse(localStorage.getItem('user'))
            if (u) {
                setUser(u)
                fetchProgress(localStorage.getItem('token')) // Fetch from DB if user exists
            } else {
                // Fallback to local storage if no user
                const p = JSON.parse(localStorage.getItem('gameProgress'))
                if (p) {
                    setProgress(p)
                    let stars = 0
                    Object.values(p).forEach(w => Object.values(w).forEach(l => stars += (l.stars || 0)))
                    setTotalStars(stars)
                }
            }
            setSoundMuted(soundManager.isMuted())
        } catch (e) { }
    }, [])

    const toggleSound = () => { const m = soundManager.toggleMute(); setSoundMuted(m); if (!m) soundManager.playClick() }
    const logout = (silent = false) => {
        if (!silent) soundManager.playClick();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setScreen('menu');
        setProgress({});
        setTotalStars(0);
    }

    if (screen === 'menu') return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', width: '100%', p: 2 }}>
            <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
                <Typography variant="h1" sx={{ fontSize: 'clamp(2rem, 8vw, 3rem)', textShadow: '4px 4px 0 #001E1E', mb: 1, color: 'primary.main', textAlign: 'center' }}>
                    25 SQUARES
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.secondary', opacity: 0.8, mb: 4, letterSpacing: 1 }}>
                    A CLASSIC PUZZLE CHALLENGE
                </Typography>

                <Box sx={{ bgcolor: 'background.paper', border: 2, borderColor: 'primary.main', p: 2, borderRadius: 2, mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                    <PixelIcon name="star" />
                    <Typography variant="h6" color="primary">TOTAL STARS: {totalStars}</Typography>
                </Box>

                <Stack spacing={2} mb={4}>
                    <Button variant="contained" color="primary" size="large" onClick={() => { soundManager.playClick(); user ? setScreen('worlds') : setShowAuth(true) }} startIcon={<PixelIcon name="play" />}>
                        PLAY
                    </Button>
                    <Button variant="contained" color="secondary" size="large" onClick={() => { soundManager.playClick(); setCurrentWorld(0); setScreen('game') }} startIcon={<PixelIcon name="shuffle" />}>
                        FREE PLAY
                    </Button>
                </Stack>

                <Box sx={{ bgcolor: 'background.paper', border: 2, borderColor: 'text.secondary', p: 2, borderRadius: 2, textAlign: 'left', opacity: 0.9 }}>
                    <Typography variant="h6" color="primary" align="center" sx={{ mb: 2 }}>
                        HOW TO PLAY
                    </Typography>
                    <Stack spacing={1}>
                        <Typography variant="caption">1. CLICK TO START</Typography>
                        <Typography variant="caption">2. MOVE 3 SQUARES STRAIGHT</Typography>
                        <Typography variant="caption">3. OR 2 SQUARES DIAGONALLY</Typography>
                    </Stack>
                </Box>

                <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 4 }}>
                    <SoundToggle muted={soundMuted} onToggle={toggleSound} />
                    {user && (
                        <Button variant="contained" color="secondary" onClick={logout} endIcon={<PixelIcon name="exit" size={16} />} sx={{ minWidth: 'auto', px: 2 }}>
                            LOGOUT
                        </Button>
                    )}
                </Stack>
            </Box>
            {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={(u, t) => { setUser(u); fetchProgress(t); }} />}
        </Box>
    )

    if (screen === 'worlds') {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%', p: 2 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%', maxWidth: '400px', mb: 4 }}>
                    <Button variant="contained" color="secondary" onClick={() => { soundManager.playNav(); setScreen('menu') }} startIcon={<PixelIcon name="arrowLeft" />}>
                        BACK
                    </Button>
                    <Typography variant="h6" sx={{ flex: 1, textAlign: 'center', color: 'primary.main' }}>
                        SELECT WORLD
                    </Typography>
                </Stack>
                <Stack spacing={2} sx={{ width: '100%', maxWidth: '400px' }}>
                    {WORLDS.map(world => {
                        const unlocked = totalStars >= world.requiredStars
                        const worldStars = (progress[world.id] && Object.values(progress[world.id]).reduce((a, b) => a + (b.stars || 0), 0)) || 0
                        return (
                            <Box key={world.id}
                                onClick={() => { if (unlocked) { soundManager.playClick(); setCurrentWorld(world.id); setScreen('levels') } else soundManager.playInvalid() }}
                                sx={{
                                    bgcolor: 'background.paper',
                                    border: 3,
                                    borderColor: unlocked ? 'text.secondary' : 'text.disabled',
                                    p: 2,
                                    borderRadius: 2,
                                    cursor: unlocked ? 'pointer' : 'not-allowed',
                                    opacity: unlocked ? 1 : 0.6,
                                    '&:hover': unlocked ? { transform: 'scale(1.02)', borderColor: 'primary.main' } : {}
                                }}>
                                <Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>{world.name}</Typography>
                                <Typography variant="body2" color="primary" sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                    <PixelIcon name="star" /> {worldStars} / {world.levels * 3}
                                </Typography>
                                {!unlocked && (
                                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                                        <PixelIcon name="lock" /> REQUIRES {world.requiredStars} STARS
                                    </Typography>
                                )}
                            </Box>
                        )
                    })}
                </Stack>
            </Box>
        )
    }

    if (screen === 'levels') {
        const world = WORLDS.find(w => w.id === currentWorld)
        const worldStars = (progress[currentWorld] && Object.values(progress[currentWorld]).reduce((a, b) => a + (b.stars || 0), 0)) || 0
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', width: '100%', p: { xs: 1, sm: 2 } }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%', maxWidth: '400px', mb: 2 }}>
                    <Button variant="contained" color="secondary" onClick={() => { soundManager.playNav(); setScreen('worlds') }} startIcon={<PixelIcon name="arrowLeft" />}>
                        BACK
                    </Button>
                    <Typography variant="h6" sx={{ flex: 1, textAlign: 'center', color: 'primary.main' }}>
                        {world.name}
                    </Typography>
                </Stack>
                <Typography color="primary" sx={{ mb: 4, display: 'flex', gap: 1 }}>
                    <PixelIcon name="star" /> {worldStars} / {world.levels * 3}
                </Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)' }, // 3 cols on mobile, 5 on desktop
                    gap: { xs: 1, sm: 1.5 },
                    width: '100%',
                    maxWidth: '400px'
                }}>
                    {[...Array(world.levels)].map((_, i) => {
                        const levelId = i + 1; const levelProgress = progress[currentWorld]?.[levelId]
                        const unlocked = levelId === 1 || (progress[currentWorld]?.[levelId - 1]?.stars || 0) > 0
                        const stars = levelProgress?.stars || 0
                        return (
                            <Box key={levelId}
                                onClick={() => { if (unlocked) { soundManager.playClick(); setCurrentLevel(levelId); setScreen('game') } else soundManager.playInvalid() }}
                                sx={{
                                    aspectRatio: '1',
                                    bgcolor: 'background.paper',
                                    border: 2,
                                    borderColor: stars > 0 ? 'primary.main' : 'text.secondary',
                                    borderRadius: 1,
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    cursor: unlocked ? 'pointer' : 'not-allowed',
                                    opacity: unlocked ? 1 : 0.4,
                                    '&:hover': unlocked ? { bgcolor: 'rgba(250, 236, 59, 0.1)' } : {}
                                }}>
                                <Typography fontWeight="bold" fontSize="1.1rem" color="text.primary">{levelId}</Typography>
                                <Box mt={0.5}>
                                    {unlocked ? <Stars count={stars} total={3} /> : <PixelIcon name="lock" size={12} />}
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
        )
    }

    if (screen === 'game') return (
        <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', width: '100%', p: { xs: 1, sm: 2 } }}>
            <GameGrid
                levelConfig={currentWorld === 0 ? null : getLevelConfig(currentWorld, currentLevel)}
                onComplete={(score, stars) => {
                    if (stars === -1) { setScreen(currentWorld === 0 ? 'menu' : 'levels'); return }
                    if (currentWorld !== 0) {
                        const newProgress = { ...progress }
                        if (!newProgress[currentWorld]) newProgress[currentWorld] = {}
                        newProgress[currentWorld][currentLevel] = { stars: Math.max(newProgress[currentWorld][currentLevel]?.stars || 0, stars), bestScore: score }
                        setProgress(newProgress); localStorage.setItem('gameProgress', JSON.stringify(newProgress))
                        let t = 0; Object.values(newProgress).forEach(w => Object.values(w).forEach(l => t += l.stars || 0)); setTotalStars(t)
                        if (user) fetch('/api/progress', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ worldId: currentWorld, levelId: currentLevel, stars, bestScore: score }) }).catch(console.error)
                    }
                }}
            />
        </Box>
    )

    return (
        <>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%', fontFamily: 'inherit' }} variant="filled">
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}
