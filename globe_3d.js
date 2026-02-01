// Globe 3D Logic - UMD / Standard Script Version
// Requires: THREE global variable

// Debug Logger
function logDebug(msg, isError = false) {
    let el = document.getElementById('three-debug');
    if (!el) {
        el = document.createElement('div');
        el.id = 'three-debug';
        el.style.position = 'absolute';
        el.style.top = '0';
        el.style.left = '0';
        el.style.color = isError ? '#ff4444' : '#00ff00';
        el.style.fontSize = '12px';
        el.style.background = 'rgba(0,0,0,0.85)';
        el.style.padding = '8px';
        el.style.borderRadius = '4px';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '9999';
        el.style.maxWidth = '300px';
        document.body.appendChild(el);
    }
    // Append instead of replace for history
    // el.innerHTML += '<div>' + msg + '</div>';
    // Just last message for now to keep it clean, or update status
    el.innerText = msg;
    console.log('[ThreeJS]', msg);
    if (isError) console.error(msg);
}

// Check Protocol and Warn User
// Removed: Texture is now embedded, so file protocol works fine.

// Configuration
const TEXTURE_PATH = 'assets/flag_texture_final.png';
const GLOBE_RADIUS = 4.5;
const ROTATION_SPEED = 0.005;

(function initGlobe() {
    try {
        if (typeof THREE === 'undefined') {
            throw new Error("Three.js not loaded. Check internet connection?");
        }

        const canvas = document.getElementById('globe-canvas');
        if (!canvas) throw new Error("Canvas #globe-canvas not found");

        // Init Scene
        const scene = new THREE.Scene();
        scene.background = null;

        // Camera
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
        camera.position.z = 12;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true
        });
        renderer.setSize(90, 90);
        renderer.setPixelRatio(window.devicePixelRatio);

        // Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.8); // Increased from 1.2
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0); // Increased from 0.5
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // Globe Geometry
        const geometry = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);

        // Fallback Material (Wireframe) in case texture fails
        const fallbackMaterial = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        // Setup Texture Loader
        const textureLoader = new THREE.TextureLoader();

        // Placeholder Sphere (visible immediately)
        let sphere = new THREE.Mesh(geometry, fallbackMaterial);
        scene.add(sphere);

        // Load Texture
        // logDebug('Loading Texture using Base64 Data');

        // Use Data URL directly with TextureLoader (Three.js supports this)
        textureLoader.load(
            TEXTURE_DATA,
            (texture) => {
                // Success! Replace material
                // logDebug('Texture Loaded!');

                // Clear warning if any
                const debugEl = document.getElementById('three-debug');
                if (debugEl && !window.location.protocol.startsWith('file')) {
                    debugEl.style.display = 'none';
                }

                // Adjust color space for vibrancy
                texture.colorSpace = THREE.SRGBColorSpace;

                // Maximize clarity at angles
                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

                sphere.material = new THREE.MeshBasicMaterial({
                    map: texture,
                });
                sphere.material.needsUpdate = true;
            },
            undefined,
            (err) => {
                // Error Handler
                console.error(err);
                logDebug('Texture Failed: ' + err.message, true);
                // Keep wireframe sphere
            }
        );

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (sphere) {
                sphere.rotation.y += ROTATION_SPEED;
                sphere.rotation.x = 0.3;
                sphere.rotation.z = 0.1;
            }
            renderer.render(scene, camera);
        };
        animate();


    } catch (e) {
        logDebug('Init Error: ' + e.message, true);
    }
})();
