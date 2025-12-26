// Sound Manager with Web Audio API
// Enhanced with volume control, haptic feedback, and more sound effects

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.initialized = false;
        this.volume = 0.5;
        this.muted = false;
        this.hapticEnabled = true;

        // Load preferences from localStorage
        if (typeof window !== 'undefined') {
            const savedVolume = localStorage.getItem('gameVolume');
            const savedMuted = localStorage.getItem('gameMuted');
            const savedHaptic = localStorage.getItem('gameHaptic');

            if (savedVolume !== null) this.volume = parseFloat(savedVolume);
            if (savedMuted !== null) this.muted = savedMuted === 'true';
            if (savedHaptic !== null) this.hapticEnabled = savedHaptic !== 'false';
        }
    }

    async init() {
        if (this.initialized || typeof window === 'undefined') return;
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.initialized = true;
    }

    // Settings management
    setVolume(value) {
        this.volume = Math.max(0, Math.min(1, value));
        if (typeof window !== 'undefined') {
            localStorage.setItem('gameVolume', this.volume.toString());
        }
    }

    getVolume() {
        return this.volume;
    }

    toggleMute() {
        this.muted = !this.muted;
        if (typeof window !== 'undefined') {
            localStorage.setItem('gameMuted', this.muted.toString());
        }
        return this.muted;
    }

    isMuted() {
        return this.muted;
    }

    toggleHaptic() {
        this.hapticEnabled = !this.hapticEnabled;
        if (typeof window !== 'undefined') {
            localStorage.setItem('gameHaptic', this.hapticEnabled.toString());
        }
        return this.hapticEnabled;
    }

    isHapticEnabled() {
        return this.hapticEnabled;
    }

    // Haptic feedback
    vibrate(pattern) {
        if (!this.hapticEnabled) return;
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(pattern);
        }
    }

    // Get effective volume
    getEffectiveVolume() {
        return this.muted ? 0 : this.volume;
    }

    // Play a tone with given parameters
    async playTone(frequency, duration, type = 'sine', volumeMultiplier = 1) {
        if (!this.initialized) await this.init();
        if (!this.audioContext || this.muted) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

            const vol = this.volume * volumeMultiplier;
            gainNode.gain.setValueAtTime(vol, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.warn('Sound playback failed:', e);
        }
    }

    // Play a sequence of notes
    async playMelody(notes, baseDelay = 100) {
        if (!this.initialized) await this.init();
        if (!this.audioContext || this.muted) return;

        notes.forEach((note, i) => {
            setTimeout(() => {
                this.playTone(note.freq, note.duration || 0.15, note.type || 'sine', note.volume || 1);
            }, i * baseDelay);
        });
    }

    // ===== Game Sounds =====

    // Play move sound with dynamic pitch
    async playMove(moveCount) {
        const baseFreq = 400;
        const frequency = baseFreq + (moveCount * 20); // Pitch increases with moves
        await this.playTone(frequency, 0.12, 'sine', 0.6);
        this.vibrate(10);
    }

    // Play combo sound (for consecutive fast moves)
    async playCombo(comboCount) {
        const baseFreq = 600 + (comboCount * 50);
        await this.playTone(baseFreq, 0.1, 'triangle', 0.5);
        await this.playTone(baseFreq * 1.25, 0.15, 'triangle', 0.4);
        this.vibrate([10, 20, 10]);
    }

    // Play start sound
    async playStart() {
        await this.playMelody([
            { freq: 523, type: 'triangle', duration: 0.1 },
            { freq: 659, type: 'triangle', duration: 0.15 }
        ], 80);
        this.vibrate(20);
    }

    // Play invalid move sound
    async playInvalid() {
        await this.playTone(150, 0.25, 'sawtooth', 0.35);
        this.vibrate([30, 10, 30]);
    }

    // Play win melody
    async playWin() {
        await this.playMelody([
            { freq: 523, type: 'sine', duration: 0.2, volume: 0.7 }, // C5
            { freq: 659, type: 'sine', duration: 0.2, volume: 0.7 }, // E5
            { freq: 784, type: 'sine', duration: 0.2, volume: 0.7 }, // G5
            { freq: 1047, type: 'sine', duration: 0.4, volume: 0.8 } // C6
        ], 150);
        this.vibrate([50, 30, 50, 30, 100]);
    }

    // Play star earned sound - distinct based on star count
    async playStar(starNumber = 1) {
        const baseFreq = 800 + (starNumber * 100);

        if (starNumber === 1) {
            // Simple ding for 1 star
            await this.playMelody([
                { freq: baseFreq, type: 'sine', duration: 0.1, volume: 0.5 },
                { freq: baseFreq * 1.5, type: 'sine', duration: 0.2, volume: 0.6 }
            ], 60);
        } else if (starNumber === 2) {
            // More complex major chord for 2 stars
            await this.playMelody([
                { freq: baseFreq, type: 'sine', duration: 0.1, volume: 0.5 },
                { freq: baseFreq * 1.25, type: 'sine', duration: 0.1, volume: 0.6 }, // Major 3rd
                { freq: baseFreq * 1.5, type: 'sine', duration: 0.25, volume: 0.7 }
            ], 80);
        } else if (starNumber >= 3) {
            // Full triumphant arpeggio for 3 stars
            await this.playMelody([
                { freq: baseFreq, type: 'triangle', duration: 0.1, volume: 0.6 },
                { freq: baseFreq * 1.25, type: 'triangle', duration: 0.1, volume: 0.6 },
                { freq: baseFreq * 1.5, type: 'triangle', duration: 0.1, volume: 0.7 },
                { freq: baseFreq * 2, type: 'sine', duration: 0.4, volume: 0.8 } // Octave
            ], 100);
        }

        this.vibrate(30 * starNumber); // Stronger vibration for more stars
    }

    // Play game over sound
    async playGameOver() {
        await this.playMelody([
            { freq: 392, type: 'triangle', duration: 0.25, volume: 0.5 }, // G4
            { freq: 330, type: 'triangle', duration: 0.25, volume: 0.4 }, // E4
            { freq: 262, type: 'triangle', duration: 0.35, volume: 0.3 }  // C4
        ], 200);
        this.vibrate([100, 50, 100]);
    }

    // Play button click sound
    async playClick() {
        await this.playTone(800, 0.05, 'sine', 0.25);
        this.vibrate(5);
    }

    // Play level unlock sound
    async playUnlock() {
        await this.playMelody([
            { freq: 440, type: 'triangle', duration: 0.1 },
            { freq: 550, type: 'triangle', duration: 0.1 },
            { freq: 660, type: 'triangle', duration: 0.15 },
            { freq: 880, type: 'sine', duration: 0.25, volume: 0.7 }
        ], 80);
        this.vibrate([20, 20, 20, 50]);
    }

    // Play navigation sound (for screen transitions)
    async playNav() {
        await this.playTone(600, 0.06, 'sine', 0.2);
        this.vibrate(3);
    }

    // Play countdown/timer warning sound
    async playTimerWarning() {
        await this.playTone(440, 0.1, 'square', 0.3);
        this.vibrate(15);
    }
}

// Singleton instance
const soundManager = new SoundManager();
export default soundManager;
