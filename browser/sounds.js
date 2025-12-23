class SoundManager {
    constructor() {
        this.audioContext = null;
        this.isMuted = false;
        this.volume = 0.3;
        this.initAudioContext();
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
            gainNode.connect(this.audioContext.destination);

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
                gainNode.connect(this.audioContext.destination);

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
}