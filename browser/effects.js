// Visual effects system for PACMAN-Z-3D

class EffectsManager {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.particles = [];
        this.screenShake = { active: false, intensity: 0, duration: 0, elapsed: 0 };
        this.flashEffect = { active: false, color: null, opacity: 0, duration: 0, elapsed: 0 };
        // Optional (x, y) => {x, y} mapping from maze pixels to screen, set by the 3D view
        this.projector = null;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    // Particle class
    createParticle(x, y, color, velocity, lifetime, size = 3, shape = 'circle') {
        return {
            x, y, color, velocity, lifetime, size, shape,
            age: 0,
            opacity: 1
        };
    }

    // Add explosion effect (ghost death, bullet hit)
    explosion(x, y, color, particleCount = 20, speed = 2) {
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = {
                x: Math.cos(angle) * speed * (0.5 + Math.random() * 0.5),
                y: Math.sin(angle) * speed * (0.5 + Math.random() * 0.5)
            };
            this.particles.push(
                this.createParticle(x, y, color, velocity, 0.5, 2 + Math.random() * 2)
            );
        }
    }

    // Add trail effect (bullet trail, movement trail)
    trail(x, y, color, count = 3) {
        for (let i = 0; i < count; i++) {
            const velocity = {
                x: (Math.random() - 0.5) * 0.5,
                y: (Math.random() - 0.5) * 0.5
            };
            this.particles.push(
                this.createParticle(x, y, color, velocity, 0.3, 2, 'circle')
            );
        }
    }

    // Add sparkle effect (power-up collection, score)
    sparkle(x, y, color, count = 15) {
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            const velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed - 1 // Upward bias
            };
            this.particles.push(
                this.createParticle(x, y, color, velocity, 0.6, 1 + Math.random() * 2, 'star')
            );
        }
    }

    // Add ring expansion effect (power-up activation)
    ring(x, y, color, ringCount = 3) {
        for (let i = 0; i < ringCount; i++) {
            setTimeout(() => {
                for (let j = 0; j < 20; j++) {
                    const angle = (Math.PI * 2 * j) / 20;
                    const velocity = {
                        x: Math.cos(angle) * 3,
                        y: Math.sin(angle) * 3
                    };
                    this.particles.push(
                        this.createParticle(x, y, color, velocity, 0.4, 2, 'circle')
                    );
                }
            }, i * 100);
        }
    }

    // Add text popup effect (score, power name)
    textPopup(x, y, text, color = '#fff', size = 20) {
        this.particles.push({
            type: 'text',
            x, y,
            text,
            color,
            size,
            velocity: { x: 0, y: -1 },
            lifetime: 1.0,
            age: 0,
            opacity: 1
        });
    }

    // Screen shake effect
    startScreenShake(intensity = 5, duration = 0.3) {
        this.screenShake = {
            active: true,
            intensity,
            duration,
            elapsed: 0
        };
    }

    // Flash effect (damage, power-up)
    startFlash(color, opacity = 0.3, duration = 0.2) {
        this.flashEffect = {
            active: true,
            color,
            opacity,
            duration,
            elapsed: 0
        };
    }

    // Update all effects
    update(deltaTime) {
        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.age += deltaTime;
            if (particle.age >= particle.lifetime) return false;

            // Update position
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;

            // Apply gravity to certain particles
            if (particle.shape === 'star') {
                particle.velocity.y += 0.2; // Gravity
            }

            // Fade out based on age
            particle.opacity = 1 - (particle.age / particle.lifetime);

            return true;
        });

        // Update screen shake
        if (this.screenShake.active) {
            this.screenShake.elapsed += deltaTime;
            if (this.screenShake.elapsed >= this.screenShake.duration) {
                this.screenShake.active = false;
            }
        }

        // Update flash effect
        if (this.flashEffect.active) {
            this.flashEffect.elapsed += deltaTime;
            if (this.flashEffect.elapsed >= this.flashEffect.duration) {
                this.flashEffect.active = false;
            }
        }
    }

    // Render all effects
    render() {
        this.ctx.save();

        // Apply screen shake
        if (this.screenShake.active) {
            const progress = this.screenShake.elapsed / this.screenShake.duration;
            const intensity = this.screenShake.intensity * (1 - progress);
            const offsetX = (Math.random() - 0.5) * intensity * 2;
            const offsetY = (Math.random() - 0.5) * intensity * 2;
            this.ctx.translate(offsetX, offsetY);
        }

        // Render particles
        this.particles.forEach(particle => {
            const pos = this.projector ? this.projector(particle.x, particle.y) : particle;
            if (particle.type === 'text') {
                this.ctx.save();
                this.ctx.globalAlpha = particle.opacity;
                this.ctx.fillStyle = particle.color;
                this.ctx.font = `bold ${particle.size}px 'Courier New'`;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(particle.text, pos.x, pos.y);
                this.ctx.restore();
            } else {
                this.ctx.save();
                this.ctx.globalAlpha = particle.opacity;
                this.ctx.fillStyle = particle.color;

                if (particle.shape === 'star') {
                    this.drawStar(pos.x, pos.y, particle.size);
                } else {
                    this.ctx.beginPath();
                    this.ctx.arc(pos.x, pos.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
                }

                this.ctx.restore();
            }
        });

        this.ctx.restore();

        // Render flash effect
        if (this.flashEffect.active) {
            const progress = this.flashEffect.elapsed / this.flashEffect.duration;
            const opacity = this.flashEffect.opacity * (1 - progress);

            this.ctx.save();
            this.ctx.fillStyle = this.flashEffect.color;
            this.ctx.globalAlpha = opacity;
            this.ctx.fillRect(0, 0, this.width, this.height);
            this.ctx.restore();
        }
    }

    // Helper: Draw star shape
    drawStar(x, y, size) {
        this.ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const px = x + Math.cos(angle) * size;
            const py = y + Math.sin(angle) * size;
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();
    }

    // Clear all effects
    clear() {
        this.particles = [];
        this.screenShake.active = false;
        this.flashEffect.active = false;
    }
}
