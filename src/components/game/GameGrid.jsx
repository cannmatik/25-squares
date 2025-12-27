
import { useState, useEffect, useCallback, useRef } from 'react'
import { Box, Button, Dialog, DialogContent, DialogTitle, Stack, Typography, IconButton, Collapse } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import LockIcon from '@mui/icons-material/Lock'
import UndoIcon from '@mui/icons-material/Undo'
import RefreshIcon from '@mui/icons-material/Refresh'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import InventoryIcon from '@mui/icons-material/Inventory'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import PersonIcon from '@mui/icons-material/Person'
import soundManager from '@/lib/sounds'
import { RULE_DESCRIPTIONS } from '@/lib/levels'
import ResultModal from '../modals/ResultModal'
import TopBar from '@/components/TopBar'


// Move rules
const MOVES = [
    { dx: 3, dy: 0 }, { dx: -3, dy: 0 },
    { dx: 0, dy: 3 }, { dx: 0, dy: -3 },
    { dx: 2, dy: 2 }, { dx: -2, dy: -2 },
    { dx: 2, dy: -2 }, { dx: -2, dy: 2 }
]

const GRID_SIZE = 5

export default function GameGrid({ levelConfig, onComplete, onNextLevel, isLastLevel, isOnline, user, onUserUpdate, onBack, worldId }) {
    const [cells, setCells] = useState([])
    const [visited, setVisited] = useState(new Set())
    const [currentPos, setCurrentPos] = useState(null)
    const [moveCount, setMoveCount] = useState(0)
    const [gameActive, setGameActive] = useState(true)
    const [status, setStatus] = useState('CLICK ANY SQUARE TO BEGIN!')
    const [statusType, setStatusType] = useState('neutral')
    const [timeRemaining, setTimeRemaining] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [activeSection, setActiveSection] = useState(null) // 'rules', 'help', 'profile'
    const [result, setResult] = useState(null)
    const [mistakes, setMistakes] = useState(0)
    const [completedCheckpoints, setCompletedCheckpoints] = useState(0) // Track completed required moves
    const [missedCheckpoints, setMissedCheckpoints] = useState(new Set()) // Track missed checkpoint moveNumbers
    const lastTimerWarning = useRef(null)

    // Undo & Hint states
    const [moveHistory, setMoveHistory] = useState([])
    const [undosRemaining, setUndosRemaining] = useState(5)
    const [hintsRemaining, setHintsRemaining] = useState(3)
    const [hintCells, setHintCells] = useState([])  // Array of hint cells for multi-step hint

    const [earnedStars, setEarnedStars] = useState(0) // Track earned stars for sound effect
    const [showInventory, setShowInventory] = useState(false)
    const [activeHintIndex, setActiveHintIndex] = useState(-1) // Current highlighted hint cell (-1 = none)
    const [lastHintMoveCount, setLastHintMoveCount] = useState(-1) // Track when hint was last used

    // Sequential hint highlight animation
    useEffect(() => {
        if (hintCells.length === 0) {
            setActiveHintIndex(-1)
            return
        }

        const n = hintCells.length
        // Sequence: -1, 0,1,2,3,4 (appear forward), then 3,2,1,0,-1 (disappear backward from last-1)
        // This way: first all appear one by one, then all disappear from last to first
        const forward = Array.from({ length: n }, (_, i) => i)
        const backward = Array.from({ length: n }, (_, i) => n - 2 - i) // n-2, n-3, ..., 0, -1
        const sequence = [-1, ...forward, ...backward]
        let step = 0
        let prevIndex = -1

        setActiveHintIndex(-1) // Start with nothing visible

        const interval = setInterval(() => {
            const newIndex = sequence[step]
            setActiveHintIndex(newIndex)

            // Play sound when new cell is revealed (going forward)
            if (newIndex > prevIndex && newIndex >= 0) {
                soundManager.playClick()
            }

            prevIndex = newIndex
            step = (step + 1) % sequence.length
        }, 700) // 700ms per step for smooth but faster animation

        return () => clearInterval(interval)
    }, [hintCells])

    const consumeResource = async (type) => {
        // If no user or offline, we might want to fallback to local limits without syncing?
        // But user asked to use global limits. If offline, maybe just allow if Undo/Hint > 0 locally?
        // For now, assume Online as per requirement "serverdan".
        if (!user || !isOnline) return true

        try {
            const token = localStorage.getItem('token')
            const res = await fetch('/api/user/consume', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ type })
            })

            if (res.ok) {
                const data = await res.json()
                const key = type === 'hint' ? 'hintCount' : 'undoCount'
                onUserUpdate({ [key]: data.newCount })
                return true
            }
        } catch (e) {
            console.error('Consume error:', e)
        }
        return false
    }

    const blockedSet = new Set((levelConfig?.blockedSquares || []).map(sq => `${sq.x},${sq.y}`))

    const resetLevel = () => {
        setCells(Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({ x: i % GRID_SIZE, y: Math.floor(i / GRID_SIZE), key: `${i % GRID_SIZE},${Math.floor(i / GRID_SIZE)}` })))
        setVisited(new Set(blockedSet))
        setCurrentPos(null)
        setMoveCount(0)
        setMoveHistory([])  // Reset history
        setHintCells([])
        setHintCells([])

        // User Limits: Max 5 undo, 3 hint per level, but capped by global user stock
        const maxUndos = 5
        const currentUndos = user ? Math.min(user.undoCount, maxUndos) : 5
        setUndosRemaining(currentUndos)

        const maxHints = 3
        const currentHints = user ? Math.min(user.hintCount, maxHints) : 3
        setHintsRemaining(currentHints)

        setEarnedStars(0)     // Reset earned stars
        setGameActive(true)
        setStatus(levelConfig?.fixedStart ? 'MAKE YOUR MOVE!' : 'CLICK ANY SQUARE TO BEGIN!')
        setStatusType('neutral')
        setShowResult(false)
        setMistakes(0)
        setCompletedCheckpoints(0)
        setMissedCheckpoints(new Set())
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

    // Sound effect for earning stars
    useEffect(() => {
        if (!levelConfig?.stars) return
        const currentStars = levelConfig.stars.reduce((acc, threshold) => moveCount >= threshold ? acc + 1 : acc, 0)

        if (currentStars > earnedStars) {
            soundManager.playStar(currentStars)
            setEarnedStars(currentStars)
        }
    }, [moveCount, levelConfig, earnedStars])

    useEffect(() => {
        if (!gameActive || timeRemaining === null || !!activeSection) return
        if (timeRemaining <= 0) { endGame(false, 'TIME IS UP!'); return }
        if (timeRemaining <= 10 && lastTimerWarning.current !== Math.floor(timeRemaining)) {
            soundManager.playTimerWarning()
            lastTimerWarning.current = Math.floor(timeRemaining)
        }
        const timer = setInterval(() => setTimeRemaining(t => t - 1), 1000)
        return () => clearInterval(timer)
    }, [gameActive, timeRemaining, activeSection])

    const isValidPos = (x, y) => x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE
    const isValidMove = useCallback((x, y) => {
        const key = `${x},${y}`
        if (visited.has(key) || !isValidPos(x, y) || !currentPos) return false
        return MOVES.some(m => currentPos.x + m.dx === x && currentPos.y + m.dy === y)
    }, [visited, currentPos])

    const startGame = (x, y) => {
        if (blockedSet.has(`${x},${y}`)) return
        const pos = { x, y }
        setCurrentPos(pos)
        setVisited(prev => new Set([...prev, `${x},${y}`]))
        setMoveCount(1)
        setMoveHistory([pos])  // Initialize history
        setStatus('CLICK A YELLOW SQUARE!')
        soundManager.playStart()
    }

    // Undo last move
    const undoMove = async () => {
        if (moveHistory.length <= 1 || undosRemaining <= 0) return

        // Consume resource (Optimistic check handled by undosRemaining, but server sync needed)
        // If Online, consume first. If fail, abort.
        if (isOnline && user) {
            const success = await consumeResource('undo')
            if (!success) {
                soundManager.playInvalid()
                return
            }
        }

        const newHistory = [...moveHistory]
        newHistory.pop()  // Remove last move

        // Restore state
        const blockedKeys = [...blockedSet]
        const visitedKeys = new Set([...blockedKeys, ...newHistory.map(p => `${p.x},${p.y}`)])

        setMoveHistory(newHistory)
        setVisited(visitedKeys)
        setCurrentPos(newHistory[newHistory.length - 1])
        setMoveCount(newHistory.length)
        setUndosRemaining(prev => prev - 1)
        setGameActive(true)  // Resume game (even from game over!)
        setShowResult(false)
        setStatus('MOVE UNDONE!')
        setStatusType('neutral')
        soundManager.playClick()
    }

    // Show hint for next moves
    const showHint = async () => {
        if (hintsRemaining <= 0) return

        // Prevent using hint again without making a move
        if (lastHintMoveCount === moveCount && hintCells.length > 0) {
            soundManager.playClick()
            return // Already showed hint for this position
        }

        // Helper: get valid moves from a position
        const getValidMoves = (pos, occupiedSet) => {
            return MOVES
                .map(m => ({ x: pos.x + m.dx, y: pos.y + m.dy }))
                .filter(p =>
                    p.x >= 0 && p.x < GRID_SIZE &&
                    p.y >= 0 && p.y < GRID_SIZE &&
                    !occupiedSet.has(`${p.x},${p.y}`) &&
                    !blockedSet.has(`${p.x},${p.y}`)  // Explicitly check blocked!
                )
        }

        // CASE 1: Before first move - suggest good starting positions
        if (moveCount === 0 || !currentPos) {
            // Use fullPath's starting position if available
            if (levelConfig?.fullPath && levelConfig.fullPath.length > 0) {
                const start = levelConfig.fullPath[0]
                // Show first 5 positions from fullPath
                const hints = levelConfig.fullPath.slice(0, 5)
                setHintCells(hints)
            } else {
                // Show corner positions as good starting points
                const corners = [
                    { x: 0, y: 0 }, { x: 0, y: 4 },
                    { x: 4, y: 0 }, { x: 4, y: 4 }
                ].filter(p => !blockedSet.has(`${p.x},${p.y}`))
                setHintCells(corners)
            }
            setHintsRemaining(prev => prev - 1)
            setLastHintMoveCount(moveCount)
            soundManager.playClick()
            return
        }

        // CASE 2: During game - find path using backtracking
        // This now returns the longest possible path, not requiring exactly 25 squares
        // FIXED: Properly handles multiple required moves by checking all future requirements

        // Helper: Check if a path can reach all remaining required moves
        const canReachAllRequired = (pos, occupiedSet, moveNum, requiredMoves) => {
            // Get all required moves that haven't been satisfied yet
            const futureRequired = requiredMoves?.filter(r => r.moveNumber > moveNum) || []
            if (futureRequired.length === 0) return true

            // For each future required move, check if it's still reachable (not occupied)
            for (const req of futureRequired) {
                if (occupiedSet.has(`${req.x},${req.y}`) || blockedSet.has(`${req.x},${req.y}`)) {
                    return false  // A required square is already occupied or blocked
                }
            }
            return true
        }

        const findPath = (pos, occupiedSet, moveNum, requiredMoves, depth = 0) => {
            if (depth > 30) return []  // Prevent infinite recursion, return empty path
            if (occupiedSet.size + blockedSet.size === 25) return []  // All squares covered

            const validMoves = getValidMoves(pos, occupiedSet)
            if (validMoves.length === 0) return []  // Dead end - return empty (current state is best)

            // Check for required move at next step
            const nextMoveNum = moveNum + 1
            const reqMove = requiredMoves?.find(r => r.moveNumber === nextMoveNum)

            if (reqMove) {
                // MUST go to the required position
                const reqPos = validMoves.find(p => p.x === reqMove.x && p.y === reqMove.y)
                if (!reqPos) return []  // Required move not reachable - this path is invalid
                const newOccupied = new Set([...occupiedSet, `${reqPos.x},${reqPos.y}`])

                // Check if we can still reach all future required moves
                if (!canReachAllRequired(reqPos, newOccupied, nextMoveNum, requiredMoves)) {
                    return []  // Future required moves become unreachable
                }

                const subPath = findPath(reqPos, newOccupied, nextMoveNum, requiredMoves, depth + 1)
                return [reqPos, ...subPath]
            }

            // No required move at this step - try each valid move and find the LONGEST path
            // But prioritize moves that keep all future required moves reachable
            let bestPath = []
            for (const nextPos of validMoves) {
                const newOccupied = new Set([...occupiedSet, `${nextPos.x},${nextPos.y}`])

                // Skip moves that would make future required moves unreachable
                if (!canReachAllRequired(nextPos, newOccupied, nextMoveNum, requiredMoves)) {
                    continue
                }

                const subPath = findPath(nextPos, newOccupied, nextMoveNum, requiredMoves, depth + 1)
                const fullPath = [nextPos, ...subPath]
                if (fullPath.length > bestPath.length) {
                    bestPath = fullPath
                }
            }

            return bestPath
        }

        // Build occupied set (visited minus blocked - they're separate concerns)
        const occupiedSet = new Set([...visited].filter(k => !blockedSet.has(k)))
        occupiedSet.add(`${currentPos.x},${currentPos.y}`)  // Include current

        const path = findPath(currentPos, occupiedSet, moveCount, levelConfig?.requiredMoves || [])

        // findPath now returns the longest possible path (may be partial, not reaching 25)
        if (path.length > 0) {
            // VALIDATE PATH: ensure each step is reachable from previous
            const isValidStep = (from, to) =>
                MOVES.some(m => from.x + m.dx === to.x && from.y + m.dy === to.y)

            let prevPos = currentPos
            const validatedPath = []
            for (const step of path) {
                if (isValidStep(prevPos, step)) {
                    validatedPath.push(step)
                    prevPos = step
                    if (validatedPath.length >= 5) break
                } else {
                    break  // Stop at first invalid step
                }
            }

            if (validatedPath.length > 0) {
                setHintCells(validatedPath)
                // Calculate how far this path can go (accounting for blocked squares)
                const totalPossible = moveCount + path.length
                const maxPlayableSquares = 25 - blockedSet.size
                if (totalPossible < maxPlayableSquares) {
                    // Partial path - inform user of max potential
                    setStatus(`MAX: ${totalPossible} SQUARES`)
                    setStatusType('neutral')
                }
            } else {
                // Path completely invalid, show direct reachable moves
                const validNow = getValidMoves(currentPos, occupiedSet)
                setHintCells(validNow)
            }
        } else {
            // NO MOVES AVAILABLE at all - dead end
            const validNow = getValidMoves(currentPos, occupiedSet)
            if (validNow.length === 0) {
                setStatus('DEAD END! TRY UNDO')
                setStatusType('lost')
                soundManager.playInvalid()
            } else {
                setHintCells(validNow)
            }
        }

        // Consume hint resource
        if (isOnline && user) {
            const success = await consumeResource('hint')
            if (!success) {
                soundManager.playInvalid()
                return // If failed to consume, don't show hint? But logic is already run. 
                // Ideally consumption should happen before showing logic, but calculation is needed to see if hint IS possible.
                // We assume user has hints (checked at start). If API fails, maybe let it slide or rollback?
                // Let's just rollback UI if fail:
                // Actually, logic runs, then we consume. 
            }
        }

        setHintsRemaining(prev => prev - 1)
        setLastHintMoveCount(moveCount)
        soundManager.playClick()
    }

    const handleShare = async () => {
        const w = worldId || (levelConfig?.worldId || 1)
        const l = levelConfig?.id || 1
        const s = result?.stars || 0
        const sc = result?.score || moveCount

        const url = `${window.location.origin}/share?world=${w}&level=${l}&score=${sc}&stars=${s}`
        const shareData = {
            title: '25 SQUARES',
            text: `I completed World ${w} Level ${l} with ${sc} moves!`,
            url: url
        }

        setStatus('OPENING SHARE...')
        setStatusType('loading')

        // Optimistically ping the OG API to warm it up (fire and forget)
        const ogApiUrl = `/api/og?world=${w}&level=${l}&score=${sc}&stars=${s}`
        fetch(ogApiUrl, { mode: 'no-cors' }).catch(() => { })

        if (navigator.share) {
            try {
                await navigator.share(shareData)
                setStatus('SHARED!')
                setStatusType('won')
            } catch (err) {
                console.error('Share failed:', err)
                setStatus('SHARE CANCELLED')
                setStatusType('info')
            }
        } else {
            try {
                await navigator.clipboard.writeText(url)
                setStatus('LINK COPIED!')
                setStatusType('won')
                soundManager.playClick()
            } catch (err) {
                console.error('Clipboard failed', err)
                setStatus('COPY FAILED')
                setStatusType('lost')
            }
        }
    }

    const endGame = (won, message, finalMoveCount) => {
        setGameActive(false)
        const activeMoveCount = finalMoveCount || moveCount
        const starsBreakdown = levelConfig?.stars || [10, 15, 20]
        let earnedStars = 0

        // Check if this is a flexible win (met minMoves/minCheckpoints but not all 25 squares)
        const isFlexibleWin = !won && message && message.includes('CHECKPOINTS!')

        if (levelConfig?.starCriteria === 'time') {
            // Time-based scoring
            if (!timeRemaining) {
                earnedStars = 0
            } else {
                const elapsed = (levelConfig.timeLimit || 120) - timeRemaining
                const thresholds = levelConfig.starThresholds || [120, 90, 60]

                if (elapsed <= thresholds[2]) earnedStars = 3
                else if (elapsed <= thresholds[1]) earnedStars = 2
                else if (elapsed <= thresholds[0]) earnedStars = 1
                else earnedStars = 0

                if ((won || isFlexibleWin) && earnedStars === 0) earnedStars = 1
            }
        } else {
            // Default Move-based scoring
            if (activeMoveCount >= starsBreakdown[2]) earnedStars = 3
            else if (activeMoveCount >= starsBreakdown[1]) earnedStars = 2
            else if (activeMoveCount >= starsBreakdown[0]) earnedStars = 1
        }

        // Perfect completion (all 25) = 3 stars, flexible win uses move-based stars
        const finalStars = won ? 3 : (isFlexibleWin ? Math.max(earnedStars, 1) : earnedStars)

        if (finalStars > 0) {
            if (isFlexibleWin) {
                setStatus(`LEVEL COMPLETE! ${message}`)
            } else {
                setStatus(`LEVEL COMPLETE! ${activeMoveCount} MOVES`)
            }
            setStatusType('won')
            // Special sound for full completion (accounting for blocked squares)
            if (won) {
                soundManager.playPerfect()
            } else {
                soundManager.playWin()
            }
        } else {
            setStatus(message || `GAME OVER! ${activeMoveCount} MOVES`)
            setStatusType('lost')
            soundManager.playGameOver()
        }
        setResult({ stars: finalStars, score: activeMoveCount, isNewBest: false })
        setTimeout(() => setShowResult(true), 1000)

        const hintsUsed = 3 - hintsRemaining
        const undosUsed = 5 - undosRemaining
        if (onComplete) onComplete(activeMoveCount, finalStars, hintsUsed, undosUsed)
    }


    const handleCellClick = (x, y) => {
        if (!gameActive || blockedSet.has(`${x},${y}`)) return

        // Tutorial Strict Mode
        const tutorialStep = levelConfig?.tutorial?.find(t => t.move === moveCount)
        if (tutorialStep && tutorialStep.highlight) {
            if (x !== tutorialStep.highlight.x || y !== tutorialStep.highlight.y) {
                return
            }
        }

        if (moveCount === 0) { if (!levelConfig?.fixedStart) startGame(x, y); return }
        if (!isValidMove(x, y)) {
            if (levelConfig?.maxMistakes) {
                const newMistakes = mistakes + 1
                setMistakes(newMistakes)
                setStatus(`MISTAKE ${newMistakes}/${levelConfig.maxMistakes}`)
                setStatusType('lost')
                soundManager.playInvalid()

                if (newMistakes >= levelConfig.maxMistakes) {
                    setTimeout(() => endGame(false, 'TOO MANY MISTAKES!'), 500)
                }
            }
            return
        }
        const nextMoveNumber = moveCount + 1

        // Check Required Moves (Checkpoints)
        // NEW LOGIC: If multiple requiredMoves exist, missing one doesn't end the game
        if (levelConfig?.requiredMoves && levelConfig.requiredMoves.length > 0) {
            const req = levelConfig.requiredMoves.find(r => r.moveNumber === nextMoveNumber)
            if (req) {
                const isCorrectMove = req.x === x && req.y === y
                const hasMultipleCheckpoints = levelConfig.requiredMoves.length > 1

                if (isCorrectMove) {
                    // Checkpoint completed!
                    setCompletedCheckpoints(prev => prev + 1)
                    setStatus(`CHECKPOINT ${completedCheckpoints + 1}/${levelConfig.requiredMoves.length}!`)
                } else if (hasMultipleCheckpoints && levelConfig.minMoves) {
                    // Check if winning is still mathematically possible
                    const minReq = levelConfig.minCheckpoints || 1

                    // Count future checkpoints that are NOT blocked by this move or previous moves
                    const futureCheckpoints = levelConfig.requiredMoves.filter(r => {
                        // Must be a future requirement
                        if (r.moveNumber <= nextMoveNumber) return false

                        // Must NOT be blocked by the current move (we are stepping there now with a wrong move number)
                        if (r.x === x && r.y === y) return false

                        // Must NOT be already visited (blocked)
                        // Must NOT be already visited (blocked)
                        if (visited.has(r.x + ',' + r.y)) return false

                        return true
                    }).length

                    if (completedCheckpoints + futureCheckpoints < minReq) {
                        soundManager.playInvalid()
                        setStatus(`CANNOT REACH ${minReq} CHECKPOINTS!`)
                        setStatusType('lost')
                        setTimeout(() => endGame(false, 'TOO MANY MISSED CHECKPOINTS!'), 500)
                        return
                    }

                    // Multiple checkpoints mode with minMoves - don't die, just miss
                    setMissedCheckpoints(prev => new Set([...prev, nextMoveNumber]))
                    setStatus(`CHECKPOINT MISSED! CONTINUE...`)
                    setStatusType('neutral')
                    soundManager.playInvalid()
                } else {
                    // Single checkpoint or strict mode - old behavior (game over)
                    soundManager.playInvalid()
                    setStatus(`MOVE ${nextMoveNumber} MUST BE HERE!`)
                    setStatusType('lost')
                    setTimeout(() => endGame(false, 'MISSED REQUIRED MOVE!'), 500)
                    return
                }
            }
        }

        setCurrentPos({ x, y })
        const key = `${x},${y}`
        setVisited(prev => new Set([...prev, key]))
        setMoveCount(nextMoveNumber)
        setMoveHistory(prev => [...prev, { x, y }])
        setHintCells([])
        soundManager.playMove(nextMoveNumber)

        const newVisited = new Set([...visited, key])
        const totalSquares = 25

        // Check level completion - NEW FLEXIBLE CONDITIONS
        const hasMinMovesCondition = levelConfig?.minMoves && levelConfig?.minCheckpoints
        const requiredMovesCount = levelConfig?.requiredMoves?.length || 0

        // Calculate actual completed checkpoints (including this move if it was a checkpoint)
        const thisWasCheckpoint = levelConfig?.requiredMoves?.find(r => r.moveNumber === nextMoveNumber && r.x === x && r.y === y)
        const actualCompletedCheckpoints = completedCheckpoints + (thisWasCheckpoint ? 1 : 0)

        if (newVisited.size === totalSquares) {
            // Perfect completion - all 25 squares
            setTimeout(() => endGame(true, null, nextMoveNumber), 100)
        } else {
            const hasMoves = MOVES.some(m => {
                const nx = x + m.dx, ny = y + m.dy
                return isValidPos(nx, ny) && !newVisited.has(`${nx},${ny}`)
            })

            if (!hasMoves) {
                // No moves left - check if flexible completion conditions are met
                if (hasMinMovesCondition &&
                    nextMoveNumber >= levelConfig.minMoves &&
                    actualCompletedCheckpoints >= levelConfig.minCheckpoints) {
                    // Flexible win: met minimum requirements
                    setTimeout(() => endGame(false, `${actualCompletedCheckpoints}/${requiredMovesCount} CHECKPOINTS!`, nextMoveNumber), 100)
                } else {
                    // Game over
                    setTimeout(() => endGame(false, 'NO MOVES LEFT!', nextMoveNumber), 100)
                }
            }
        }
    }


    const getPossibleMoves = () => {
        if (!currentPos) return new Set()
        const moves = MOVES.map(m => ({ x: currentPos.x + m.dx, y: currentPos.y + m.dy }))
            .filter(pos => isValidPos(pos.x, pos.y) && !visited.has(`${pos.x},${pos.y}`))
        return new Set(moves.map(p => `${p.x},${p.y}`))
    }

    const possibleSet = getPossibleMoves()

    // Handle fixed start (and Pre-filled paths)
    useEffect(() => {
        if (gameActive) return
        if (levelConfig?.fixedStart) {
            if (Array.isArray(levelConfig.fixedStart)) {
                const path = levelConfig.fixedStart
                const last = path[path.length - 1]
                startGame(last.x, last.y, path)
            } else {
                startGame(levelConfig.fixedStart.x, levelConfig.fixedStart.y)
            }
        }
    }, [levelConfig, gameActive])

    let statusColor = 'text.primary'
    if (statusType === 'won') statusColor = 'success.main'
    if (statusType === 'lost') statusColor = 'error.main'

    return (
        <Box sx={{
            width: '100%',
            maxWidth: '100vw',
            height: '100dvh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'flex-start' }, // Start from top on desktop
            p: 2,
            pt: { xs: 14, sm: 16 }, // Adjusted top padding for both mobile and desktop to clear TopBar
            position: 'relative',
            overflow: 'hidden'
        }}>


            {/* Unified Top Bar - Hide when Result Modal is shown */}
            {!showResult && <TopBar
                title={levelConfig ? `LEVEL ${levelConfig.id}` : 'FREE PLAY'}
                onBack={onBack}
                user={user}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                customTitleClick={() => { soundManager.playClick(); setActiveSection(prev => prev === 'rules' ? null : 'rules') }}
                secondaryInfo={
                    (levelConfig?.stars || timeRemaining !== null) ? (
                        <>
                            {/* Stars */}
                            {levelConfig?.stars && (
                                <Box display="flex" alignItems="center" gap={0.5}>
                                    {[0, 1, 2].map((i) => {
                                        const isFilled = moveCount >= levelConfig.stars[i]
                                        return isFilled
                                            ? <StarIcon key={i} sx={{ fontSize: { xs: 18, sm: 20 }, color: '#FAEC3B' }} />
                                            : <StarBorderIcon key={i} sx={{ fontSize: { xs: 18, sm: 20 }, color: 'text.secondary', opacity: 0.3 }} />
                                    })}
                                </Box>
                            )}
                            {/* Score */}
                            <Typography variant="caption" sx={{
                                color: 'text.primary',
                                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                fontWeight: 'bold'
                            }}>
                                Score: {moveCount}
                            </Typography>
                            {timeRemaining !== null && (
                                <Box sx={{
                                    bgcolor: timeRemaining <= 10 ? 'error.main' : 'action.hover',
                                    borderRadius: 1,
                                    px: 1,
                                    py: 0.25,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5,
                                    color: timeRemaining <= 10 ? '#FFF' : 'text.primary',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                    fontWeight: 'bold'
                                }}>
                                    <AccessTimeIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                                    {String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:{String(timeRemaining % 60).padStart(2, '0')}
                                </Box>
                            )}
                        </>
                    ) : null
                }
            >
                {/* RULES SECTION */}
                {activeSection === 'rules' && (
                    <Box sx={{ textAlign: 'center', pt: 1 }}>
                        <Typography variant="subtitle2" sx={{ color: 'primary.main', mb: 1.5, fontWeight: 'bold', letterSpacing: 1 }}>
                            LEVEL OBJECTIVES
                        </Typography>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" flexWrap="wrap" sx={{ mb: 1 }}>
                            {levelConfig?.stars && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    {levelConfig.stars.map((threshold, i) => (
                                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                                            <StarIcon sx={{ fontSize: 12, color: '#FAEC3B' }} />
                                            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>{threshold}+</Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                            {levelConfig?.timeLimit && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <AccessTimeIcon sx={{ fontSize: 12, color: 'text.primary' }} />
                                    <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.65rem' }}>
                                        {Math.floor(levelConfig.timeLimit / 60)}:{String(levelConfig.timeLimit % 60).padStart(2, '0')} Limit
                                    </Typography>
                                </Box>
                            )}
                        </Stack>
                        <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.75rem', fontStyle: 'italic' }}>
                            {levelConfig?.minMoves ? (
                                <>
                                    Complete at least <strong>{levelConfig.minCheckpoints} checkpoints</strong> in <strong>{levelConfig.minMoves} moves</strong>!
                                </>
                            ) : (
                                RULE_DESCRIPTIONS[levelConfig?.ruleSet] || 'Visit all 25 squares!'
                            )}
                        </Typography>

                        {/* Flexible Progress Indicator */}
                        {levelConfig?.minMoves && (
                            <Box sx={{ mt: 1, p: 1, bgcolor: 'action.hover', borderRadius: 1 }}>
                                <Typography variant="caption" display="block" sx={{ fontWeight: 'bold', mb: 0.5 }}>PROGRESS</Typography>
                                <Stack direction="row" spacing={2} justifyContent="center">
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">MOVES</Typography>
                                        <Typography variant="body2" fontWeight="bold" color={moveCount >= levelConfig.minMoves ? 'success.main' : 'text.primary'}>
                                            {moveCount}/{levelConfig.minMoves}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">CHECKPOINTS</Typography>
                                        <Typography variant="body2" fontWeight="bold" color={completedCheckpoints >= levelConfig.minCheckpoints ? 'success.main' : 'text.primary'}>
                                            {completedCheckpoints}/{levelConfig.requiredMoves?.length || 0} (Min: {levelConfig.minCheckpoints})
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Box>
                        )}
                    </Box>
                )}
            </TopBar>}

            {/* Tutorial Narrator Message - Absolute Positioned to prevent layout shift */}
            {(() => {
                const step = levelConfig?.tutorial?.find(t => t.move === moveCount)
                if (step) {
                    return (
                        <Box sx={{
                            position: 'absolute',
                            top: 'auto',
                            bottom: { xs: '60px', sm: '100px' }, // Positioned below grid where controls would be
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            pointerEvents: 'none', // Allow clicking through if needed
                            px: 2,
                            animation: 'fadeIn 0.3s ease-out'
                        }}>
                            <Box sx={{
                                bgcolor: 'primary.main',
                                borderRadius: 1.5,
                                px: { xs: 1.5, sm: 2 },
                                py: { xs: 0.75, sm: 1 },
                                boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                                maxWidth: { xs: '280px', sm: '400px' },
                                width: '100%',
                                pointerEvents: 'auto'
                            }}>
                                <Typography sx={{
                                    color: 'primary.contrastText',
                                    fontWeight: 700,
                                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                    lineHeight: 1.3,
                                    textAlign: 'center'
                                }}>
                                    {step.text}
                                </Typography>
                            </Box>
                        </Box>
                    )
                }
                return null
            })()}


            {/* Main Grid - Responsive size */}
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gap: 1,
                width: '100%',
                maxWidth: { xs: '320px', sm: '400px' },
                aspectRatio: '1/1',
                bgcolor: 'transparent',
                p: 0,
                my: 0.5,
                justifyContent: 'center',
                alignContent: 'center'
            }}>
                {cells.map(cell => {
                    const isVisited = visited.has(cell.key), isCurrent = currentPos && currentPos.x === cell.x && currentPos.y === cell.y
                    const isBlocked = blockedSet.has(cell.key), isPossible = possibleSet.has(cell.key)

                    let bg = 'var(--cell-bg)'
                    const reqMove = levelConfig?.requiredMoves?.find(r => r.x === cell.x && r.y === cell.y)

                    if (isBlocked) bg = 'var(--blocked-bg)'
                    else if (isCurrent) bg = 'var(--current-bg)'
                    else if (isVisited) bg = 'var(--visited-bg)'
                    else if (isPossible) bg = 'var(--possible-bg)'
                    else if (reqMove) bg = 'rgba(128, 128, 128, 0.1)' // Soft indicator

                    let border = '1px solid var(--cell-border)'
                    if (isCurrent) border = '3px solid #FAEC3B' // current always accented
                    if (reqMove && !isVisited) border = '1px dashed var(--accent-color)'

                    return (
                        <Box key={cell.key}
                            onClick={() => handleCellClick(cell.x, cell.y)}
                            sx={{
                                width: '100%',
                                aspectRatio: '1/1',
                                bgcolor: bg,
                                border: border,
                                borderRadius: 0,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: { xs: '0.7rem', sm: '1rem' },
                                color: isPossible ? 'var(--possible-text)' : 'var(--text-color)',
                                cursor: (isBlocked || (!isPossible && moveCount > 0)) ? 'default' : 'pointer',
                                touchAction: 'manipulation',
                                transition: 'all 0.2s ease',
                                '&:active': (!isVisited && !isBlocked) ? { transform: 'scale(0.95)' } : {},
                                ...(levelConfig?.tutorial?.find(t => t.move === moveCount)?.highlight?.x === cell.x && levelConfig?.tutorial?.find(t => t.move === moveCount)?.highlight?.y === cell.y && {
                                    animation: 'tutorialSpotlight 1.5s ease-out infinite',
                                    zIndex: 5,
                                    border: '2px solid #FFF',
                                    bgcolor: '#FAEC3B',
                                    color: '#001E1E',
                                }),
                                ...(() => {
                                    const hintIndex = hintCells.findIndex(h => h.x === cell.x && h.y === cell.y)
                                    if (hintIndex >= 0 && hintIndex <= activeHintIndex) {
                                        // This cell should be visible (already revealed)
                                        const isActive = hintIndex === activeHintIndex
                                        return {
                                            zIndex: 5,
                                            bgcolor: isActive ? 'rgba(0, 255, 150, 0.6)' : 'rgba(0, 255, 150, 0.35)',
                                            borderColor: '#00FF96',
                                            border: '2px solid #00FF96',
                                            boxShadow: isActive
                                                ? '0 0 25px rgba(0, 255, 150, 1), 0 0 50px rgba(0, 255, 150, 0.5), inset 0 0 15px rgba(0, 255, 150, 0.3)'
                                                : '0 0 8px rgba(0, 255, 150, 0.4)',
                                            transform: isActive ? 'scale(1.12)' : 'scale(1)',
                                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                            animation: isActive ? 'hintPulse 0.8s ease-in-out infinite' : 'none'
                                        }
                                    }
                                    return {}
                                })()
                            }}
                        >
                            {isBlocked ? <LockIcon sx={{ fontSize: 14 }} /> : isVisited ?
                                <Typography sx={{ color: 'var(--text-color)', fontWeight: 'bold', fontSize: 'inherit' }}>
                                    {[...visited].indexOf(cell.key) >= blockedSet.size ? ([...visited].indexOf(cell.key) - blockedSet.size + 1) : ''}
                                </Typography>
                                :
                                (() => {
                                    const hintIndex = hintCells.findIndex(h => h.x === cell.x && h.y === cell.y)
                                    if (hintIndex >= 0 && hintIndex <= activeHintIndex) {
                                        return <Typography sx={{ color: '#00FF96', fontWeight: '900', fontSize: 'inherit', textShadow: '1px 1px 0 #000' }}>{moveCount + hintIndex + 1}</Typography>
                                    }
                                    if (reqMove) {
                                        // Use dark text on yellow possible cells, accented on others
                                        const textColor = isPossible ? 'var(--possible-text)' : 'var(--accent-color)'
                                        return <Typography sx={{ color: textColor, fontWeight: '900', fontSize: 'inherit', textShadow: isPossible ? 'none' : '1px 1px 0 #000' }}>{reqMove.moveNumber}</Typography>
                                    }
                                    return ''
                                })()
                            }
                        </Box>
                    )
                })}
            </Box>



            {/* Inventory Dialog */}
            <Dialog open={showInventory} onClose={() => setShowInventory(false)}>
                <DialogTitle>MY INVENTORY</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ minWidth: 200, mt: 1 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <InventoryIcon sx={{ color: '#FAEC3B' }} />
                                <Typography>HINTS:</Typography>
                            </Stack>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#FAEC3B' }}>
                                {user?.hintCount || 0}
                            </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <UndoIcon sx={{ color: '#FAEC3B' }} />
                                <Typography>UNDOS:</Typography>
                            </Stack>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#FAEC3B' }}>
                                {user?.undoCount || 0}
                            </Typography>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>

            {/* Tutorial text moved to appear under TopBar as narrator message */}



            {/* Footer Buttons - Icon with badge style */}
            {
                levelConfig && (!levelConfig.tutorial || levelConfig.tutorial.length === 0) ? (
                    <Stack direction="row" spacing={3} sx={{ position: 'absolute', bottom: { xs: 24, sm: 24 }, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
                        <Button
                            variant="contained"
                            disabled={moveHistory.length <= 1 || undosRemaining <= 0 || !isOnline}
                            onClick={undoMove}
                            sx={{
                                minWidth: 50, width: 50, height: 50, p: 0, position: 'relative',
                                bgcolor: 'secondary.main', color: 'secondary.contrastText',
                                border: '2px solid',
                                borderColor: 'text.primary',
                                borderRadius: 0,
                                opacity: (!isOnline || moveHistory.length <= 1 || undosRemaining <= 0) ? 0.5 : 1
                            }}
                        >
                            <UndoIcon sx={{ fontSize: 24 }} />
                            <Box sx={{
                                position: 'absolute', top: -8, right: -8,
                                bgcolor: 'primary.main', color: 'primary.contrastText',
                                borderRadius: 0, width: 22, height: 22,
                                border: '1px solid', borderColor: 'text.primary',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.7rem', fontWeight: 'bold'
                            }}>
                                {String(undosRemaining || 0)}
                            </Box>
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => {
                                const hintsUsed = 3 - hintsRemaining
                                const undosUsed = 5 - undosRemaining
                                if (onComplete && (hintsUsed > 0 || undosUsed > 0)) {
                                    onComplete(moveCount, 0, hintsUsed, undosUsed)
                                }
                                soundManager.playClick()
                                resetLevel()
                            }}
                            sx={{
                                minWidth: 50, width: 50, height: 50, p: 0,
                                bgcolor: 'secondary.main', color: 'secondary.contrastText',
                                border: '2px solid',
                                borderColor: 'text.primary',
                                borderRadius: 0
                            }}
                        >
                            <RefreshIcon sx={{ fontSize: 24 }} />
                        </Button>

                        <Button
                            variant="contained"
                            disabled={hintsRemaining <= 0 || !isOnline}
                            onClick={showHint}
                            sx={{
                                minWidth: 50, width: 50, height: 50, p: 0, position: 'relative',
                                bgcolor: 'secondary.main', color: 'secondary.contrastText',
                                border: '2px solid',
                                borderColor: 'text.primary',
                                borderRadius: 0,
                                opacity: (!isOnline || hintsRemaining <= 0) ? 0.5 : 1
                            }}
                        >
                            <LightbulbIcon sx={{ fontSize: 24 }} />
                            <Box sx={{
                                position: 'absolute', top: -8, right: -8,
                                bgcolor: 'primary.main', color: 'primary.contrastText',
                                borderRadius: 0, width: 22, height: 22,
                                border: '1px solid', borderColor: 'text.primary',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.7rem', fontWeight: 'bold'
                            }}>
                                {String(hintsRemaining || 0)}
                            </Box>
                        </Button>
                    </Stack>
                ) : null
            }
            {/* This button is now always present, outside the levelConfig conditional */}
            {
                !levelConfig && (
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => { soundManager.playClick(); resetLevel() }}
                        sx={{ position: 'absolute', bottom: { xs: 32, sm: 32 }, left: '50%', transform: 'translateX(-50%)', width: '280px', maxWidth: '400px', zIndex: 10 }}
                        startIcon={<RefreshIcon />}
                    >
                        RESTART
                    </Button>
                )
            }

            {/* Result Modal is rendered conditionally */}
            {
                showResult && result && (
                    <ResultModal
                        stars={result.stars}
                        score={result.score}
                        isNewBest={result.isNewBest}
                        levelConfig={levelConfig}
                        completedCheckpoints={completedCheckpoints}
                        onRetry={() => { soundManager.playClick(); resetLevel() }}
                        onNext={() => {
                            setShowResult(false)
                            if (onNextLevel) onNextLevel()
                        }}
                        onLevels={() => { setShowResult(false); onBack() }}
                        hasNext={!!levelConfig && !!onNextLevel}
                        isLastLevel={isLastLevel}
                        onUndo={() => { soundManager.playClick(); undoMove() }}
                        canUndo={!!levelConfig && moveHistory.length > 1 && undosRemaining > 0}
                        onShare={handleShare}
                    />
                )
            }
        </Box >
    )
}
