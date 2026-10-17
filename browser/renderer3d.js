// Real 3D renderer for PACMAN-Z-3D (Three.js / WebGL).
// It only reads game state each frame - all game logic stays in pacman.js.
// Maze tile (x, y) maps to world position (x, 0, y); walls rise along +Y.

const WALL_HEIGHT = 0.6;
const SCENE_COLOR = 0x05051a;

class Renderer3D {
    static isSupported() {
        if (typeof THREE === 'undefined') return false;
        try {
            const canvas = document.createElement('canvas');
            return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    }

    constructor(canvas, game) {
        this.canvas = canvas;
        this.overlayWidth = game.viewWidth;
        this.overlayHeight = game.viewHeight;
        this.mazeVersion = -1;

        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(SCENE_COLOR);
        this.scene.fog = new THREE.Fog(SCENE_COLOR, 24, 46);

        // Angled overview camera, pulled back just far enough to keep the whole maze in frame
        const centerX = (game.width - 1) / 2;
        const centerZ = (game.height - 1) / 2;
        this.camera = new THREE.PerspectiveCamera(36, game.viewWidth / game.viewHeight, 0.1, 100);
        this.fitCamera(game, centerX, centerZ);

        this.buildLights(centerX, centerZ);
        this.buildFloor(game, centerX, centerZ);
        this.buildMazeMeshes(game);
        this.pacman = this.buildPacman();
        this.ghostMeshes = game.ghosts.map(ghost => this.buildGhost(ghost.color));
        this.mushroomMeshes = [];
        this.bulletMeshes = [];
        this.fruitMesh = this.buildFruit();

        this.tmpObject = new THREE.Object3D();
        this.tmpVector = new THREE.Vector3();
        this.resize(game.viewWidth, game.viewHeight);
    }

    // Back the camera off along a fixed viewing angle until every corner of the maze is on screen
    fitCamera(game, centerX, centerZ) {
        const elevation = THREE.MathUtils.degToRad(55);
        const direction = new THREE.Vector3(0, Math.sin(elevation), Math.cos(elevation));
        const target = new THREE.Vector3(centerX, 0, centerZ + 0.3);
        const corner = new THREE.Vector3();
        const margin = 0.96;

        let distance = 12;
        for (; distance < 45; distance += 0.25) {
            this.camera.position.copy(target).addScaledVector(direction, distance);
            this.camera.lookAt(target);
            this.camera.updateMatrixWorld(true);
            let fits = true;
            for (const x of [-0.5, game.width - 0.5]) {
                for (const y of [0, WALL_HEIGHT + 0.1]) {
                    for (const z of [-0.5, game.height - 0.5]) {
                        corner.set(x, y, z).project(this.camera);
                        if (Math.abs(corner.x) > margin || Math.abs(corner.y) > margin) fits = false;
                    }
                }
            }
            if (fits) break;
        }
        this.cameraBase = this.camera.position.clone();
        this.cameraTarget = target;
    }

    buildLights(centerX, centerZ) {
        this.scene.add(new THREE.AmbientLight(0x8090c0, 0.5));
        this.scene.add(new THREE.HemisphereLight(0x99aaff, 0x110022, 0.45));

        const sun = new THREE.DirectionalLight(0xffffff, 1.25);
        sun.position.set(centerX - 6, 18, centerZ + 8);
        sun.target.position.set(centerX, 0, centerZ);
        sun.castShadow = true;
        sun.shadow.mapSize.set(2048, 2048);
        sun.shadow.camera.left = -14;
        sun.shadow.camera.right = 14;
        sun.shadow.camera.top = 10;
        sun.shadow.camera.bottom = -10;
        sun.shadow.bias = -0.0005;
        this.scene.add(sun);
        this.scene.add(sun.target);

        // Warm glow that travels with Pac-Man
        this.pacLight = new THREE.PointLight(0xffee66, 1.2, 4.5, 2);
        this.scene.add(this.pacLight);
    }

    buildFloor(game, centerX, centerZ) {
        // Faint tile grid so lanes read clearly; the plane is far larger than the maze so no edge shows
        const tile = document.createElement('canvas');
        tile.width = tile.height = 64;
        const tctx = tile.getContext('2d');
        tctx.fillStyle = '#0a0a24';
        tctx.fillRect(0, 0, 64, 64);
        tctx.strokeStyle = '#16164a';
        tctx.lineWidth = 3;
        tctx.strokeRect(0, 0, 64, 64);
        const texture = new THREE.CanvasTexture(tile);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 4;
        const floorW = game.width + 30;
        const floorH = game.height + 30;
        texture.repeat.set(floorW, floorH);

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(floorW, floorH),
            new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8, metalness: 0.15 })
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.set(centerX, 0, centerZ);
        floor.receiveShadow = true;
        this.scene.add(floor);
    }

    buildMazeMeshes(game) {
        const cells = game.width * game.height;

        this.wallMaterial = new THREE.MeshStandardMaterial({ color: 0x2b2bff, emissive: 0x0a0a55, roughness: 0.35, metalness: 0.2 });
        this.walls = new THREE.InstancedMesh(new THREE.BoxGeometry(1, WALL_HEIGHT, 1), this.wallMaterial, cells);
        this.walls.castShadow = true;
        this.walls.receiveShadow = true;
        this.scene.add(this.walls);

        // Glowing inset top on every wall block: a neon panel framed by the darker wall body
        this.wallCaps = new THREE.InstancedMesh(
            new THREE.BoxGeometry(0.84, 0.05, 0.84),
            new THREE.MeshBasicMaterial({ color: 0x4444ff }),
            cells
        );
        this.scene.add(this.wallCaps);

        this.dots = new THREE.InstancedMesh(
            new THREE.SphereGeometry(0.11, 12, 10),
            new THREE.MeshStandardMaterial({ color: 0xfff0d8, emissive: 0xaa8855, roughness: 0.3 }),
            cells
        );
        this.scene.add(this.dots);

        this.pellets = new THREE.InstancedMesh(
            new THREE.SphereGeometry(0.26, 18, 14),
            new THREE.MeshStandardMaterial({ color: 0xfff0e0, emissive: 0xcc9977, roughness: 0.2 }),
            16
        );
        this.pellets.castShadow = true;
        this.scene.add(this.pellets);
    }

    // Two half-spheres hinged on the vertical axis form the chomping mouth: the wedge opens
    // sideways, so it stays visible from the high camera (Pac-Man faces +X)
    buildPacman() {
        const group = new THREE.Group();
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffe600, emissive: 0x806600, roughness: 0.3 });
        const mouthMaterial = new THREE.MeshStandardMaterial({ color: 0xaa2200, emissive: 0x330800, roughness: 0.7, side: THREE.DoubleSide });
        const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.2 });
        const r = 0.48;

        // phi 0..PI is the z > 0 half of the sphere, PI..2PI the z < 0 half
        const buildJaw = (phiStart, side) => {
            const jaw = new THREE.Group();
            const shell = new THREE.Mesh(new THREE.SphereGeometry(r, 32, 20, phiStart, Math.PI), bodyMaterial);
            shell.castShadow = true;
            const cut = new THREE.Mesh(new THREE.CircleGeometry(r, 32), mouthMaterial);
            cut.rotation.y = side > 0 ? Math.PI : 0;
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 10), eyeMaterial);
            eye.position.set(r * 0.35, r * 0.82, side * r * 0.32);
            jaw.add(shell, cut, eye);
            return jaw;
        };
        const upper = buildJaw(0, 1);
        const lower = buildJaw(Math.PI, -1);
        group.add(upper, lower);

        // Translucent bubble shown while the shield power is active
        const shield = new THREE.Mesh(
            new THREE.SphereGeometry(0.62, 24, 16),
            new THREE.MeshBasicMaterial({ color: 0x66aaff, transparent: true, opacity: 0.25, depthWrite: false })
        );
        group.add(shield);

        this.scene.add(group);
        return { group, upper, lower, shield, radius: r };
    }

    buildGhost(color) {
        const group = new THREE.Group();
        const bodyMaterial = new THREE.MeshStandardMaterial({ color, emissive: new THREE.Color(color).multiplyScalar(0.35), roughness: 0.4 });

        const body = new THREE.Group();
        const skirt = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.42, 0.42, 24, 1, true), bodyMaterial);
        skirt.position.y = 0.33;
        const dome = new THREE.Mesh(new THREE.SphereGeometry(0.38, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), bodyMaterial);
        dome.position.y = 0.54;
        // Little feet along the hem
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const foot = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.16, 8), bodyMaterial);
            foot.position.set(Math.cos(angle) * 0.33, 0.06, Math.sin(angle) * 0.33);
            foot.rotation.x = Math.PI;
            body.add(foot);
        }
        skirt.castShadow = true;
        dome.castShadow = true;
        body.add(skirt, dome);

        // Eyes face +X (the ghost's travel direction); the whole group is turned to match
        const eyes = new THREE.Group();
        const whiteMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
        const pupilMaterial = new THREE.MeshStandardMaterial({ color: 0x1030ff, roughness: 0.2 });
        for (const side of [-1, 1]) {
            const white = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), whiteMaterial);
            white.position.set(0.28, 0.6, side * 0.15);
            const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.065, 10, 8), pupilMaterial);
            pupil.position.set(0.38, 0.6, side * 0.15);
            eyes.add(white, pupil);
        }

        // Frightened face: two small pale eyes
        const scaredFace = new THREE.Group();
        const scaredMaterial = new THREE.MeshBasicMaterial({ color: 0xffc8b0 });
        for (const side of [-1, 1]) {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), scaredMaterial);
            eye.position.set(0.37, 0.62, side * 0.12);
            scaredFace.add(eye);
        }

        group.add(body, eyes, scaredFace);
        this.scene.add(group);
        return { group, body, eyes, scaredFace, bodyMaterial, color: new THREE.Color(color), scaredMaterial };
    }

    buildMushroom() {
        const group = new THREE.Group();
        const stem = new THREE.Mesh(
            new THREE.CylinderGeometry(0.08, 0.1, 0.26, 12),
            new THREE.MeshStandardMaterial({ color: 0xf5deb3, roughness: 0.7 })
        );
        stem.position.y = 0.13;
        const capMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.35 });
        const cap = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2), capMaterial);
        cap.position.y = 0.24;
        stem.castShadow = true;
        cap.castShadow = true;
        group.add(stem, cap);
        group.scale.setScalar(1.4);
        this.scene.add(group);
        return { group, capMaterial };
    }

    buildFruit() {
        const group = new THREE.Group();
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.3 });
        const ball = new THREE.Mesh(new THREE.SphereGeometry(0.24, 18, 14), material);
        ball.castShadow = true;
        const stem = new THREE.Mesh(
            new THREE.CylinderGeometry(0.02, 0.03, 0.18, 6),
            new THREE.MeshStandardMaterial({ color: 0x3a8a2a })
        );
        stem.position.y = 0.28;
        group.add(ball, stem);
        group.scale.setScalar(1.25);
        group.visible = false;
        this.scene.add(group);
        return { group, material };
    }

    resize(cssWidth, cssHeight) {
        this.renderer.setPixelRatio(window.devicePixelRatio || 1);
        this.renderer.setSize(cssWidth, cssHeight, false);
        this.canvas.style.width = `${cssWidth}px`;
        this.canvas.style.height = `${cssHeight}px`;
    }

    // Maze pixel coordinates (as used by the 2D effects) -> overlay canvas coordinates
    projectToOverlay(px, py) {
        const v = this.tmpVector.set((px - 16) / 32, 0.45, (py - 16) / 32).project(this.camera);
        return {
            x: (v.x + 1) / 2 * this.overlayWidth,
            y: (1 - v.y) / 2 * this.overlayHeight
        };
    }

    directionYaw(direction) {
        switch (direction) {
            case 'up': return Math.PI / 2;
            case 'down': return -Math.PI / 2;
            case 'left': return Math.PI;
            default: return 0;
        }
    }

    // Rebuild wall instances when a new stage loads
    syncWalls(game) {
        if (this.mazeVersion === game.mazeVersion) return;
        this.mazeVersion = game.mazeVersion;
        const m = this.tmpObject;
        let count = 0;
        for (let y = 0; y < game.height; y++) {
            for (let x = 0; x < game.width; x++) {
                if (game.maze[y][x] !== '#') continue;
                m.position.set(x, WALL_HEIGHT / 2, y);
                m.rotation.set(0, 0, 0);
                m.scale.set(1, 1, 1);
                m.updateMatrix();
                this.walls.setMatrixAt(count, m.matrix);
                m.position.y = WALL_HEIGHT + 0.025;
                m.updateMatrix();
                this.wallCaps.setMatrixAt(count, m.matrix);
                count++;
            }
        }
        this.walls.count = count;
        this.wallCaps.count = count;
        this.walls.instanceMatrix.needsUpdate = true;
        this.wallCaps.instanceMatrix.needsUpdate = true;

        // A different wall tint on each lap
        const hue = (0.66 + (game.lapCount - 1) * 0.13) % 1;
        this.wallMaterial.color.setHSL(hue, 0.8, 0.3);
        this.wallMaterial.emissive.setHSL(hue, 0.9, 0.1);
        this.wallCaps.material.color.setHSL(hue, 1, 0.5);
    }

    syncDots(game, time) {
        const m = this.tmpObject;
        let dotCount = 0;
        let pelletCount = 0;
        const pelletScale = 1 + Math.sin(time / 150) * 0.2;
        for (let y = 0; y < game.height; y++) {
            for (let x = 0; x < game.width; x++) {
                const cell = game.maze[y][x];
                if (cell === '.') {
                    m.position.set(x, 0.3, y);
                    m.scale.set(1, 1, 1);
                    m.updateMatrix();
                    this.dots.setMatrixAt(dotCount++, m.matrix);
                } else if (cell === 'o' && pelletCount < 16) {
                    m.position.set(x, 0.35, y);
                    m.scale.setScalar(pelletScale);
                    m.updateMatrix();
                    this.pellets.setMatrixAt(pelletCount++, m.matrix);
                }
            }
        }
        this.dots.count = dotCount;
        this.pellets.count = pelletCount;
        this.dots.instanceMatrix.needsUpdate = true;
        this.pellets.instanceMatrix.needsUpdate = true;
    }

    syncPacman(game) {
        const p = this.pacman;
        const deathProgress = game.dying ? Math.min(1, Math.max(0, (game.deathTimer - 300) / 1000)) : 0;
        p.group.visible = deathProgress < 1;
        p.group.position.set(game.pacman.x, p.radius, game.pacman.y);

        // Never fully closed, so the mouth always reads as Pac-Man
        let mouth = 0.14 + Math.abs(Math.sin(game.pacman.mouthAnimation)) * 0.62;
        let yaw = this.directionYaw(game.pacman.direction);
        if (game.dying) {
            // Spin, gape and shrink away
            mouth = 0.3 + deathProgress * 1.2;
            yaw += deathProgress * Math.PI * 4;
        }
        p.group.rotation.set(0, yaw, 0);
        p.group.scale.setScalar(1 - deathProgress * 0.9);
        p.upper.rotation.y = -mouth;
        p.lower.rotation.y = mouth;

        p.shield.visible = game.hasShield && !game.dying;
        if (p.shield.visible) p.shield.material.opacity = 0.18 + Math.abs(Math.sin(performance.now() / 200)) * 0.2;

        this.pacLight.position.set(game.pacman.x, 1.2, game.pacman.y);
        this.pacLight.intensity = p.group.visible ? 1.2 : 0;
    }

    syncGhosts(game, time) {
        const hideAll = game.dying && game.deathTimer > 300;
        const ending = game.isFrightenedEnding();
        game.ghosts.forEach((ghost, i) => {
            const mesh = this.ghostMeshes[i];
            mesh.group.visible = !hideAll;
            if (hideAll) return;

            const bob = ghost.isDead ? 0 : Math.sin(time / 180 + i) * 0.04;
            mesh.group.position.set(ghost.x, bob, ghost.y);
            const yaw = ghost.isDead
                ? Math.atan2(-(game.ghostHome.y - ghost.y), game.ghostHome.x - ghost.x)
                : this.directionYaw(ghost.direction);
            mesh.group.rotation.set(0, yaw, 0);

            mesh.body.visible = !ghost.isDead;
            mesh.eyes.visible = !ghost.frightened;
            mesh.scaredFace.visible = ghost.frightened && !ghost.isDead;
            if (ghost.frightened) {
                mesh.bodyMaterial.color.set(ending ? 0xeeeeee : 0x4466ff);
                mesh.bodyMaterial.emissive.set(ending ? 0x666666 : 0x1a2a99);
                mesh.scaredMaterial.color.set(ending ? 0xff2020 : 0xffc8b0);
            } else {
                mesh.bodyMaterial.color.copy(mesh.color);
                mesh.bodyMaterial.emissive.copy(mesh.color).multiplyScalar(0.35);
            }
        });
    }

    syncMushrooms(game, time) {
        while (this.mushroomMeshes.length < game.mushrooms.length) this.mushroomMeshes.push(this.buildMushroom());
        this.mushroomMeshes.forEach((mesh, i) => {
            const mushroom = game.mushrooms[i];
            mesh.group.visible = !!(mushroom && mushroom.active);
            if (!mesh.group.visible) return;
            mesh.group.position.set(mushroom.x, 0, mushroom.y);
            mesh.group.rotation.y = time / 900 + i;
            mesh.capMaterial.color.set(mushroom.color);
            mesh.capMaterial.emissive.set(mushroom.type === 'golden' ? 0x664400 : 0x000000);
        });
    }

    syncBullets(game) {
        const colors = { super: 0xffd700, homing: 0xff4444, multishot: 0xff44ff };
        while (this.bulletMeshes.length < game.bullets.length) {
            const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 10, 8), new THREE.MeshBasicMaterial({ color: 0xffffff }));
            this.scene.add(mesh);
            this.bulletMeshes.push(mesh);
        }
        this.bulletMeshes.forEach((mesh, i) => {
            const bullet = game.bullets[i];
            mesh.visible = !!bullet;
            if (!bullet) return;
            mesh.position.set(bullet.x, 0.45, bullet.y);
            mesh.scale.setScalar(bullet.type === 'super' ? 1.7 : 1);
            mesh.material.color.set(colors[bullet.type] || 0xffffff);
        });
    }

    syncFruit(game, time) {
        const fruit = game.fruit;
        const blinking = fruit && fruit.timer < 2000 && Math.floor(fruit.timer / 150) % 2 === 0;
        this.fruitMesh.group.visible = !!fruit && !blinking;
        if (!fruit) return;
        this.fruitMesh.group.position.set(fruit.x, 0.35 + Math.sin(time / 250) * 0.06, fruit.y);
        this.fruitMesh.group.rotation.y = time / 500;
        this.fruitMesh.material.color.set(fruit.color);
    }

    render(game) {
        const time = performance.now();
        this.syncWalls(game);
        this.syncDots(game, time);
        this.syncPacman(game);
        this.syncGhosts(game, time);
        this.syncMushrooms(game, time);
        this.syncBullets(game);
        this.syncFruit(game, time);

        // Reuse the 2D screen-shake as a camera shake
        const shake = game.effectsManager.screenShake;
        this.camera.position.copy(this.cameraBase);
        if (shake.active) {
            const strength = (shake.intensity / 40) * (1 - shake.elapsed / shake.duration);
            this.camera.position.x += (Math.random() - 0.5) * strength;
            this.camera.position.y += (Math.random() - 0.5) * strength;
        }
        this.camera.lookAt(this.cameraTarget);

        this.renderer.render(this.scene, this.camera);
    }
}
