'use client'

import { useState, useEffect } from 'react'
import soundManager from '@/lib/sounds'
import { WORLDS, getLevelConfig, RULE_DESCRIPTIONS } from '@/lib/levels'
import { Snackbar, Alert, Box, Typography, IconButton, Stack, Dialog, DialogTitle, DialogContent, Button } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import PersonIcon from '@mui/icons-material/Person'
import RefreshIcon from '@mui/icons-material/Refresh'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import StarIcon from '@mui/icons-material/Star'
import AccessTimeIcon from '@mui/icons-material/AccessTime'

// Components
import MenuScreen from '@/components/screens/MenuScreen'
import WorldsScreen from '@/components/screens/WorldsScreen'
import LevelsScreen from '@/components/screens/LevelsScreen'
import GameGrid from '@/components/game/GameGrid'
import AuthModal from '@/components/modals/AuthModal'
import TopBar from '@/components/TopBar'

export default function Home() {
    const [screen, setScreen] = useState('menu')
    const [currentWorld, setCurrentWorld] = useState(1)
    const [currentLevel, setCurrentLevel] = useState(1)
    const [user, setUser] = useState(null)
    const [progress, setProgress] = useState({})
    const [showAuth, setShowAuth] = useState(false)
    const [muted, setMuted] = useState(typeof window !== 'undefined' ? soundManager.isMuted() : false)
    const [bgmMuted, setBgmMuted] = useState(typeof window !== 'undefined' ? soundManager.isBgmMuted() : true)
    const [levelsCache, setLevelsCache] = useState({})
    const [isOnline, setIsOnline] = useState(true)
    const [isLoading, setIsLoading] = useState(true) // Initial loading state
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'info', duration: 6000 })
    const [activeSection, setActiveSection] = useState(null)
    const [showLevelInfo, setShowLevelInfo] = useState(false)

    const showNotification = (message, severity = 'info', duration = 6000) => {
        setNotification({ open: true, message, severity, duration })
    }

    // Initialize Sounds & BGM
    useEffect(() => {
        // Sync initial state from manager
        setMuted(soundManager.isMuted())
        setBgmMuted(soundManager.isBgmMuted())

        const handleInteraction = () => {
            if (soundManager.context?.state === 'suspended') {
                soundManager.context.resume()
            }
            // Try to init BGM on first interaction
            soundManager.initBGM()
            setBgmMuted(soundManager.isBgmMuted())
        }
        window.addEventListener('click', handleInteraction)
        window.addEventListener('keydown', handleInteraction)
        return () => {
            window.removeEventListener('click', handleInteraction)
            window.removeEventListener('keydown', handleInteraction)
        }
    }, [])

    // Load initial data (Levels & User)
    useEffect(() => {
        // Load User
        const token = localStorage.getItem('token')
        const storedUser = localStorage.getItem('user')
        if (token && storedUser) {
            setUser(JSON.parse(storedUser))

            // Validate & Refresh User Data from DB
            fetch('/api/auth/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(res => {
                    if (res.ok) return res.json()
                    throw new Error('Auth failed')
                })
                .then(data => {
                    if (data.user) {
                        setUser(data.user)
                        localStorage.setItem('user', JSON.stringify(data.user))
                    }
                })
                .catch(() => {
                    // If token invalid, logout
                    // But maybe just offline? Don't clear immediately unless 401
                })
        }

        // Load Levels Logic
        const loadLevels = async () => {
            // Check offline/online status first
            if (typeof window !== 'undefined') setIsOnline(navigator.onLine)

            // Try to load cached levels first to render immediately
            const cached = localStorage.getItem('cachedLevels')
            if (cached) {
                try {
                    const parsed = JSON.parse(cached)
                    setLevelsCache(parsed)
                } catch (e) { console.error('Cache parse error', e) }
            }

            if (!navigator.onLine) return

            try {
                const res = await fetch('/api/levels')
                if (res.ok) {
                    const data = await res.json()
                    // API returns already grouped by worldId: { 1: [...], 2: [...] }
                    setLevelsCache(data)
                    localStorage.setItem('cachedLevels', JSON.stringify(data))
                }
            } catch (err) {
                console.error('Failed to fetch levels:', err)
            } finally {
                setIsLoading(false)
            }
        }
        loadLevels()
    }, [])

    // Offline & Sync Logic
    useEffect(() => {
        const checkConnection = async () => {
            try {
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 5000)

                const res = await fetch('/api/health', {
                    method: 'GET',
                    cache: 'no-store',
                    signal: controller.signal
                })
                clearTimeout(timeoutId)

                if (res.ok) {
                    if (!isOnline) {
                        setIsOnline(true)
                        // Force close any open offline notification immediately
                        setNotification({ open: false, message: '', severity: 'info', duration: 6000 })
                        setTimeout(() => {
                            showNotification('CONNECTION RESTORED. SYNCING...', 'success', 3000)
                        }, 200)
                        syncProgress()
                    }
                } else {
                    if (isOnline) {
                        setIsOnline(false)
                        // User requested to remove "OFFLINE MODE" popup
                        // showNotification('OFFLINE MODE - SAVING LOCALLY', 'error', null)
                    }
                }
            } catch (e) {
                if (isOnline) {
                    setIsOnline(false)
                    // User requested to remove "OFFLINE MODE" popup
                    // showNotification('OFFLINE MODE - SAVING LOCALLY', 'error', null)
                }
            }
        }

        if (typeof window !== 'undefined') setIsOnline(navigator.onLine)

        const handleOnline = () => checkConnection()
        const handleOffline = () => {
            setIsOnline(false)
            showNotification('OFFLINE MODE - SAVING LOCALLY', 'error', null)
        }

        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)

        const interval = setInterval(checkConnection, 5000) // Check more frequently (5s)

        return () => {
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
            clearInterval(interval)
        }
    }, [isOnline])

    // Load Progress
    useEffect(() => {
        if (user) {
            if (isOnline) {
                fetch('/api/progress', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                })
                    .then(res => res.json())
                    .then(data => {
                        const prog = {}
                        // API returns { progress: [], totalStars: ... }
                        // Ensure we access the array property
                        const progressData = Array.isArray(data) ? data : (data.progress || [])
                        progressData.forEach(p => {
                            if (!prog[p.worldId]) prog[p.worldId] = {}
                            prog[p.worldId][p.levelId] = { stars: p.stars, score: p.score }
                        })
                        setProgress(prog)
                        localStorage.setItem('cachedProgress', JSON.stringify(prog))
                    })
                    .catch(() => {
                        // Fallback to cache if fetch fails
                        const cached = localStorage.getItem('cachedProgress')
                        if (cached) setProgress(JSON.parse(cached))
                    })
            } else {
                // Offline load
                const cached = localStorage.getItem('cachedProgress')
                if (cached) setProgress(JSON.parse(cached))
            }
        } else {
            setProgress({})
        }
    }, [user, isOnline])

    const syncProgress = async () => {
        const queue = JSON.parse(localStorage.getItem('offlineProgressQueue') || '[]')
        if (queue.length === 0) return

        const token = localStorage.getItem('token')

        const newQueue = []
        for (const item of queue) {
            try {
                const res = await fetch('/api/progress', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: item
                })
                if (!res.ok) newQueue.push(item) // Keep in queue if failed
            } catch (e) {
                newQueue.push(item)
            }
        }

        localStorage.setItem('offlineProgressQueue', JSON.stringify(newQueue))
        if (newQueue.length === 0) {
            showNotification('OFFLINE PROGRESS SYNCED!', 'success')
            // Refresh progress
            const res = await fetch('/api/progress', { headers: { 'Authorization': `Bearer ${token}` } })
            const data = await res.json()
            const prog = {}
            const progressData = Array.isArray(data) ? data : (data.progress || [])
            progressData.forEach(p => {
                if (!prog[p.worldId]) prog[p.worldId] = {}
                prog[p.worldId][p.levelId] = { stars: p.stars, score: p.score }
            })
            setProgress(prog)
            localStorage.setItem('cachedProgress', JSON.stringify(prog))
        }
    }

    const saveProgress = async (worldId, levelId, score, stars, hintsUsed, undosUsed) => {
        const newProgress = { ...progress }
        if (!newProgress[worldId]) newProgress[worldId] = {}

        const currentBest = newProgress[worldId][levelId]?.stars || 0
        if (stars > currentBest) {
            newProgress[worldId][levelId] = { stars, score }
            setProgress(newProgress)
            localStorage.setItem('cachedProgress', JSON.stringify(newProgress)) // Update cache immediately
        }

        if (user) {
            const payload = JSON.stringify({ worldId, levelId, score, stars, hintsUsed, undosUsed })

            if (isOnline) {
                try {
                    await fetch('/api/progress', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: payload
                    })
                } catch (e) {
                    // Fallback to queue if fetch fails (rare edge case of just going offline)
                    const queue = JSON.parse(localStorage.getItem('offlineProgressQueue') || '[]')
                    queue.push(payload)
                    localStorage.setItem('offlineProgressQueue', JSON.stringify(queue))
                }
            } else {
                // Queue for later
                const queue = JSON.parse(localStorage.getItem('offlineProgressQueue') || '[]')
                queue.push(payload)
                localStorage.setItem('offlineProgressQueue', JSON.stringify(queue))
            }
        }
    }

    const handleLevelComplete = (score, stars, hintsUsed, undosUsed) => {
        if (stars > 0) {
            saveProgress(currentWorld, currentLevel, score, stars, hintsUsed || 0, undosUsed || 0)
        } else {
            // For restarts or failures, generally we don't save unless we track "attempts"
            if (hintsUsed > 0 || undosUsed > 0) {
                // Optionally track usage even on failure? Current API accepts it.
                // But typically we save on win. 
                // If restarting, we might want to just reset.
            }
        }

        if (score === 0 && stars === -1) {
            // "Levels" button clicked
            setScreen('levels')
        }
    }

    // Determine config to use (DB or Static)
    let activeLevelConfig = null
    if (screen === 'game') {
        if (currentLevel === 'free') {
            activeLevelConfig = null // Triggers "FREE PLAY" in GameGrid
        } else {
            const dbWorld = levelsCache[currentWorld]
            // Safe access in case levelsCache is array of objects or just list
            if (Array.isArray(dbWorld)) {
                // API returns levels with 'id' property (transformed from levelId)
                const dbLevel = dbWorld.find(l => l.id === currentLevel)
                if (dbLevel) {
                    // The level object IS the config
                    activeLevelConfig = dbLevel
                }
            }

            // Fallback
            if (!activeLevelConfig) {
                activeLevelConfig = getLevelConfig(currentWorld, currentLevel)
            }
        }
    }

    return (
        <>
            {/* Top Bar (hidden on game screen - GameGrid has its own) */}
            {/* Top Bar (hidden on game screen - GameGrid has its own) */}
            {screen !== 'game' && screen !== 'menu' && (
                <TopBar
                    title={
                        screen === 'worlds' ? 'SELECT WORLD' :
                            screen === 'levels' ? `WORLD ${currentWorld}` :
                                '25 SQUARES'
                    }
                    onBack={screen !== 'menu' ? () => {
                        soundManager.playNav()
                        if (screen === 'levels') setScreen('worlds')
                        else if (screen === 'worlds') setScreen('menu')
                    } : null}
                    user={user}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    customActions={
                        /* Online Indicator */
                        <Box sx={{
                            width: 8, height: 8,
                            borderRadius: '50%',
                            bgcolor: isOnline ? '#00FF00' : '#FF0000',
                            boxShadow: isOnline ? '0 0 5px #00FF00' : '0 0 5px #FF0000',
                            mr: 1
                        }} />
                    }
                />
            )}



            {showAuth && (
                <AuthModal
                    onClose={() => setShowAuth(false)}
                    onLogin={(u, token) => {
                        setUser(u);
                        if (token) localStorage.setItem('token', token)
                        if (u) localStorage.setItem('user', JSON.stringify(u))
                        setShowAuth(false);
                        // Trigger reload of progress
                        setIsOnline(prev => !prev); setIsOnline(prev => !prev); // Force effect hook re-run hack or just let the user dependency handle it
                    }}
                />
            )}

            {screen === 'menu' && (
                <MenuScreen
                    user={user}
                    onPlay={(isFree) => {
                        if (isFree) {
                            setCurrentLevel('free')
                            setScreen('game')
                        } else {
                            setScreen('worlds')
                        }
                    }}
                    onAuth={() => setShowAuth(true)}
                    onLogout={() => {
                        localStorage.removeItem('token')
                        localStorage.removeItem('user')
                        setUser(null)
                        setProgress({})
                    }}
                />
            )}

            {screen === 'worlds' && (
                <WorldsScreen
                    progress={progress}
                    onSelectWorld={(id) => { setCurrentWorld(id); setScreen('levels') }}
                    onBack={() => setScreen('menu')}
                    isOnline={isOnline}
                />
            )}

            {screen === 'levels' && (
                <LevelsScreen
                    currentWorld={currentWorld}
                    levels={levelsCache[currentWorld]}
                    progress={progress}
                    onSelectLevel={(id) => { setCurrentLevel(id); setScreen('game') }}
                    onBack={() => setScreen('worlds')}
                    isOnline={isOnline}
                />
            )}

            {screen === 'game' && (
                <GameGrid
                    levelConfig={activeLevelConfig}
                    user={user}
                    onUserUpdate={(updates) => {
                        const newUser = { ...user, ...updates }
                        setUser(newUser)
                        localStorage.setItem('user', JSON.stringify(newUser))
                    }}
                    isOnline={isOnline}
                    onComplete={handleLevelComplete}
                    onBack={() => {
                        soundManager.playClick()
                        if (currentLevel === 'free') setScreen('menu')
                        else setScreen('levels')
                    }}
                    onNextLevel={() => {
                        if (currentLevel === 'free') {
                            // Just restart free play
                            return { isLastLevel: false }
                        }

                        // Find the next level from database
                        const dbWorld = levelsCache[currentWorld]
                        if (dbWorld && Array.isArray(dbWorld)) {
                            // Sort levels by ID to ensure correct order
                            const sortedLevels = [...dbWorld].sort((a, b) => a.id - b.id)

                            // Find current level index
                            const currentIndex = sortedLevels.findIndex(l => l.id === currentLevel)

                            if (currentIndex !== -1 && currentIndex < sortedLevels.length - 1) {
                                // Next level exists
                                const nextLevel = sortedLevels[currentIndex + 1]
                                setCurrentLevel(nextLevel.id)
                                return { isLastLevel: false }
                            } else {
                                // This is the last level in the world
                                setScreen('worlds')
                                return { isLastLevel: true }
                            }
                        } else {
                            // Fallback to static levels
                            const w = WORLDS.find(w => w.id === currentWorld)
                            if (w) {
                                const sortedLevels = [...w.levels].sort((a, b) => a.id - b.id)
                                const currentIndex = sortedLevels.findIndex(l => l.id === currentLevel)

                                if (currentIndex !== -1 && currentIndex < sortedLevels.length - 1) {
                                    setCurrentLevel(sortedLevels[currentIndex + 1].id)
                                    return { isLastLevel: false }
                                } else {
                                    setScreen('worlds')
                                    return { isLastLevel: true }
                                }
                            } else {
                                setScreen('worlds')
                                return { isLastLevel: true }
                            }
                        }
                    }}
                    isLastLevel={(() => {
                        if (currentLevel === 'free') return false
                        const dbWorld = levelsCache[currentWorld]
                        if (dbWorld && Array.isArray(dbWorld)) {
                            const sortedLevels = [...dbWorld].sort((a, b) => a.id - b.id)
                            const currentIndex = sortedLevels.findIndex(l => l.id === currentLevel)
                            return currentIndex === sortedLevels.length - 1
                        }
                        return false
                    })()}
                />
            )}

            {/* Global Loading Overlay */}
            {isLoading && (
                <Box sx={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    bgcolor: 'rgba(0,30,30,0.95)', zIndex: 999999,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4
                }}>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(5, 1fr)',
                        gap: 1,
                        width: 100,
                        height: 100
                    }}>
                        {[...Array(25)].map((_, i) => (
                            <Box key={i} sx={{
                                bgcolor: '#FAEC3B',
                                animation: 'loadingSquare 1.5s infinite ease-in-out',
                                animationDelay: `${i * 0.05}s`,
                                borderRadius: 0.5,
                                boxShadow: '0 0 5px rgba(250, 236, 59, 0.3)'
                            }} />
                        ))}
                    </Box>
                    <Typography variant="h6" sx={{
                        color: '#FAEC3B',
                        fontFamily: '"Press Start 2P", cursive',
                        letterSpacing: 2,
                        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                        animation: 'pulse 1s infinite alternate',
                        '@keyframes pulse': { from: { opacity: 0.7 }, to: { opacity: 1 } },
                        textAlign: 'center'
                    }}>
                        LOADING DATA...
                    </Typography>
                </Box>
            )}

            <Snackbar
                open={notification.open}
                autoHideDuration={notification.duration}
                onClose={() => setNotification({ ...notification, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setNotification({ ...notification, open: false })} severity={notification.severity} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </>
    )
}
