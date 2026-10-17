class SoundManager {
    constructor() {
        this.audioContext = null;
        this.isMuted = false;
        this.volume = 0.3;
        // Master volume slider level (0-1), shared by effects and music; 0.67 matches the original loudness
        this.masterLevel = 0.67;
        try {
            const saved = parseFloat(localStorage.getItem('pacmanVolume'));
            if (!isNaN(saved)) this.masterLevel = Math.max(0, Math.min(1, saved));
        } catch (e) { /* storage unavailable */ }
        this.masterGain = null;
        this.initAudioContext();
        this.initMusic();
    }
    
    initAudioContext() {
        try {
            // Create AudioContext (with vendor prefixes for older browsers)
            window.AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.audioContext = null;
        }
    }
    
    // Everything plays through one master gain so the volume control affects all sound
    get output() {
        if (!this.masterGain) {
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.masterLevel * 1.5;
            this.masterGain.connect(this.audioContext.destination);
        }
        return this.masterGain;
    }

    // Set the master volume from 0 (silent) to 1 (loudest)
    setMasterVolume(level) {
        this.masterLevel = Math.max(0, Math.min(1, level));
        if (this.masterGain) this.masterGain.gain.value = this.masterLevel * 1.5;
        try { localStorage.setItem('pacmanVolume', String(this.masterLevel)); } catch (e) { /* storage unavailable */ }
        return this.masterLevel;
    }

    // Resume audio context (required by browsers after user interaction)
    resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(err => {
                console.warn('Failed to resume audio context:', err);
            });
        }
    }
    
    // Create and play a tone
    playTone(frequency, duration, type = 'square', volume = null) {
        if (!this.audioContext || this.isMuted) return;

        try {
            this.resumeAudioContext();

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.output);

            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;

            const vol = volume !== null ? volume : this.volume;
            gainNode.gain.setValueAtTime(vol, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (err) {
            console.warn('Error playing sound:', err);
        }
    }
    
    // Play multiple tones in sequence
    playSequence(tones) {
        if (!this.audioContext || this.isMuted) return;

        try {
            let startTime = this.audioContext.currentTime;

            tones.forEach(tone => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(this.output);

                oscillator.frequency.setValueAtTime(tone.frequency, startTime);
                oscillator.type = tone.type || 'square';

                const vol = tone.volume !== undefined ? tone.volume : this.volume;
                gainNode.gain.setValueAtTime(vol, startTime);
                gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + tone.duration);

                oscillator.start(startTime);
                oscillator.stop(startTime + tone.duration);

                startTime += tone.duration;
            });
        } catch (err) {
            console.warn('Error playing sound sequence:', err);
        }
    }
    
    // Dot eating sound - classic "waka" sound
    playDotSound() {
        this.playTone(800, 0.1, 'square', 0.2);
    }
    
    // Game over sound - descending tones
    playGameOverSound() {
        const gameOverTones = [
            { frequency: 440, duration: 0.2, type: 'square' },
            { frequency: 330, duration: 0.2, type: 'square' },
            { frequency: 262, duration: 0.2, type: 'square' },
            { frequency: 196, duration: 0.5, type: 'square' }
        ];
        this.playSequence(gameOverTones);
    }
    
    // Victory sound - ascending victory jingle
    playWinSound() {
        const victoryTones = [
            { frequency: 264, duration: 0.15, type: 'square' },
            { frequency: 297, duration: 0.15, type: 'square' },
            { frequency: 330, duration: 0.15, type: 'square' },
            { frequency: 352, duration: 0.15, type: 'square' },
            { frequency: 396, duration: 0.15, type: 'square' },
            { frequency: 440, duration: 0.15, type: 'square' },
            { frequency: 495, duration: 0.3, type: 'square' },
            { frequency: 528, duration: 0.4, type: 'square' }
        ];
        this.playSequence(victoryTones);
    }
    
    // Ghost movement sound (optional ambient)
    playGhostSound() {
        if (Math.random() < 0.02) { // Play occasionally
            this.playTone(150, 0.3, 'sawtooth', 0.1);
        }
    }
    
    // Power pellet sound (if we add power pellets later)
    playPowerPelletSound() {
        const powerTones = [
            { frequency: 100, duration: 0.1, type: 'sine' },
            { frequency: 150, duration: 0.1, type: 'sine' },
            { frequency: 200, duration: 0.1, type: 'sine' },
            { frequency: 150, duration: 0.1, type: 'sine' }
        ];
        this.playSequence(powerTones);
    }
    
    // Ghost death sound - quick descending tone
    playGhostDeathSound() {
        const ghostDeathTones = [
            { frequency: 600, duration: 0.1, type: 'square' },
            { frequency: 400, duration: 0.1, type: 'square' },
            { frequency: 200, duration: 0.15, type: 'square' }
        ];
        this.playSequence(ghostDeathTones);
    }

    // Level up sound - ascending celebration
    playLevelUpSound() {
        if (this.isMuted) return;

        const levelUpTones = [
            { frequency: 523, duration: 0.15, type: 'square' },  // C
            { frequency: 659, duration: 0.15, type: 'square' },  // E
            { frequency: 784, duration: 0.15, type: 'square' },  // G
            { frequency: 1047, duration: 0.3, type: 'square' }   // C (high)
        ];
        this.playSequence(levelUpTones);
    }

    // Toggle mute
    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }
    
    // Set volume (0.0 to 1.0)
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }
    
    // Get mute state
    getMuted() {
        return this.isMuted;
    }
    
    // Missile firing sound
    playMissileSound() {
        this.playTone(400, 0.2, 'sawtooth', 0.3);
    }
    
    // Power-up collection sounds for different mushroom types
    playRedMushroomSound() {
        this.playTone(300, 0.3, 'square', 0.25);
    }
    
    playBlueMushroomSound() {
        const rapidTones = [
            { frequency: 400, duration: 0.1, type: 'sine' },
            { frequency: 500, duration: 0.1, type: 'sine' },
            { frequency: 600, duration: 0.1, type: 'sine' }
        ];
        this.playSequence(rapidTones);
    }
    
    playGreenMushroomSound() {
        const spreadTones = [
            { frequency: 350, duration: 0.15, type: 'triangle' },
            { frequency: 400, duration: 0.15, type: 'triangle' },
            { frequency: 350, duration: 0.15, type: 'triangle' }
        ];
        this.playSequence(spreadTones);
    }
    
    playPurpleMushroomSound() {
        const piercingTones = [
            { frequency: 500, duration: 0.2, type: 'sawtooth' },
            { frequency: 700, duration: 0.2, type: 'sawtooth' }
        ];
        this.playSequence(piercingTones);
    }
    
    playGoldenMushroomSound() {
        const goldenTones = [
            { frequency: 523, duration: 0.2, type: 'sine' }, // C
            { frequency: 659, duration: 0.2, type: 'sine' }, // E
            { frequency: 784, duration: 0.2, type: 'sine' }, // G
            { frequency: 1047, duration: 0.3, type: 'sine' } // C octave
        ];
        this.playSequence(goldenTones);
    }
    
    // Different ghost death sounds based on type
    playCircleGhostDeathSound() {
        const tones = [
            { frequency: 600, duration: 0.1, type: 'square' },
            { frequency: 400, duration: 0.1, type: 'square' },
            { frequency: 200, duration: 0.15, type: 'square' }
        ];
        this.playSequence(tones);
    }
    
    playSquareGhostDeathSound() {
        const tones = [
            { frequency: 300, duration: 0.15, type: 'square' },
            { frequency: 250, duration: 0.15, type: 'square' },
            { frequency: 200, duration: 0.2, type: 'square' }
        ];
        this.playSequence(tones);
    }
    
    playTriangleGhostDeathSound() {
        const tones = [
            { frequency: 800, duration: 0.08, type: 'triangle' },
            { frequency: 600, duration: 0.08, type: 'triangle' },
            { frequency: 400, duration: 0.08, type: 'triangle' },
            { frequency: 200, duration: 0.12, type: 'triangle' }
        ];
        this.playSequence(tones);
    }
    
    playDiamondGhostDeathSound() {
        const tones = [
            { frequency: 700, duration: 0.1, type: 'sine' },
            { frequency: 500, duration: 0.1, type: 'sine' },
            { frequency: 300, duration: 0.15, type: 'sine' }
        ];
        this.playSequence(tones);
    }
    
    playStarGhostDeathSound() {
        const tones = [
            { frequency: 880, duration: 0.1, type: 'sine' },
            { frequency: 660, duration: 0.1, type: 'sine' },
            { frequency: 440, duration: 0.1, type: 'sine' },
            { frequency: 220, duration: 0.2, type: 'sine' }
        ];
        this.playSequence(tones);
    }

    // Bullet collision sounds for different types
    playStandardHitSound() {
        const tones = [
            { frequency: 800, duration: 0.08, type: 'sawtooth' },
            { frequency: 400, duration: 0.12, type: 'sawtooth' }
        ];
        this.playSequence(tones);
    }

    playRapidFireHitSound() {
        const tones = [
            { frequency: 1200, duration: 0.05, type: 'square' },
            { frequency: 600, duration: 0.08, type: 'square' }
        ];
        this.playSequence(tones);
    }

    playSpreadShotHitSound() {
        const tones = [
            { frequency: 700, duration: 0.06, type: 'triangle' },
            { frequency: 900, duration: 0.06, type: 'triangle' },
            { frequency: 500, duration: 0.1, type: 'triangle' }
        ];
        this.playSequence(tones);
    }

    playPiercingHitSound() {
        const tones = [
            { frequency: 1500, duration: 0.05, type: 'sawtooth' },
            { frequency: 1000, duration: 0.05, type: 'sawtooth' },
            { frequency: 500, duration: 0.08, type: 'sawtooth' }
        ];
        this.playSequence(tones);
    }

    playHomingHitSound() {
        const tones = [
            { frequency: 2000, duration: 0.04, type: 'sine' },
            { frequency: 1500, duration: 0.04, type: 'sine' },
            { frequency: 1000, duration: 0.04, type: 'sine' },
            { frequency: 500, duration: 0.08, type: 'sine' }
        ];
        this.playSequence(tones);
    }

    // Wall collision sound
    playWallHitSound() {
        this.playTone(200, 0.05, 'square', 0.15);
    }

    // "READY!" jingle played at the start of a game (~1.9s)
    playReadyJingle() {
        const notes = [
            [523, 0.12], [659, 0.12], [784, 0.12], [1047, 0.24],
            [988, 0.12], [784, 0.12], [659, 0.24],
            [587, 0.12], [698, 0.12], [880, 0.12], [784, 0.24],
            [1047, 0.36]
        ];
        this.playSequence(notes.map(([frequency, duration]) => ({ frequency, duration, type: 'square', volume: 0.18 })));
    }

    // Pac-Man death - a falling warble
    playDeathSound() {
        const tones = [];
        for (let i = 0; i < 12; i++) {
            tones.push({ frequency: 880 - i * 55, duration: 0.07, type: 'square', volume: 0.2 });
            tones.push({ frequency: 760 - i * 55, duration: 0.05, type: 'square', volume: 0.2 });
        }
        tones.push({ frequency: 130, duration: 0.12, type: 'square', volume: 0.25 });
        tones.push({ frequency: 98, duration: 0.25, type: 'square', volume: 0.25 });
        this.playSequence(tones);
    }

    // Eating a frightened ghost - fast rising sweep
    playEatGhostSound() {
        if (!this.audioContext || this.isMuted) return;
        try {
            this.resumeAudioContext();
            const t = this.audioContext.currentTime;
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(200, t);
            oscillator.frequency.exponentialRampToValueAtTime(1400, t + 0.25);
            gainNode.gain.setValueAtTime(0.2, t);
            gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
            oscillator.connect(gainNode);
            gainNode.connect(this.output);
            oscillator.start(t);
            oscillator.stop(t + 0.3);
        } catch (err) {
            console.warn('Error playing sound:', err);
        }
    }

    // Bonus fruit collected
    playFruitSound() {
        this.playSequence([
            { frequency: 880, duration: 0.08, type: 'triangle', volume: 0.3 },
            { frequency: 1320, duration: 0.08, type: 'triangle', volume: 0.3 },
            { frequency: 1760, duration: 0.15, type: 'triangle', volume: 0.3 }
        ]);
    }

    // Extra life awarded
    playExtraLifeSound() {
        this.playSequence([523, 659, 784, 1047, 784, 1047].map(frequency => ({ frequency, duration: 0.09, type: 'square', volume: 0.2 })));
    }

    // ---- Background music: an original chiptune loop (Am - F - C - G) ----
    // Notes are scheduled slightly ahead on the audio clock so timing stays tight
    initMusic() {
        this.musicPlaying = false;
        this.musicMode = 'normal';
        this.musicStep = 0;
        this.nextNoteTime = 0;
        this.musicTimer = null;
        this.musicGain = null;
        try {
            this.musicEnabled = localStorage.getItem('pacmanMusic') !== 'false';
        } catch (e) {
            this.musicEnabled = true;
        }
    }

    startMusic() {
        if (!this.audioContext || this.musicPlaying) return;
        if (!this.musicGain) {
            this.musicGain = this.audioContext.createGain();
            this.musicGain.gain.value = 0.1;
            this.musicGain.connect(this.output);
        }
        this.musicPlaying = true;
        this.musicStep = 0;
        this.nextNoteTime = this.audioContext.currentTime + 0.05;
        this.musicTimer = setInterval(() => this.scheduleMusic(), 50);
    }

    stopMusic() {
        this.musicPlaying = false;
        clearInterval(this.musicTimer);
        this.musicTimer = null;
    }

    // 'normal' or 'frightened' (faster, tenser pattern while ghosts are blue)
    setMusicMode(mode) {
        this.musicMode = mode;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        try {
            localStorage.setItem('pacmanMusic', this.musicEnabled);
        } catch (e) {
            console.warn('localStorage not available');
        }
        return this.musicEnabled;
    }

    scheduleMusic() {
        if (!this.musicPlaying || !this.audioContext) return;
        const now = this.audioContext.currentTime;
        // Skip ahead after the tab was throttled instead of playing a burst of late notes
        if (this.nextNoteTime < now - 0.1) this.nextNoteTime = now + 0.05;

        const frightened = this.musicMode === 'frightened';
        const stepTime = frightened ? 0.09 : 0.125;
        while (this.nextNoteTime < now + 0.25) {
            if (this.musicEnabled && !this.isMuted) {
                this.playMusicStep(this.musicStep, this.nextNoteTime, stepTime, frightened);
            }
            this.nextNoteTime += stepTime;
            this.musicStep = (this.musicStep + 1) % 64;
        }
    }

    playMusicStep(step, time, stepTime, frightened) {
        const chords = [
            [110.0, 220.0, 261.63, 329.63],  // Am
            [87.31, 174.61, 220.0, 261.63],  // F
            [130.81, 261.63, 329.63, 392.0], // C
            [98.0, 196.0, 246.94, 293.66]    // G
        ];
        const chord = chords[Math.floor(step / 16)];
        const s = step % 16;

        if (frightened) {
            // Nervous two-note pulse over a throbbing bass
            this.playMusicNote(s % 2 === 0 ? 659.25 : 698.46, time, stepTime * 0.8, 'square', 0.35);
            if (s % 4 === 0) this.playMusicNote(chord[0], time, stepTime * 2, 'triangle', 1);
            return;
        }

        // Bass: root on the beat, octave on the off-beat
        if (s % 4 === 0) this.playMusicNote(chord[0], time, stepTime * 1.8, 'triangle', 1);
        if (s % 4 === 2) this.playMusicNote(chord[0] * 2, time, stepTime * 0.9, 'triangle', 0.6);

        // Arpeggio on eighth notes
        if (s % 2 === 0) {
            const pattern = [1, 2, 3, 2, 1, 2, 3, 2];
            this.playMusicNote(chord[pattern[s / 2]] * 2, time, stepTime * 0.9, 'square', 0.25);
        }
    }

    playMusicNote(frequency, time, duration, type, volume) {
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(frequency, time);
            gainNode.gain.setValueAtTime(volume, time);
            gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);
            oscillator.connect(gainNode);
            gainNode.connect(this.musicGain);
            oscillator.start(time);
            oscillator.stop(time + duration);
        } catch (err) {
            console.warn('Error playing music:', err);
        }
    }
}