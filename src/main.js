import { mountLiquidCarousel } from './mount-liquid-carousel';

document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Accessibility: Global Reduced Motion for GSAP
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            gsap.ticker.fps(15); // Reduce frame rate to minimize jarring movement
        }

        const insomniacImages = [
            "insomniac/insomniac-01.jpeg",
            "insomniac/insomniac-02.jpeg",
            "insomniac/insomniac-03.jpeg",
            "insomniac/insomniac-04.jpeg",
            "insomniac/insomniac-05.jpeg",
            "insomniac/insomniac-06.jpeg",
            "insomniac/insomniac-07.jpeg",
            "insomniac/insomniac-08.jpeg",
            "insomniac/insomniac-09.jpeg",
            "insomniac/insomniac-10.jpeg",
            "insomniac/insomniac-11.jpeg",
            "insomniac/insomniac-12.jpeg",
            "insomniac/insomniac-13.jpeg",
            "insomniac/insomniac-14.jpeg",
            "insomniac/insomniac-15.jpeg",
            "insomniac/insomniac-16.jpeg",
            "insomniac/insomniac-17.jpeg",
            "insomniac/insomniac-18.jpeg",
            "insomniac/insomniac-19.jpeg",
            "insomniac/insomniac-20.jpeg",
            "insomniac/insomniac-21.jpeg",
            "insomniac/insomniac-22.jpeg",
            "insomniac/insomniac-23.jpeg",
            "insomniac/insomniac-24.jpeg",
            "insomniac/insomniac-25.jpeg",
            "insomniac/insomniac-26.jpeg",
            "insomniac/insomniac-27.jpeg",
            "insomniac/insomniac-28.jpeg"
        ];

        function shuffleInsomniac() {
            for (let i = insomniacImages.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [insomniacImages[i], insomniacImages[j]] = [insomniacImages[j], insomniacImages[i]];
            }
        }
        shuffleInsomniac();

        const frameColors = ["#051024", "#012CEB", "#FF2E3B", "#141414"];
        const canvas = document.getElementById("cursor-trail-canvas");
        let imgIndex = 0;
        let lastX = 0;
        let lastY = 0;
        const threshold = 180; // pixels to move before spawning next image
        const activeImages = [];

        const onGalleryMouseMove = (e) => {
            if (!canvas || window.innerWidth < 768) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const dist = Math.hypot(x - lastX, y - lastY);
            if (dist > threshold) {
                lastX = x;
                lastY = y;
                spawnImage(x, y);
            }
        };

        const gallerySection = document.getElementById("gallery");
        if (canvas && gallerySection) {
            new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        canvas.addEventListener("mousemove", onGalleryMouseMove);
                    } else {
                        canvas.removeEventListener("mousemove", onGalleryMouseMove);
                    }
                });
            }, { threshold: 0 }).observe(gallerySection);
        }

        function spawnImage(x, y) {
            if (typeof isAudioInit !== 'undefined' && isAudioInit && typeof boingSynth !== 'undefined') {
                // Slight pop sound with very short release
                boingSynth.triggerAttackRelease("G5", "64n", "+0", 0.05);
            }

            const src = `/assets/${insomniacImages[imgIndex]}`;
            imgIndex++;
            if (imgIndex >= insomniacImages.length) {
                imgIndex = 0;
                shuffleInsomniac();
            }

            const img = document.createElement("img");
            img.src = src;

            const baseSize = window.innerWidth < 768 ? 180 : window.innerWidth <= 1440 ? 280 : 340;
            const scale = 0.7 + Math.random() * 0.4; // 0.7x to 1.1x scale
            const rot = (Math.random() - 0.5) * 15; // More varied rotation
            const offsetX = (Math.random() - 0.5) * Math.min(200, window.innerWidth * 0.12); // Imperfect placement
            const offsetY = (Math.random() - 0.5) * Math.min(200, window.innerWidth * 0.12);
            const frameColor = frameColors[Math.floor(Math.random() * frameColors.length)];

            img.className = "absolute origin-center rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] pointer-events-none will-change-transform";
            img.style.width = "auto";
            img.style.height = "auto";
            img.style.maxWidth = `${baseSize}px`;
            img.style.maxHeight = `${baseSize}px`;
            img.style.border = `10px solid ${frameColor}`;
            img.style.backgroundColor = frameColor;
            img.style.left = `${x + offsetX}px`;
            img.style.top = `${y + offsetY}px`;
            img.style.transform = `translate(-50%, -50%) scale(0.9) rotate(${rot - 5}deg)`;
            img.style.opacity = "0";

            canvas.appendChild(img);
            activeImages.push(img);

            // Appear slowly with a pause (delay) matching the vibe
            gsap.to(img, {
                opacity: 1,
                scale: scale,
                rotation: rot,
                duration: 1.5,
                delay: Math.random() * 0.3 + 0.1, // bit pause
                ease: "power2.out",
                overwrite: "auto"
            });

            // Enforce a higher max images to allow a tiled look
            if (activeImages.length > 15) {
                const oldImg = activeImages.shift();
                removeImage(oldImg);
            }

            // Auto fade out (longer duration so they tile up)
            setTimeout(() => {
                if (activeImages.includes(img)) {
                    const idx = activeImages.indexOf(img);
                    if (idx > -1) activeImages.splice(idx, 1);
                    removeImage(img);
                }
            }, 3500);
        }

        function removeImage(img) {
            gsap.to(img, {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    if (img.parentNode) {
                        img.parentNode.removeChild(img);
                    }
                }
            });
        }
    }
});


// Define stackData at the very top of the script so it is initialized before renderStack() execution
const stackData = [
    {
        company: 'KiranaMate', desc: 'Autonomous Business Teammate for 12M+ Indian Kirana Stores', duration: 'ACTIVE', role: 'AI Engineer & Founder',
        points: [
            'Built a <strong class="text-current underline decoration-2 underline-offset-2">WhatsApp-native multi-agent system</strong> on LangGraph that ingests real-time Paytm soundbox payments to detect category sales anomalies using time-series baselines.',
            'Engineered <strong class="text-current underline decoration-2 underline-offset-2">vernacular Hinglish voice agents (Sarvam AI)</strong> that scrape local Q-Commerce prices and execute margin-guaranteed customer clearance campaigns.'
        ],
        stats: [{ num: '12M+', label: 'Stores Targeted' }, { num: '0-App', label: 'Adoption Friction' }, { num: '100%', label: 'Margin Guaranteed' }]
    },
    {
        company: 'Blue Tea', desc: "India's leading herbal tea brand, featured on Shark Tank India, with 1M+ global customers", duration: '4 Weeks', role: 'Live Project Associate',
        points: [
            'Executed a targeted <strong class="text-current underline decoration-2 underline-offset-2">offline activation strategy</strong>, securing 5+ strategic B2B partnerships to distribute 2,000+ units, penetrating high-value customer segments.',
            'Architected an <strong class="text-current underline decoration-2 underline-offset-2">influencer campaign model</strong>, managing outreach to 90+ creators, achieving ₹0.10 CPV - outperforming industry benchmarks & maximizing ROI.'
        ],
        stats: [{ num: '90+', label: 'Creators outreached' }, { num: '₹0.10', label: 'CPV achieved' }, { num: '2K+', label: 'Units distributed' }]
    },
    {
        company: 'Dr. Water', desc: 'Global US-based brand delivering premium hydrogen hydration solutions', duration: '8 Weeks', role: 'Project Head',
        points: [
            'Identified <strong class="text-current underline decoration-2 underline-offset-2">6 key customer personas</strong> through primary & secondary research, analyzing 200+ responses & behavioural patterns, framing 360° marketing strategies.',
            'Benchmarked <strong class="text-current underline decoration-2 underline-offset-2">18+ hydration brands</strong>, defining competitive gaps & synthesized over 2,000 data points, leveraging insights to inform targeted marketing strategies.'
        ],
        stats: [{ num: '6', label: 'Personas mapped' }, { num: '2K+', label: 'Data points' }, { num: '18+', label: 'Brands benchmarked' }]
    },
    {
        company: 'Frost & Sullivan', desc: 'International consulting firm specialising in market research & strategic advisory', duration: '4 Weeks', role: 'Live Project Associate',
        points: [
            'Benchmarked advancements in <strong class="text-current underline decoration-2 underline-offset-2">six mobility domains</strong>, identifying synergies projected to unlock ₹42,000 crore+ in combined market opportunities.',
            'Evaluated & ranked <strong class="text-current underline decoration-2 underline-offset-2">200+ technologies</strong> using the Mobility Innovation Scoring Model, identifying the top 10 innovations for strategic client focus.'
        ],
        stats: [{ num: '200+', label: 'Tech ranked' }, { num: '₹42K Cr+', label: 'Market opportunity' }, { num: '6', label: 'Mobility domains' }]
    }
];

// Safety check around Lucide icon initialization
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, Draggable);
}

// --- AUDIO DESIGN (TONE.JS) ---
let isAudioInit = false;

const soundToggleBtn = document.getElementById('sound-toggle');
const soundIconOff = soundToggleBtn ? soundToggleBtn.querySelector('.sound-icon-off') : null;
const soundIconOn = soundToggleBtn ? soundToggleBtn.querySelector('.sound-icon-on') : null;

if (soundToggleBtn) soundToggleBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    if (!isAudioInit) {
        // Resume AudioContext (browsers suspend it until a user gesture)
        await Tone.start();
        isAudioInit = true;
        if (soundIconOff) soundIconOff.classList.add('hidden');
        if (soundIconOn) soundIconOn.classList.remove('hidden');
    } else {
        isAudioInit = false;
        if (soundIconOff) soundIconOff.classList.remove('hidden');
        if (soundIconOn) soundIconOn.classList.add('hidden');
        // Suspend the AudioContext so nothing can slip through even if
        // isAudioInit is bypassed somewhere
        try { await Tone.getContext().rawContext.suspend(); } catch (_) { }
    }
});

if (typeof Tone === 'undefined') {
    window.Tone = { start: async () => { }, getContext: () => ({ rawContext: { suspend: async () => { } } }), Reverb: function () { return { toDestination() { return this; } }; }, PolySynth: function () { return { connect() { return this; }, toDestination() { return this; }, volume: { value: 0 }, triggerAttackRelease() { } }; }, AMSynth: function () { }, MembraneSynth: function () { return { toDestination() { return this; }, volume: { value: 0 }, triggerAttackRelease() { } }; }, Synth: function () { return { toDestination() { return this; }, volume: { value: 0 }, triggerAttackRelease() { } }; }, FMSynth: function () { return { toDestination() { return this; }, volume: { value: 0 }, triggerAttackRelease() { } }; }, NoiseSynth: function () { return { toDestination() { return this; }, volume: { value: 0 }, triggerAttackRelease() { } }; } };
}

const uiReverb = new Tone.Reverb({ decay: 4, wet: 0.6 }).toDestination();
const dopaminePad = new Tone.PolySynth(Tone.AMSynth, {
    harmonicity: 2.5,
    oscillator: { type: "sine" },
    envelope: { attack: 0.3, decay: 0.5, sustain: 0.6, release: 2.5 },
    modulation: { type: "sine" },
    modulationEnvelope: { attack: 0.1, decay: 0.2, sustain: 0.1, release: 0.2 }
}).connect(uiReverb);
dopaminePad.volume.value = -16;

const lockSynth = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 2,
    oscillator: { type: 'sine' },
    envelope: { attack: 0.01, decay: 0.4, sustain: 0.01, release: 1.4 }
}).toDestination();
lockSynth.volume.value = -10;

const arrivalSynth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "triangle" },
    envelope: { attack: 0.1, decay: 0.2, sustain: 0.3, release: 2 }
}).toDestination();
arrivalSynth.volume.value = -12;

const gearSynth = new Tone.MembraneSynth({
    pitchDecay: 0.01,
    octaves: 4,
    oscillator: { type: 'square' },
    envelope: { attack: 0.001, decay: 0.1, sustain: 0, release: 0.01 }
}).toDestination();
gearSynth.volume.value = -18;

const beepSynth = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0, release: 0.1 }
}).toDestination();
beepSynth.volume.value = -12;

const f1MetroSynth = new Tone.FMSynth({
    harmonicity: 3.5,
    modulationIndex: 15,
    oscillator: { type: "sawtooth" },
    modulation: { type: "square" },
    envelope: { attack: 0.8, decay: 0.2, sustain: 0.8, release: 1.5 }
}).toDestination();
f1MetroSynth.volume.value = -18;

// Custom synthesized paper rustle
const paperRustleSynth = new Tone.NoiseSynth({
    noise: { type: 'white' },
    envelope: { attack: 0.03, decay: 0.12, sustain: 0.1, release: 0.15 }
}).toDestination();
paperRustleSynth.volume.value = -20;

// Tactile hover tick sound
const hoverTickSynth = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.02, sustain: 0, release: 0.02 }
}).toDestination();
hoverTickSynth.volume.value = -24;

// Funny pop sound for general clicks
const popSynth = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 6,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
}).toDestination();
popSynth.volume.value = -8;

// Bouncy boing sound for modals and cards
const boingSynth = new Tone.FMSynth({
    harmonicity: 0.5,
    modulationIndex: 10,
    oscillator: { type: "sine" },
    modulation: { type: "square" },
    envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 }
}).toDestination();
boingSynth.volume.value = -12;

const clickSynth = new Tone.Synth({
    oscillator: { type: "triangle" },
    envelope: { attack: 0.001, decay: 0.08, sustain: 0, release: 0.08 }
}).toDestination();
clickSynth.volume.value = -10;

const decryptSynth = new Tone.MetalSynth({
    frequency: 440,
    envelope: { attack: 0.001, decay: 0.12, sustain: 0, release: 0.2 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
}).toDestination();
decryptSynth.volume.value = -14;

// --- LENIS SCROLL SETUP ---
const worldViewport = document.getElementById('world-viewport');
const worldContainer = document.getElementById('world-container');

let lenis;
try {
    lenis = new Lenis({
        wrapper: worldViewport,
        content: worldContainer,
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });
    // Merge Lenis into GSAP's single ticker (eliminates a second RAF loop)
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.defaults({ scroller: worldViewport });
    lenis.on('scroll', ScrollTrigger.update);

    // Lock scroll while the preloader / opening quote is visible
    lenis.stop();
} catch (e) {
    console.warn('Lenis failed to initialise — falling back to native scroll:', e);
    document.body.style.overflow = 'auto';
}

// --- HERO INITIAL STAGING & REVEAL ---
const heroBgTarget = document.getElementById('hero-bg-target');
const heroLighting = document.getElementById('hero-lighting');
const heroText3d = document.getElementById('hero-text-3d');
let isPhysicsActive = false;

gsap.set('#intro-thumb-container', { opacity: 1, scale: 1, transformOrigin: '50% 50%' });
gsap.set('#intro-vid, #intro-vid-color', { scale: 1 });
gsap.set('#intro-thumb-lighting', { opacity: 1 });
gsap.set('.hero-overlay-text', { opacity: 0 });
gsap.set(heroText3d, { opacity: 0, scale: 0.12, rotate: -4, y: -114 });
gsap.set('#hero-lighting', { opacity: 0 });
gsap.set('#hero-badges', { opacity: 0, y: 15 });
gsap.set('#hero-dual-toggle', { opacity: 0, y: -15 });
gsap.set('#main-nav-container', { opacity: 0, y: 30, filter: "blur(8px)", pointerEvents: 'none' });
gsap.set('#top-ribbon', { opacity: 0, y: -40, filter: "blur(8px)", pointerEvents: 'none' });

let revealHeroHasRun = false;

function revealHero(speed = 1.0) {
    if (revealHeroHasRun) return;
    revealHeroHasRun = true;

    // Activate cursor parallax & 3D blue text-shadow physics
    isPhysicsActive = true;

    // Guarantee scroll starts at 0 — browser may restore a previous session position
    if (worldViewport) worldViewport.scrollTop = 0;

    const d = 1.5 * speed;

    const revealTl = gsap.timeline({
        onComplete: () => {
            gsap.set(['#main-nav-container', '#top-ribbon'], { clearProps: "filter" });
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        }
    });

    // 1. Fullscreen spatial container scales slightly (keeping images and canvas in 1:1 perfect alignment)
    revealTl.to('#intro-thumb-container', { scale: 1.05, duration: d, ease: "expo.inOut" }, 0);

    // 2. Lighting overlay on fullscreen video fades
    revealTl.to('#intro-thumb-lighting', {
        opacity: 0,
        duration: d * 0.8,
        ease: "power2.inOut"
    }, d * 0.2);

    // 3. Hero signature typography animates in during curtain lift
    revealTl.to(heroText3d, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: -4,
        duration: d * 1.1,
        ease: "expo.out"
    }, d * 0.25);

    // 4. Hero lighting (parallax radial gradient) fades in
    revealTl.to('#hero-lighting', {
        opacity: 1,
        duration: d,
        ease: "power2.inOut"
    }, 0.35 * speed);

    // 5. Overlay text labels fade in
    revealTl.to('.hero-overlay-text', {
        opacity: 1,
        duration: 0.8 * speed,
        stagger: 0.15
    }, d * 0.5);

    // 6. Badges & dual mood toggle slide in
    revealTl.to('#hero-badges, #hero-dual-toggle', {
        opacity: 1, y: 0,
        duration: 0.8 * speed,
        ease: "expo.out"
    }, d * 0.65);

    // 7. Nav rises from below
    revealTl.to('#main-nav-container', {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0 * speed,
        ease: "expo.out"
    }, d * 0.7);

    // 8. Top ribbon slides down from above
    revealTl.to('#top-ribbon', {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.0 * speed,
        ease: "expo.out",
        pointerEvents: 'auto'
    }, d * 0.7 + 0.1 * speed);
}

// =====================================================================
// FABRIC REVEAL LOADER ENGINE
// GSAP cloth simulation & parting sequence from fabric-loader.html
// =====================================================================
(function initFabricLoader() {
    const CONFIG = {
        imageSrc: '/assets/images/loader-starry-landscape.png', // Opening visual path
        initialHoldMs: 4800,    // 5-second total experience before parting starts
        fadeTextMs: 380,        // Time to fade out the loading text (ms)
        revealDurationSec: 1.9, // Duration of the physical fabric parting (seconds)
        seamYRatio: 0.515       // Vertical position of separation line (0.5 = exact center)
    };

    const overlay = document.getElementById('fabricLoaderOverlay');
    const canvas = document.getElementById('fabricLoaderCanvas');
    const staticImg = document.getElementById('fabricStaticImg');
    const loaderText = document.getElementById('fabricLoaderText');

    if (!overlay || !canvas || !loaderText) return;

    const ctx = canvas.getContext('2d');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Sequential animation for L, O, A, D, I, N, G and the three dots . . .
    const charEls = loaderText.querySelectorAll('.loader-char:not(.loader-dot)');
    const dotEls = loaderText.querySelectorAll('.loader-dot');

    let textTimeline = null;
    function startTextSequence() {
        if (textTimeline) return;

        if (prefersReducedMotion) {
            gsap.set([...charEls, ...dotEls], { opacity: 1, y: 0, scale: 1, filter: 'none' });
            return;
        }

        textTimeline = gsap.timeline();

        // 1. Letters L, O, A, D, I, N, G animate in sequential order
        textTimeline.to(charEls, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.36,
            stagger: 0.28,
            ease: 'back.out(1.3)'
        }, 0.35);

        // 2. Three dots animate in sequential order after the letters
        textTimeline.to(dotEls, {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.30,
            stagger: 0.42,
            ease: 'power2.out'
        }, "+=0.15");
    }

    // Image preload & setup
    const img = new Image();
    img.src = CONFIG.imageSrc;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isCleanedUp = false;

    const anim = {
        progress: 0,
        wavePhase: 0
    };

    function resizeCanvas() {
        if (isCleanedUp) return;
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (anim.progress <= 0) {
            drawFabric();
        }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Computes object-fit: cover coordinates preserving aspect ratio
    function getCoverBounds(imgW, imgH, targetW, targetH) {
        const imgRatio = imgW / imgH;
        const targetRatio = targetW / targetH;
        let renderW, renderH, offsetX, offsetY;

        if (targetRatio > imgRatio) {
            renderW = targetW;
            renderH = targetW / imgRatio;
            offsetX = 0;
            offsetY = targetH - renderH;
        } else {
            renderH = targetH;
            renderW = targetH * imgRatio;
            offsetX = (targetW - renderW) / 2;
            offsetY = 0;
        }
        return { renderW, renderH, offsetX, offsetY };
    }

    // Cloth simulation & curve drawing
    function drawFabric() {
        if (isCleanedUp) return;
        ctx.clearRect(0, 0, width, height);

        if (!img.complete || img.naturalWidth === 0) return;

        const bounds = getCoverBounds(img.naturalWidth, img.naturalHeight, width, height);
        const seamY = height * CONFIG.seamYRatio;

        // When closed, render continuous full image
        if (anim.progress <= 0) {
            ctx.drawImage(img, bounds.offsetX, bounds.offsetY, bounds.renderW, bounds.renderH);
            return;
        }

        const p = anim.progress;
        // Global pull sweeps upper & lower sheets completely off screen
        const globalPull = p * (height * 0.65);
        // Center separation lifts/drops faster, forming a natural draped arch
        const centerArchPull = Math.sin(p * Math.PI) * (height * 0.32);
        // Organic ripples along cloth hemline
        const rippleAmp = (1 - p * 0.7) * Math.sin(p * Math.PI) * 10;

        const slices = 80;
        const sliceW = width / slices;

        const topPts = [];
        const btmPts = [];

        for (let i = 0; i <= slices; i++) {
            const u = i / slices;
            const centerBell = Math.pow(Math.sin(u * Math.PI), 2.2);

            const ripple = Math.sin(u * Math.PI * 4.4 + anim.wavePhase) * 0.6 +
                Math.cos(u * Math.PI * 7.8 - anim.wavePhase * 1.3) * 0.4;

            const yTop = seamY - globalPull - (centerArchPull * centerBell) + (rippleAmp * ripple);
            const yBtm = seamY + globalPull + (centerArchPull * centerBell) + (rippleAmp * ripple);

            topPts.push({ x: i * sliceW, y: yTop });
            btmPts.push({ x: i * sliceW, y: yBtm });
        }

        // --- UPPER FABRIC SHEET ---
        if (topPts.some(function (pt) { return pt.y > 0; })) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(width, 0);
            ctx.lineTo(width, topPts[slices].y);
            for (let i = slices; i >= 0; i--) {
                ctx.lineTo(topPts[i].x, topPts[i].y);
            }
            ctx.closePath();
            ctx.clip();

            const topShift = -p * (height * 0.22);
            ctx.translate(0, topShift);
            ctx.drawImage(img, bounds.offsetX, bounds.offsetY, bounds.renderW, bounds.renderH);
            ctx.restore();

            // Soft physical drop shadow along upper hem
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(topPts[0].x, topPts[0].y);
            for (let i = 1; i <= slices; i++) {
                ctx.lineTo(topPts[i].x, topPts[i].y);
            }
            ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
            ctx.shadowBlur = 18;
            ctx.shadowOffsetY = 6;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }

        // --- LOWER FABRIC SHEET ---
        if (btmPts.some(function (pt) { return pt.y < height; })) {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(0, btmPts[0].y);
            for (let i = 1; i <= slices; i++) {
                ctx.lineTo(btmPts[i].x, btmPts[i].y);
            }
            ctx.lineTo(width, height);
            ctx.lineTo(0, height);
            ctx.closePath();
            ctx.clip();

            const btmShift = p * (height * 0.22);
            ctx.translate(0, btmShift);
            ctx.drawImage(img, bounds.offsetX, bounds.offsetY, bounds.renderW, bounds.renderH);
            ctx.restore();

            // Soft physical drop shadow along lower hem
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(btmPts[0].x, btmPts[0].y);
            for (let i = 1; i <= slices; i++) {
                ctx.lineTo(btmPts[i].x, btmPts[i].y);
            }
            ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
            ctx.shadowBlur = 18;
            ctx.shadowOffsetY = -6;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        }
    }

    img.onload = function () {
        drawFabric();
    };

    function cleanup() {
        isCleanedUp = true;
        window.removeEventListener('resize', resizeCanvas);
        document.body.classList.remove('is-loading');
        overlay.setAttribute('aria-busy', 'false');
        if (staticImg && staticImg.parentNode) staticImg.remove();
        canvas.width = 1;
        canvas.height = 1;
        overlay.style.display = 'none';
        overlay.style.pointerEvents = 'none';

        // Activate cursor parallax & restore scrolling and Lenis smoothly
        isPhysicsActive = true;
        if (worldViewport) worldViewport.scrollTop = 0;
        if (typeof lenis !== 'undefined' && lenis) lenis.start();
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
    }

    function triggerReveal() {
        // Step 1: Smoothly fade and elevate loading text
        if (window.gsap) {
            window.gsap.to(loaderText, {
                opacity: 0,
                y: -14,
                scale: 0.96,
                filter: 'blur(8px)',
                duration: CONFIG.fadeTextMs / 1000,
                ease: 'power2.inOut'
            });
        } else {
            loaderText.style.opacity = '0';
        }

        if (prefersReducedMotion) {
            revealHero(0.5);
            setTimeout(function () {
                overlay.style.transition = 'opacity 0.6s ease';
                overlay.style.opacity = '0';
                setTimeout(cleanup, 650);
            }, 300);
            return;
        }

        // Step 2: Switch to canvas and execute fabric parting
        setTimeout(function () {
            if (staticImg) staticImg.style.display = 'none';
            canvas.classList.remove('is-hidden');
            overlay.style.backgroundColor = 'transparent';
            drawFabric();

            // Synchronously trigger hero reveal so it emerges beneath the parting fabric
            revealHero(1.0);

            if (window.gsap) {
                window.gsap.to(anim, {
                    progress: 1,
                    wavePhase: Math.PI * 3.5,
                    duration: CONFIG.revealDurationSec,
                    ease: 'power2.inOut',
                    onUpdate: drawFabric,
                    onComplete: function () {
                        window.gsap.to(overlay, {
                            opacity: 0,
                            duration: 0.35,
                            ease: 'power2.out',
                            onComplete: cleanup
                        });
                    }
                });
            } else {
                // Accessible fallback if GSAP is not loaded
                overlay.style.transition = 'opacity 0.6s ease';
                overlay.style.opacity = '0';
                setTimeout(cleanup, 650);
            }
        }, CONFIG.fadeTextMs);
    }

    let hasTriggered = false;
    function startSequence() {
        if (hasTriggered) return;
        hasTriggered = true;
        startTextSequence();
        setTimeout(triggerReveal, CONFIG.initialHoldMs);
    }

    // Check hero DOM readiness & image loading before starting sequence
    function checkHeroAndAssetReadiness() {
        const isImgReady = (img.complete && img.naturalWidth > 0);
        const isHeroReady = !!document.getElementById('hero');

        if (isImgReady && isHeroReady) {
            startSequence();
        } else {
            if (!isImgReady) {
                img.addEventListener('load', checkHeroAndAssetReadiness, { once: true });
                img.addEventListener('error', startSequence, { once: true });
            }
            if (!isHeroReady) {
                window.addEventListener('DOMContentLoaded', checkHeroAndAssetReadiness, { once: true });
            }
        }
    }

    if (document.readyState === 'complete') {
        checkHeroAndAssetReadiness();
    } else {
        window.addEventListener('load', checkHeroAndAssetReadiness, { once: true });
        // Fallback guarantee: never keep user stuck waiting
        setTimeout(checkHeroAndAssetReadiness, 2500);
    }
})();

// --- BUILD TIMELINE TRACK TICKS ---
const tickContainer = document.getElementById('nav-ticks-container');
const tickTopContainer = document.getElementById('nav-ticks-top-container');
let tickHTML = ''; let tickTopHTML = '';
for (let i = 0; i < 80; i++) {
    const h = i % 5 === 0 ? '16px' : '8px';
    tickHTML += `<div style="width:2px; height:${h}; background:var(--beige); opacity:0.4;"></div>`;
    tickTopHTML += `<div style="width:2px; height:${h}; background:var(--beige); opacity:0.4;"></div>`;
}
if (tickContainer) tickContainer.innerHTML = tickHTML;
if (tickTopContainer) tickTopContainer.innerHTML = tickTopHTML;

// --- NAVIGATION STATE TRACKER ---
let isWarping = false;
let currentActiveId = 'hero';

const navSections = ['hero', 'about', 'experience', 'vending', 'gallery', 'contact'];
const navBottomLinks = document.querySelectorAll('#main-nav a.nav-link-route');
const navTopLinks = document.querySelectorAll('#top-nav a.nav-item-top');
const navIndicator = document.getElementById('nav-indicator');

function updateNavState(id, force = false) {
    if (isWarping && !force) return;
    currentActiveId = id;

    navBottomLinks.forEach(link => link.classList.remove('active'));
    navTopLinks.forEach(link => link.classList.remove('text-[var(--navy)]', 'font-extrabold'));
    navTopLinks.forEach(link => link.classList.add('text-[var(--blue)]'));

    const activeBottom = Array.from(navBottomLinks).find(l => l.getAttribute('href') === `#${id}`);
    const activeTop = Array.from(navTopLinks).find(l => l.getAttribute('href') === `#${id}`);

    if (activeBottom) {
        activeBottom.classList.add('active');
        const indicatorLeftOffset = window.innerWidth >= 768 ? 6 : 4;
        gsap.to(navIndicator, {
            x: activeBottom.offsetLeft - indicatorLeftOffset,
            width: activeBottom.offsetWidth,
            duration: force ? 0 : 0.4,
            ease: "power3.out",
            overwrite: "auto"
        });
    }
}

window.addEventListener('resize', () => {
    if (!isWarping) {
        updateNavState(currentActiveId, true);
    }
});

if (document.fonts) {
    document.fonts.ready.then(() => {
        updateNavState('hero', true);
        // Fonts may finish loading after the preloader's ScrollTrigger.refresh() fires,
        // causing pin-spacer heights to be wrong on first load (gap bug). Re-refresh here
        // so spacers are always measured after real font metrics are in place.
        requestAnimationFrame(() => {
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        });
    });
} else {
    setTimeout(() => {
        updateNavState('hero', true);
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        // Set transit train height based on viewport
        if (window.innerWidth >= 1880 && window.innerWidth <= 1960 && window.innerHeight >= 900 && window.innerHeight <= 980) {
            const trainEl = document.getElementById('transit-train');
            if (trainEl) {
                trainEl.style.setProperty('height', '170px', 'important');
            }
        }
        if (window.innerWidth >= 1561 && window.innerWidth <= 1660 && window.innerHeight >= 740 && window.innerHeight <= 840) {
            const trainEl = document.getElementById('transit-train');
            if (trainEl) {
                trainEl.style.setProperty('height', '150px', 'important');
            }
        }
        if (window.innerWidth >= 2500 && window.innerWidth <= 2600) {
            // Force Projects heading size
            const projHeading = document.querySelector('#proj-section-badge + h2');
            if (projHeading) projHeading.style.setProperty('font-size', '200px', 'important');

            // Force stack card sizes
            document.querySelectorAll('.stack-card').forEach(card => {
                card.style.setProperty('padding-top', '36px', 'important');
                card.style.setProperty('padding-bottom', '36px', 'important');

                const company = card.querySelector('.text-xl, [class*="text-2xl"]');
                if (company) company.style.setProperty('font-size', '28px', 'important');

                const role = card.querySelector('.text-5xl, [class*="text-6xl"]');
                if (role) role.style.setProperty('font-size', '72px', 'important');

                const desc = card.querySelector('[class*="text-\\[11px\\]"], [class*="text-\\[12px\\]"]');
                if (desc) desc.style.setProperty('font-size', '16px', 'important');
            });
            const trainEl2 = document.getElementById('transit-train');
            if (trainEl2) trainEl2.style.setProperty('height', '350px', 'important');
        }
    }, 250);
}

if (window.innerWidth >= 2500 && window.innerWidth <= 2600) {
    const applyCardSizes = () => {
        document.querySelectorAll('.stack-card').forEach(card => {
            card.style.setProperty('padding-top', '40px', 'important');
            card.style.setProperty('padding-bottom', '40px', 'important');
            const company = card.querySelector('[class*="text-xl"], [class*="text-2xl"]');
            if (company) company.style.setProperty('font-size', '32px', 'important');
            const role = card.querySelector('[class*="text-5xl"], [class*="text-6xl"]');
            if (role) role.style.setProperty('font-size', '80px', 'important');
            const desc = card.querySelectorAll('[class*="text-[11px]"], [class*="text-[12px]"], [class*="text-[13px]"]');
            desc.forEach(el => el.style.setProperty('font-size', '18px', 'important'));
        });
    };

    applyCardSizes();

    const stackObserver = new MutationObserver(applyCardSizes);
    const stackArea = document.getElementById('stack-area');
    if (stackArea) stackObserver.observe(stackArea, { childList: true, subtree: true });
}

// --- SYSTEM TRANSIT WARP (NAVBAR TRANSITIONS) ---
const mainNavBrutal = document.getElementById('main-nav');

[...navBottomLinks, ...navTopLinks].forEach(link => {
    link.addEventListener('click', async (e) => {
        if (isAudioInit) popSynth.triggerAttackRelease("C5", "8n");
        e.preventDefault();
        if (isWarping) return;
        isWarping = true;

        // Auto-audio init removed, now controlled exclusively via the sound toggle.

        const targetId = link.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        const sectionName = link.innerText.replace(/[0-9.]/g, '').trim().toUpperCase();
        // Refresh before measuring so pin-spacer heights are always current
        if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        let targetScroll = worldViewport.scrollTop + targetEl.getBoundingClientRect().top;

        // UX Hint: When navigating to Origin (#about), scroll just deep enough (40vh) so the diary has emerged, but before the camera starts tracking across the pages or zooming.
        if (targetId === '#about') {
            targetScroll += window.innerHeight * 0.4;
        }

        document.body.classList.add('traveling');
        document.body.style.pointerEvents = 'none';
        lockSynth.triggerAttackRelease("C2", "8n");

        const origWidth = mainNavBrutal.offsetWidth;
        const transitTl = gsap.timeline({
            onComplete: () => {
                document.body.classList.remove('traveling');
                document.body.style.pointerEvents = 'auto';
                isWarping = false;
            }
        });

        // Safety net: if the timeline stalls or errors, unlock nav after 4s
        setTimeout(() => {
            isWarping = false;
            document.body.style.pointerEvents = 'auto';
            document.body.classList.remove('traveling');
        }, 4000);

        transitTl.to('.nav-item, .nav-item-top', { opacity: 0, duration: 0.2 }, 0);
        transitTl.to(navIndicator, {
            width: "100%", x: 0,
            backgroundColor: "var(--blue)",
            duration: 0.3, ease: "power4.inOut"
        }, 0);

        transitTl.to(mainNavBrutal, {
            width: "110vw",
            padding: "30px 0",
            borderWidth: "8px",
            borderColor: "var(--beige)",
            duration: 0.6,
            ease: "power4.inOut"
        }, 0.1);

        transitTl.to(worldViewport, {
            scale: 0.82,
            rotationX: 28,
            y: "-4vh",
            transformPerspective: 1200,
            transformOrigin: "center center",
            borderRadius: "24px",
            filter: "brightness(0.35) blur(6px)",
            duration: 0.6,
            ease: "power3.inOut"
        }, 0.1);

        transitTl.add(() => {
            document.getElementById('timeline-dest-text').innerText = `TARGET: ${sectionName}`;
            if (isAudioInit) {
                dopaminePad.triggerAttackRelease(["E4", "G4", "B4", "D5"], "1m");
            }
            if (targetEl) {
                lenis.scrollTo(targetScroll, {
                    duration: 1.4,
                    easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
                });
            }
            // When jumping to Origin, the scrub (lag=2.2s) would leave the notebook at
            // opacity:0 when the viewport un-dims. Instantly seek aboutTl to the correct
            // progress so content is pre-rendered before the screen brightens.
            if (targetId === '#about' && typeof aboutTl !== 'undefined') {
                const st = ScrollTrigger.getAll().find(s => s.trigger === document.querySelector('#about') && s.vars && s.vars.scrub);
                if (st) {
                    const p = Math.max(0, Math.min(1, (targetScroll - st.start) / (st.end - st.start)));
                    aboutTl.progress(p, true);
                }
            }
        }, 0.6);

        transitTl.to('#nav-timeline-track', { opacity: 1, duration: 0.2 }, 0.4);
        transitTl.fromTo('#nav-ticks-container', { x: "0vw" }, { x: "-200vw", duration: 1.8, ease: "power2.inOut" }, 0.4);
        transitTl.fromTo('#nav-ticks-top-container', { x: "0vw" }, { x: "-200vw", duration: 1.8, ease: "power2.inOut" }, 0.4);

        const passby = document.getElementById('cinematic-passby');
        if (passby) {
            transitTl.to(passby, { opacity: 1, duration: 0.1 }, 0.5);
            transitTl.to(passby, { opacity: 0, duration: 0.2 }, 1.8);
        }

        transitTl.to('#nav-timeline-track', { opacity: 0, duration: 0.3 }, 1.8);

        const isDesktop = window.innerWidth >= 768;
        transitTl.to(mainNavBrutal, {
            width: origWidth,
            padding: isDesktop ? "6px" : "4px",
            borderWidth: isDesktop ? "3px" : "2px",
            borderColor: "var(--navy)",
            duration: 0.7,
            ease: "expo.out",
            clearProps: "width"
        }, 2.0);

        transitTl.add(() => {
            navIndicator.style.backgroundColor = "var(--blue)";
            arrivalSynth.triggerAttackRelease(["C4", "E4", "G4"], "4n");
            updateNavState(targetId.replace('#', ''), false);
        }, 2.1);

        transitTl.to(worldViewport, {
            scale: 1,
            rotationX: 0,
            y: "0vh",
            borderRadius: "0px",
            filter: "brightness(1) blur(0px)",
            duration: 0.9,
            ease: "expo.out"
        }, 2.0);

        transitTl.to('.nav-item, .nav-item-top', { opacity: 1, duration: 0.4 }, 2.3);
        transitTl.add(() => { updateNavState(targetId.replace('#', ''), true); }, 2.8);
    });
});

// --- CURSOR LOGIC ---
const cursorCore = document.getElementById('cursor-core');
const trailContainer = document.getElementById('cursor-trail-container');

// If the custom cursor element failed to render, restore native pointer
if (!cursorCore) {
    document.body.style.setProperty('cursor', 'auto', 'important');
}

let globalMouseX = window.innerWidth / 2;
let globalMouseY = window.innerHeight / 2;
let isHovering = false;
let isMagneticLock = false;
let prevMouseX = globalMouseX;
let mouseVelX = 0;
let swingForce = 0;

if (cursorCore) gsap.set(cursorCore, { xPercent: -50, yPercent: -50 });

const trailCount = 10;
const trailElements = [];

for (let i = 0; i < trailCount; i++) {
    const el = document.createElement('div');
    const size = Math.max(2, 14 - (i * 1.1));
    const opacity = 1 - (i * 0.06);
    el.className = 'absolute top-0 left-0 rounded-full pointer-events-none will-change-transform box-border';
    el.style.backgroundColor = 'var(--red)';
    if (i < 3) {
        el.style.boxShadow = '0 0 6px var(--red-glow)';
    }
    gsap.set(el, { width: size, height: size, opacity: opacity, xPercent: -50, yPercent: -50 });
    if (trailContainer) trailContainer.appendChild(el);
    trailElements.push({ el: el, x: globalMouseX, y: globalMouseY, baseSize: size, baseOpacity: opacity });
}

window.addEventListener('mousemove', (e) => {
    globalMouseX = e.clientX;
    globalMouseY = e.clientY;
});

window.addEventListener('mousedown', () => {
    gsap.to(cursorCore, { scale: 0.5, duration: 0.1 });
    if (isHovering) gsap.to(trailElements[0].el, { scale: 0.85, duration: 0.1 });
});

window.addEventListener('mouseup', () => {
    gsap.to(cursorCore, { scale: 1, duration: 0.4, ease: "back.out(3)" });
    if (isHovering) gsap.to(trailElements[0].el, { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.4)" });

    const ripple = document.createElement('div');
    ripple.className = 'fixed rounded-full pointer-events-none z-[9999]';
    ripple.style.border = '2px solid var(--red-hot)';
    ripple.style.boxShadow = '0 0 12px var(--red-glow)';
    document.body.appendChild(ripple);
    gsap.set(ripple, { x: globalMouseX, y: globalMouseY, xPercent: -50, yPercent: -50, width: 20, height: 20 });
    gsap.to(ripple, { width: 120, height: 120, opacity: 0, duration: 0.55, ease: "power2.out", onComplete: () => ripple.remove() });
    setTimeout(() => { if (ripple.parentNode) ripple.remove(); }, 750);
});

gsap.ticker.add(() => {
    if (document.hidden) return;
    gsap.set(cursorCore, { x: globalMouseX, y: globalMouseY });
    let leaderX = globalMouseX;
    let leaderY = globalMouseY;

    if (isMagneticLock) {
        for (let i = 0; i < trailCount; i++) {
            const pt = trailElements[i];
            pt.x += (leaderX - pt.x) * 0.3;
            pt.y += (leaderY - pt.y) * 0.3;
            gsap.set(pt.el, { x: pt.x, y: pt.y });
        }
        return;
    }

    for (let i = 0; i < trailCount; i++) {
        const pt = trailElements[i];
        const springStiffness = 0.4;
        pt.x += (leaderX - pt.x) * springStiffness;
        pt.y += (leaderY - pt.y) * springStiffness;
        gsap.set(pt.el, { x: pt.x, y: pt.y });
        leaderX = pt.x;
        leaderY = pt.y;
    }
});

document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .cursor-pointer, .cursor-hover, .nav-item, .stack-card, .archival-card, .nav-item-top, #vending-coin, .scratch-coin-element, .draggable-sticker');
    if (target && !isMagneticLock && !target.closest('[data-no-cursor-change]')) {
        isHovering = true;
        if (isAudioInit) hoverTickSynth.triggerAttackRelease("C5", "64n");
        gsap.to(cursorCore, { scale: 0, duration: 0.2 });
        gsap.to(trailElements[0].el, {
            width: 48, height: 48,
            backgroundColor: "rgba(255, 46, 59, 0.08)",
            borderWidth: "2px",
            borderColor: "var(--red-hot)",
            boxShadow: "0 0 14px var(--red-glow)",
            borderRadius: "50%",
            duration: 0.35,
            ease: "back.out(2)"
        });
        for (let i = 1; i < trailCount; i++) {
            gsap.to(trailElements[i].el, { scale: 0, opacity: 0, duration: 0.2, overwrite: "auto" });
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .cursor-pointer, .cursor-hover, .nav-item, .stack-card, .archival-card, .nav-item-top, #vending-coin, .scratch-coin-element, .draggable-sticker');
    if (target && !isMagneticLock && !target.closest('[data-no-cursor-change]')) {
        if (!target.contains(e.relatedTarget)) {
            isHovering = false;
            gsap.to(cursorCore, { scale: 1, duration: 0.2 });
            gsap.to(trailElements[0].el, {
                width: trailElements[0].baseSize,
                height: trailElements[0].baseSize,
                backgroundColor: "var(--red)",
                borderWidth: "0px",
                borderColor: "transparent",
                boxShadow: "0 0 6px var(--red-glow)",
                borderRadius: "50%",
                duration: 0.3,
                ease: "power2.out"
            });
            for (let i = 1; i < trailCount; i++) {
                gsap.to(trailElements[i].el, {
                    scale: 1,
                    opacity: trailElements[i].baseOpacity,
                    duration: 0.4,
                    delay: i * 0.015,
                    ease: "back.out(1.5)",
                    overwrite: "auto"
                });
            }
        }
    }
});

// ─────────────────────────────────────────────────────────────────────
// HERO INTERACTIVE DUAL MOOD ENGINE — COLOR SHIFT & INVERSE REVEAL
// ─────────────────────────────────────────────────────────────────────
// Features dual reality modes:
// 1. Monochrome Realm (Default): Base is B&W portrait; cursor reveals the
//    natural color photograph beneath a glowing light.
// 2. Chromatic Realm (Dual Mood): Activated via the top-left button,
//    sending a radiant glowing shockwave across the screen that reveals the
//    full color photograph. In this realm, the cursor inverts to reveal the
//    monochrome photograph beneath the light, fading back to full color.
(function initHeroColorReveal() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroSection = document.getElementById('hero');
    const canvas = document.getElementById('hero-reveal-canvas');
    if (!canvas || !heroSection || prefersReduced) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Reveal Configuration Parameters ─────────────────────────────
    const CONFIG = {
        // Base radius of the reveal spotlight in CSS pixels
        baseRadius: 115,
        // Intensity of the warm-white highlight & restrained red atmospheric halo (0.0 to 1.5)
        glowIntensity: 0.88,
        // Duration in seconds for painted color areas to fade back (1.0 to 2.0s)
        fadeDuration: 1.6,
        // Smooth cursor inertia factor (0.15 = smooth cinematic lag, 0.35 = snappy)
        inertia: 0.20,
        // Step size for path interpolation (prevents gaps during fast swipes)
        stepDistance: 8,
        // Shockwave sweep duration in milliseconds (graceful, visible cinematic wave)
        shockwaveDuration: 1100,
    };

    // ── Dual Realm State ─────────────────────────────────────────────
    // 'mono': B&W base, cursor reveals color | 'color': Color base, cursor reveals B&W
    let currentMode = 'mono';
    let isTransitioning = false;

    const shockwave = {
        active: false,
        startTime: 0,
        duration: CONFIG.shockwaveDuration,
        originX: 0,
        originY: 0,
        maxRadius: 0,
        targetMode: 'color',
        settleFrames: 0,
    };

    // ── Offscreen Mask Buffer ────────────────────────────────────────
    const maskCanvas = document.createElement('canvas');
    const maskCtx = maskCanvas.getContext('2d');
    if (!maskCtx) return;

    // ── Dual Portraits (Color & Monochrome) ──────────────────────────
    const colorImg = new Image();
    colorImg.src = '/assets/hero-portrait-color.jpg';

    const bwImg = new Image();
    bwImg.src = '/assets/hero-portrait.jpg';

    // ── Geometry, Dimensions & DPR ──────────────────────────────────
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let cssWidth = 0;
    let cssHeight = 0;
    let imgFit = { x: 0, y: 0, w: 0, h: 0 };
    let currentRadius = CONFIG.baseRadius;

    // ── Interactive Coordinates & State ──────────────────────────────
    let targetX = null;
    let targetY = null;
    let easeX = null;
    let easeY = null;
    let prevEaseX = null;
    let prevEaseY = null;
    let isInsideHero = false;
    let glowAlpha = 0;
    let isLoopRunning = false;
    let rafId = null;
    let lastTime = performance.now();
    let isHeroInView = true;
    let activePaintFrames = 0;

    // Calculate exact object-fit: cover with object-position: 50% 20%
    function updateImageFit() {
        const imgW = 1024;
        const imgH = 630;
        const imgAspect = imgW / imgH;
        const containerAspect = cssWidth / cssHeight;

        if (containerAspect > imgAspect) {
            imgFit.w = cssWidth;
            imgFit.h = cssWidth / imgAspect;
            imgFit.x = 0;
            imgFit.y = (cssHeight - imgFit.h) * 0.20;
        } else {
            imgFit.h = cssHeight;
            imgFit.w = cssHeight * imgAspect;
            imgFit.x = (cssWidth - imgFit.w) * 0.50;
            imgFit.y = 0;
        }
    }

    // DPR-aware resize handler (uses clientWidth/clientHeight to prevent double-scaling with container)
    function resizeCanvas() {
        cssWidth = canvas.clientWidth || window.innerWidth;
        cssHeight = canvas.clientHeight || window.innerHeight;
        dpr = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);

        maskCanvas.width = Math.round(cssWidth * dpr);
        maskCanvas.height = Math.round(cssHeight * dpr);

        currentRadius = Math.max(85, Math.min(150, Math.round(cssWidth * 0.08)));

        updateImageFit();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Scroll visibility check
    function checkHeroVisibility() {
        const rect = heroSection.getBoundingClientRect();
        isHeroInView = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!isHeroInView && isLoopRunning) {
            isInsideHero = false;
            targetX = null;
            targetY = null;
            easeX = null;
            easeY = null;
            glowAlpha = 0;
            maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (rafId) cancelAnimationFrame(rafId);
            isLoopRunning = false;
        }
    }

    // Stamps an ultra-feathered radial spot onto the offscreen reveal mask
    function stampMaskPoint(x, y, radius, alpha) {
        const r = radius * dpr;
        const sx = x * dpr;
        const sy = y * dpr;

        const grad = maskCtx.createRadialGradient(sx, sy, 0, sx, sy, r);
        grad.addColorStop(0.00, `rgba(255, 255, 255, ${(1.00 * alpha).toFixed(3)})`);
        grad.addColorStop(0.20, `rgba(255, 255, 255, ${(0.92 * alpha).toFixed(3)})`);
        grad.addColorStop(0.40, `rgba(255, 255, 255, ${(0.72 * alpha).toFixed(3)})`);
        grad.addColorStop(0.60, `rgba(255, 255, 255, ${(0.45 * alpha).toFixed(3)})`);
        grad.addColorStop(0.80, `rgba(255, 255, 255, ${(0.18 * alpha).toFixed(3)})`);
        grad.addColorStop(0.95, `rgba(255, 255, 255, ${(0.03 * alpha).toFixed(3)})`);
        grad.addColorStop(1.00, 'rgba(255, 255, 255, 0.00)');

        maskCtx.globalCompositeOperation = 'source-over';
        maskCtx.fillStyle = grad;
        maskCtx.beginPath();
        maskCtx.arc(sx, sy, r, 0, Math.PI * 2);
        maskCtx.fill();
    }

    // ── Update Button UI ─────────────────────────────────────────────
    function updateButtonState(mode) {
        const btn = document.getElementById('hero-dual-toggle');
        const label = document.getElementById('dual-mode-text');
        const dot = document.getElementById('dual-beacon-dot');
        const ping = document.getElementById('dual-beacon-ping');
        const icon = document.getElementById('dual-mode-icon');
        if (!btn || !label || !dot || !ping) return;

        if (mode === 'color') {
            label.textContent = 'MONO SHIFT';
            dot.className = 'relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-[#012CEB] shadow-[0_0_8px_#012CEB] transition-colors duration-300';
            ping.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-[#012CEB] opacity-75';
            if (icon) icon.classList.add('rotate-180');
            btn.setAttribute('title', 'Return to Monochrome Realm (Cursor reveals Color)');
        } else {
            label.textContent = 'COLOR SHIFT';
            dot.className = 'relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-[var(--red)] shadow-[0_0_8px_var(--red)] transition-colors duration-300';
            ping.className = 'animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--red)] opacity-75';
            if (icon) icon.classList.remove('rotate-180');
            btn.setAttribute('title', 'Ignite Full Color Sweep (Cursor reveals Monochrome)');
        }
    }

    // ── Trigger Dual Reality Shockwave from Top-Left ──────────────────
    function triggerDualModeShift() {
        if (isTransitioning) return;
        isTransitioning = true;

        const targetMode = currentMode === 'mono' ? 'color' : 'mono';
        const btn = document.getElementById('hero-dual-toggle');
        const canvasRect = canvas.getBoundingClientRect();

        let originX = 40;
        let originY = 40;
        if (btn && canvasRect.width > 0 && canvasRect.height > 0) {
            const btnRect = btn.getBoundingClientRect();
            originX = ((btnRect.left + btnRect.width / 2) - canvasRect.left) / canvasRect.width * cssWidth;
            originY = ((btnRect.top + btnRect.height / 2) - canvasRect.top) / canvasRect.height * cssHeight;
        }

        // Distance from origin to all 4 corners of screen
        const d1 = Math.hypot(originX, originY);
        const d2 = Math.hypot(cssWidth - originX, originY);
        const d3 = Math.hypot(originX, cssHeight - originY);
        const d4 = Math.hypot(cssWidth - originX, cssHeight - originY);
        const maxRadius = Math.max(d1, d2, d3, d4) + 120;

        shockwave.active = true;
        shockwave.startTime = performance.now();
        shockwave.duration = CONFIG.shockwaveDuration;
        shockwave.originX = originX;
        shockwave.originY = originY;
        shockwave.maxRadius = maxRadius;
        shockwave.targetMode = targetMode;
        shockwave.settleFrames = 0;

        // Immediately update button UI with tactile feedback
        updateButtonState(targetMode);

        // Clear previous cursor mask to start clean shockwave
        maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);

        // Button haptic click animation
        if (btn) {
            btn.classList.add('scale-95');
            setTimeout(() => btn.classList.remove('scale-95'), 180);
        }

        ensureLoop();
    }

    // ── Finalize Shockwave Sweep ─────────────────────────────────────
    function finalizeShockwave() {
        shockwave.active = false;
        shockwave.settleFrames = 0;
        currentMode = shockwave.targetMode;
        isTransitioning = false;

        const colorDomImg = document.getElementById('intro-vid-color');
        if (colorDomImg) {
            colorDomImg.style.opacity = currentMode === 'color' ? '1' : '0';
        }

        maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        updateButtonState(currentMode);

        easeX = null;
        easeY = null;
        targetX = null;
        targetY = null;
        prevEaseX = null;
        prevEaseY = null;
        glowAlpha = 0;
    }

    // ── Main Render Loop ────────────────────────────────────────────
    function render(now) {
        if (!isHeroInView) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            isLoopRunning = false;
            return;
        }

        const dt = Math.min((now - lastTime) / 1000, 0.1);
        lastTime = now;

        // ════════════════════════════════════════════════════════════════
        // A. SHOCKWAVE SWEEP ACTIVE (Full-Screen Radiant Light Transition)
        // ════════════════════════════════════════════════════════════════
        if (shockwave.active) {
            const elapsed = Math.max(0, now - shockwave.startTime);
            const t = Math.max(0, Math.min(1.0, elapsed / shockwave.duration));

            // Smooth sinusoidal expansion: organic, fluid, visible progression throughout
            const ease = 0.5 - 0.5 * Math.cos(t * Math.PI);
            const r = Math.max(1, ease * shockwave.maxRadius);
            const waveAlpha = Math.sin(t * Math.PI); // Envelope: 0 -> 1 -> 0

            // 1. Offscreen mask: Expanding circle from top-left origin
            maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
            maskCtx.save();
            maskCtx.globalCompositeOperation = 'source-over';

            const sx = shockwave.originX * dpr;
            const sy = shockwave.originY * dpr;
            const sr = Math.max(2, r * dpr);
            const feather = 140 * dpr;
            const innerR = Math.max(0, sr - feather);

            const grad = maskCtx.createRadialGradient(sx, sy, innerR, sx, sy, sr);
            grad.addColorStop(0.00, 'rgba(255, 255, 255, 1.00)');
            grad.addColorStop(0.65, 'rgba(255, 255, 255, 0.95)');
            grad.addColorStop(1.00, 'rgba(255, 255, 255, 0.00)');

            maskCtx.fillStyle = grad;
            maskCtx.beginPath();
            maskCtx.arc(sx, sy, sr, 0, Math.PI * 2);
            maskCtx.fill();

            if (innerR > 0) {
                maskCtx.fillStyle = '#ffffff';
                maskCtx.beginPath();
                maskCtx.arc(sx, sy, innerR, 0, Math.PI * 2);
                maskCtx.fill();
            }
            maskCtx.restore();

            // 2. Render target image through expanding mask
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const waveImg = shockwave.targetMode === 'color' ? colorImg : bwImg;

            if (waveImg.complete && waveImg.naturalWidth > 0) {
                ctx.save();
                ctx.scale(dpr, dpr);

                ctx.globalCompositeOperation = 'source-over';
                ctx.drawImage(waveImg, 0, 0, 1024, 630, imgFit.x, imgFit.y, imgFit.w, imgFit.h);

                // While wave is expanding across the screen, clip with maskCanvas
                if (t < 1.0) {
                    ctx.globalCompositeOperation = 'destination-in';
                    ctx.drawImage(maskCanvas, 0, 0, cssWidth, cssHeight);
                }

                // 3. Radiant glowing shockwave light crest (warm pearl + champagne + brutalist red halo)
                if (waveAlpha > 0.01) {
                    ctx.globalCompositeOperation = 'screen';
                    const ringThickness = 140;
                    const ringInner = Math.max(0, r - ringThickness * 0.7);
                    const ringOuter = Math.max(ringInner + 2, r + ringThickness * 0.9);
                    const ringGrad = ctx.createRadialGradient(
                        shockwave.originX, shockwave.originY, ringInner,
                        shockwave.originX, shockwave.originY, ringOuter
                    );

                    const pCore = (0.95 * waveAlpha).toFixed(3);
                    const pChamp = (0.70 * waveAlpha).toFixed(3);
                    const pRed = (0.45 * waveAlpha).toFixed(3);

                    ringGrad.addColorStop(0.00, 'rgba(255, 46, 59, 0)');
                    ringGrad.addColorStop(0.28, `rgba(255, 46, 59, ${pRed})`);
                    ringGrad.addColorStop(0.48, `rgba(255, 242, 230, ${pChamp})`);
                    ringGrad.addColorStop(0.52, `rgba(255, 252, 245, ${pCore})`);
                    ringGrad.addColorStop(0.56, `rgba(255, 242, 230, ${pChamp})`);
                    ringGrad.addColorStop(0.72, `rgba(255, 46, 59, ${pRed})`);
                    ringGrad.addColorStop(1.00, 'rgba(255, 46, 59, 0)');

                    ctx.fillStyle = ringGrad;
                    ctx.beginPath();
                    ctx.arc(shockwave.originX, shockwave.originY, ringOuter, 0, Math.PI * 2);
                    ctx.fill();

                    // Radiant origin burst flare at button corner
                    if (t < 0.40) {
                        const burstProgress = Math.max(0, Math.min(1, t / 0.40));
                        const burstR = Math.max(2, 200 * (1 - burstProgress * 0.3));
                        const burstAlpha = Math.max(0, (1 - burstProgress) * 0.88);
                        const burstGrad = ctx.createRadialGradient(
                            shockwave.originX, shockwave.originY, 0,
                            shockwave.originX, shockwave.originY, burstR
                        );
                        burstGrad.addColorStop(0.0, `rgba(255, 252, 245, ${(0.95 * burstAlpha).toFixed(3)})`);
                        burstGrad.addColorStop(0.3, `rgba(255, 242, 230, ${(0.65 * burstAlpha).toFixed(3)})`);
                        burstGrad.addColorStop(0.7, `rgba(255, 46, 59,   ${(0.35 * burstAlpha).toFixed(3)})`);
                        burstGrad.addColorStop(1.0, 'rgba(255, 46, 59, 0)');

                        ctx.fillStyle = burstGrad;
                        ctx.beginPath();
                        ctx.arc(shockwave.originX, shockwave.originY, burstR, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }

                ctx.restore();
            }

            if (t >= 1.0) {
                if (shockwave.settleFrames === 0) {
                    // Update DOM image layer
                    const colorDomImg = document.getElementById('intro-vid-color');
                    if (colorDomImg) {
                        colorDomImg.style.opacity = shockwave.targetMode === 'color' ? '1' : '0';
                    }
                    currentMode = shockwave.targetMode;
                    shockwave.settleFrames = 3; // Hold canvas drawing for 3 frames so DOM paint is fully committed
                } else {
                    shockwave.settleFrames--;
                    if (shockwave.settleFrames <= 0) {
                        finalizeShockwave();
                    }
                }
                rafId = requestAnimationFrame(render);
                return;
            } else {
                rafId = requestAnimationFrame(render);
                return;
            }
        }

        // ════════════════════════════════════════════════════════════════
        // B. STANDARD INTERACTIVE CURSOR REVEAL (Dual Mode)
        // ════════════════════════════════════════════════════════════════
        // 1. Gently decay previously revealed mask areas (1.6s fadeback)
        const decayAlpha = Math.min(0.08, (dt / CONFIG.fadeDuration) * 1.15);
        maskCtx.globalCompositeOperation = 'destination-out';
        maskCtx.fillStyle = `rgba(0, 0, 0, ${decayAlpha.toFixed(4)})`;
        maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

        // 2. Cursor glow alpha transition
        if (isInsideHero) {
            glowAlpha += (1.0 - glowAlpha) * 0.18;
            activePaintFrames = Math.round(CONFIG.fadeDuration * 60);
        } else {
            glowAlpha -= 0.05;
            if (glowAlpha < 0) glowAlpha = 0;
            if (activePaintFrames > 0) activePaintFrames--;
        }

        // 3. Smooth cursor easing and continuous stroke stamping
        if (targetX !== null && targetY !== null) {
            if (easeX === null) {
                easeX = targetX;
                easeY = targetY;
                prevEaseX = targetX;
                prevEaseY = targetY;
            } else {
                prevEaseX = easeX;
                prevEaseY = easeY;
                easeX += (targetX - easeX) * CONFIG.inertia;
                easeY += (targetY - easeY) * CONFIG.inertia;
            }

            if (isInsideHero) {
                const dx = easeX - prevEaseX;
                const dy = easeY - prevEaseY;
                const dist = Math.hypot(dx, dy);
                const steps = Math.max(1, Math.ceil(dist / CONFIG.stepDistance));

                for (let s = 1; s <= steps; s++) {
                    const t = s / steps;
                    const ix = prevEaseX + dx * t;
                    const iy = prevEaseY + dy * t;
                    stampMaskPoint(ix, iy, currentRadius, glowAlpha);
                }
            }
        }

        // 4. Render active photograph masked over base
        // In 'mono' mode: Reveals color photograph over monochrome base
        // In 'color' mode: Reveals monochrome photograph over color base
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const activeImg = currentMode === 'color' ? bwImg : colorImg;

        if (activeImg.complete && activeImg.naturalWidth > 0) {
            ctx.save();
            ctx.scale(dpr, dpr);

            // Step A: Draw active photograph with exact alignment
            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(activeImg, 0, 0, 1024, 630, imgFit.x, imgFit.y, imgFit.w, imgFit.h);

            // Step B: Mask with accumulated soft reveal texture
            ctx.globalCompositeOperation = 'destination-in';
            ctx.drawImage(maskCanvas, 0, 0, cssWidth, cssHeight);

            // Step C: Draw warm-white highlight core and restrained brutalist red atmospheric halo
            if (isInsideHero && easeX !== null && easeY !== null && glowAlpha > 0.01) {
                const haloR = currentRadius * 1.35;
                const haloGrad = ctx.createRadialGradient(easeX, easeY, 0, easeX, easeY, haloR);
                const intensity = CONFIG.glowIntensity * glowAlpha;

                haloGrad.addColorStop(0.00, `rgba(255, 252, 245, ${(0.24 * intensity).toFixed(3)})`); // luminous pearl core
                haloGrad.addColorStop(0.25, `rgba(255, 242, 230, ${(0.15 * intensity).toFixed(3)})`); // warm champagne
                haloGrad.addColorStop(0.55, `rgba(255, 46, 59,   ${(0.08 * intensity).toFixed(3)})`); // restrained brutalist red
                haloGrad.addColorStop(0.85, `rgba(255, 46, 59,   ${(0.025 * intensity).toFixed(3)})`); // atmospheric feather
                haloGrad.addColorStop(1.00, 'rgba(255, 46, 59, 0.00)');

                ctx.globalCompositeOperation = 'screen';
                ctx.fillStyle = haloGrad;
                ctx.beginPath();
                ctx.arc(easeX, easeY, haloR, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        // Keep loop running while cursor is active, trail is fading back, or wave is running
        if (isInsideHero || glowAlpha > 0.01 || activePaintFrames > 0 || isTransitioning) {
            rafId = requestAnimationFrame(render);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
            easeX = null;
            easeY = null;
            isLoopRunning = false;
        }
    }

    function ensureLoop() {
        if (!isLoopRunning) {
            isLoopRunning = true;
            lastTime = performance.now();
            rafId = requestAnimationFrame(render);
        }
    }

    function handlePointerMove(clientX, clientY) {
        if (!isHeroInView) return;
        const rect = canvas.getBoundingClientRect();
        if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) {
            isInsideHero = false;
            ensureLoop();
            return;
        }

        isInsideHero = true;
        targetX = Math.round(((clientX - rect.left) / rect.width) * cssWidth);
        targetY = Math.round(((clientY - rect.top) / rect.height) * cssHeight);

        ensureLoop();
    }

    // ── Event Listeners ─────────────────────────────────────────────
    const dualBtn = document.getElementById('hero-dual-toggle');
    if (dualBtn) {
        dualBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerDualModeShift();
        });
    }

    window.addEventListener('mousemove', (e) => {
        handlePointerMove(e.clientX, e.clientY);
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        isInsideHero = false;
        ensureLoop();
    });

    window.addEventListener('blur', () => {
        isInsideHero = false;
        ensureLoop();
    });

    window.addEventListener('touchstart', (e) => {
        if (e.touches.length > 0) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        isInsideHero = false;
        ensureLoop();
    });

    const scroller = document.getElementById('world-viewport') || window;
    scroller.addEventListener('scroll', checkHeroVisibility, { passive: true });

    window.addEventListener('resize', () => {
        resizeCanvas();
        checkHeroVisibility();
    }, { passive: true });

    colorImg.onload = () => ensureLoop();
    bwImg.onload = () => ensureLoop();

    // ── Lifecycle initialization ────────────────────────────────────
    requestAnimationFrame(() => {
        resizeCanvas();
        checkHeroVisibility();
    });

    window.addEventListener('beforeunload', () => {
        if (rafId) cancelAnimationFrame(rafId);
    }, { once: true });
})();
// ─────────────────────────────────────────────────────────────────────

// --- HERO PARALLAX ---
let currMouseX = window.innerWidth / 2;
let currMouseY = window.innerHeight / 2;
let currTextScale = 1;

// --- HERO LABELS PARALLAX ---
const quoteBlock = document.getElementById('hero-quote-block');
const rolesBlock = document.getElementById('hero-roles-block');
const tiltCards = document.querySelectorAll('.js-tilt-card');
const vendingWall = document.getElementById('vending-wall-environment');

// Initialize custom properties for buttery interpolation
tiltCards.forEach(card => {
    card.targetRotX = 0;
    card.targetRotY = 0;
    card.targetRotZ = parseFloat(card.dataset.origRot || 0);
    card.currentRotX = 0;
    card.currentRotY = 0;
    card.currentRotZ = card.targetRotZ;
    card.isHovered = false;
});

gsap.ticker.add(() => {
    if (!isPhysicsActive || isWarping) return;

    mouseVelX = globalMouseX - prevMouseX;
    prevMouseX = globalMouseX;

    swingForce += (mouseVelX * 0.18 - swingForce) * 0.08;

    currMouseX += (globalMouseX - currMouseX) * 0.06;
    currMouseY += (globalMouseY - currMouseY) * 0.06;

    const normX = (currMouseX / window.innerWidth - 0.5) * 2;
    const normY = (currMouseY / window.innerHeight - 0.5) * 2;

    if (heroBgTarget) {
        gsap.set(heroBgTarget, { x: normX * -30, y: normY * -30, rotationY: normX * 4, rotationX: normY * -4 });
    }

    if (heroText3d) {
        const targetScale = isMagneticLock ? 1.03 : 1;
        currTextScale += (targetScale - currTextScale) * 0.08;
        gsap.set(heroText3d, { x: normX * 25, y: normY * 25, rotationY: normX * 5, rotationX: normY * -5, scale: currTextScale });

        const shadowMax = 60;
        const shX = normX * -shadowMax;
        const shY = normY * -shadowMax;

        let shadowStr = '';
        const layers = 40;
        for (let i = 1; i <= layers; i++) {
            const factor = i / layers;
            const r = Math.round(1 + (5 - 1) * factor);
            const g = Math.round(44 + (16 - 44) * factor);
            const b = Math.round(235 + (36 - 235) * factor);
            shadowStr += `${shX * factor}px ${shY * factor}px 0 rgba(${r},${g},${b}, 1), `;
        }
        const shBlur = isMagneticLock ? 40 : 25;
        shadowStr += `${shX * 1.1}px ${shY * 1.1}px ${shBlur}px rgba(5, 16, 36, 0.8)`;
        heroText3d.style.textShadow = shadowStr;
    }

    if (heroLighting) {
        heroLighting.style.background = `radial-gradient(circle 1100px at ${currMouseX}px ${currMouseY}px, rgba(244, 239, 230, 0) 0%, rgba(5, 16, 36, 0.65) 100%)`;
    }

    // Apply global inverse parallax to labels
    if (quoteBlock) {
        gsap.set(quoteBlock, { x: normX * 15, y: normY * 20 });
    }
    if (rolesBlock) {
        gsap.set(rolesBlock, { x: normX * -15, y: normY * -20 });
    }

    // Apply subtle deep-background parallax to vending wall
    if (vendingWall) {
        gsap.set(vendingWall, { x: normX * -25, y: normY * -25 });
    }

    // Global Perspective Tilt Integration
    tiltCards.forEach(card => {
        if (!card.isHovered) {
            // Global tilt based on overall mouse position
            card.targetRotX = normY * -15;
            card.targetRotY = normX * 15;

            // Apply realistic hanging pendulum swing modifier
            let swingMod = 0;
            if (card.classList.contains('hanging-hinge-top')) {
                swingMod = swingForce * 1.6;
            } else if (card.classList.contains('hanging-hinge-left')) {
                swingMod = swingForce * 0.9;
            }
            card.targetRotZ = parseFloat(card.dataset.origRot || 0) + (normX * 3) + swingMod;
        } else {
            card.targetRotZ = swingForce * 0.4;
        }

        // Smooth interpolation for buttery movement
        card.currentRotX += (card.targetRotX - card.currentRotX) * 0.1;
        card.currentRotY += (card.targetRotY - card.currentRotY) * 0.1;
        card.currentRotZ += (card.targetRotZ - card.currentRotZ) * 0.1;

        gsap.set(card, {
            rotationX: card.currentRotX,
            rotationY: card.currentRotY,
            rotateZ: card.currentRotZ
        });
    });
});

// --- 3D PERSPECTIVE TILT FOR HERO LABELS (Event Listeners) ---
tiltCards.forEach(card => {
    const parent = card.parentElement;

    parent.addEventListener('mouseenter', () => {
        card.isHovered = true;
        gsap.to(card, {
            scale: 1.05, // Lift off canvas
            boxShadow: "0px 20px 40px rgba(5,16,36,0.3)", // Softened floating shadow
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
        });
    });

    parent.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return;
        const rect = parent.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Update target rotations based on local mouse position relative to center
        card.targetRotX = ((y - centerY) / centerY) * -18;
        card.targetRotY = ((x - centerX) / centerX) * 18;
        card.targetRotZ = 0; // Snap straight when hovered
    });

    parent.addEventListener('mouseleave', () => {
        card.isHovered = false;

        // Restore brutalist defaults for shadow and scale
        const origShadow = card.dataset.origShadow;
        gsap.to(card, {
            scale: 1,
            boxShadow: origShadow,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto"
        });
    });
});

if (heroText3d) {
    heroText3d.addEventListener('mouseenter', () => {
        isMagneticLock = true;
        if (typeof isAudioInit !== 'undefined' && isAudioInit && typeof hoverTickSynth !== 'undefined') {
            hoverTickSynth.triggerAttackRelease("C5", "64n");
        }
    });
    heroText3d.addEventListener('mouseleave', () => {
        isMagneticLock = false;
    });
}

// --- ABOUT: ARCHIVAL CINEMATIC REALISM DIARY WITH BLUEPRINT PATH TRACING ---
const aboutSection = document.getElementById('about');

if (aboutSection) {

    // Dynamically calculate the EXACT length of the SVG path for perfect sync
    const tracePath = document.getElementById('blueprint-trace-path');
    let pathLen = 4000;
    if (tracePath) {
        pathLen = tracePath.getTotalLength();
        // Apply measured length to BOTH paths so they draw in perfect sync
        gsap.set('.map-line-path', { strokeDasharray: pathLen, strokeDashoffset: pathLen });
    }

    // ── EXACT NODE FRACTIONS ──────────────────────────────────────────────────
    // Sample path at 2000 points. For each SVG node position find the nearest
    // sample (searching forward from the previous node so the result is monotonic).
    // dashoffset value = (1 - nodeFrac[i]) * pathLen
    const _arcSamples = [];
    if (tracePath) {
        const _NS = 2000;
        for (let i = 0; i <= _NS; i++) {
            const l = (i / _NS) * pathLen;
            const pt = tracePath.getPointAtLength(l);
            _arcSamples.push({ l, x: pt.x, y: pt.y });
        }
    }
    const _nodeSVGPos = [
        [330, 360],   // 0  origin
        [78, 550],   // 1  U-turn / personal-cutout
        [380, 750],   // 2  strategy phrase
        [850, 140],   // 3  polaroid
        [1250, 100],   // 4  art-stats (186M)
        [1200, 320],   // 5  art-terminal (philosophy)
        [1300, 680],   // 6  stamp-blue area
        [1075, 680],   // 7  stamp-yellow
        [850, 680],   // 8  stamp-red
        [850, 750],   // 9
        [1050, 800],   // 10 end
    ];
    let _searchStart = 0;
    const _nf = _nodeSVGPos.map(([tx, ty]) => {
        const startIdx = Math.floor(_searchStart * _arcSamples.length);
        let bestD = Infinity, bestL = 0;
        for (let i = startIdx; i < _arcSamples.length; i++) {
            const s = _arcSamples[i];
            const d = (s.x - tx) ** 2 + (s.y - ty) ** 2;
            if (d < bestD) { bestD = d; bestL = s.l; }
        }
        _searchStart = bestL / pathLen;
        return _searchStart;  // drawn fraction when line tip is at this node
    });

    // Measure each element's center as % of notebook container (before GSAP moves anything)
    const spotMap = {};
    const nbEl = document.getElementById('notebook-container');
    // Pre-sampled path points for spotlight-follows-line-tip tracking
    const _lineTipSamples = [];
    if (nbEl) {
        const nbr = nbEl.getBoundingClientRect();
        ['#intro-sticky-note', '#origin-headline', '#origin-micro-story', '#personal-cutout',
            '#frag-strategy-annot', '#frag-origin-cursive',
            '#art-polaroid', '#art-terminal', '#art-stats', '#experience-typewriter',
            '.evidence-stamp-blue', '.evidence-stamp-yellow', '.evidence-stamp-red',
            '#other-highlights-block', '#torn-signature-paper'].forEach(sel => {
                const el = document.querySelector(sel);
                if (el) {
                    const r = el.getBoundingClientRect();
                    spotMap[sel] = {
                        x: +((r.left + r.width / 2 - nbr.left) / nbr.width * 100).toFixed(1),
                        y: +((r.top + r.height / 2 - nbr.top) / nbr.height * 100).toFixed(1)
                    };
                }
            });

        // Some elements use md:bottom-[-8%] / md:bottom-[-4%] so their centres
        // fall outside the notebook container (y > 100).  Clamp every entry so
        // the spotlight and camera maths always receive an in-bounds coordinate.
        Object.keys(spotMap).forEach(sel => {
            spotMap[sel].x = Math.max(3, Math.min(97, spotMap[sel].x));
            spotMap[sel].y = Math.max(3, Math.min(97, spotMap[sel].y));
        });
        // Sample the SVG path into spotlight-coordinate space so lensUpdate can
        // move the spotlight to the exact line tip each frame without any tween lag.
        if (tracePath) {
            const svgEl = tracePath.ownerSVGElement;
            const svgR = svgEl.getBoundingClientRect();
            const N = 300;
            for (let i = 0; i <= N; i++) {
                const l = (i / N) * pathLen;
                const pt = tracePath.getPointAtLength(l);
                _lineTipSamples.push({
                    f: i / N,
                    x: (svgR.left + (pt.x / 1500) * svgR.width - nbr.left) / nbr.width * 100,
                    y: (svgR.top + (pt.y / 850) * svgR.height - nbr.top) / nbr.height * 100
                });
            }
        }
    }
    const spotTo = (sel, nx = 0, ny = 0) => {
        const s = spotMap[sel] || { x: 50, y: 50 };
        return { "--spot-x": (s.x + nx) + "%", "--spot-y": (s.y + ny) + "%" };
    };
    // Seed spotlight at the first note so it doesn't fly in from centre
    gsap.set('#cinematic-spotlight', spotTo('#intro-sticky-note'));
    const spotLerp = (a, b, t, nx = 0, ny = 0) => {
        const sa = spotMap[a] || { x: 50, y: 50 };
        const sb = spotMap[b] || { x: 50, y: 50 };
        return { "--spot-x": (sa.x + (sb.x - sa.x) * t + nx) + "%", "--spot-y": (sa.y + (sb.y - sa.y) * t + ny) + "%" };
    };

    // Book starts already open but tilted away and at 60% visibility instead of total darkness
    gsap.set('#notebook-container', {
        xPercent: 0,
        rotationX: 32,      // steep downward tilt — like floating above a table
        rotationY: -8,      // slight left lean for cinematic entry angle
        rotationZ: 3,
        scale: 0.6,         // pulled far back — camera will push in dramatically
        opacity: 0.6,
        y: 80,
        transformOrigin: "center center"
    });

    // Cover is already flipped open — left page visible from frame 0
    gsap.set('#book-cover-hinge', { rotationY: -180 });

    // Stickers hidden — will appear after entry
    gsap.set('.draggable-sticker', { opacity: 0, y: 20, pointerEvents: 'none' });

    // All content elements hidden — camera will reveal them sequentially
    gsap.set('.focus-lift-target', { opacity: 0, scale: 0.95 });

    // Tagline hidden — appears first before book
    gsap.set('#open-book-label', { opacity: 0, y: 12 });

    // Blueprint path hidden (dasharray/dashoffset already set above for both paths)

    // Master Cinematic Timeline coordinating scrolling and elements drawing
    const aboutTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "top top",
            end: "bottom bottom",
            scrub: 2.2,             // heavier scrub lag = deliberate, weighted pacing
            invalidateOnRefresh: true
        }
    });

    // ── PROXIMITY LENS ENGINE ────────────────────────────────────────────────
    // States per element:
    //   ACTIVE   → entrance pop tween, then full optical proximity curve
    //   NEXT     → ghost bleed preview (closest unvisited)
    //   RESTING  → spotlight has passed: dim + blurred, stays visible
    //   DARK     → not yet reached: opacity 0
    const LENS_FOCAL_R = 16;   // %-units: inner zone — fully sharp
    const LENS_BLEED_R = 40;   // %-units: outer zone — curve falloff
    const LENS_BLEED_OP = 0.22; // next-element preview opacity (increased)
    const LENS_RESTING_OP = 0.5;  // opacity once spotlight has passed
    const LENS_RESTING_BL = 1;    // px blur in resting state
    const LENS_MAX_BLUR = 7;    // px blur at full defocus / dark

    // Stamps stay in spotMap for spotlight tweens but are excluded from lens management
    // (opacity driven directly by scrub timeline instead)
    const _noLensSelectors = new Set(['.evidence-stamp-blue', '.evidence-stamp-yellow', '.evidence-stamp-red']);

    const lensTargets = Object.keys(spotMap).map(sel => {
        if (_noLensSelectors.has(sel)) return null;
        const el = document.querySelector(sel);
        if (!el || !spotMap[sel]) return null;
        return {
            sel, el, pos: spotMap[sel],
            setOp: gsap.quickSetter(el, 'opacity'),
            wasActive: false, entering: false,
            // Lerp-rendered values — chase their targets smoothly each frame
            rendOp: 0.0, rendBl: LENS_MAX_BLUR
        };
    }).filter(Boolean);

    // ── ELEMENT GROUPS ───────────────────────────────────────────────────────
    // Followers share their leader's opacity/blur — they blur/unblur as one unit.
    // Followers are stripped from lensTargets so they never independently drive activeIdx.
    const _lensGroups = [
        { leader: '#origin-headline', followers: ['#origin-micro-story', '#frag-origin-cursive'] }
    ];
    const _followerSelSet = new Set(_lensGroups.flatMap(g => g.followers));

    // Pull out follower elements before stripping them
    const _followerElMap = {};
    lensTargets.forEach(t => { if (_followerSelSet.has(t.sel)) _followerElMap[t.sel] = t.el; });

    // Strip followers from main array (iterate backwards to keep indices stable)
    for (let i = lensTargets.length - 1; i >= 0; i--) {
        if (_followerSelSet.has(lensTargets[i].sel)) lensTargets.splice(i, 1);
    }

    // Attach follower elements to their leader
    _lensGroups.forEach(({ leader, followers }) => {
        const lt = lensTargets.find(t => t.sel === leader);
        if (lt) lt.linkedEls = followers.map(s => _followerElMap[s]).filter(Boolean);
    });

    // Hard-reset ALL managed elements (leaders + followers)
    lensTargets.forEach(t => {
        const all = t.linkedEls ? [t.el, ...t.linkedEls] : [t.el];
        gsap.set(all, { opacity: 0, scale: 1, filter: `blur(${LENS_MAX_BLUR}px)` });
    });

    const _spotlightEl = document.getElementById('cinematic-spotlight');
    let lensActive = false;
    let _lastActiveIdx = -1;
    let _prevTlTime = -1;

    const _triggerEntrance = (target) => {
        // Kill any in-progress scale tweens on previously entering elements
        lensTargets.forEach(t => {
            if (t.entering && t !== target) {
                const prevEls = t.linkedEls ? [t.el, ...t.linkedEls] : [t.el];
                gsap.killTweensOf(prevEls);
                t.entering = false;
            }
        });

        // Snap opacity & blur IMMEDIATELY — scroll-speed independent
        target.rendOp = 1.0;
        target.rendBl = 0;
        target.entering = false; // Don't block LERP tick

        const allEls = target.linkedEls ? [target.el, ...target.linkedEls] : [target.el];
        // Apply directly so there's zero visual lag
        target.setOp(1.0);
        target.el.style.filter = 'none';
        if (target.linkedEls) {
            target.linkedEls.forEach(el => { el.style.opacity = 1; el.style.filter = 'none'; });
        }

        // Scale pop from wherever element is — no jump if re-triggered mid-animation
        gsap.killTweensOf(allEls);
        gsap.to(allEls, { scale: 1.0, duration: 0.4, ease: 'power3.out' });
    };

    // How much closer a candidate must be before activeIdx switches (%-units).
    // Prevents rapid flipping between densely packed page-1 elements.
    const LENS_HYSTERESIS = 3;
    // Per-frame lerp speed — higher = snappier, lower = smoother
    const LERP_K = 0.06;

    // Camera pan tracking — follows spotlight with heavy damping for stable glide
    let _camX = 0, _camY = 0;    // start at centre — camera follows spotlight smoothly from T=0
    const _nbXSet = gsap.quickSetter('#notebook-container', 'xPercent');
    const _nbYSet = gsap.quickSetter('#notebook-container', 'yPercent');

    const lensUpdate = () => {
        if (!lensActive || !_spotlightEl) return;

        // Hard-dark on full rewind
        if (aboutTl.time() < 0.9) {
            _lastActiveIdx = -1; _prevTlTime = -1;
            lensTargets.forEach(t => {
                t.wasActive = false; t.entering = false;
                const allEls = t.linkedEls ? [t.el, ...t.linkedEls] : [t.el];
                gsap.killTweensOf(allEls);
                t.rendOp = 0; t.rendBl = LENS_MAX_BLUR;
                t.setOp(0);
                allEls.forEach(el => { el.style.filter = `blur(${LENS_MAX_BLUR}px)`; });
            });
            return;
        }

        // Direction: compare timeline time to previous frame
        const tlTime = aboutTl.time();
        const isForward = _prevTlTime < 0 ? true : tlTime >= _prevTlTime;
        _prevTlTime = tlTime;

        // Read spotlight position (driven by spotTo() tweens — always on element centres)
        const cs = getComputedStyle(_spotlightEl);
        const sx = parseFloat(cs.getPropertyValue('--spot-x')) || 50;
        const sy = parseFloat(cs.getPropertyValue('--spot-y')) || 50;

        // CAMERA TRACKING: multiply by current scale to exactly counteract zoom displacement.
        // At scale s, an element at sx% appears at (sx-50)*s % offset from viewport centre —
        // so we need to pan by that same amount to bring it back to centre.
        {
            const nbScale = gsap.getProperty('#notebook-container', 'scale') || 1.35;
            let camTX = (50 - sx) * nbScale;
            let camTY = (50 - sy) * nbScale * 0.85; // 0.85: vertical pan slightly softer
            // Fade camera pan in over first 1s so spotlight seed doesn't cause entry snap
            const _tNow = aboutTl.time();
            if (_tNow < 1.0) {
                const _ef = _tNow / 1.0;
                camTX *= _ef;
                camTY *= _ef;
            }
            // Park camera back to centre 2s before Phase 3 so re-entry from projects never jumps
            if (_tNow > 27.0) {
                const _pf = Math.min(1, (_tNow - 27.0) / 2.0);
                camTX *= (1 - _pf);
                camTY *= (1 - _pf);
            }
            _camX += (camTX - _camX) * 0.04;
            _camY += (camTY - _camY) * 0.04;
            _nbXSet(_camX);
            _nbYSet(_camY);
        }

        // Pass 1 — ACTIVE: find closest; only switch with hysteresis
        let minD = Infinity, candidateIdx = 0;
        lensTargets.forEach(({ pos }, i) => {
            const dx = sx - pos.x, dy = sy - pos.y;
            const d = Math.sqrt(dx * dx * 0.65 + dy * dy);
            if (d < minD) { minD = d; candidateIdx = i; }
        });

        let activeIdx = _lastActiveIdx < 0 ? candidateIdx : _lastActiveIdx;
        if (candidateIdx !== activeIdx) {
            const { pos: aPos } = lensTargets[activeIdx];
            const adx = sx - aPos.x, ady = sy - aPos.y;
            const curD = Math.sqrt(adx * adx * 0.65 + ady * ady);
            if (curD - minD >= LENS_HYSTERESIS) activeIdx = candidateIdx;
        }

        if (activeIdx !== _lastActiveIdx) {
            if (isForward) {
                // Forward: mark visited, pop entrance
                lensTargets[activeIdx].wasActive = true;
                // Skip entrance pop on the very first activation — let LERP smooth it in
                if (_lastActiveIdx >= 0) {
                    _triggerEntrance(lensTargets[activeIdx]);
                }
            } else {
                // Backward: mirror of forward — let Pass 3 LERP re-blur naturally.
                // Just un-visit the leaving element and let proximity curve fade it out.
                if (_lastActiveIdx >= 0 && _lastActiveIdx < lensTargets.length) {
                    const leaving = lensTargets[_lastActiveIdx];
                    leaving.wasActive = false;
                    leaving.entering = false;
                    const leavingEls = leaving.linkedEls ? [leaving.el, ...leaving.linkedEls] : [leaving.el];
                    gsap.killTweensOf(leavingEls);
                    // Softly shrink scale so next forward entrance starts clean
                    gsap.to(leavingEls, { scale: 0.95, duration: 0.4, ease: 'power2.in' });
                    // rendOp/rendBl intentionally NOT snapped — Pass 3 LERP drives
                    // them to 0/MAX_BLUR at the same speed as forward unblur
                }
            }
            _lastActiveIdx = activeIdx;
        }

        // Pass 2 — NEXT preview
        // Forward: closest dark (unvisited) element — peek at what's coming
        // Backward: closest resting (visited) element — peek at what's about to go dark
        let nextD = Infinity, nextIdx = -1;
        lensTargets.forEach((t, i) => {
            if (i === activeIdx) return;
            const shouldPreview = isForward ? !t.wasActive : t.wasActive;
            if (!shouldPreview) return;
            const dx = sx - t.pos.x, dy = sy - t.pos.y;
            const d = Math.sqrt(dx * dx * 0.65 + dy * dy);
            if (d < nextD) { nextD = d; nextIdx = i; }
        });

        // Pass 3 — compute target op/bl, then lerp rendered values toward them
        lensTargets.forEach((t, i) => {
            if (t.entering) return; // GSAP owns this element during entrance pop

            let targetOp, targetBl;

            if (i === activeIdx) {
                const dx = sx - t.pos.x, dy = sy - t.pos.y;
                const dist = Math.sqrt(dx * dx * 0.65 + dy * dy);
                if (dist <= LENS_FOCAL_R) {
                    targetOp = 1.0; targetBl = 0;
                } else if (dist <= LENS_BLEED_R) {
                    const tv = (dist - LENS_FOCAL_R) / (LENS_BLEED_R - LENS_FOCAL_R);
                    const tc = tv * tv * tv;
                    targetOp = Math.max(LENS_RESTING_OP, LENS_BLEED_OP + (1 - LENS_BLEED_OP) * (1 - tc));
                    targetBl = LENS_MAX_BLUR * tc;
                } else {
                    targetOp = LENS_RESTING_OP; targetBl = LENS_MAX_BLUR;
                }
            } else if (i === nextIdx) {
                targetOp = LENS_BLEED_OP; targetBl = LENS_MAX_BLUR;
            } else if (t.wasActive) {
                targetOp = LENS_RESTING_OP; targetBl = LENS_RESTING_BL;
            } else {
                targetOp = 0; targetBl = LENS_MAX_BLUR;
            }

            // Lerp rendered values toward target — no hard snaps
            t.rendOp += (targetOp - t.rendOp) * LERP_K;
            t.rendBl += (targetBl - t.rendBl) * LERP_K;

            const filterStr = t.rendBl < 0.05 ? 'none' : `blur(${t.rendBl.toFixed(2)}px)`;
            t.setOp(t.rendOp);
            t.el.style.filter = filterStr;

            // Sync grouped followers — identical opacity + blur as their leader
            if (t.linkedEls) {
                t.linkedEls.forEach(el => {
                    el.style.opacity = t.rendOp;
                    el.style.filter = filterStr;
                });
            }
        });
    };
    // Store reference so we can remove it when the section is offscreen
    const lensTickerFn = lensUpdate;
    gsap.ticker.add(lensTickerFn);

    // Activate only while the about section is in the viewport.
    // Also pause/resume the ticker fn to stop 60fps work when scrolled away.
    ScrollTrigger.create({
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
            lensActive = true;
            _camX = gsap.getProperty('#notebook-container', 'xPercent') || 0;
            _camY = gsap.getProperty('#notebook-container', 'yPercent') || 0;
            gsap.ticker.add(lensTickerFn);
        },
        onLeave: () => { lensActive = false; gsap.ticker.remove(lensTickerFn); },
        onEnterBack: () => {
            lensActive = true;
            // Seed camera from actual notebook position so there's no jump on re-entry
            _camX = gsap.getProperty('#notebook-container', 'xPercent') || 0;
            _camY = gsap.getProperty('#notebook-container', 'yPercent') || 0;
            gsap.ticker.add(lensTickerFn);
        },
        onLeaveBack: () => { lensActive = false; gsap.ticker.remove(lensTickerFn); }
    });

    const nodes = document.querySelectorAll('.active-blueprint-node');

    // PHASE 1 — Book drifts into frame & camera focuses precisely on 'Open Book Note' (T=0.0 to T=2.5)
    aboutTl.to('#notebook-container', {
        opacity: 1,
        duration: 0.8, ease: "power2.out"
    }, 0.0);

    aboutTl.to('#notebook-container', {
        rotationX: 8,
        rotationY: -3,
        rotationZ: 0,
        scale: window.innerWidth > 768 ? 1.35 : 1.15,
        duration: 2.5, ease: "power2.inOut"
    }, 0.0);

    // Stickers drift in while book settles
    aboutTl.to('.draggable-sticker', {
        opacity: 1, y: 0, pointerEvents: 'auto',
        duration: 0.8, stagger: 0.12, ease: "back.out(1.2)"
    }, 1.2);

    // Paper rustle sound on settle
    aboutTl.add(() => { if (isAudioInit) paperRustleSynth.triggerAttackRelease("2n"); }, 1.0);

    // PHASE 2 — Blueprint begins & Camera tracks exact edge of the mapped line
    // Fade in the spotlight from its initial 60% visibility
    aboutTl.to('#cinematic-spotlight', { opacity: 1, duration: 2.0, ease: "power2.inOut" }, 2.0);

    // Blueprint line — fractions computed from actual path arc lengths (_nf[])
    // so the line tip lands exactly on each SVG node dot when the timeline reaches that time.
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf[0]) * pathLen, duration: 2.4, ease: "sine.inOut" }, 2.5);  // → origin
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf[1]) * pathLen, duration: 2.1, ease: "sine.inOut" }, 4.9);  // → U-turn / cutout
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf[2]) * pathLen, duration: 1.2, ease: "sine.inOut" }, 7.0);  // → strategy
    // Slow approach to polaroid in two stages (pacing beat between strategy and polaroid)
    const _nf3mid = _nf[2] + (_nf[3] - _nf[2]) * 0.75;  // 75% of the way from strategy to polaroid
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf3mid) * pathLen, duration: 4.2, ease: "sine.inOut" }, 8.2);
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf[3]) * pathLen, duration: 2.7, ease: "sine.inOut" }, 12.4); // → polaroid
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf[4]) * pathLen, duration: 1.8, ease: "sine.inOut" }, 15.1); // → art-stats (186M)
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf[5]) * pathLen, duration: 2.5, ease: "sine.inOut" }, 16.9); // → art-terminal (philosophy)
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf[6]) * pathLen, duration: 1.7, ease: "sine.inOut" }, 19.4); // → stamp-blue area
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf[7]) * pathLen, duration: 1.4, ease: "sine.inOut" }, 21.1); // → stamp-yellow
    aboutTl.to('.map-line-path', { strokeDashoffset: (1 - _nf[8]) * pathLen, duration: 0.6, ease: "sine.inOut" }, 22.5); // → stamp-red
    aboutTl.to('.map-line-path', { strokeDashoffset: 0, duration: 1.4, ease: "sine.inOut" }, 23.1); // → end

    // Constant tight zoom for smooth documentary tracking
    const steadyZoom = window.innerWidth > 768 ? 1.65 : 1.40;
    const page2Zoom = window.innerWidth > 768 ? 1.80 : 1.50;

    // Smoothly push in to the steady zoom right as the blueprint begins
    aboutTl.to('#notebook-container', { scale: steadyZoom, duration: 2.5, ease: "power2.inOut" }, 1.5);

    // Slight close-up on the "it started as making things… strategy came later" paragraph
    const strategyZoom = window.innerWidth > 768 ? 1.74 : 1.48;
    aboutTl.to('#notebook-container', { scale: strategyZoom, duration: 2.3, ease: "sine.inOut" }, 4.9);

    // Push in even further for an intimate view when transitioning to the 2nd page
    aboutTl.to('#notebook-container', { scale: page2Zoom, duration: 3.5, ease: "power2.inOut" }, 11.0);

    // -------------------------------------------------------------------------
    // THE JOURNEY TIMELINE (Synchronized perfectly with the drawn line tip)
    // -------------------------------------------------------------------------

    // Intro Sticky Note ("I'm an open book") — spotlight arrives at T=1.0
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#intro-sticky-note'), duration: 1.0, ease: "sine.inOut" }, 1.0);
    // Bridge: spotlight glides from intro note → origin headline by T=2.5,
    // so the line-tip tracker picks up from the exact same position (no snap)
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#origin-headline'), duration: 0.8, ease: "sine.inOut" }, 2.0);

    // Node 0 — Origin headline.
    // Line draws T=2.5→4.9 (dur 2.4). Spotlight matches: same start, same duration.
    aboutTl.to(nodes[0], { opacity: 0.8, duration: 0.2 }, 4.9);
    aboutTl.add(() => {
        document.getElementById('sneaker-circle-path').classList.add('draw-active');
        if (isAudioInit) beepSynth.triggerAttackRelease("E5", "32n");
    }, 2.5);
    aboutTl.to('#notebook-container', { rotationX: 10, rotationY: -4, duration: 2.4, ease: "sine.inOut" }, 2.5);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#origin-headline'), duration: 2.4, ease: "sine.inOut" }, 2.5);

    // Node 1 — Personal Cutout.
    // Line draws T=4.9→7.0 (dur 2.1).
    aboutTl.to(nodes[1], { opacity: 0.8, duration: 0.2 }, 7.0);
    aboutTl.to('#notebook-container', { rotationX: 8, rotationY: -2, duration: 2.1, ease: "sine.inOut" }, 4.9);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#personal-cutout'), duration: 2.1, ease: "sine.inOut" }, 4.9);

    // Node 2 — Strategy annotation.
    // Line draws T=7.0→8.2 (dur 1.2).
    aboutTl.to('#notebook-container', { rotationX: 9, rotationY: 0, duration: 1.2, ease: "sine.inOut" }, 7.0);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#frag-strategy-annot'), duration: 1.2, ease: "sine.inOut" }, 7.0);
    aboutTl.to(nodes[2], { opacity: 0.8, duration: 0.2 }, 8.2);

    aboutTl.to('#notebook-container', { rotationX: 8, rotationY: 2, duration: 4.2, ease: "sine.inOut" }, 8.2);

    // Node 3 — Art Polaroid.
    // Line draws T=8.2→15.1 (two segments, total 6.9s). Spotlight matches full journey.
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#art-polaroid'), duration: 6.9, ease: "sine.inOut" }, 8.2);
    aboutTl.to(nodes[3], { opacity: 0.8, duration: 0.2 }, 15.1);
    if (isAudioInit) aboutTl.add(() => beepSynth.triggerAttackRelease("C5", "16n"), 12.4);
    aboutTl.to('#notebook-container', { rotationX: 6, rotationY: 4, duration: 2.7, ease: "sine.inOut" }, 12.4);

    // Node 4 — Philosophy note (art-terminal). Spotlight visits philosophy first per user request.
    // Start early (T=13.5) so spotlight has 3.4s to travel the large page-1→page-2 gap
    // at the same gentle pace as the line. Arrives at T=16.9 when line reaches this node.
    aboutTl.to('#notebook-container', { rotationX: 12, rotationY: 5, duration: 3.4, ease: "sine.inOut" }, 13.5);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#art-terminal'), duration: 3.4, ease: "sine.inOut" }, 13.5);
    aboutTl.to(nodes[4], { opacity: 0.8, duration: 0.2 }, 16.9);

    // Node 5 — 186M+ Stats (art-stats). Spotlight visits after philosophy.
    // Line draws T=16.9→19.4 (dur 2.5).
    aboutTl.to('#notebook-container', { rotationX: 8, rotationY: 2, duration: 2.5, ease: "sine.inOut" }, 16.9);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#art-stats'), duration: 2.5, ease: "sine.inOut" }, 16.9);
    aboutTl.to(nodes[5], { opacity: 0.8, duration: 0.2 }, 19.4);

    // Node 6 — Experience Typewriter.
    // Line draws T=19.4→21.1 (dur 1.7).
    aboutTl.to('#notebook-container', { rotationX: 12, rotationY: 6, duration: 1.7, ease: "sine.inOut" }, 19.4);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#experience-typewriter'), duration: 1.7, ease: "sine.inOut" }, 19.4);
    aboutTl.to(nodes[6], { opacity: 0.8, duration: 0.15 }, 21.1);
    aboutTl.fromTo('.evidence-stamp-blue', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 19.4);

    // Node 7 — Blue Stamp.
    // Line draws T=21.1→22.5 (dur 1.4).
    aboutTl.to('#notebook-container', { rotationX: 12, rotationY: 6, duration: 1.4, ease: "sine.inOut" }, 21.1);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('.evidence-stamp-blue'), duration: 1.4, ease: "sine.inOut" }, 21.1);
    aboutTl.to(nodes[7], { opacity: 0.8, duration: 0.15 }, 22.5);
    aboutTl.fromTo('.evidence-stamp-yellow', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 21.1);

    // Node 8 — Yellow Stamp.
    // Line draws T=22.5→23.1 (dur 0.6).
    aboutTl.to('#notebook-container', { rotationX: 12, rotationY: 6, duration: 0.6, ease: "sine.inOut" }, 22.5);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('.evidence-stamp-yellow'), duration: 0.6, ease: "sine.inOut" }, 22.5);
    aboutTl.to(nodes[8], { opacity: 0.8, duration: 0.15 }, 23.1);
    aboutTl.fromTo('.evidence-stamp-red', { opacity: 0, scale: 1.1 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, 22.5);

    // Node 9 — Red Stamp.
    // Line draws T=23.1→24.5 (dur 1.4).
    aboutTl.to('#notebook-container', { rotationX: 12, rotationY: 2, duration: 1.4, ease: "sine.inOut" }, 23.1);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('.evidence-stamp-red'), duration: 1.4, ease: "sine.inOut" }, 23.1);
    aboutTl.to(nodes[9], { opacity: 0.8, duration: 0.2 }, 24.5);

    // Node 10 — Torn signature / finale (T=24.5, after line completes).
    aboutTl.to(nodes[10], { opacity: 0.8, duration: 0.2 }, 24.5);
    aboutTl.to('#cinematic-spotlight', { ...spotTo('#torn-signature-paper'), duration: 2.5, ease: "sine.inOut" }, 24.5);
    // Fallback: force-reveal torn-signature at T=27 in case proximity detection misses it
    // at certain resolutions where both bottom elements clamp to the same y value.
    aboutTl.add(() => {
        const tgt = lensTargets.find(t => t.sel === '#torn-signature-paper');
        if (tgt && !tgt.wasActive) _triggerEntrance(tgt);
    }, 27.0);

    // -------------------------------------------------------------------------
    // PHASE 3: THE SUBMERGE & BLACKOUT (T = 26.0s)
    // -------------------------------------------------------------------------
    const tSubmerge = 29.0;

    // Hand off element opacity control to the dissolve tween — lens engine steps aside.
    // onStart: forward scroll crosses T=25 → deactivate lens.
    // onReverseComplete: user scrubs back past T=25 → reactivate lens.
    aboutTl.to({}, {
        duration: 0.01,
        onStart: () => { lensActive = false; },
        onReverseComplete: () => { lensActive = true; }
    }, tSubmerge);

    // Dissolve notebook and physical textures
    aboutTl.to('.realistic-paper-stack-right, #left-page-base, #intro-sticky-note, .draggable-sticker, .focus-lift-target, .active-blueprint-node, #system-grid-transient, .paper-texture, .ruled-paper-lines, #cinematic-spotlight', {
        opacity: 0,
        duration: 2.5,
        ease: "power2.inOut"
    }, tSubmerge);

    // Transition BG to deep matte charcoal/black (#050508)
    aboutTl.to('#about', {
        backgroundColor: "#000000",
        duration: 2.5,
        ease: "power2.inOut"
    }, tSubmerge);

    // Fade in void grain (3-4% opacity) for texture
    aboutTl.to('#void-grain', {
        opacity: 0.04,
        duration: 2.5,
        ease: "power2.inOut"
    }, tSubmerge);

    // The Line: loses shadow, changes to soft archival ink (beige)
    const tracePathEl = document.getElementById('blueprint-trace-path');
    aboutTl.to(tracePathEl, {
        stroke: "var(--beige)",
        opacity: 0.85,
        duration: 2.5,
        ease: "power2.inOut"
    }, tSubmerge);

    // Fade out the glow line entirely so we don't have duplicate lines during morph
    aboutTl.to('#blueprint-trace-path-glow', {
        opacity: 0,
        duration: 2.5,
        ease: "power2.inOut"
    }, tSubmerge);

    // Strip filter immediately at the start of submerge and ensure normal blend mode in dark void
    aboutTl.to({}, {
        duration: 0.1,
        onStart: () => {
            const el = document.getElementById('blueprint-trace-path');
            if (el) {
                el.removeAttribute('filter');
                el.style.mixBlendMode = 'normal';
            }
        },
        onReverseComplete: () => {
            const el = document.getElementById('blueprint-trace-path');
            if (el) {
                el.style.mixBlendMode = 'multiply';
            }
        }
    }, tSubmerge);

    // The Camera: cinematically pulls back and pans to absolute center (0, 0)
    aboutTl.to('#notebook-container', {
        scale: window.innerWidth > 768 ? 1.0 : 0.8, // Centered framing scale
        xPercent: 0,
        yPercent: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        duration: 4.5, // Matches the easing and length of the morph
        ease: "power3.inOut"
    }, tSubmerge);

    // PHASE 4: THE SIGNATURE MORPH (T = 27.5s to 32.0s)
    // -------------------------------------------------------------------------
    const tMorph = 30.5;
    const sigPathEl = document.getElementById('signature-source-path');

    if (tracePathEl && sigPathEl) {
        // Uniform Point Sampling Engine (100% Geometry control - no CSS tangling)
        const numPoints = 450;
        const sourcePoints = [];
        const targetPoints = [];
        let isEngineInit = false;

        const initMorphEngine = () => {
            if (isEngineInit) return;
            const traceLen = tracePathEl.getTotalLength();
            const sigLen = sigPathEl.getTotalLength();

            for (let i = 0; i < numPoints; i++) {
                const tracePt = tracePathEl.getPointAtLength((i / (numPoints - 1)) * traceLen);
                sourcePoints.push({ x: tracePt.x, y: tracePt.y });

                const sigPt = sigPathEl.getPointAtLength((i / (numPoints - 1)) * sigLen);
                targetPoints.push({ x: sigPt.x, y: sigPt.y });
            }
            isEngineInit = true;
        };

        const morphObj = { progress: 0 };
        let originalD = null;

        // Ensure strokeDasharray is removed so the whole line is visible during morph
        aboutTl.to(tracePathEl, { strokeDasharray: "none", strokeDashoffset: 0, duration: 0.1 }, tMorph - 0.1);

        aboutTl.to(morphObj, {
            progress: 1,
            duration: 4.5,
            ease: "power3.inOut",
            onStart: () => {
                if (!originalD) originalD = tracePathEl.getAttribute('d');
                initMorphEngine();
            },
            onUpdate: () => {
                if (!isEngineInit) initMorphEngine();
                if (!isEngineInit) return;
                let d = "M ";
                for (let i = 0; i < numPoints; i++) {
                    const curX = sourcePoints[i].x + (targetPoints[i].x - sourcePoints[i].x) * morphObj.progress;
                    const curY = sourcePoints[i].y + (targetPoints[i].y - sourcePoints[i].y) * morphObj.progress;
                    d += `${curX},${curY} `;
                    if (i === 0) d += "L ";
                }
                tracePathEl.setAttribute('d', d);
            },
            onReverseComplete: () => {
                // Atomically restore the original route path + dash state so the
                // map-route shape never flashes while strokeDasharray is still "none"
                if (originalD) tracePathEl.setAttribute('d', originalD);
                gsap.set(tracePathEl, { strokeDasharray: pathLen, strokeDashoffset: 0 });
            }
        }, tMorph);
    }

    // PHASE 5: THE EPILOGUE
    // -------------------------------------------------------------------------
    const tEpilogue = 34.5;
    aboutTl.to('#epilogue-quote', {
        opacity: 0.4,
        duration: 1.0,
        ease: "power2.out"
    }, tEpilogue);

    // Removed the cinematic hold to prevent the user from scrolling over empty space
}

// --- PHYSICAL STICKERS DRAGGABILITY ENGINE ---
const stickersList = document.querySelectorAll('.draggable-sticker');
if (stickersList.length > 0) {
    Draggable.create(stickersList, {
        bounds: "#about-sticky-wrap",
        type: "x,y",
        edgeResistance: 0.7,
        onPress: function () {
            // Slight physical scaling when lifting the vinyl sticker
            gsap.to(this.target, {
                scale: 1.15,
                zIndex: 200,
                filter: "drop-shadow(15px 25px 20px rgba(5,16,36,0.45))",
                duration: 0.2,
                ease: "power2.out"
            });
            if (isAudioInit) {
                paperRustleSynth.triggerAttackRelease("8n");
                hoverTickSynth.triggerAttackRelease("E5", "32n");
            }
        },
        onRelease: function () {
            // Soft settle drop spring back
            gsap.to(this.target, {
                scale: 1.0,
                filter: "drop-shadow(4px 8px 12px rgba(5,16,36,0.3))",
                duration: 0.4,
                ease: "elastic.out(1, 0.45)"
            });
            if (isAudioInit) {
                paperRustleSynth.triggerAttackRelease("12n");
            }
        }
    });
}

// --- TERMINAL TYPEWRITER ---
const typeLines = [
    "> 5 PROBLEMS I WAS HANDED.",
    "> 5 TIMES IT WORKED.",
    "",
    "> ACTUAL WORK.",
    "> ACTUAL NUMBERS."
];
const typeContainer = document.getElementById("terminal-typewriter");
const awaiting = document.getElementById("terminal-awaiting");

if (typeContainer) {
    let lineIdx = 0;
    let charIdx = 0;
    typeContainer.innerHTML = "";

    let isTyping = false;
    function typeNextChar() {
        if (isTyping) return;
        isTyping = true;
        if (lineIdx >= typeLines.length) {
            if (awaiting) {
                awaiting.classList.remove('hidden');
                if (isAudioInit) clickSynth.triggerAttackRelease("C6", "32n", "+0", 0.3);
            }
            isTyping = false;
            return;
        }

        let currentLineText = typeLines[lineIdx];
        if (charIdx === 0) {
            let div = document.createElement("div");
            if (currentLineText === "") {
                div.innerHTML = "<br>";
            }
            typeContainer.appendChild(div);
        }

        if (currentLineText !== "") {
            let divs = typeContainer.querySelectorAll("div");
            let currentDiv = divs[divs.length - 1];
            currentDiv.textContent += currentLineText.charAt(charIdx);
            if (isAudioInit && charIdx % 2 === 0) {
                hoverTickSynth.triggerAttackRelease("G5", "64n", "+0", 0.05);
            }
        }

        charIdx++;
        if (charIdx >= currentLineText.length) {
            charIdx = 0;
            lineIdx++;
            isTyping = false;
            setTimeout(typeNextChar, currentLineText === "" ? 50 : 250);
        } else {
            isTyping = false;
            setTimeout(typeNextChar, 15); // Fast typing speed
        }
    }

    const terminalObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(typeNextChar, 500); // slight delay before starting
            terminalObserver.disconnect();
        }
    }, { threshold: 0.5 });

    terminalObserver.observe(typeContainer);
}

// --- DECRYPTION ENGINE ---
const decryptElements = document.querySelectorAll('.decrypt-target');
const decryptChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

decryptElements.forEach(el => {
    if (!el.dataset.decrypt) return;
    el.dataset.original = el.dataset.decrypt;
    const trigger = el.closest('.blur-reveal-group') || el;

    trigger.addEventListener('mouseenter', () => {
        if (el.dataset.animating === "true") return;
        el.dataset.animating = "true";
        if (isAudioInit) decryptSynth.triggerAttackRelease("16n");

        let iterations = 0;
        clearInterval(el.interval);

        el.interval = setInterval(() => {
            el.innerText = el.innerText.split("").map((letter, index) => {
                if (index < iterations) {
                    return el.dataset.original[index] || "";
                }
                return decryptChars[Math.floor(Math.random() * decryptChars.length)];
            }).join("");

            if (iterations >= el.dataset.original.length) {
                clearInterval(el.interval);
                el.innerText = el.dataset.original;
                el.dataset.animating = "false";
            }
            iterations += 1 / 2;
        }, 30);
    });
    trigger.addEventListener('mouseleave', () => {
        clearInterval(el.interval);
        el.innerText = el.dataset.original;
        el.dataset.animating = 'false';
    });
});

// ==========================================================================
// ==========================================================================
// RETRO BLUEPRINT MULTI-WINDOW DESKTOP MANAGER WITH APPLE GENIE EFFECT
// Features:
// - Apple Genie squeeze & funnel animation when opening, restoring, or minimizing
// - 11 Projects Catalog (KiranaMate, SonarIQ, Scout, DelhiJalNav, SatQuery, Healthcare Guardrails,
//   YouTube RAG, Real-Time Sign Language, Movie Recommender, Stock Prediction, Time Series LSTM)
// - Multiple windows coexist simultaneously without closing each other
// - Dragging, maximizing, minimizing, z-index stacking, category filtering
// - KiranaMate featured with complete WhatsApp & Sarvam AI architecture
// ==========================================================================
function initRetroDesktop() {
    const canvas = document.getElementById('retro-desktop-canvas');
    if (!canvas) return;

    // Audio helper
    function playSound(type) {
        if (typeof isAudioInit !== 'undefined' && isAudioInit) {
            try {
                if (type === 'pop' && typeof popSynth !== 'undefined') popSynth.triggerAttackRelease('C4', '16n');
                else if (type === 'click' && typeof clickSynth !== 'undefined') clickSynth.triggerAttackRelease('E5', '16n');
                else if (type === 'tick' && typeof hoverTickSynth !== 'undefined') hoverTickSynth.triggerAttackRelease('G5', '32n');
            } catch (e) { }
        }
    }

    // Comprehensive Technical Skills Matrix catalog for all 8 skill modules
    const SKILLS_CATALOG = {
        aiml_core: {
            id: 'aiml_core',
            title: 'AGENTIC AI // MULTI-AGENT SWARMS',
            subtitle: 'Autonomous Decision Loops & Tool-Calling Agents',
            exec: 'AGENTIC_AI_SYSTEM.EXE // AUTONOMOUS SWARM',
            category: 'aiml',
            catTag: 'AI & Machine Learning Core',
            metaTag: '// AUTONOMOUS AGENTS',
            desc: 'Production Agentic AI systems capable of recursive reasoning, plan-execute loops, and dynamic task delegation.',
            bullets: [],
            stack: ['Agentic AI', 'Multi-Agent Swarms', 'LLM Applications', 'Deep Learning', 'Reinforcement Learning'],
            menu: ['FILE', 'AGENT_SWARM', 'REASONING_LOOP', 'TOOL_DISPATCH'],
            menuStatus: 'SWARM STATE: ACTIVE // 0 ERRORS',
            path: 'C:\\SKILLS\\AI_ML\\AGENTIC_SWARMS',
            repo: 'https://github.com/granthx/KiranaMate',
            note: 'autonomous agents, structured execution ↗',
            icon: '🤖',
            metrics: [{ val: 'Multi-Agent', lbl: 'Topologies' }, { val: 'ReAct', lbl: 'Loops' }, { val: 'Tool-Use', lbl: 'Reliability' }],
            color: '#0A0A0A',
            defaultX: 235,
            defaultY: 15,
            tableStatus: 'VALIDATED',
            projects: [
                {
                    name: 'KiranaMate (MerchantMind AI)',
                    tag: 'Autonomous WhatsApp Swarm',
                    repoUrl: 'https://github.com/granthx/KiranaMate',
                    role: 'Architected 24/7 background autonomous multi-agent loops that ingest Paytm soundbox transactions in real time, detect sales drop anomalies, and autonomously formulate margin-guaranteed WhatsApp buyer campaigns without needing manual merchant prompts.',
                    next: 'Integrating voice-first autonomous agent negotiation in 10+ Indic vernacular languages with real-time audio streams.',
                    tech: ['Multi-Agent StateGraph', 'WhatsApp Cloud API', 'Sarvam AI', 'FastAPI']
                },
                {
                    name: 'healthcare-guardrails-agent',
                    tag: 'Layered Guardrails & HITL',
                    repoUrl: 'https://github.com/granthx/healthcare-guardrails-agent',
                    role: 'Engineered deterministic pre-LLM safety filters, PII redaction middleware, and Human-in-the-Loop approval checkpoints before invoking sensitive appointment-booking and medical tools.',
                    next: 'Implementing automated red-teaming adversarial agent probes to dynamically stress-test safety boundaries before clinical deployment.',
                    tech: ['LangChain', 'LangGraph', 'PII Middleware', 'Streamlit']
                },
                {
                    name: 'SCOUT',
                    tag: 'Omnichannel Shopping Swarm',
                    repoUrl: 'https://github.com/granthx/SCOUT',
                    role: 'Built autonomous decentralized agent swarm coordinating parallel product discovery, inventory price tracking, and multi-platform consumer search across Indian e-commerce platforms.',
                    next: 'Adding multi-agent auction bidding heuristics and distributed web crawler agent nodes for live flash sales.',
                    tech: ['Autonomous Agents', 'Tool Dispatch', 'Dynamic Routing']
                }
            ],
            specsTable: [
                { module: 'Agentic Swarm Topologies', tech: 'LangGraph + Multi-Agent', benchmark: 'Cyclic Graphs', role: 'Parallel routing, inter-agent consensus & task delegation' },
                { module: 'Reasoning & Reflection', tech: 'ReAct + Chain-of-Thought', benchmark: 'Zero Drift', role: 'Self-evaluating validation nodes and error recovery loops' },
                { module: 'Tool Dispatch Engine', tech: 'Structured Function Calling', benchmark: 'Pydantic Schemas', role: 'Strict type-checked IO, rate limits & external API bridges' },
                { module: 'Deep & Reinforcement Learning', tech: 'Policy Gradients & Networks', benchmark: 'Convergence', role: 'Reward formulation, exploration strategies & agent policies' }
            ]
        },
        rag_multimodal: {
            id: 'rag_multimodal',
            title: 'RAG PIPELINES & MULTIMODAL RAG',
            subtitle: 'Hybrid Dense-Sparse Retrieval & Context Augmentation',
            exec: 'RAG_MULTIMODAL_PIPELINE.SYS // HYBRID RETRIEVAL',
            category: 'aiml',
            catTag: 'Retrieval-Augmented Generation',
            metaTag: '// ZERO HALLUCINATION',
            desc: 'Low-latency RAG architectures and Multimodal RAG combining dense vectors with lexical search and vision models.',
            bullets: [],
            stack: ['RAG Pipelines', 'Multimodal RAG', 'FAISS', 'Cross-Encoders', 'Reranking', 'Vector Embeddings'],
            menu: ['FILE', 'RETRIEVER', 'VECTOR_SPACE', 'RERANKER'],
            menuStatus: 'PIPELINE: GROUNDED // <50MS RETRIEVAL',
            path: 'C:\\SKILLS\\RAG\\MULTIMODAL_RETRIEVAL',
            repo: 'https://github.com/granthx/RAG_yt_chatbot',
            note: 'ground your models in truth and precision ↗',
            icon: '🔍',
            metrics: [{ val: 'Hybrid', lbl: 'Dense + Sparse' }, { val: '<50ms', lbl: 'FAISS Latency' }, { val: 'Zero', lbl: 'Hallucination' }],
            color: '#0A0A0A',
            defaultX: 255,
            defaultY: 35,
            tableStatus: 'OPTIMIZED',
            projects: [
                {
                    name: 'RAG_yt_chatbot',
                    tag: 'Sub-50ms Transcript Vector RAG',
                    repoUrl: 'https://github.com/granthx/RAG_yt_chatbot',
                    role: 'Built end-to-end RAG pipeline extracting YouTube transcripts, chunking with sliding context windows, indexing with Sentence Transformers into a FAISS vector database, and generating cited context-aware answers using Groq Llama 3.3 70B in under 50ms.',
                    next: 'Implementing multi-video comparative synthesis with hierarchical graph-guided document indexing.',
                    tech: ['FAISS', 'Sentence Transformers', 'LangChain', 'Groq Llama 3.3 70B']
                },
                {
                    name: 'SatQuery-AI',
                    tag: 'Multimodal Remote Sensing RAG',
                    repoUrl: 'https://github.com/granthx/SatQuery-AI',
                    role: 'Engineered multimodal vision-language RAG pipeline pairing satellite remote sensing embeddings with natural language query retrieval for flood assessment, temporal change detection, and spatial analytics.',
                    next: 'Expanding to multi-spectral temporal change diffing with real-time geospatial bounding queries.',
                    tech: ['Vision-Language Models', 'Multimodal Embeddings', 'Geospatial Analytics']
                },
                {
                    name: 'KiranaMate',
                    tag: 'Knowledge Graph Memory Retrieval',
                    repoUrl: 'https://github.com/granthx/KiranaMate',
                    role: 'Implemented Cognee knowledge graph memory for semantic merchant retrieval, anchoring autonomous agent decisions in historical store transactions to eliminate hallucinations.',
                    next: 'Continuous episodic memory consolidation across multi-month sales histories.',
                    tech: ['Cognee Memory', 'Knowledge Graphs', 'Semantic Indexing']
                }
            ],
            specsTable: [
                { module: 'Hybrid Retrieval Engine', tech: 'Dense Vectors + BM25', benchmark: 'RRF Reranking', role: 'Blends semantic meaning with precise keyword and code recall' },
                { module: 'Multimodal Ingestion', tech: 'Vision LLMs + OCR Parsing', benchmark: 'Unified Vectors', role: 'Extracts diagrams, tabular data, and schematics into embeddings' },
                { module: 'Vector Index Optimization', tech: 'FAISS (HNSW / IVF-PQ)', benchmark: 'Sub-millisecond', role: 'High-dimensional similarity indexing with memory quantization' },
                { module: 'Context Synthesis', tech: 'Reciprocal Rerank + Citations', benchmark: 'Strict Grounding', role: 'Eliminates token bloat and synthesizes verbatim cited responses' }
            ]
        },
        langgraph_langsmith: {
            id: 'langgraph_langsmith',
            title: 'LANGGRAPH & LANGSMITH',
            subtitle: 'Stateful Cyclic Graphs & Observability Tracing',
            exec: 'LANGGRAPH_STUDIO.IO // STATEGRAPH ENGINE',
            category: 'frameworks',
            catTag: 'Frameworks & Orchestration',
            metaTag: '// DETERMINISTIC RUNTIME',
            desc: 'Enterprise LLM application development using LangGraph cyclic state-machines and LangSmith observability.',
            bullets: [],
            stack: ['LangGraph', 'LangSmith', 'StateGraph', 'MemorySaver', 'Checkpointers', 'Evaluation'],
            menu: ['FILE', 'STATE_GRAPH', 'CHECKPOINTERS', 'LANGSMITH_TRACES'],
            menuStatus: 'TRACING: 100% CAPTURED // GRAPH SYNCED',
            path: 'C:\\SKILLS\\FRAMEWORKS\\LANGGRAPH_ORCHESTRATION',
            repo: 'https://github.com/granthx/healthcare-guardrails-agent',
            note: 'deterministic loops for non-deterministic models ↗',
            icon: '🕸️',
            metrics: [{ val: 'Cyclic', lbl: 'StateGraphs' }, { val: '100%', lbl: 'Trace Coverage' }, { val: 'HITL', lbl: 'Checkpoints' }],
            color: '#0A0A0A',
            defaultX: 275,
            defaultY: 55,
            tableStatus: 'OBSERVED',
            projects: [
                {
                    name: 'healthcare-guardrails-agent',
                    tag: 'StateGraph & Resumable Checkpoints',
                    repoUrl: 'https://github.com/granthx/healthcare-guardrails-agent',
                    role: 'Developed stateful LangGraph StateGraph with MemorySaver checkpointers for resumable human approval workflows, conditional routing edges for medical output validation, and LangSmith distributed tracing for token spend and latency auditing.',
                    next: 'Deploying persistent PostgreSQL checkpointers with time-travel workflow rollbacks and state diff visualizers.',
                    tech: ['LangGraph StateGraph', 'MemorySaver', 'LangSmith Traces', 'Pydantic']
                },
                {
                    name: 'Twtr_post_generator (tweet_forge)',
                    tag: 'Cyclic Self-Reflection Graph',
                    repoUrl: 'https://github.com/granthx/Twtr_post_generator',
                    role: 'Designed cyclic multi-persona agent loop (Generator -> Evaluator -> Optimizer) with conditional branching edges; iterates and self-corrects drafts until meeting editorial approval or max iterations.',
                    next: 'Adding dynamic multi-modal preview generation and real-time Twitter API performance metric feedback loops.',
                    tech: ['LangGraph Cyclic Loops', 'TypedDict State', 'Conditional Routing', 'Groq']
                },
                {
                    name: 'KiranaMate',
                    tag: 'Multi-Agent Workflow Orchestration',
                    repoUrl: 'https://github.com/granthx/KiranaMate',
                    role: 'Orchestrated complex proactive decision graphs coordinating anomaly detection, competitor price verification, and multi-channel notification execution with state persistence.',
                    next: 'Parallel multi-branch execution with asynchronous sub-graph spawning.',
                    tech: ['LangGraph Workflows', 'Dynamic State', 'Error Fallback Nodes']
                }
            ],
            specsTable: [
                { module: 'Graph Workflow Compiler', tech: 'LangGraph StateGraph', benchmark: 'Cyclic Topology', role: 'Compiled state schemas with conditional edges and branch routers' },
                { module: 'Persistence & Checkpointers', tech: 'MemorySaver / Postgres Checkpointer', benchmark: 'Instant Rollback', role: 'Session resumption, human-in-the-loop pauses, and state diffing' },
                { module: 'Observability & Monitoring', tech: 'LangSmith SDK', benchmark: 'Live Traces', role: 'Distributed span tracking, token spend auditing & latency bottlenecks' },
                { module: 'Evals & Test Suites', tech: 'LangSmith Datasets', benchmark: 'Regression Guard', role: 'Automated prompt evaluation against gold standard benchmark suites' }
            ]
        },
        pytorch_deeplearning: {
            id: 'pytorch_deeplearning',
            title: 'PYTORCH & DEEP LEARNING',
            subtitle: 'Neural Network Architectures & Predictability Calibration',
            exec: 'PYTORCH_CUDA_CORE.BIN // TENSOR ENGINE',
            category: 'frameworks',
            catTag: 'Deep Learning & RL',
            metaTag: '// GPU ACCELERATED',
            desc: 'Building and calibrating deep neural networks with PyTorch, lifting directional predictability to production reliability.',
            bullets: [],
            stack: ['PyTorch', 'Deep Learning', 'Reinforcement Learning', 'CUDA', 'TorchVision', 'Autograd'],
            menu: ['FILE', 'LAYERS', 'BACKPROP', 'TENSORBOARD'],
            menuStatus: 'CUDA: INITIALIZED // GPU ACCELERATED',
            path: 'C:\\SKILLS\\DEEP_LEARNING\\PYTORCH_MODELS',
            repo: 'https://github.com/granthx/Stock-Market-Prediction-',
            note: 'predictability elevated from 0.5 to 0.8+ precision ↗',
            icon: '🔥',
            metrics: [{ val: '0.82+', lbl: 'Precision Score' }, { val: 'PyTorch', lbl: 'Autograd Core' }, { val: 'CUDA', lbl: 'Accelerated' }],
            color: '#0A0A0A',
            defaultX: 220,
            defaultY: 25,
            tableStatus: 'TRAINED',
            projects: [
                {
                    name: 'Stock-Market-Prediction- (Predictive Modeling)',
                    tag: 'Predictability: 0.50 → 0.82 Precision',
                    predictability: '0.50 (coin-toss baseline) → 0.82+ (validated precision score)',
                    repoUrl: 'https://github.com/granthx/Stock-Market-Prediction-',
                    role: 'Addressed volatile market unpredictability: transformed baseline directional predictability from an erratic 0.50 coin-toss score into a robust, validated 0.82+ precision score by engineering rolling horizon windows, trend thresholding, and loss calibration without lookahead leakage.',
                    next: 'Deploying Deep Q-Network (DQN) reinforcement learning agent for dynamic position sizing under volatility regimes.',
                    tech: ['Deep & Statistical ML', 'Rolling Horizons', 'Precision Calibration', 'Loss Optimization']
                },
                {
                    name: 'time-series-forecast',
                    tag: 'LSTM Recurrent Neural Networks',
                    repoUrl: 'https://github.com/granthx/time-series-forecast',
                    role: 'Implemented LSTM deep neural network with sequential TimeseriesGenerator and MinMax scaling to capture non-linear temporal dynamics and seasonal patterns, outperforming traditional ARIMA baselines on RMSE.',
                    next: 'Benchmarking temporal fusion transformers (TFT) with interpretable attention heads against LSTM baselines.',
                    tech: ['PyTorch / Keras LSTM', 'Sequential Tensors', 'Seasonal Decomposition', 'TimeseriesGenerator']
                },
                {
                    name: 'SatQuery-AI',
                    tag: 'Deep Vision & Feature Extraction',
                    repoUrl: 'https://github.com/granthx/SatQuery-AI',
                    role: 'Trained deep convolutional and transformer backbones on multi-spectral satellite imagery to execute semantic water and land-use segmentation with GPU acceleration.',
                    next: 'Transfer learning to high-resolution SAR (Synthetic Aperture Radar) flood extent mapping.',
                    tech: ['PyTorch CUDA', 'Vision Transformers', 'Multi-Spectral Tensors']
                }
            ],
            specsTable: [
                { module: 'Deep Learning Framework', tech: 'PyTorch (torch.nn)', benchmark: 'Mixed Precision FP16', role: 'Custom modules, gradient accumulation, and loss optimization' },
                { module: 'Predictability Calibrator', tech: 'Sequence Horizon + Thresholds', benchmark: '0.82+ Precision', role: 'Lifts baseline predictability from 0.50 random walk to production reliability' },
                { module: 'Model Checkpointing', tech: 'TorchScript / ONNX', benchmark: 'Portable Weights', role: 'Serialization for optimized inference deployment across targets' },
                { module: 'Compute Pipeline', tech: 'CUDA / cuDNN', benchmark: 'Parallelized Tensors', role: 'Multi-GPU data parallelism and memory-efficient batching' }
            ]
        },
        scikit_opencv: {
            id: 'scikit_opencv',
            title: 'SCIKIT-LEARN & OPENCV',
            subtitle: 'Classical Machine Learning & Computer Vision',
            exec: 'CV_SCIKIT_PIPELINE.SYS // VISION & ML',
            category: 'frameworks',
            catTag: 'Machine Learning & Vision',
            metaTag: '// REAL-TIME PROCESSING',
            desc: 'Predictive modeling, cross-validation tuning, and real-time computer vision pipelines.',
            bullets: [],
            stack: ['Scikit-learn', 'OpenCV', 'Feature Engineering', 'Pipelines', 'Computer Vision'],
            menu: ['FILE', 'CLASSIFIERS', 'OPENCV_FILTERS', 'METRICS'],
            menuStatus: 'PIPELINE: FIT // F1-SCORE OPTIMIZED',
            path: 'C:\\SKILLS\\CV_ML\\SCIKIT_OPENCV',
            repo: 'https://github.com/granthx/real-time-sign-language-recognition',
            note: 'robust signal processing meets high-accuracy ML ↗',
            icon: '👁️',
            metrics: [{ val: '98%+', lbl: 'Sign CV Accuracy' }, { val: 'Scikit', lbl: 'Pipelines' }, { val: 'OpenCV', lbl: '60+ FPS CV' }],
            color: '#0A0A0A',
            defaultX: 240,
            defaultY: 40,
            tableStatus: 'CONVERGED',
            projects: [
                {
                    name: 'real-time-sign-language-recognition',
                    tag: '60+ FPS Real-Time CV & ML',
                    repoUrl: 'https://github.com/granthx/real-time-sign-language-recognition',
                    role: 'Constructed real-time hand gesture recognition system capturing video via OpenCV, extracting 21 3D spatial hand landmarks with MediaPipe, and classifying signs using a Scikit-Learn Random Forest ensemble with 98%+ accuracy.',
                    next: 'Extending landmark tracking to two-handed continuous gesture streams with dynamic temporal windowing.',
                    tech: ['OpenCV', 'MediaPipe Hands', 'Scikit-learn Random Forest', 'Pickle']
                },
                {
                    name: 'Stock-Market-Prediction-',
                    tag: 'Ensemble ML & Directional Precision',
                    predictability: '0.50 baseline → 0.80+ valid score via TimeSeriesSplit',
                    repoUrl: 'https://github.com/granthx/Stock-Market-Prediction-',
                    role: 'Engineered leak-free Scikit-learn pipelines with TimeSeriesSplit cross-validation, lifting directional classification predictability from a random 0.50 baseline to a validated 0.80+ score via rolling technical indicators.',
                    next: 'Automated hyperparameter optimization via Optuna Bayesian search over ensemble weights.',
                    tech: ['Scikit-learn Pipelines', 'TimeSeriesSplit', 'ROC-AUC Optimization', 'Ensemble Trees']
                },
                {
                    name: 'Content-based-movie-recommendation-system',
                    tag: 'Vector Space & Cosine Similarity',
                    repoUrl: 'https://github.com/granthx/Content-based-movie-recommendation-system',
                    role: 'Engineered text feature extraction using Scikit-learn CountVectorizer and high-dimensional cosine similarity matrices across multi-attribute metadata for real-time recommendation retrieval.',
                    next: 'Hybridizing collaborative filtering matrix factorization with content vectors.',
                    tech: ['Scikit-learn', 'CountVectorizer', 'Cosine Distance', 'Feature Pipelines']
                },
                {
                    name: 'MargSetu (DelhiJalNav)',
                    tag: 'Edge Computer Vision Road Detection',
                    repoUrl: 'https://github.com/granthx/MargSetu',
                    role: 'Applied spatial OpenCV edge filtering, morphological operations, and bounding-box segmentation to detect potholes and road hazards from live vehicular camera feeds.',
                    next: 'Porting OpenCV pipeline to TensorRT for ultra-low-power edge deployment on Jetson Nano.',
                    tech: ['OpenCV Spatial Filters', 'Contour Detection', 'Frame Analysis']
                }
            ],
            specsTable: [
                { module: 'Estimator Pipelines', tech: 'Scikit-learn Pipeline', benchmark: 'Cross-Validated', role: 'Leak-free data transformations, scaling, and estimator execution' },
                { module: 'Image Processing Core', tech: 'OpenCV (cv2)', benchmark: '60+ FPS Real-Time', role: 'Contour extraction, spatial filtering, Hough transforms & thresholding' },
                { module: 'Model Validation', tech: 'Stratified K-Fold / GridSearch', benchmark: 'Zero Leakage', role: 'ROC-AUC, precision-recall curve optimization, and confusion matrices' },
                { module: 'Feature Extraction', tech: 'SIFT / ORB / PCA', benchmark: 'Dimensionality Red.', role: 'Visual descriptors, eigen-features, and sparse matrix representations' }
            ]
        },
        numpy_pandas: {
            id: 'numpy_pandas',
            title: 'NUMPY & PANDAS',
            subtitle: 'High-Performance Vectorized Math & Data Engineering',
            exec: 'NUMPY_PANDAS_CORE.SYS // VECTOR ENGINE',
            category: 'frameworks',
            catTag: 'Data Manipulation & Numerical Computing',
            metaTag: '// SIMD VECTORIZED',
            desc: 'High-throughput exploratory data analysis, vectorized numerical computation, and robust ETL pipelines.',
            bullets: [],
            stack: ['NumPy', 'Pandas', 'Vectorized Ops', 'ETL Pipelines', 'Data Cleansing', 'SIMD'],
            menu: ['FILE', 'NDARRAY', 'DATAFRAME', 'STATISTICS'],
            menuStatus: 'MEMORY: ZERO-COPY // VECTORIZED',
            path: 'C:\\SKILLS\\DATA\\NUMPY_PANDAS',
            repo: 'https://github.com/granthx/Stock-Market-Prediction-',
            note: 'clean data is the foundation of powerful intelligence ↗',
            icon: '📊',
            metrics: [{ val: 'Zero-Copy', lbl: 'Broadcasting' }, { val: '10x-100x', lbl: 'Vector Speedup' }, { val: 'ETL', lbl: 'Pipelines' }],
            color: '#0A0A0A',
            defaultX: 260,
            defaultY: 50,
            tableStatus: 'PARSED',
            projects: [
                {
                    name: 'Stock-Market-Prediction-',
                    tag: 'Vectorized Rolling Indicators',
                    repoUrl: 'https://github.com/granthx/Stock-Market-Prediction-',
                    role: 'Designed high-performance vectorized feature calculation across financial time-series using NumPy broadcasting and Pandas rolling window calculations, slashing feature engineering latency by over 85%.',
                    next: 'Porting memory-heavy aggregations to Polars / Arrow for zero-copy multi-threaded ETL execution.',
                    tech: ['NumPy ndarray', 'Pandas Rolling Windows', 'Vectorized Broadcasting', 'DatetimeIndex']
                },
                {
                    name: 'time-series-forecast',
                    tag: 'Temporal Sequence Formatting',
                    repoUrl: 'https://github.com/granthx/time-series-forecast',
                    role: 'Executed seasonal decomposition, moving average smoothing, and array reshaping into sliding input-output window matrices for LSTM tensor ingestion.',
                    next: 'Automated feature drift detection across incoming data windows.',
                    tech: ['NumPy Arrays', 'Pandas Resampling', 'MinMaxScaler', 'Array Strides']
                },
                {
                    name: 'real-time-sign-language-recognition',
                    tag: '63-D Landmark Normalization',
                    repoUrl: 'https://github.com/granthx/real-time-sign-language-recognition',
                    role: 'Performed zero-copy NumPy array normalizations on 63 raw spatial coordinates per frame to ensure invariant scale against camera depth fluctuations.',
                    next: 'SIMD-accelerated coordinate centering using vectorized NumPy einsum operations.',
                    tech: ['NumPy Vector Math', 'Zero-Copy Slicing', 'Coordinate Normalization']
                },
                {
                    name: 'KiranaMate',
                    tag: 'High-Throughput Financial ETL',
                    repoUrl: 'https://github.com/granthx/KiranaMate',
                    role: 'Engineered tabular transaction ingestion and cash-flow reconciliation routines using Pandas GroupBy and window transforms for real-time merchant credit calculation.',
                    next: 'Streaming transaction ingestion using DuckDB embedded query engine.',
                    tech: ['Pandas DataFrames', 'ETL Pipelines', 'GroupBy Aggregations']
                }
            ],
            specsTable: [
                { module: 'Vectorized Arrays', tech: 'NumPy ndarray', benchmark: 'C-Contiguous Strides', role: 'Linear algebraic solvers, dot products, and SIMD broadcast algebra' },
                { module: 'Tabular Manipulation', tech: 'Pandas DataFrames', benchmark: 'Chunked Ingestion', role: 'GroupBy transformations, rolling windows, pivots, and merges' },
                { module: 'Time-Series Engine', tech: 'Pandas DatetimeIndex', benchmark: 'Sub-sec Resampling', role: 'Rolling lookbacks, lag feature creation, and calendar frequency shifts' },
                { module: 'Memory Optimization', tech: 'Downcasting & Categoricals', benchmark: '-70% RAM Footprint', role: 'Efficient datatype casting and memory-mapped file arrays' }
            ]
        },
        languages_core: {
            id: 'languages_core',
            title: 'PROGRAMMING LANGUAGES',
            subtitle: 'Python, SQL, C++, and C',
            exec: 'POLYGLOT_COMPILER.BIN // CORE LANGUAGES',
            category: 'languages',
            catTag: 'Systems & Logic Foundation',
            metaTag: '// LOW & HIGH LEVEL',
            desc: 'Robust programming expertise bridging low-level memory control with high-level AI orchestration.',
            bullets: [],
            stack: ['Python', 'SQL', 'C++', 'C', 'AsyncIO', 'Data Structures', 'Pointers'],
            menu: ['FILE', 'PYTHON3', 'CPP_CLANG', 'SQL_DIALECTS'],
            menuStatus: 'BUILD: CLEAN // 0 COMPILATION ERRORS',
            path: 'C:\\SKILLS\\LANGUAGES\\CORE_POLYGLOT',
            repo: 'https://github.com/granthx/KiranaMate',
            note: 'from silicon-level pointers to agentic abstractions ↗',
            icon: '💻',
            metrics: [{ val: 'Python', lbl: 'Async & Typing' }, { val: 'SQL', lbl: 'Advanced CTEs' }, { val: 'C/C++', lbl: 'Memory Control' }],
            color: '#0A0A0A',
            defaultX: 230,
            defaultY: 20,
            tableStatus: 'COMPILED',
            projects: [
                {
                    name: 'KiranaMate & healthcare-guardrails-agent',
                    tag: 'Async Python 3.11+ & Pydantic',
                    repoUrl: 'https://github.com/granthx/KiranaMate',
                    role: 'Engineered asynchronous high-throughput microservices using modern Python 3.11+, FastAPI, Pydantic v2 strict typing schemas, and non-blocking asyncio event loops.',
                    next: 'Benchmarking uvloop event loops and Rust-backed Python extensions for extreme I/O throughput.',
                    tech: ['Python 3.11+', 'FastAPI', 'AsyncIO', 'Pydantic v2', 'Type Hints']
                },
                {
                    name: 'Merchant Ledger Engine (SQL)',
                    tag: 'ACID Relational Queries & CTEs',
                    repoUrl: 'https://github.com/granthx/KiranaMate',
                    role: 'Designed relational transactional schemas with complex SQL CTEs, indexing strategies, and windowing functions to track merchant credit ledgers without data inconsistency.',
                    next: 'Partitioned time-series tables with automated archiving policies.',
                    tech: ['PostgreSQL', 'SQLite', 'Recursive CTEs', 'Transaction Isolation']
                },
                {
                    name: 'MargSetu (C / C++ / TypeScript)',
                    tag: 'Low-Latency Edge Compute',
                    repoUrl: 'https://github.com/granthx/MargSetu',
                    role: 'Implemented memory-efficient data structures, pointer manipulations, and low-latency algorithmic loops for real-time edge telemetry and camera processing.',
                    next: 'Modern C++20 coroutines for asynchronous sensor stream decoding.',
                    tech: ['C++', 'C Memory Management', 'Pointers', 'TypeScript']
                }
            ],
            specsTable: [
                { module: 'Python 3.11+', tech: 'AsyncIO, Pydantic, Typing', benchmark: 'Asynchronous IO', role: 'High-concurrency services, generators, decorators & typing protocols' },
                { module: 'Relational SQL', tech: 'ANSI SQL, CTEs, Windowing', benchmark: 'Index-Optimized', role: 'Complex joins, recursive queries, transaction isolation & EXPLAIN plans' },
                { module: 'C++ (C++17/20)', tech: 'STL, Templates, RAII', benchmark: 'Zero-Cost Abstraction', role: 'Cache-friendly algorithms, custom allocators & smart pointers' },
                { module: 'C (C99/C11)', tech: 'Memory & Pointers', benchmark: 'Bare-Metal Speed', role: 'Struct alignments, manual malloc/free, bitwise math & POSIX syscalls' }
            ]
        },
        databases_matrix: {
            id: 'databases_matrix',
            title: 'DATABASES & VECTOR STORES',
            subtitle: 'PostgreSQL, MySQL, Redis, FAISS, SQLite, Supabase',
            exec: 'DATABASE_CLUSTER.SYS // STORAGE & RETRIEVAL',
            category: 'languages',
            catTag: 'Storage, Caching & Vector Indices',
            metaTag: '// ACID & VECTOR SEARCH',
            desc: 'Database architecture across relational systems, in-memory caching, vector similarity indexes, and serverless backends.',
            bullets: [],
            stack: ['PostgreSQL', 'MySQL', 'Redis', 'FAISS', 'SQLite', 'Supabase'],
            menu: ['FILE', 'POSTGRES', 'REDIS_CACHE', 'FAISS_INDEX'],
            menuStatus: 'CONNECTIONS: POOLED // LATENCY < 5MS',
            path: 'C:\\SKILLS\\DATABASES\\CLUSTER_TOPOLOGY',
            repo: 'https://github.com/granthx/RAG_yt_chatbot',
            note: 'persisted with integrity, retrieved in milliseconds ↗',
            icon: '🗄️',
            metrics: [{ val: '6 Stores', lbl: 'SQL & Vector' }, { val: '<5ms', lbl: 'Cache Reads' }, { val: 'ACID', lbl: 'Guaranteed' }],
            color: '#0A0A0A',
            defaultX: 250,
            defaultY: 30,
            tableStatus: 'CONNECTED',
            projects: [
                {
                    name: 'RAG_yt_chatbot',
                    tag: 'FAISS Vector Similarity Index',
                    repoUrl: 'https://github.com/granthx/RAG_yt_chatbot',
                    role: 'Architected FAISS vector store with Euclidean/cosine similarity metrics for indexing dense YouTube transcript embeddings, achieving sub-50ms query retrieval.',
                    next: 'HNSW index quantization (IVF-PQ) for sub-10ms scaling to 10M+ chunks.',
                    tech: ['FAISS', 'Vector Similarity', 'Nearest Neighbor Indexing']
                },
                {
                    name: 'KiranaMate',
                    tag: 'Multi-Tier Relational & Graph Persistence',
                    repoUrl: 'https://github.com/granthx/KiranaMate',
                    role: 'Designed multi-tier data architecture: PostgreSQL / SQLite for relational customer credit ledgers, Cognee knowledge graph memory for semantic merchant retrieval, and Redis for TTL session caching.',
                    next: 'Multi-region Redis cluster replication and read-replica routing.',
                    tech: ['PostgreSQL', 'SQLite', 'Redis', 'Cognee Knowledge Graph']
                },
                {
                    name: 'healthcare-guardrails-agent',
                    tag: 'Checkpointed Agent Storage',
                    repoUrl: 'https://github.com/granthx/healthcare-guardrails-agent',
                    role: 'Deployed checkpoint storage layers to preserve state across Human-in-the-Loop review cycles with serialized session snapshots.',
                    next: 'Encrypted audit vaults with immutable hash chaining for compliance logs.',
                    tech: ['Checkpointer Stores', 'State Serialization', 'ACID Audit Trails']
                }
            ],
            specsTable: [
                { module: 'Relational DBMS', tech: 'PostgreSQL & MySQL', benchmark: 'ACID Compliant', role: 'Relational schema design, foreign keys, B-Tree indexes & connection pooling' },
                { module: 'In-Memory Cache', tech: 'Redis', benchmark: 'Sub-millisecond', role: 'Session storage, rate limiting, pub/sub queues, and TTL cache eviction' },
                { module: 'Vector Similarity', tech: 'FAISS', benchmark: 'HNSW Indexing', role: 'Million-scale vector nearest neighbor search for embeddings and RAG' },
                { module: 'Serverless & Embedded', tech: 'Supabase & SQLite', benchmark: 'Instant Sync', role: 'Cloud auth + realtime PostgreSQL triggers, and embedded zero-config files' }
            ]
        }
    };

    // Backwards compatibility alias
    const PROJECTS_CATALOG = SKILLS_CATALOG;

    // Window states map
    const windowStates = {};
    Object.keys(SKILLS_CATALOG).forEach(id => {
        const p = SKILLS_CATALOG[id];
        windowStates[id] = {
            isOpen: (id === 'aiml_core'), // Agentic AI is open by default
            isMinimized: false,
            isMaximized: false,
            x: p.defaultX,
            y: p.defaultY,
            zIndex: id === 'aiml_core' ? 10 : 8
        };
    });

    let topZIndex = 15;
    let focusedId = 'aiml_core';

    // SVG Artwork generator for dynamic skill windows
    function getSvgForProject(id) {
        return '';
    }

    // Real-world project implementation renderer
    function getProjectsHtml(p) {
        if (!p || !p.projects || !p.projects.length) return '';
        return `
            <!-- Real-World Implementations & Provenance -->
            <div class="provenance-block mb-3 border-2 border-[#101A3A] bg-[#F7F9FF] shadow-[2px_2px_0px_#101A3A] overflow-hidden w-full">
                <div class="bg-[#101A3A] px-3 py-1.5 flex items-center justify-between text-white font-mono text-[9px] font-bold">
                    <span class="flex items-center gap-1.5">
                        <span class="w-2 h-2 rounded-full bg-[var(--red)] shadow-[0_0_6px_var(--red)] animate-pulse"></span>
                        <span class="tracking-wider">// REAL-WORLD PROJECTS WHERE I USED THIS SKILL</span>
                    </span>
                    <span class="text-[#8DE254] font-mono tracking-tight uppercase">${p.projects.length} REPOSITORIES VERIFIED</span>
                </div>
                <div class="p-2 sm:p-2.5 flex flex-col gap-2.5 bg-white">
                    ${p.projects.map(proj => `
                        <div class="border-2 border-[#101A3A] bg-[#FDFDFE] p-2.5 sm:p-3 hover:border-[var(--red)] hover:shadow-[3px_3px_0px_var(--red)] transition-all">
                            <div class="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
                                <div class="flex items-center gap-2 flex-wrap">
                                    <span class="font-mono text-xs sm:text-sm font-bold text-[#0A0A0A] tracking-tight">${proj.name}</span>
                                    <span class="border border-[#101A3A] bg-[var(--red)] text-white px-1.5 py-0.5 text-[9px] font-mono font-bold shadow-[1px_1px_0_#101A3A]">${proj.tag}</span>
                                </div>
                                <a href="${proj.repoUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-0.5 sm:py-1 bg-[#012CEB] text-white text-[9px] sm:text-[10px] font-mono font-bold hover:bg-[var(--red-hot)] hover:text-white transition-colors inline-flex items-center gap-1 shrink-0 shadow-[2px_2px_0_var(--red)]">
                                    <span>VIEW REPO</span>
                                    <span>↗</span>
                                </a>
                            </div>

                            ${proj.predictability ? `
                                <div class="border border-[#101A3A] bg-[#FFFBEB] text-[#92400E] px-2 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold mb-1.5 flex items-center gap-1.5 shadow-[1px_1px_0_#101A3A]">
                                    <span class="w-2 h-2 rounded-full bg-[#D97706] animate-pulse"></span>
                                    <span>📈 PREDICTABILITY CALIBRATION: ${proj.predictability}</span>
                                </div>
                            ` : ''}

                            <div class="mb-1.5">
                                <span class="text-[var(--red)] font-bold uppercase font-mono text-[9px] block mb-0.5">// HOW I USED THIS SKILL IN BUSINESS PROJECTS:</span>
                                <p class="font-['DM_Sans'] text-xs sm:text-[12.5px] leading-relaxed text-[#101A3A] m-0 font-medium">
                                    ${proj.role}
                                </p>
                            </div>

                            ${proj.next ? `
                                <div class="mb-1.5 bg-[#F8FAFC] border-l-2 border-[#3B82F6] pl-2 py-0.5">
                                    <span class="text-[#1E40AF] font-bold uppercase font-mono text-[8.5px] block mb-0.5">// WHAT I'M DOING NEXT WITH THIS SKILL:</span>
                                    <p class="font-['DM_Sans'] text-[11.5px] sm:text-xs leading-relaxed text-[#1E293B] m-0">
                                        ${proj.next}
                                    </p>
                                </div>
                            ` : ''}

                            <div class="flex flex-wrap gap-1 mt-1">
                                ${proj.tech.map(t => `<span class="border border-[#101A3A]/30 bg-[#F7F9FF] px-1.5 py-0.5 text-[8.5px] font-mono font-semibold text-[#101A3A]">${t}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Architecture & Specifications Table renderer
    function getSpecsHtml(p) {
        if (!p.specsTable || !p.specsTable.length) return '';
        return `
            <!-- Technical Architecture & System Specification Table -->
            <div class="mt-3 border-2 border-[#101A3A] bg-[#F7F9FF] shadow-[2px_2px_0px_#101A3A] overflow-hidden w-full">
                <div class="bg-[#101A3A] px-2.5 py-1.5 flex items-center justify-between text-white font-mono text-[9px] font-bold">
                    <span>// SYSTEM SPECIFICATION & ARCHITECTURE BENCHMARKS</span>
                    <span class="text-[#8DE254]">STATUS: ${p.tableStatus || 'VERIFIED'}</span>
                </div>
                <div class="overflow-x-auto no-scrollbar">
                    <table class="w-full text-left border-collapse text-[9.5px] font-mono">
                        <thead>
                            <tr class="bg-[#F4F4F6] border-b-2 border-[#101A3A] text-[#101A3A] text-[9px] font-bold uppercase tracking-wider">
                                <th class="p-1.5 sm:p-2 border-r border-[#101A3A]/20">Module / Pipeline</th>
                                <th class="p-1.5 sm:p-2 border-r border-[#101A3A]/20">Technology</th>
                                <th class="p-1.5 sm:p-2 border-r border-[#101A3A]/20">Benchmark / Specs</th>
                                <th class="p-1.5 sm:p-2">Operational Role</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#101A3A]/15 text-[#101A3A] bg-white">
                            ${p.specsTable.map(row => `
                                <tr class="hover:bg-[#F0F4FF] transition-colors">
                                    <td class="p-1.5 sm:p-2 font-bold border-r border-[#101A3A]/20 text-[#0A0A0A]">${row.module}</td>
                                    <td class="p-1.5 sm:p-2 border-r border-[#101A3A]/20">${row.tech}</td>
                                    <td class="p-1.5 sm:p-2 border-r border-[#101A3A]/20 font-bold text-[var(--red)]">${row.benchmark}</td>
                                    <td class="p-1.5 sm:p-2">${row.role}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Window scroll body generator (project-first, no generic definitions)
    function getWindowScrollContent(id, p) {
        const metricsHtml = p.metrics.map(m => `
            <div class="border-2 border-[#101A3A] bg-[#F7F9FF] p-1.5 sm:p-2 shadow-[2px_2px_0_#101A3A] text-center">
                <span class="font-['Bebas_Neue'] text-xl sm:text-2xl text-[#0A0A0A] block leading-none">${m.val}</span>
                <span class="font-mono text-[8px] sm:text-[9px] uppercase font-bold text-[#101A3A] tracking-wider block mt-0.5">${m.lbl}</span>
            </div>
        `).join('');

        const projectsHtml = getProjectsHtml(p);
        const specsHtml = getSpecsHtml(p);

        return `
            <!-- Window Header with Module Name & Project Count -->
            <div class="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#101A3A] pb-2 mb-2.5 bg-[#FDFDFE]">
                <div>
                    <span class="font-['Bebas_Neue'] text-2xl sm:text-3xl tracking-wider text-[#101A3A] block leading-none">${p.title}</span>
                    <span class="font-mono text-[9px] sm:text-[10px] text-[#0A0A0A] font-bold block mt-0.5 tracking-tight">// PRODUCTION IMPLEMENTATIONS &amp; REPOSITORIES</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <span class="inline-block border border-[#0A0A0A] bg-[#2448E8] text-white px-2 py-0.5 text-[9px] font-mono font-bold uppercase">${p.catTag}</span>
                    <span class="inline-block border border-[#101A3A] bg-[var(--red)] text-white px-2 py-0.5 text-[9px] font-mono font-bold uppercase shadow-[1px_1px_0_#101A3A]">${p.projects.length} PROJECTS</span>
                </div>
            </div>

            <!-- Key Metrics Bar -->
            <div class="grid grid-cols-3 gap-1.5 sm:gap-2 mb-2.5">
                ${metricsHtml}
            </div>

            <!-- 1. REAL-WORLD PROJECTS WHERE I USED THIS SKILL (AT TOP - NO SCROLLING NEEDED) -->
            ${projectsHtml}

            <!-- 2. SYSTEM ARCHITECTURE & BENCHMARK SPECS -->
            ${specsHtml}
        `;
    }

    // Ensures DOM element exists for any project
    function ensureProjectWindow(id) {
        let winEl = document.getElementById(`window-${id}`);
        const p = PROJECTS_CATALOG[id];
        if (!p) return null;

        if (!winEl) {
            const container = document.getElementById('desktop-windows-container');
            if (!container) return null;

            winEl = document.createElement('div');
            winEl.id = `window-${id}`;
            winEl.className = 'retro-window is-inactive pointer-events-auto w-[96%] sm:w-[680px] md:w-[760px] lg:w-[820px] xl:w-[860px] max-w-full hidden';
            winEl.style.left = `${windowStates[id].x}px`;
            winEl.style.top = `${windowStates[id].y}px`;
            winEl.style.zIndex = windowStates[id].zIndex;

            const menuItemsHtml = p.menu.map(m => `
                <span class="hover:underline cursor-pointer">${m}</span>
            `).join('');

            winEl.innerHTML = `
                <!-- Titlebar -->
                <div class="retro-titlebar flex items-center justify-between px-3 py-1.5" data-window-id="${id}">
                    <div class="flex items-center gap-2 pointer-events-none truncate pr-2">
                        <span class="w-3.5 h-3.5 bg-white border border-[#101A3A] inline-flex items-center justify-center text-[#0A0A0A] font-mono text-[9px] font-bold shrink-0">${p.icon}</span>
                        <span class="font-mono text-xs font-bold tracking-wider truncate">${p.exec}</span>
                    </div>
                    <div class="flex items-center gap-1.5 shrink-0 pointer-events-auto">
                        <button type="button" class="retro-btn-ctrl" data-action="minimize" data-target="${id}" title="Minimize Window (Apple Genie)">_</button>
                        <button type="button" class="retro-btn-ctrl" data-action="maximize" data-target="${id}" title="Maximize Window">□</button>
                        <button type="button" class="retro-btn-ctrl retro-btn-close" data-action="close" data-target="${id}" title="Close Window">✕</button>
                    </div>
                </div>

                <!-- Menu Ribbon -->
                <div class="bg-[#F7F9FF] border-b-2 border-[#101A3A] px-3 py-1 flex items-center justify-between text-[10px] font-mono text-[#101A3A]">
                    <div class="flex gap-3 font-semibold">
                        ${menuItemsHtml}
                    </div>
                    <div class="text-[#0A0A0A] font-bold uppercase tracking-tight">${p.menuStatus}</div>
                </div>

                <!-- Content Body (Project-First, No Explanation Needed) -->
                <div class="retro-window-scroll p-3 sm:p-4 max-h-[500px] md:max-h-[540px] overflow-y-auto bg-white text-[#101A3A]" data-project-first="true" data-lenis-prevent>
                    ${getWindowScrollContent(id, p)}
                </div>

                <!-- Footer Status Bar -->
                <div class="bg-[#EDF2FF] border-t-2 border-[#101A3A] px-3 py-1.5 flex items-center justify-between text-[11px] font-mono text-[#101A3A]">
                    <span class="font-bold text-[#101A3A]/70 text-[10px]">${p.path}</span>
                    <a href="${p.repo}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-0.5 bg-[#2448E8] text-white border border-[#101A3A] font-bold text-[10px] hover:bg-[#012CEB] shadow-[1px_1px_0_#101A3A] active:translate-x-0.5 active:translate-y-0.5 inline-flex items-center gap-1">
                        <span>VIEW REPO</span>
                        <span>↗</span>
                    </a>
                </div>
            `;

            winEl.setAttribute('data-lenis-prevent', 'true');
            container.appendChild(winEl);
            bindWindowEvents(winEl, id);
        } else {
            winEl.setAttribute('data-lenis-prevent', 'true');
            // Update pre-rendered windows to project-first layout
            const scrollArea = winEl.querySelector('.retro-window-scroll');
            if (scrollArea) {
                scrollArea.setAttribute('data-lenis-prevent', 'true');
                scrollArea.dataset.projectFirst = 'true';
                scrollArea.innerHTML = getWindowScrollContent(id, p);
            }
        }

        // Ensure taskbar tab exists
        let tab = document.getElementById(`taskbar-tab-${id}`);
        if (!tab) {
            const tabsContainer = document.getElementById('desktop-taskbar-tabs');
            if (tabsContainer) {
                tab = document.createElement('button');
                tab.type = 'button';
                tab.id = `taskbar-tab-${id}`;
                tab.className = 'retro-taskbar-tab px-2 sm:px-2.5 py-1 text-[10px] md:text-xs font-mono font-bold flex items-center gap-1 truncate';
                tab.setAttribute('data-target', id);
                tab.innerHTML = `<span class="text-[9px]">${p.icon}</span><span class="truncate">${p.title.split(' ')[0]}</span>`;
                tabsContainer.appendChild(tab);
                bindTabEvents(tab, id);
            }
        }

        return winEl;
    }

    // Bind drag and click interactions to a window
    function bindWindowEvents(winEl, id) {
        const titlebar = winEl.querySelector('.retro-titlebar');

        winEl.addEventListener('pointerdown', (e) => {
            if (e.target.closest('.retro-btn-ctrl')) return;
            focusWindow(id);
        });

        if (titlebar) {
            let isDragging = false;
            let startX = 0, startY = 0;
            let initialLeft = 0, initialTop = 0;

            titlebar.addEventListener('pointerdown', (e) => {
                if (e.target.closest('.retro-btn-ctrl')) return;
                if (windowStates[id].isMaximized || window.innerWidth < 768) return;

                isDragging = true;
                startX = e.clientX;
                startY = e.clientY;
                initialLeft = windowStates[id].x;
                initialTop = windowStates[id].y;

                titlebar.setPointerCapture(e.pointerId);
                focusWindow(id);
                e.preventDefault();
            });

            titlebar.addEventListener('pointermove', (e) => {
                if (!isDragging) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                const canvasRect = canvas.getBoundingClientRect();
                const winRect = winEl.getBoundingClientRect();

                let nextX = initialLeft + dx;
                let nextY = initialTop + dy;

                const maxX = Math.max(10, canvasRect.width - winRect.width);
                const maxY = Math.max(10, canvasRect.height - 70);

                nextX = Math.max(0, Math.min(nextX, maxX));
                nextY = Math.max(0, Math.min(nextY, maxY));

                windowStates[id].x = nextX;
                windowStates[id].y = nextY;
                winEl.style.left = `${nextX}px`;
                winEl.style.top = `${nextY}px`;
            });

            const endDrag = (e) => {
                if (isDragging) {
                    isDragging = false;
                    try { titlebar.releasePointerCapture(e.pointerId); } catch (err) { }
                }
            };
            titlebar.addEventListener('pointerup', endDrag);
            titlebar.addEventListener('pointercancel', endDrag);
        }

        winEl.querySelectorAll('.retro-btn-ctrl').forEach(btn => {
            btn.addEventListener('pointerdown', (e) => {
                e.stopPropagation();
            });
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                const action = btn.getAttribute('data-action');
                const target = btn.getAttribute('data-target') || id;
                if (action === 'minimize') minimizeWindow(target);
                else if (action === 'maximize') toggleMaximize(target);
                else if (action === 'close') closeWindow(target);
            });
        });
    }

    // Bind tab interactions
    function bindTabEvents(tab, id) {
        tab.addEventListener('click', () => {
            const state = windowStates[id];
            if (!state) return;

            const winEl = document.getElementById(`window-${id}`);
            if (winEl && winEl.dataset.isGenieAnimating === 'true') return;

            if (!state.isOpen) {
                openWindow(id, tab);
            } else if (state.isMinimized) {
                // Restore from taskbar tab using Apple Genie funnel expansion
                openWindow(id, tab);
            } else if (focusedId === id) {
                // Minimize back into taskbar tab
                minimizeWindow(id);
            } else {
                focusWindow(id);
                playSound('tick');
            }
        });
    }

    // ==========================================================================
    // APPLE GENIE ANIMATIONS (OPEN / RESTORE & MINIMIZE)
    // ==========================================================================

    function playGenieOpen(windowEl, sourceEl) {
        if (!windowEl) return;
        windowEl.dataset.isGenieAnimating = 'true';
        windowEl.classList.remove('hidden', 'is-minimized', 'genie-out');
        windowEl.style.display = 'block';

        // Force layout reflow so getBoundingClientRect() returns accurate geometry
        void windowEl.offsetWidth;

        const winRect = windowEl.getBoundingClientRect();
        const sourceRect = sourceEl ? sourceEl.getBoundingClientRect() : null;

        let startX = 0;
        let startY = 180;
        let originX = 50;
        let originY = 100;

        if (sourceRect && winRect.width > 0 && winRect.height > 0) {
            const sourceCenterX = sourceRect.left + sourceRect.width / 2;
            const sourceCenterY = sourceRect.top + sourceRect.height / 2;
            const winCenterX = winRect.left + winRect.width / 2;
            const winCenterY = winRect.top + winRect.height / 2;

            startX = sourceCenterX - winCenterX;
            startY = sourceCenterY - winCenterY;

            originX = Math.max(0, Math.min(100, ((sourceCenterX - winRect.left) / winRect.width) * 100));
            originY = 100;
        }

        windowEl.style.transformOrigin = `${originX}% ${originY}%`;

        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf(windowEl);
            gsap.fromTo(windowEl,
                {
                    opacity: 0,
                    scaleX: 0.04,
                    scaleY: 0.04,
                    x: startX,
                    y: startY,
                    clipPath: 'polygon(38% 100%, 62% 100%, 92% 0%, 8% 0%)',
                    filter: 'blur(5px)'
                },
                {
                    opacity: 1,
                    scaleX: 1,
                    scaleY: 1,
                    x: 0,
                    y: 0,
                    clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
                    filter: 'blur(0px)',
                    duration: 0.42,
                    ease: 'power3.out',
                    onComplete: () => {
                        windowEl.dataset.isGenieAnimating = 'false';
                        gsap.set(windowEl, { clearProps: 'clipPath,filter,transformOrigin,scaleX,scaleY,x,y' });
                    }
                }
            );
        } else {
            windowEl.classList.remove('genie-in');
            void windowEl.offsetWidth;
            windowEl.classList.add('genie-in');
            setTimeout(() => {
                windowEl.classList.remove('genie-in');
                windowEl.dataset.isGenieAnimating = 'false';
            }, 500);
        }
    }

    function playGenieMinimize(windowEl, targetEl, onComplete) {
        if (!windowEl) return;
        if (windowEl.dataset.isGenieAnimating === 'true') return;
        windowEl.dataset.isGenieAnimating = 'true';

        const winRect = windowEl.getBoundingClientRect();
        const targetRect = targetEl ? targetEl.getBoundingClientRect() : null;

        let destX = 0;
        let destY = 220;
        let originX = 50;
        let originY = 100;

        if (targetRect && winRect.width > 0 && winRect.height > 0) {
            const targetCenterX = targetRect.left + targetRect.width / 2;
            const targetCenterY = targetRect.top + targetRect.height / 2;
            const winCenterX = winRect.left + winRect.width / 2;
            const winCenterY = winRect.top + winRect.height / 2;

            destX = targetCenterX - winCenterX;
            destY = targetCenterY - winCenterY;

            originX = Math.max(0, Math.min(100, ((targetCenterX - winRect.left) / winRect.width) * 100));
            originY = 100;
        }

        windowEl.style.transformOrigin = `${originX}% ${originY}%`;

        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf(windowEl);
            gsap.to(windowEl, {
                opacity: 0,
                scaleX: 0.04,
                scaleY: 0.04,
                x: destX,
                y: destY,
                clipPath: 'polygon(40% 100%, 60% 100%, 95% 0%, 5% 0%)',
                filter: 'blur(5px)',
                duration: 0.38,
                ease: 'power2.in',
                onComplete: () => {
                    // CRITICAL: Hide window BEFORE clearing GSAP props so there is ZERO flash or pop!
                    windowEl.style.display = 'none';
                    windowEl.classList.add('hidden', 'is-minimized');
                    windowEl.dataset.isGenieAnimating = 'false';
                    gsap.set(windowEl, { clearProps: 'clipPath,filter,transformOrigin,scaleX,scaleY,x,y,opacity' });
                    if (onComplete) onComplete();
                }
            });
        } else {
            windowEl.classList.add('genie-out');
            setTimeout(() => {
                windowEl.style.display = 'none';
                windowEl.classList.remove('genie-out');
                windowEl.classList.add('hidden', 'is-minimized');
                windowEl.dataset.isGenieAnimating = 'false';
                if (onComplete) onComplete();
            }, 400);
        }
    }

    // Sync visual UI with state
    function syncWindowUI(id) {
        const el = document.getElementById(`window-${id}`);
        const tab = document.getElementById(`taskbar-tab-${id}`);
        const icon = document.getElementById(`desktop-icon-${id}`);
        const state = windowStates[id];
        if (!el || !state) return;

        if (!state.isOpen) {
            if (el.dataset.isClosing !== 'true') {
                el.style.display = 'none';
                el.classList.add('hidden');
            }
            el.classList.remove('is-minimized', 'is-focused');
            el.classList.add('is-inactive');
        } else if (state.isMinimized) {
            if (el.dataset.isGenieAnimating !== 'true') {
                el.style.display = 'none';
            }
            el.classList.add('hidden', 'is-minimized');
        } else {
            if (el.dataset.isGenieAnimating !== 'true' && el.dataset.isClosing !== 'true') {
                el.style.display = 'block';
            }
            el.classList.remove('hidden', 'is-minimized');
        }

        if (focusedId === id && state.isOpen && !state.isMinimized) {
            el.classList.add('is-focused');
            el.classList.remove('is-inactive');
        } else {
            el.classList.remove('is-focused');
            el.classList.add('is-inactive');
        }

        if (!state.isMaximized && window.innerWidth >= 768) {
            el.style.left = `${state.x}px`;
            el.style.top = `${state.y}px`;
        }

        el.style.zIndex = state.zIndex;

        if (tab) {
            tab.classList.remove('is-active', 'is-minimized');
            if (!state.isOpen) {
                tab.style.display = 'none';
                tab.classList.add('hidden');
            } else if (state.isMinimized) {
                tab.style.display = 'flex';
                tab.classList.remove('hidden');
                tab.style.opacity = '0.85';
                tab.classList.add('is-minimized');
            } else if (focusedId === id) {
                tab.style.display = 'flex';
                tab.classList.remove('hidden');
                tab.style.opacity = '1';
                tab.classList.add('is-active');
            } else {
                tab.style.display = 'flex';
                tab.classList.remove('hidden');
                tab.style.opacity = '0.95';
            }
        }

        if (icon) {
            if (state.isOpen && !state.isMinimized) {
                icon.classList.add('is-active');
            } else {
                icon.classList.remove('is-active');
            }
        }
    }

    function syncAll() {
        Object.keys(windowStates).forEach(syncWindowUI);
    }

    // Focus window
    function focusWindow(id) {
        if (!windowStates[id] || !windowStates[id].isOpen) return;
        windowStates[id].isMinimized = false;
        topZIndex++;
        windowStates[id].zIndex = topZIndex;
        focusedId = id;
        syncAll();
    }

    // Open window with Apple Genie effect
    function openWindow(id, triggerEl) {
        const winEl = ensureProjectWindow(id);
        if (!winEl || !windowStates[id]) return;
        if (winEl.dataset.isGenieAnimating === 'true') return;

        const wasClosedOrMinimized = !windowStates[id].isOpen || windowStates[id].isMinimized;
        windowStates[id].isOpen = true;
        windowStates[id].isMinimized = false;
        topZIndex++;
        windowStates[id].zIndex = topZIndex;
        focusedId = id;

        const source = triggerEl || document.getElementById(`taskbar-tab-${id}`) || document.getElementById(`desktop-icon-${id}`);

        if (wasClosedOrMinimized) {
            playGenieOpen(winEl, source);
        } else {
            // Small genie pop if already open
            if (typeof gsap !== 'undefined') {
                gsap.fromTo(winEl, { scale: 0.97 }, { scale: 1, duration: 0.22, ease: 'back.out(2)' });
            }
        }

        syncAll();
        playSound('pop');
    }

    // Close window with smooth dismiss animation
    function closeWindow(id) {
        if (!windowStates[id]) return;
        windowStates[id].isOpen = false;
        windowStates[id].isMaximized = false;
        windowStates[id].isMinimized = false;

        const el = document.getElementById(`window-${id}`);
        if (el) {
            el.classList.remove('is-maximized', 'is-focused');
            el.classList.add('is-inactive');
            el.dataset.isGenieAnimating = 'false';

            if (typeof gsap !== 'undefined') {
                el.dataset.isClosing = 'true';
                gsap.killTweensOf(el);
                gsap.to(el, {
                    scale: 0.88,
                    opacity: 0,
                    duration: 0.16,
                    ease: 'power2.in',
                    onComplete: () => {
                        el.dataset.isClosing = 'false';
                        el.style.display = 'none';
                        el.classList.add('hidden');
                        gsap.set(el, { clearProps: 'transform,scale,opacity' });
                        el.style.display = 'none';
                        syncWindowUI(id);
                    }
                });
            } else {
                el.dataset.isClosing = 'false';
                el.style.display = 'none';
                el.classList.add('hidden');
            }
        }

        if (focusedId === id) {
            const otherOpen = Object.keys(windowStates).find(k => k !== id && windowStates[k].isOpen && !windowStates[k].isMinimized);
            focusedId = otherOpen || null;
        }
        syncAll();
        playSound('pop');
    }

    // Minimize window with Apple Genie suction effect
    function minimizeWindow(id) {
        if (!windowStates[id]) return;
        const winEl = document.getElementById(`window-${id}`);
        const tabEl = document.getElementById(`taskbar-tab-${id}`);
        if (winEl && winEl.dataset.isGenieAnimating === 'true') return;

        if (tabEl) {
            tabEl.classList.add('is-minimized');
            tabEl.classList.remove('is-active');
            tabEl.style.opacity = '0.85';
        }

        playGenieMinimize(winEl, tabEl, () => {
            windowStates[id].isMinimized = true;
            if (focusedId === id) {
                const otherOpen = Object.keys(windowStates).find(k => k !== id && windowStates[k].isOpen && !windowStates[k].isMinimized);
                if (otherOpen) focusedId = otherOpen;
            }
            syncAll();
        });

        playSound('click');
    }

    // Toggle maximize
    function toggleMaximize(id) {
        if (!windowStates[id]) return;
        const el = document.getElementById(`window-${id}`);
        if (!el) return;
        windowStates[id].isMaximized = !windowStates[id].isMaximized;
        if (windowStates[id].isMaximized) {
            el.classList.add('is-maximized');
        } else {
            el.classList.remove('is-maximized');
            el.style.left = `${windowStates[id].x}px`;
            el.style.top = `${windowStates[id].y}px`;
        }
        focusWindow(id);
        playSound('click');
    }

    // Initial binding for all skill windows (ensure provenance blocks & handlers are initialized)
    Object.keys(PROJECTS_CATALOG).forEach(id => {
        ensureProjectWindow(id);
        const el = document.getElementById(`window-${id}`);
        if (el) bindWindowEvents(el, id);
        const tab = document.getElementById(`taskbar-tab-${id}`);
        if (tab) bindTabEvents(tab, id);
    });

    // Delegated click handler on canvas for window controls (close, minimize, maximize)
    canvas.addEventListener('click', (e) => {
        const btn = e.target.closest('.retro-btn-ctrl');
        if (!btn) return;
        e.stopPropagation();
        e.preventDefault();
        const action = btn.getAttribute('data-action');
        const target = btn.getAttribute('data-target');
        if (!target) return;
        if (action === 'close') closeWindow(target);
        else if (action === 'minimize') minimizeWindow(target);
        else if (action === 'maximize') toggleMaximize(target);
    });

    // Scroll the skill window when cursor is on an open skill window or a skill shortcut button
    canvas.addEventListener('wheel', (e) => {
        let targetWin = e.target.closest('.retro-window');
        if (!targetWin) {
            const shortcut = e.target.closest('.retro-icon-shortcut');
            if (shortcut) {
                const projId = shortcut.getAttribute('data-project');
                if (projId && windowStates[projId]?.isOpen && !windowStates[projId]?.isMinimized) {
                    targetWin = document.getElementById(`window-${projId}`);
                } else if (focusedId && windowStates[focusedId]?.isOpen && !windowStates[focusedId]?.isMinimized) {
                    targetWin = document.getElementById(`window-${focusedId}`);
                }
            }
        }
        if (targetWin && !targetWin.classList.contains('hidden')) {
            const scrollArea = targetWin.querySelector('.retro-window-scroll');
            if (scrollArea) {
                e.preventDefault();
                e.stopPropagation();
                scrollArea.scrollTop += e.deltaY;
            }
        }
    }, { passive: false });

    // Bind all desktop shortcut icons (all 11 projects)
    Object.keys(PROJECTS_CATALOG).forEach(id => {
        const iconBtn = document.getElementById(`desktop-icon-${id}`);
        if (iconBtn) {
            iconBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openWindow(id, iconBtn);
            });
        }
    });

    // Bind Category Filter Pills (ALL, AGENTS, VISION, ML)
    const catPills = document.querySelectorAll('.retro-cat-pill');
    const iconShortcuts = document.querySelectorAll('.retro-icon-shortcut');

    catPills.forEach(pill => {
        pill.addEventListener('click', () => {
            catPills.forEach(p => p.classList.remove('is-active'));
            pill.classList.add('is-active');

            const selectedCat = pill.getAttribute('data-cat');
            iconShortcuts.forEach(icon => {
                const iconCats = (icon.getAttribute('data-cat') || '').split(/\s+/);
                if (selectedCat === 'all' || iconCats.includes(selectedCat)) {
                    icon.style.display = 'flex';
                } else {
                    icon.style.display = 'none';
                }
            });
            playSound('tick');
        });
    });

    // Cascade workspace
    const cascadeBtn = document.getElementById('btn-cascade-workspace');
    if (cascadeBtn) {
        cascadeBtn.addEventListener('click', () => {
            let offsetIndex = 0;
            Object.keys(PROJECTS_CATALOG).forEach(id => {
                if (windowStates[id] && windowStates[id].isOpen) {
                    windowStates[id].isMinimized = false;
                    windowStates[id].isMaximized = false;
                    windowStates[id].x = 120 + (offsetIndex * 50);
                    windowStates[id].y = 20 + (offsetIndex * 35);
                    windowStates[id].zIndex = ++topZIndex;
                    const el = document.getElementById(`window-${id}`);
                    if (el) el.classList.remove('is-maximized');
                    offsetIndex++;
                }
            });
            syncAll();
            playSound('click');
        });
    }

    // Flagship open button
    const openAllBtn = document.getElementById('btn-open-all-workspace');
    if (openAllBtn) {
        openAllBtn.addEventListener('click', () => {
            let offsetIndex = 0;
            ['aiml_core', 'langgraph_langsmith', 'rag_multimodal'].forEach(id => {
                ensureProjectWindow(id);
                windowStates[id].isOpen = true;
                windowStates[id].isMinimized = false;
                windowStates[id].isMaximized = false;
                windowStates[id].x = 130 + (offsetIndex * 70);
                windowStates[id].y = 20 + (offsetIndex * 45);
                windowStates[id].zIndex = ++topZIndex;
                const el = document.getElementById(`window-${id}`);
                if (el) el.classList.remove('is-maximized');
                offsetIndex++;
            });
            focusedId = 'aiml_core';
            syncAll();
            playSound('pop');
        });
    }

    // Reset workspace
    function resetDesktop() {
        Object.keys(PROJECTS_CATALOG).forEach((id) => {
            const p = PROJECTS_CATALOG[id];
            windowStates[id] = {
                isOpen: (id === 'aiml_core'),
                isMinimized: false,
                isMaximized: false,
                x: p.defaultX,
                y: p.defaultY,
                zIndex: id === 'aiml_core' ? 10 : 8
            };
            const el = document.getElementById(`window-${id}`);
            if (el) el.classList.remove('is-maximized');
        });
        topZIndex = 15;
        focusedId = 'aiml_core';
        syncAll();
        playSound('pop');
    }

    const resetBtn = document.getElementById('btn-reset-workspace');
    if (resetBtn) resetBtn.addEventListener('click', resetDesktop);
    const taskbarReset = document.getElementById('taskbar-btn-reset');
    if (taskbarReset) taskbarReset.addEventListener('click', resetDesktop);

    // Start button
    const startBtn = document.getElementById('taskbar-btn-start');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            playSound('pop');
            openWindow('aiml_core', startBtn);
        });
    }

    // Live digital clock in taskbar
    const clockEl = document.getElementById('desktop-clock');
    function updateClock() {
        if (!clockEl) return;
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        clockEl.textContent = `${h}:${m}:${s}`;
    }
    updateClock();
    setInterval(updateClock, 1000);

    // Responsive auto-adjustment on resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            Object.keys(PROJECTS_CATALOG).forEach(id => {
                const el = document.getElementById(`window-${id}`);
                if (el) {
                    el.style.left = '8px';
                    el.style.top = '8px';
                }
            });
        } else {
            syncAll();
        }
    });

    // Ensure pre-rendered and initial windows are initialized
    Object.keys(PROJECTS_CATALOG).forEach(id => {
        ensureProjectWindow(id);
    });

    // Initial render
    syncAll();
}

initRetroDesktop();

// --- STACK CURSOR LABEL ---
const stackCursorLabel = document.getElementById('stack-cursor-label');
const galleryCursorLabel = document.getElementById('gallery-cursor-label');
const dissectScrollLabel = document.getElementById('dissect-scroll-label');
let stackLabelVisible = false;
let galleryLabelVisible = false;
let dissectLabelVisible = false;

window.addEventListener('mousemove', (e) => {
    if (stackCursorLabel) {
        gsap.set(stackCursorLabel, { x: e.clientX + 18, y: e.clientY });
    }
    if (galleryCursorLabel) {
        gsap.set(galleryCursorLabel, { x: e.clientX + 18, y: e.clientY });
    }
    if (dissectScrollLabel) {
        gsap.set(dissectScrollLabel, { x: e.clientX + 18, y: e.clientY });
    }
});

const transitCsViewEl = document.getElementById('transit-case-study-view');
if (transitCsViewEl && dissectScrollLabel) {
    transitCsViewEl.addEventListener('mouseenter', () => {
        dissectLabelVisible = true;
        dissectScrollLabel.classList.add('visible');
    });
    transitCsViewEl.addEventListener('mouseleave', () => {
        dissectLabelVisible = false;
        dissectScrollLabel.classList.remove('visible');
    });
}

const cursorTrailCanvas = document.getElementById('cursor-trail-canvas');
if (cursorTrailCanvas) {
    cursorTrailCanvas.addEventListener('mouseenter', () => {
        if (!galleryLabelVisible) {
            galleryLabelVisible = true;
            galleryCursorLabel.classList.add('visible');
        }
    });
    cursorTrailCanvas.addEventListener('mouseleave', () => {
        galleryLabelVisible = false;
        galleryCursorLabel.classList.remove('visible');
    });
}

document.addEventListener('mouseover', (e) => {
    if (!stackCursorLabel) return;
    const card = e.target.closest('.stack-card');
    if (card && !stackLabelVisible) {
        stackLabelVisible = true;
        stackCursorLabel.classList.add('visible');
    }
});

document.addEventListener('mouseout', (e) => {
    if (!stackCursorLabel) return;
    const card = e.target.closest('.stack-card');
    if (card && !card.contains(e.relatedTarget)) {
        stackLabelVisible = false;
        stackCursorLabel.classList.remove('visible');
    }
});

// --- CLICK OUTSIDE CARDS TO CLOSE ---
const experienceSection = document.getElementById('experience');
if (experienceSection) {
    experienceSection.addEventListener('click', (e) => {
        if (stackOpenIdx !== -1 && !e.target.closest('.stack-card')) {
            stackOpenIdx = -1;
            updateStack(false);
        }
    });
}

// --- INTERACTIVE VENDING & 3D COVERFLOW LOGIC ---
function buildFlow() {
    const N = {
        nc: { cx: 450, y: 40, w: 220, h: 44, t: 'start', lb: ['NEW CUSTOMER'] },
        reg: { cx: 450, y: 120, w: 240, h: 44, t: 'main', lb: ['Registration / Sign-up'] },
        welc: { cx: 450, y: 200, w: 560, h: 70, t: 'email', lb: ['T+0 (Immediate)', 'Welcome Email + Brand Story + Most Loved Products'], nt: 'Carousel of models wearing SINS drips & short tagline. Based on Gender & Age.' },
        left: { cx: 160, y: 340, w: 240, h: 46, t: 'branch', lb: ['Customer left the site'] },
        expl: { cx: 620, y: 340, w: 280, h: 46, t: 'main', lb: ['Explored Pages / Products'] },
        l_24: { cx: 160, y: 440, w: 280, h: 70, t: 'email', lb: ['T+24H', '"Someone in your city just bought X product"'], nt: 'Location-based trigger' },
        l_end: { cx: 160, y: 560, w: 280, h: 30, t: 'exit2', lb: ['→ Move to Old Customer sequence'] },
        noadd: { cx: 440, y: 440, w: 160, h: 46, t: 'branch', lb: ["Didn't add"] },
        cart: { cx: 820, y: 440, w: 180, h: 46, t: 'branch', lb: ['Added to Cart'] },
        b2h: { cx: 380, y: 560, w: 340, h: 90, t: 'email', lb: ['B + 2H', '"You forgot me, but I am still', 'thinking about you" + Moodboard'], nt: 'Moodboard: Ways to style with clothes they likely own' },
        b24h: { cx: 380, y: 720, w: 340, h: 70, t: 'email', lb: ['B + 24H', 'Hot selling/Vibe based creative', 'Free delivery for next 24H'], nt: 'Based on product browsed' },
        bend: { cx: 380, y: 840, w: 160, h: 40, t: 'exit', lb: ['Campaign Exits'] },
        cout: { cx: 680, y: 560, w: 180, h: 46, t: 'branch', lb: ['Checked Out'] },
        ncout: { cx: 960, y: 560, w: 220, h: 46, t: 'branch', lb: ["Didn't check out"] },
        d0: { cx: 680, y: 660, w: 280, h: 70, t: 'email', lb: ['D + 0', 'Elite taste validation + Receipt', '+ Tracking information'] },
        deliv: { cx: 680, y: 770, w: 140, h: 44, t: 'main', lb: ['Delivery'] },
        e48: { cx: 680, y: 860, w: 280, h: 70, t: 'email', lb: ['E + 48H', 'Fit Check + Feedback', '+ Instagram Story push'] },
        e20: { cx: 680, y: 970, w: 280, h: 60, t: 'email', lb: ['E + 20 Days', 'Product recommendation matching item'] },
        e25: { cx: 680, y: 1070, w: 280, h: 70, t: 'email', lb: ['E + 25 Days', '"10% Off + 50+20 Credits" combo', 'with a 12-hour countdown'] },
        eend: { cx: 680, y: 1180, w: 280, h: 30, t: 'exit2', lb: ['→ Move to Old Customer sequence'] },
        c1h: { cx: 980, y: 660, w: 320, h: 70, t: 'email', lb: ['C + 1H', '"I guess your crush texted you,', 'that\'s why you left me on seen"'] },
        c24: { cx: 980, y: 770, w: 320, h: 70, t: 'email', lb: ['C + 24H', '"10% Off + 50 Credits" combo', 'with a 12-hour countdown'] },
        c48: { cx: 980, y: 880, w: 320, h: 70, t: 'email', lb: ['C + 48H', '"Your bag is about to be stolen"', 'in next 2 hours.'] },
        ccout: { cx: 860, y: 1000, w: 160, h: 46, t: 'branch', lb: ['Checked out'] },
        ccout_n: { cx: 860, y: 1070, w: 260, h: 30, t: 'exit2', lb: ['→ Move to Checked out sequence'] },
        cnc: { cx: 1100, y: 1000, w: 200, h: 46, t: 'branch', lb: ["Didn't check out"] },
        cnc_end: { cx: 1100, y: 1080, w: 180, h: 40, t: 'exit', lb: ['Campaign Exits'] }
    };

    const E = [
        ['nc', 'reg'], ['reg', 'welc'],
        ['welc', 'left'], ['welc', 'expl'],
        ['left', 'l_24'], ['l_24', 'l_end'],
        ['expl', 'noadd'], ['expl', 'cart'],
        ['noadd', 'b2h'], ['b2h', 'b24h'], ['b24h', 'bend'],
        ['cart', 'cout'], ['cart', 'ncout'],
        ['cout', 'd0'], ['d0', 'deliv'], ['deliv', 'e48'], ['e48', 'e20'], ['e20', 'e25'], ['e25', 'eend'],
        ['ncout', 'c1h'], ['c1h', 'c24'], ['c24', 'c48'],
        ['c48', 'ccout'], ['c48', 'cnc'],
        ['ccout', 'ccout_n'], ['cnc', 'cnc_end']
    ];

    const TC = {
        start: { f: 'var(--text-color)', s: 'var(--text-color)', c: 'var(--bg-color)', fw: '900', fs: '14' },
        main: { f: 'transparent', s: 'var(--text-color)', c: 'var(--text-color)', fw: '900', fs: '13' },
        email: { f: 'var(--bg-color)', s: 'var(--text-color)', c: 'var(--text-color)', fw: '800', fs: '12' },
        branch: { f: 'var(--text-color)', s: 'var(--text-color)', c: 'var(--bg-color)', fw: '900', fs: '13' },
        exit: { f: 'transparent', s: 'var(--text-color)', c: 'var(--text-color)', fw: '900', fs: '12', d: '8,4' },
        exit2: { f: 'transparent', s: 'transparent', c: 'var(--text-color)', fw: '900', fs: '12' },
    };

    let eS = '', nS = '';

    for (const [a, b] of E) {
        const na = N[a], nb = N[b];
        const x1 = na.cx, y1 = na.y + na.h, x2 = nb.cx, y2 = nb.y;
        const my = (y1 + y2) / 2;

        eS += `<path d="M${x1},${y1} L${x1},${my} L${x2},${my} L${x2},${y2}" fill="none" stroke="var(--text-color)" stroke-width="4" stroke-linejoin="round" marker-end="url(#fa)"/>`;
    }

    for (const [id, n] of Object.entries(N)) {
        const c = TC[n.t];
        const lh = 18;
        const lines = n.lb;
        const totalH = (lines.length - 1) * lh;
        const firstY = n.y + (n.h / 2) - (totalH / 2) + 5;

        const rx = n.cx - (n.w / 2);

        nS += `<rect x="${rx}" y="${n.y}" width="${n.w}" height="${n.h}" fill="${c.f}" stroke="${c.s}" stroke-width="4"${c.d ? ` stroke-dasharray="${c.d}"` : ''}/>`;

        nS += `<text text-anchor="middle" font-family="DM Sans, sans-serif" font-size="${c.fs}" font-weight="${c.fw}" fill="${c.c}">`;
        lines.forEach((l, i) => {
            nS += `<tspan x="${n.cx}" y="${firstY + i * lh}">${l}</tspan>`;
        });
        nS += `</text>`;

        if (n.nt) {
            nS += `<text x="${n.cx}" y="${n.y + n.h + 18}" text-anchor="middle" font-family="DM Sans, sans-serif" font-size="10" font-weight="700" fill="var(--text-color)" opacity="0.6">${n.nt}</text>`;
        }
    }

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1250 1250" width="100%" height="auto" style="display:block; min-width:850px;">
            <defs>
              <marker id="fa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 Z" fill="var(--text-color)"/>
              </marker>
            </defs>
            ${eS}${nS}
          </svg>`;
}

const cachedFlowSVG = buildFlow();

const inventoryData = [
    {
        id: 'Krishna Shukla', client: 'Krishna Shukla', tags: ['Identity Content', 'Comedy Business'], stat: '₹4.4L Revenue', bg: '#F4EFE6', text: '#051024', sysId: '01',
        customHTML: `
                <div class="brutal-wrap" style="--bg-color: #F4EFE6; --text-color: #051024;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Freelance · Brand & Business Manager</span>
                        <h1 class="brutal-title">KRISHNA SHUKLA</h1>
                        <div class="brutal-sub">Stand-up artist, Delhi · 130K+ Instagram followers</div>
                        <div class="brutal-tags">
                            <span class="brutal-tag">Content Strategy</span>
                            <span class="brutal-tag">Creator Economy</span>
                            <span class="brutal-tag">Touring Business</span>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text">
                        <span class="brutal-overline mb-3 block" style="font-size: 0.85rem; letter-spacing: 0.1em; opacity: 0.8;">THE PROBLEM</span>
                        186M views. Zero revenue infrastructure.<br/>
                        <span class="font-['DM_Sans'] font-[400] text-xl md:text-3xl tracking-tight mt-2 inline-block mb-4">The attention existed. The business didn't.</span>
                        <div class="font-['Schoolbell'] text-xs uppercase tracking-widest opacity-80 space-y-1">
                            <div>— Trapped in a local echo chamber</div>
                            <div>— Passive viewers who rarely shared</div>
                            <div>— Limited to unscalable, ad-hoc college gigs</div>
                        </div>
                    </div>

                    <div class="brutal-grid-3 reveal-blur" style="transition-delay: 0.2s;">
                        <div class="brutal-grid-item">
                            <div class="brutal-num">01</div>
                            <div class="brutal-item-title text-xl">Identity based Content</div>
                            <div class="brutal-item-desc">Shifted to highly relatable, POV-driven identity content to acquire cold audiences aggressively.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">02</div>
                            <div class="brutal-item-title text-xl">Virality Engine</div>
                            <div class="brutal-item-desc">Achieved <strong class="text-[var(--text-color)] font-bold">3x Loop Rate</strong> & <strong class="text-[var(--text-color)] font-bold">1:3 Share-to-Like</strong> - turning viewers into distributors.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">03</div>
                            <div class="brutal-item-title text-xl">Touring IP</div>
                            <div class="brutal-item-desc">Operationalized <strong class="text-[var(--text-color)] font-bold">40+ shows</strong> across Delhi, Jaipur, Lucknow & Goa with repeatable logistics.</div>
                        </div>
                    </div>

                    <!-- Enhanced Editorial Phone Ecosystem Section -->
                    <div class="relative w-full mt-24 mb-32 py-16 flex flex-col items-center justify-center overflow-visible reveal-blur">
                        
                        <!-- Giant background text to kill negative space -->
                        <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0 overflow-hidden mix-blend-color-burn">
                            <span class="font-['Bebas_Neue'] text-[35vw] text-[#051024] leading-none whitespace-nowrap tracking-tighter">ECOSYSTEM</span>
                        </div>

                        <!-- Central staging platform/grid for the phones -->
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[80%] h-[90%] border-2 border-[#051024]/10 bg-[rgba(5,16,36,0.015)] z-0 rounded-3xl overflow-hidden" style="background-image: radial-gradient(rgba(5,16,36,0.1) 1px, transparent 1px); background-size: 24px 24px;">
                            <!-- Accent crosshairs -->
                            <div class="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#051024]/30"></div>
                            <div class="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#051024]/30"></div>
                            <div class="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#051024]/30"></div>
                            <div class="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#051024]/30"></div>
                        </div>

                        <!-- Repositioned brutalist header -->
                        <div class="absolute -top-6 left-4 md:left-[10%] z-30 bg-[#F4EFE6] px-5 py-3 border-4 border-[#051024] shadow-[6px_6px_0_#051024] transform -rotate-2 hover:rotate-0 transition-transform">
                            <div aria-hidden="true" class="font-['Schoolbell'] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#051024]">Visual Evidence // Platform Ecosystem</div>
                        </div>

                        <!-- Left Context Sticker & Arrow -->
                        <div class="hidden xl:flex absolute left-[6%] top-[30%] flex-col items-start z-30 transform -rotate-3">
                            <div aria-hidden="true" class="bg-[#051024] text-[#F4EFE6] font-['Schoolbell'] text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest border border-[#051024] shadow-[4px_4px_0_rgba(0,0,0,0.2)]">Data Node 01</div>
                            <div class="font-['Bebas_Neue'] text-7xl text-[#051024] leading-[0.8] mt-4 tracking-tight drop-shadow-sm">186.3M</div>
                            <div class="font-['DM_Sans'] text-xs font-bold text-[#051024]/60 uppercase tracking-widest mt-2">Total Views Generated</div>
                            <!-- Hand drawn arrow pointing to center screen -->
                            <svg class="w-20 h-20 text-[#FF3333] mt-2 opacity-80 rotate-[15deg] transform translate-x-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M22 12H2"/><path d="M14 20l8-8-8-8"/></svg>
                        </div>

                        <!-- Right Context Handwritten Note -->
                        <div class="hidden xl:block absolute right-[5%] bottom-[25%] font-['Gloria_Hallelujah'] text-[20px] text-[#051024] rotate-3 z-30 leading-[1.3]">
                            <svg class="absolute -left-16 -top-2 w-16 h-16 text-[#051024] -rotate-[160deg] opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M22 12H2"/><path d="M14 20l8-8-8-8"/></svg>
                            <span class="bg-yellow-200/60 mix-blend-multiply px-2 py-1">Engagement shifted.</span><br>
                            Followers went from <br>passive to active distributors.
                        </div>

                        <!-- Interactive Phone Scene -->
                        <div class="mockup-scene !m-0 z-20 w-full max-w-[1000px]">
                            <div class="mockup-phone mockup-left">
                                <img loading="lazy" src="/assets/ksm3.png" alt="Reach Analytics" class="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(5,16,36,0.35)]" />
                            </div>
                            <div class="mockup-phone mockup-center z-30">
                                <img loading="lazy" src="/assets/ksm1.png" alt="Dashboard Analytics" class="w-full h-auto object-contain filter drop-shadow-[0_30px_60px_rgba(5,16,36,0.45)]" />
                            </div>
                            <div class="mockup-phone mockup-right">
                                <img loading="lazy" src="/assets/ksm2.png" alt="Profile View" class="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(5,16,36,0.35)]" />
                            </div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-12 w-max reveal-text">Impact Verification // Metrics</div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[3rem] my-16 reveal-blur" style="transition-delay: 0.4s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">100K+</div>
                            <div class="brutal-stat-sub">Followers</div>
                            <div class="brutal-stat-label">115% Growth in 3 Months</div>
                        </div>
                        <div class="brutal-stat-card relative">
                            <!-- Arrow pointing down (B -> E) -->
                            <div class="absolute hidden md:block" style="right: 15%; top: calc(100% - 15px); height: calc(3rem + 30px); width: 10px; background-color: #FF3333; opacity: 1; z-index: 50;">
                                <div aria-hidden="true" class="absolute top-1/2 left-6 -translate-y-1/2 whitespace-nowrap text-[10px] md:text-[12px] font-bold uppercase tracking-widest text-white bg-[#FF3333] px-3 py-1.5 border-2 border-[#111] shadow-[4px_4px_0_#111]">Reinforces Loop</div>
                                <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-r-[16px] border-t-[22px] border-transparent" style="border-top-color: #FF3333;"></div>
                            </div>
                            <div class="brutal-stat-big">46%</div>
                            <div class="brutal-stat-sub">Engagement Rate</div>
                            <div class="brutal-stat-label">30% More Than Industry Avg</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">₹4L+</div>
                            <div class="brutal-stat-sub">Standup Revenue</div>
                            <div class="brutal-stat-label">₹40K+ Worth Brand Partnerships</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">186M+</div>
                            <div class="brutal-stat-sub">Views</div>
                            <div class="brutal-stat-label">54M+ Accounts Reached</div>
                        </div>
                        <div class="brutal-stat-card relative">
                            <!-- Arrow pointing up (E -> B) -->
                            <div class="absolute hidden md:block" style="left: 15%; bottom: calc(100% - 15px); height: calc(3rem + 30px); width: 10px; background-color: #FF3333; opacity: 1; z-index: 50;">
                                <div aria-hidden="true" class="absolute top-1/2 right-6 -translate-y-1/2 whitespace-nowrap text-[10px] md:text-[12px] font-bold uppercase tracking-widest text-white bg-[#FF3333] px-3 py-1.5 border-2 border-[#111] shadow-[4px_4px_0_#111]">Causes High Engagement</div>
                                <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-r-[16px] border-b-[22px] border-transparent" style="border-bottom-color: #FF3333;"></div>
                            </div>
                            <div class="brutal-stat-big">3X</div>
                            <div class="brutal-stat-sub">Loop Rate</div>
                            <div class="brutal-stat-label">1:3 Shares to Likes Ratio</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">40+</div>
                            <div class="brutal-stat-sub">Shows Pan-India</div>
                            <div class="brutal-stat-label">Jaipur, Kanpur, Lucknow, Gurugram</div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'RNTL.', client: 'RNTL.', tags: ['Trust Engineering', 'Paid Social'], stat: '4.6X Lift', bg: '#8A9ED8', text: '#051024', sysId: '02', logo: 'rntllogo.svg', logoClass: 'mix-blend-multiply',
        customHTML: `
                <div class="brutal-wrap" style="--bg-color: #8A9ED8; --text-color: #051024;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Founding Marketer · Core Team</span>
                        <div class="flex items-center justify-between gap-4 w-full mb-4 md:mb-6">
                            <h1 class="brutal-title !mb-0">RNTL.</h1>
                            <img loading="lazy" src="/assets/rntllogo.svg" class="h-[clamp(40px,8vw,90px)] w-auto object-contain shrink-0 mix-blend-multiply" alt="RNTL." />
                        </div>
                        <div class="brutal-sub">Fashion rental marketplace for Gen-Z</div>
                        <div class="brutal-tags mb-8">
                            <span class="brutal-tag">Meta Ads</span>
                            <span class="brutal-tag">Consumer Psychology</span>
                            <span class="brutal-tag">Brand Launch</span>
                        </div>

                    </div>

                    <div class="brutal-split reveal-blur" style="transition-delay: 0.1s;">
                        <div class="brutal-split-left">
                            <div class="brutal-split-title">Consumer Fear</div>
                            <div class="brutal-split-body mb-4 uppercase">"Why rent when I can own?"</div>
                            <div class="font-['DM_Sans'] font-[600] text-sm leading-relaxed uppercase mt-auto border-t-4 border-current pt-4">Renting felt like a sunk cost. No social proof, no category trust, zero brand history. The "is this brand real?" question came before any purchase intent.</div>
                        </div>
                        <div class="brutal-split-right">
                            <div class="brutal-split-title">Our Answer</div>
                            <div class="brutal-split-body mb-4 uppercase">Borrowed equity. Sell the lifestyle, not the product.</div>
                            <div class="font-['DM_Sans'] font-[600] text-sm leading-relaxed uppercase mt-auto border-t-4 border-current pt-4">Made credible people endorse renting as a lifestyle - removing the trust deficit before it was even asked.</div>
                        </div>
                    </div>


                    <div class="mt-24 mb-16 flex flex-col items-center justify-center reveal-blur" style="transition-delay: 0.3s;">
                        <img loading="lazy" src="/assets/rntlspotlightseries.png" alt="RNTL Spotlight Series" class="w-full max-w-4xl h-auto object-contain filter drop-shadow-[8px_8px_0_rgba(0,0,0,0.8)] mix-blend-color-burn" />
                        <div class="brutal-overline !mt-6 text-center tracking-widest text-lg md:text-xl">5 Industry Voices • 2M+ Combined Network</div>
                    </div>
                    
                    <div class="relative w-full max-w-4xl mx-auto mt-32 mb-40 reveal-blur" style="transition-delay: 0.4s;">
                        <!-- Top Left Annotation (Points to Card 1) -->
                        <div class="hidden lg:flex absolute -top-24 left-0 w-48 flex-col items-center gap-1 z-40 transform -translate-x-8">
                            <p class="font-['Gloria_Hallelujah'] text-sm text-[#051024] leading-[1.25] text-center font-semibold">Positioned RNTL as a legitimate industry player from Day 1.</p>
                            <svg class="w-8 h-10 text-[#051024] mt-1" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 C 8 12, 16 22, 12 30" /><path d="M6 24 L 12 30 L 18 24" /></svg>
                        </div>
                        
                        <!-- Top Right Annotation (Points to Card 5) -->
                        <div class="hidden lg:flex absolute -top-24 right-0 w-48 flex-col items-center gap-1 z-40 transform translate-x-8">
                            <p class="font-['Gloria_Hallelujah'] text-sm text-[#051024] leading-[1.25] text-center font-semibold">Defined flow & interaction convo for narrative consistency.</p>
                            <svg class="w-8 h-10 text-[#051024] mt-1" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 C 16 12, 8 22, 12 30" /><path d="M6 24 L 12 30 L 18 24" /></svg>
                        </div>

                        <!-- Bottom Left Annotation (Points to Card 2) -->
                        <div class="hidden lg:flex absolute -bottom-28 left-[20%] w-56 flex-col items-center gap-1 z-40 transform -translate-x-4">
                            <svg class="w-8 h-10 text-[#051024] mb-1" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 30 C 8 20, 16 10, 12 2" /><path d="M6 8 L 12 2 L 18 8" /></svg>
                            <p class="font-['Gloria_Hallelujah'] text-sm text-[#051024] leading-[1.25] text-center font-semibold">Removed consumer fear of "is this brand trustable?" via borrowed equity.</p>
                        </div>

                        <!-- Bottom Right Annotation (Points to Card 4) -->
                        <div class="hidden lg:flex absolute -bottom-28 right-[20%] w-56 flex-col items-center gap-1 z-40 transform translate-x-4">
                            <svg class="w-8 h-10 text-[#051024] mb-1" viewBox="0 0 24 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 30 C 16 20, 8 10, 12 2" /><path d="M6 8 L 12 2 L 18 8" /></svg>
                            <p class="font-['Gloria_Hallelujah'] text-sm text-[#051024] leading-[1.25] text-center font-semibold">Planned Q&A and SKU integration to endorse renting.</p>
                        </div>

                        <!-- Interactive Circle on the right (from screenshot) -->
                        <div class="hidden lg:flex absolute -right-[15%] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-[1.5px] border-[#6a5e3e] items-center justify-center opacity-80 pointer-events-none">
                            <div class="w-2 h-2 rounded-full bg-[#6a5e3e]"></div>
                        </div>

                        <div class="flex flex-col md:flex-row w-full h-[600px] md:h-[450px] gap-2 md:gap-3 overflow-hidden group/accordion relative z-20 px-4 md:px-0">
                            <!-- EP 1 -->
                            <a href="https://instagram.com/reel/DPQl2kmE-qq/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="/assets/ep1.jpg" alt="Episode 1" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Nikita Luther</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">95K+ • Winner – Traitors</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 1</div>
                                </div>
                            </a>
                            <!-- EP 2 -->
                            <a href="https://instagram.com/reel/DPatQBiEzfe/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="/assets/ep2.jpg" alt="Episode 2" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Harpriya Bains</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">215K+ • Stand-up Comedian</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 2</div>
                                </div>
                            </a>
                            <!-- EP 3 -->
                            <a href="https://instagram.com/reel/DPflCywE3rh/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="/assets/ep3.jpg" alt="Episode 3" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Anya Singh</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">496K+ • Actress, Stree 2</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 3</div>
                                </div>
                            </a>
                            <!-- EP 4 -->
                            <a href="https://instagram.com/reel/DP3Td-Nk63U/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="/assets/ep4.jpg" alt="Episode 4" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Ranjit Bajaj</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">1.1M+ • Owner, Minerva FC</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 4</div>
                                </div>
                            </a>
                            <!-- EP 5 -->
                            <a href="https://instagram.com/reel/DRY7Y8rkzaH/" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black relative flex-1 md:hover:!flex-[4_4_0%] hover:!flex-[3_3_0%] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-xl overflow-hidden border-2 border-[#051024] cursor-pointer group/card shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#010204]">
                                <img loading="lazy" src="/assets/ep5.jpg" alt="Episode 5" class="absolute inset-0 w-full h-full object-cover object-center opacity-50 group-hover/card:opacity-100 transition-opacity duration-700" />
                                <div class="absolute inset-x-0 bottom-0 p-2 md:p-3 bg-gradient-to-t from-[#051024]/90 via-[#051024]/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 flex flex-col justify-end h-[70%] z-20">
                                    <div class="bg-[#F4EFE6] border border-[#051024] p-2 text-center transform translate-y-8 group-hover/card:translate-y-0 transition-transform duration-700">
                                        <div class="font-['Bebas_Neue'] text-[#051024] text-xl md:text-2xl leading-none tracking-wide uppercase truncate">Rajat Barmecha</div>
                                        <div aria-hidden="true" class="font-['Schoolbell'] text-[#051024] text-[8px] font-bold uppercase tracking-widest mt-1 truncate">87K+ • Actor, Udaan</div>
                                    </div>
                                </div>
                                <div class="absolute inset-0 flex items-center justify-center opacity-100 group-hover/card:opacity-0 transition-opacity duration-700 z-10">
                                   <div class="md:rotate-[-90deg] font-['Bebas_Neue'] text-[#F4EFE6] text-3xl md:text-4xl tracking-widest whitespace-nowrap drop-shadow-md">EP. 5</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text" style="transition-delay: 0.3s;">
                        Meta Pilot Run - Catalog + Personality Led Brand Launch Ad Campaign. <br/>
                        <span class="font-[400] text-xl">Executed a micro-budget pilot to validate acquisition channels for Gen Z fashion rentals. Identified "Social Proof" as the core trust lever, achieving a 4.6x Efficiency Lift by pivoting from only catalog ads to +personality-led Reels.</span>
                    </div>

                    <div class="mt-12 mb-20 reveal-blur" style="transition-delay: 0.4s;">
                        <span aria-hidden="true" class="brutal-overline mb-4 block text-[10px]">Platforms Stack</span>
                        <img loading="lazy" src="/assets/metachart.png" alt="Platforms" class="w-[560px] max-w-full md:w-[800px] h-auto object-contain mix-blend-color-burn opacity-90 filter drop-shadow-sm" />
                    </div>

                    <div class="brutal-stats-grid reveal-blur" style="transition-delay: 0.4s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">35+%</div>
                            <div class="brutal-stat-sub">Hook Rate</div>
                            <div class="brutal-stat-label">Industry Benchmark: 20-25%</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">₹18.4</div>
                            <div class="brutal-stat-sub">Cost per Messaging Conversation</div>
                            <div class="brutal-stat-label">@4k Impressions</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big"><₹0.9</div>
                            <div class="brutal-stat-sub">Cost Per Click (CPC)</div>
                            <div class="brutal-stat-label">25-50% Less than Industry Avg</div>
                        </div>
                    </div>

                    <!-- Award-winning Overlapping Comparison Block -->
                    <!-- Full-bleed Formula Section to kill negative space -->
                    <div class="relative w-full mt-32 mb-40 py-16 md:py-24 flex flex-col items-center justify-center overflow-visible reveal-blur">
                        
                        <!-- Dynamic Background Band breaking out of standard padding -->
                        <div class="absolute inset-x-[-10vw] top-1/2 -translate-y-1/2 h-[80%] md:h-[95%] bg-[#051024] shadow-[inset_0_20px_60px_rgba(0,0,0,0.8)] transform -skew-y-3 border-y-[8px] border-[#F4EFE6] overflow-hidden flex items-center z-0">
                            <!-- Infinite Ticker text -->
                            <div class="whitespace-nowrap flex font-['Bebas_Neue'] text-[150px] md:text-[250px] text-[#F4EFE6]/5 uppercase tracking-tighter leading-none select-none" style="animation: ticker 40s linear infinite;">
                                THE WINNING FORMULA // THE WINNING FORMULA // THE WINNING FORMULA // THE WINNING FORMULA // THE WINNING FORMULA // 
                            </div>
                        </div>

                        <div class="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-[1200px] mx-auto px-4 md:px-0 gap-16 md:gap-0">
                            
                            <!-- Catalog Grid (Left) -->
                            <div class="w-[95%] md:w-[52%] z-10 transform md:rotate-[-5deg] md:-translate-y-16 hover:!rotate-[-1deg] hover:!z-50 transition-all duration-500 hover:scale-[1.04] shadow-[0_25px_60px_rgba(0,0,0,0.6)] relative group">
                                <!-- Realistic Tape -->
                                <div class="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 border border-white/20 transform -rotate-[4deg] shadow-sm z-30 mix-blend-overlay" style="backdrop-filter: blur(3px);"></div>
                                <!-- Badge -->
                                <div class="bg-[#F4EFE6] text-[#051024] font-bold uppercase text-[11px] md:text-[14px] px-5 py-2.5 absolute -left-4 md:-left-8 top-12 border-4 border-[#051024] shadow-[6px_6px_0_#051024] z-20 whitespace-nowrap -rotate-3 group-hover:rotate-0 transition-transform">
                                    Catalog Ad Set <span class="font-normal opacity-60 ml-2">Phase 01</span>
                                </div>
                                <img loading="lazy" src="/assets/catalog_grid.jpg" alt="Catalog Grid" class="w-full border-4 md:border-8 border-[#051024] filter saturate-[0.85] contrast-[1.05]" />
                            </div>

                            <!-- Center Connector / + Sign -->
                            <div class="hidden md:flex z-40 flex-col items-center justify-center transform hover:scale-110 pointer-events-none transition-transform duration-300 md:-mx-16 lg:-mx-20 mt-16 shadow-2xl rounded-full">
                                <div class="w-24 h-24 md:w-32 md:h-32 rounded-full bg-[#F4EFE6] border-[6px] border-[#051024] shadow-[8px_8px_0_#051024] flex items-center justify-center text-[#051024] text-6xl md:text-8xl font-black relative overflow-hidden">
                                    <div class="absolute inset-2 rounded-full border-[3px] border-dashed border-[#051024]/40 animate-[spin_12s_linear_infinite]"></div>
                                    <span class="relative z-10 drop-shadow-md">+</span>
                                </div>
                            </div>
                            
                            <!-- Personality Grid (Right) -->
                            <div class="w-[95%] md:w-[52%] z-20 transform md:rotate-[5deg] md:translate-y-20 hover:!rotate-[1deg] hover:!z-50 transition-all duration-500 hover:scale-[1.04] shadow-[0_35px_70px_rgba(0,0,0,0.8)] relative group">
                                <!-- Realistic Tape -->
                                <div class="absolute -top-4 right-16 w-20 h-8 bg-white/40 border border-white/20 transform rotate-[6deg] shadow-sm z-30 mix-blend-overlay" style="backdrop-filter: blur(3px);"></div>
                                <!-- Badge -->
                                <div class="bg-[#051024] text-[#F4EFE6] font-bold uppercase text-[11px] md:text-[14px] px-5 py-2.5 absolute -right-4 md:-right-8 bottom-12 border-4 border-[#051024] shadow-[6px_6px_0_#F4EFE6] z-20 whitespace-nowrap rotate-3 group-hover:rotate-0 transition-transform">
                                    Personality-Led <span class="font-normal opacity-60 ml-2">Phase 02</span>
                                </div>
                                <a href="https://linkedin.com/posts/bajkamalsingh_marketing-strategy-consumerbehaviour-activity-7419962873264734208-qPWS" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black block group/link">
                                    <img loading="lazy" src="/assets/personality_grid.jpg" alt="Personality Grid" class="w-full border-4 md:border-8 border-[#051024] filter saturate-[1.1] contrast-[1.1]" />
                                    <div class="absolute inset-0 bg-[#051024]/60 opacity-0 group-hover/link:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none z-40 border-4 border-transparent backdrop-blur-[3px]">
                                        <span class="bg-[#F4EFE6] text-[#051024] text-[12px] md:text-[16px] font-black uppercase tracking-widest px-8 py-4 shadow-[8px_8px_0_#051024] transform scale-90 group-hover/link:scale-100 transition-transform duration-400 ease-out">Dissect on LinkedIn ↗</span>
                                    </div>
                                </a>
                            </div>
                            
                        </div>
                        
                        <!-- Handwritten Annotation floating outside -->
                        <div class="absolute bottom-8 left-[10%] hidden xl:block font-['Gloria_Hallelujah'] font-medium text-[20px] text-[#F4EFE6] -rotate-6 z-30 opacity-90 drop-shadow-lg pointer-events-none leading-[1.3]">
                            Social proof scaled the conversion.
                            <svg class="absolute -top-8 right-[-50px] w-16 h-16 text-[#F4EFE6] opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                        </div>
                    </div>

                    <!-- Expanded Brutalist Ad Breakup Analysis -->
                    <div class="relative w-full mt-24 mb-10 reveal-blur flex flex-col items-center">
                        <!-- Giant background text to kill negative space -->
                        <div class="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-[0.05] z-0 mix-blend-color-burn">
                            <span class="font-['Bebas_Neue'] text-[35vw] text-[#051024] leading-none whitespace-nowrap">TEARDOWN</span>
                        </div>

                        <div class="relative w-full max-w-[1200px] z-10 px-4 md:px-0">
                            <!-- Brutalist Header overlapping the frame -->
                            <div class="absolute -top-10 md:-top-16 left-2 md:left-12 z-30 bg-[#F4EFE6] border-4 border-[#051024] p-4 md:p-6 shadow-[8px_8px_0_#051024] transform -rotate-3 transition-transform hover:rotate-0 duration-300">
                                <div aria-hidden="true" class="font-['Schoolbell'] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#051024]/70 mb-2 border-b-2 border-[#051024]/20 pb-2">Phase 03 // Deep Dive</div>
                                <h3 class="font-['Bebas_Neue'] text-4xl md:text-6xl text-[#051024] leading-[0.85] tracking-wide">AD BREAKUP <br/>ANALYSIS</h3>
                            </div>

                            <!-- Main Image Frame -->
                            <div class="w-full bg-[#051024] p-3 md:p-8 pt-20 md:pt-28 border-4 border-[#051024] shadow-[16px_16px_0_rgba(5,16,36,0.4)] group/frame relative transition-all duration-500 hover:shadow-[24px_24px_0_rgba(5,16,36,0.5)] hover:-translate-y-2">
                                
                                <!-- Top Right Context -->
                                <div aria-hidden="true" class="absolute top-4 right-4 md:top-8 md:right-8 text-[#F4EFE6]/60 font-['Schoolbell'] text-[9px] md:text-xs uppercase tracking-widest text-right max-w-[200px] md:max-w-[300px]">
                                    Detailed teardown of the winning creative asset structure.
                                </div>
                                
                                <a href="https://linkedin.com/posts/bajkamalsingh_marketing-strategy-consumerbehaviour-activity-7419962873264734208-qPWS" target="_blank" rel="noopener noreferrer" class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black block relative border-2 border-[#333] overflow-hidden bg-[#F4EFE6]">
                                    <!-- The Image -->
                                    <img loading="lazy" src="/assets/ad_breakup.jpg" alt="Ad Breakup" class="w-full object-cover filter saturate-[0.95] contrast-[1.05] transition-transform duration-700 group-hover/frame:scale-[1.03]" />
                                    
                                    <!-- Dynamic Hover State -->
                                    <div class="absolute inset-0 bg-[#051024]/70 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-400 flex items-center justify-center pointer-events-none z-40 backdrop-blur-[3px]">
                                        <div class="bg-[#F4EFE6] border-4 border-[#051024] text-[#051024] flex flex-col items-center p-6 md:p-10 shadow-[12px_12px_0_#051024] transform scale-90 group-hover/frame:scale-100 transition-transform duration-400 ease-out">
                                            <span class="font-['Bebas_Neue'] text-4xl md:text-5xl tracking-widest leading-none mb-1 text-center">DISSECT ON LINKEDIN</span>
                                            <span aria-hidden="true" class="font-['Schoolbell'] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-3 bg-[#051024] text-[#F4EFE6] px-4 py-2 border border-[#051024] shadow-[4px_4px_0_#F4EFE6]">↗ Open Full Teardown</span>
                                        </div>
                                    </div>
                                </a>
                                
                                <!-- Bottom Decorative Bar -->
                                <div aria-hidden="true" class="mt-4 md:mt-6 flex justify-between items-center border-t border-[#F4EFE6]/10 pt-4 font-['Schoolbell'] text-[9px] md:text-[10px] text-[#F4EFE6]/50 uppercase tracking-widest">
                                    <span>Fig. 1 — Creative Anatomy</span>
                                    <span class="flex items-center gap-2"><div class="w-2 h-2 rounded-full bg-[#8DE254] shadow-[0_0_8px_#8DE254] animate-pulse"></div> Verified Strategy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'Sins Crew', client: 'Sinskari', tags: ['Email Funnel', 'D2C Strategy'], stat: '25+ Carts Recovered', bg: '#012CEB', text: '#F4EFE6', sysId: '03', logo: 'sinskarilogo.svg', logoClass: 'invert brightness-0',
        customHTML: `
                <div class="brutal-wrap" style="--bg-color: #012CEB; --text-color: #F4EFE6;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Strategy Intern · 4 Weeks</span>
                        <div class="flex items-center justify-between gap-4 w-full mb-4 md:mb-6">
                            <h1 class="brutal-title !mb-0">SINS CREW</h1>
                            <img loading="lazy" src="/assets/sinskarilogo.svg" class="h-[clamp(40px,8vw,90px)] w-auto object-contain shrink-0 invert brightness-0" alt="Sinskari" />
                        </div>
                        <div class="brutal-sub">Sinskari - Growing D2C streetwear brand for Gen-Z India</div>
                        <div class="brutal-tags">
                            <span class="brutal-tag">Email Automation</span>
                            <span class="brutal-tag">CX Journey</span>
                            <span class="brutal-tag">Retention</span>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text" style="transition-delay: 0.1s;">
                        No behavioral triggers. No segment logic. No recovery sequences.<br/>
                        <span class="font-['DM_Sans'] font-[400] text-xl tracking-tight">Revenue was bleeding through abandoned carts daily - with zero infrastructure to catch it.</span>
                    </div>

                    <div class="brutal-overline w-max mt-8 reveal-text" style="transition-delay: 0.2s;">Automated Email Funnel Architecture - Designed from scratch</div>
                    <div class="brutal-flow-container reveal-blur" style="transition-delay: 0.3s;">
                        ${cachedFlowSVG}
                    </div>

                    <div class="brutal-overline mt-12 w-max reveal-text" style="transition-delay: 0.4s;">Impact Validation</div>

                    <div class="brutal-stats-grid reveal-blur" style="transition-delay: 0.5s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">25+</div>
                            <div class="brutal-stat-sub">Carts Recovered</div>
                            <div class="brutal-stat-label">Direct Revenue Save</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">10%</div>
                            <div class="brutal-stat-sub">Conversion Boost</div>
                            <div class="brutal-stat-label">Site-wide Lift</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">15%</div>
                            <div class="brutal-stat-sub">Traffic Increase</div>
                            <div class="brutal-stat-label">Return Sessions</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">10%</div>
                            <div class="brutal-stat-sub">Drop-off Reduced</div>
                            <div class="brutal-stat-label">Funnel Optimization</div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'Histrionica', client: 'Dramsoc SRCC', tags: ['Brand Growth', 'Sponsorships'], stat: '₹55L+ Secured', bg: '#111111', text: '#F4EFE6', sysId: '04', logo: 'dramlogo.svg', logoClass: '',
        customHTML: `
                <div class="brutal-wrap" style="--bg-color: #111111; --text-color: #F4EFE6;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Vice President · The Dramatics Society, SRCC</span>
                        <div class="flex items-center justify-between gap-4 w-full mb-4 md:mb-6">
                            <h1 class="brutal-title !mb-0">HISTRIONICA</h1>
                            <img loading="lazy" src="/assets/dramlogo.svg" class="h-[clamp(80px,14vw,140px)] w-auto object-contain shrink-0" alt="Dramsoc" />
                        </div>
                        <div class="brutal-sub">DU's most-followed college society · Tier-1 flagship annual festival</div>
                        <div class="brutal-tags">
                            <span class="brutal-tag">Sponsorships</span>
                            <span class="brutal-tag">Performance Mktg</span>
                            <span class="brutal-tag">Creative Direction</span>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text">
                        One of DU's oldest societies had no systematic growth engine.<br/>
                        <span class="font-['DM_Sans'] font-[400] text-xl md:text-3xl tracking-tight">Sponsorships were ad-hoc. Digital presence minimal. No playbook for brand partnerships or content at scale.</span>
                    </div>

                    <div class="brutal-stats-grid mt-12 reveal-blur" style="transition-delay: 0.1s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">₹55L+</div>
                            <div class="brutal-stat-label">Sponsorship Value Secured</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">33M+</div>
                            <div class="brutal-stat-label">Total Campaign Reach</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">234%</div>
                            <div class="brutal-stat-label">Year over Year Growth</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">12K+</div>
                            <div class="brutal-stat-label">Total Event Footfall</div>
                        </div>
                    </div>

                    <div class="brutal-grid-2 reveal-blur" style="transition-delay: 0.2s;">
                        <div class="brutal-grid-item">
                            <div class="brutal-item-title">Sponsorship Strategy</div>
                            <div class="brutal-item-desc">Swiggy, Rapido, McDonald's, Redtape, Zebronics. Negotiated & closed ₹55L+ in brand deals. Managed 30+ sponsors for JFL.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-item-title">Performance Marketing</div>
                            <div class="brutal-item-desc">2.2M+ reach in under 3 days. 837K incremental boost. 96.4% ↑ in unique visitors. 283K interactions via adspend.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-item-title">Creative Direction</div>
                            <div class="brutal-item-desc">A/B tested across 6+ locations. All visual assets directed to create FOMO and drive engagement at scale.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-item-title">Social Growth</div>
                            <div class="brutal-item-desc">Most-followed college club, DU. Grew to 10K+ followers in 6 months. 270%+ engagement boost via data-driven optimization.</div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 w-max reveal-text">Executive Roles // Breakout</div>
                    
                    <div class="brutal-grid-3 reveal-blur" style="transition-delay: 0.3s; border-top: none;">
                        <div class="brutal-grid-item" style="border-top: 8px solid var(--text-color);">
                            <div class="brutal-item-title text-xl">Growth Strategy</div>
                            <div class="brutal-item-desc">Grew Account to 10K+ Followers (6 months): Achieved most-followed college club status in Delhi University.</div>
                        </div>
                        <div class="brutal-grid-item" style="border-top: 8px solid var(--text-color);">
                            <div class="brutal-item-title text-xl">Social Media Mgmt</div>
                            <div class="brutal-item-desc">Conceptualised, designed and executed campaigns for celebrity events, sponsored collaborations, and high-engagement content.</div>
                        </div>
                        <div class="brutal-grid-item" style="border-top: 8px solid var(--text-color);">
                            <div class="brutal-item-title text-xl">Creative Direction</div>
                            <div class="brutal-item-desc">Led Creative Direction for all visual assets (static, reels) to drive buzz, create FOMO and leverage emerging trends.</div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 mb-8 text-center text-[#F4EFE6] opacity-50">Visual Archives // Static Campaigns</div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mx-auto mb-16 px-4 reveal-blur" style="transition-delay: 0.3s;">
                        <!-- Asset 1: Audition Workshop -->
                        <div class="relative group aspect-[4/5] bg-[#0a0a0a] p-3 shadow-[8px_8px_0_rgba(244,239,230,0.05)] border-2 border-[#333] transition-all duration-500 hover:border-[var(--blue)] hover:shadow-[12px_12px_0_var(--blue)] hover:-translate-y-2">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/10 backdrop-blur-sm border border-white/20 transform rotate-2 z-20 mix-blend-overlay"></div>
                            <div class="w-full h-full overflow-hidden border border-[#222] relative rounded-sm">
                                <img alt="Dramsoc Tds1" loading="lazy" src="/assets/tds1.png" class="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div class="absolute bottom-5 left-5 right-5 flex flex-col justify-end items-start">
                                    <div aria-hidden="true" class="bg-[#F4EFE6] text-[#051024] text-[9px] font-bold px-2 py-1 rounded-sm w-max mb-2 uppercase tracking-widest shadow-sm">Tier 1 Post</div>
                                    <div class="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#F4EFE6] tracking-wide leading-none">Audition Workshop</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Asset 2: MostlySane -->
                        <div class="relative group aspect-[4/5] bg-[#0a0a0a] p-3 shadow-[8px_8px_0_rgba(244,239,230,0.05)] border-2 border-[#333] transition-all duration-500 hover:border-[#e53935] hover:shadow-[12px_12px_0_#e53935] hover:-translate-y-2">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/10 backdrop-blur-sm border border-white/20 transform -rotate-2 z-20 mix-blend-overlay"></div>
                            <div class="w-full h-full overflow-hidden border border-[#222] relative rounded-sm">
                                <img alt="Dramsoc Tds2" loading="lazy" src="/assets/tds2.png" class="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div class="absolute bottom-5 left-5 right-5 flex flex-col justify-end items-start">
                                    <div aria-hidden="true" class="bg-[#F4EFE6] text-[#051024] text-[9px] font-bold px-2 py-1 rounded-sm w-max mb-2 uppercase tracking-widest shadow-sm">Creator Collab</div>
                                    <div class="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#F4EFE6] tracking-wide leading-none">MostlySane</div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Asset 3: Open Mic -->
                        <div class="relative group aspect-[4/5] bg-[#0a0a0a] p-3 shadow-[8px_8px_0_rgba(244,239,230,0.05)] border-2 border-[#333] transition-all duration-500 hover:border-[#f9ce34] hover:shadow-[12px_12px_0_#f9ce34] hover:-translate-y-2">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/10 backdrop-blur-sm border border-white/20 transform rotate-1 z-20 mix-blend-overlay"></div>
                            <div class="w-full h-full overflow-hidden border border-[#222] relative rounded-sm">
                                <img alt="Dramsoc Tds3" loading="lazy" src="/assets/tds3.png" class="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div class="absolute bottom-5 left-5 right-5 flex flex-col justify-end items-start">
                                    <div aria-hidden="true" class="bg-[#F4EFE6] text-[#051024] text-[9px] font-bold px-2 py-1 rounded-sm w-max mb-2 uppercase tracking-widest shadow-sm">Flagship Event</div>
                                    <div class="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#F4EFE6] tracking-wide leading-none">The Grand Open Mic</div>
                                </div>
                            </div>
                        </div>

                        <!-- Asset 4: Judges -->
                        <div class="relative group aspect-[4/5] bg-[#0a0a0a] p-3 shadow-[8px_8px_0_rgba(244,239,230,0.05)] border-2 border-[#333] transition-all duration-500 hover:border-[#8e24aa] hover:shadow-[12px_12px_0_#8e24aa] hover:-translate-y-2">
                            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-3 bg-white/10 backdrop-blur-sm border border-white/20 transform -rotate-1 z-20 mix-blend-overlay"></div>
                            <div class="w-full h-full overflow-hidden border border-[#222] relative rounded-sm">
                                <img alt="Dramsoc Tds4" loading="lazy" src="/assets/tds4.png" class="w-full h-full object-cover grayscale-[0.6] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                                <div class="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                                <div class="absolute bottom-5 left-5 right-5 flex flex-col justify-end items-start">
                                    <div aria-hidden="true" class="bg-[#F4EFE6] text-[#051024] text-[9px] font-bold px-2 py-1 rounded-sm w-max mb-2 uppercase tracking-widest shadow-sm">Panel Reveal</div>
                                    <div class="font-['Bebas_Neue'] text-3xl md:text-4xl text-[#F4EFE6] tracking-wide leading-none">Judges Panel</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-24 w-max mx-auto text-[#F4EFE6] opacity-50 reveal-text">Video Campaigns // Archive</div>

                    <!-- Award-Winning Hover Reveal List -->
                    <div class="w-full max-w-5xl mx-auto flex flex-col mt-8 md:mt-12 mb-24 reveal-blur relative z-20 border-t border-[#333]" style="transition-delay: 0.4s;">
                        
                        <!-- Reel 1 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">01</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Event Pre-Buzz</h3>
                            </div>
                            
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-white md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-[var(--blue)] md:text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        28.2K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr1" loading="lazy" src="/assets/tdsr1.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>

                            <!-- Desktop Hover Image -->
                            <div class="absolute left-[45%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:-rotate-6 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr1" loading="lazy" src="/assets/tdsr1.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 2 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">02</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Freshers' Welcome</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-white md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-[var(--blue)] md:text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        25.4K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr2" loading="lazy" src="/assets/tdsr2.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[55%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:rotate-3 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr2" loading="lazy" src="/assets/tdsr2.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 3 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">03</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">30-Year Legacy</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-white md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-[var(--blue)] md:text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        30.4K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr3" loading="lazy" src="/assets/tdsr3.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[50%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:-rotate-2 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr3" loading="lazy" src="/assets/tdsr3.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 4 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">04</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Celebrity Collab</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-white md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-[var(--blue)] md:text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        30.2K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr4" loading="lazy" src="/assets/tdsr4.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[60%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:rotate-6 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr4" loading="lazy" src="/assets/tdsr4.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 5 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">05</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Viral Sketch</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-[#f9ce34] md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2 drop-shadow-[0_0_8px_rgba(249,206,52,0.4)]">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        471K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr5" loading="lazy" src="/assets/tdsr5.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[40%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:-rotate-4 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr5" loading="lazy" src="/assets/tdsr5.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>

                        <!-- Reel 6 -->
                        <div class="group/row relative flex items-center justify-between border-b border-[#333] py-5 md:py-8 cursor-pointer hover:z-40">
                            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 -z-10"></div>
                            <div class="flex items-center md:items-baseline gap-4 md:gap-12 relative z-10 w-[60%] md:w-auto">
                                <span class="font-['Schoolbell'] text-[#f4efe6]/30 text-xs md:text-sm font-bold transition-colors duration-500 group-hover/row:text-[#f4efe6]">06</span>
                                <h3 class="font-['Bebas_Neue'] text-2xl md:text-7xl text-[#f4efe6]/60 md:text-[#f4efe6]/40 group-hover/row:text-[#f4efe6] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/row:translate-x-2 md:group-hover/row:translate-x-8 tracking-wide truncate md:overflow-visible">Artist Reveal</h3>
                            </div>
                            <div class="flex items-center gap-3 md:gap-8 relative z-10 w-[40%] md:w-auto justify-end">
                                <div class="flex flex-col items-end opacity-100 md:opacity-0 md:group-hover/row:opacity-100 transform md:translate-x-4 md:group-hover/row:translate-x-0 transition-all duration-500 ease-out">
                                    <span class="font-['Schoolbell'] text-[#f9ce34] md:text-[#f4efe6] text-xs md:text-xl font-bold tracking-widest flex items-center gap-1 md:gap-2 drop-shadow-[0_0_8px_rgba(249,206,52,0.4)]">
                                        <svg class="w-3 h-3 md:w-4 md:h-4 text-current opacity-90 md:opacity-70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                                        451K
                                    </span>
                                    <span aria-hidden="true" class="font-['DM_Sans'] text-[#f4efe6]/50 text-[8px] md:text-[10px] uppercase tracking-widest mt-1 hidden md:block">Views Captured</span>
                                </div>
                                <div class="block md:hidden w-10 h-14 rounded overflow-hidden shrink-0 border border-[#333]">
                                    <img alt="Dramsoc Tdsr6" loading="lazy" src="/assets/tdsr6.png" class="w-full h-full object-cover grayscale" />
                                </div>
                            </div>
                            <div class="absolute left-[50%] top-1/2 -translate-y-1/2 w-48 h-72 rounded-xl overflow-hidden pointer-events-none opacity-0 group-hover/row:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform scale-90 group-hover/row:scale-100 group-hover/row:rotate-2 z-30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/10 hidden md:block">
                                <img alt="Dramsoc Tdsr6" loading="lazy" src="/assets/tdsr6.png" class="w-full h-full object-cover scale-110 group-hover/row:scale-100 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                                <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>`
    },
    {
        id: 'Signal', client: 'Jio Hotstar', tags: ['GTM Strategy', 'Campus Marketing'], stat: '7L+ Impressions', bg: '#D8E0E8', text: '#0A0A0A', sysId: '05', logo: 'hotstarlogo.svg', logoClass: 'mix-blend-multiply',
        customHTML: `
                <div class="brutal-wrap" style="--bg-color: #D8E0E8; --text-color: #0A0A0A;">
                    <div class="reveal-blur">
                        <span class="brutal-overline">Marketing & GTM Strategy Lead</span>
                        <div class="flex items-center justify-between gap-4 w-full mb-4 md:mb-6">
                            <h1 class="brutal-title !mb-0">SIGNAL</h1>
                            <img loading="lazy" src="/assets/hotstarlogo.svg" class="h-[clamp(40px,8vw,90px)] w-auto object-contain shrink-0 mix-blend-multiply" alt="Hotstar" />
                        </div>
                        <div class="brutal-sub">Jio Hotstar show launch · 5–7 college campuses · 30,000+ Gen-Z target</div>
                        <div class="brutal-tags">
                            <span class="brutal-tag">GTM</span>
                            <span class="brutal-tag">Campus Activation</span>
                            <span class="brutal-tag">Influencer Network</span>
                            <span class="brutal-tag">OTT</span>
                        </div>
                    </div>

                    <div class="brutal-hook reveal-text">
                        Gen-Z doesn't show up for ads. They show up for culture.<br/>
                        <span class="font-['DM_Sans'] font-[400] text-xl md:text-3xl tracking-tight">The challenge: make a streaming show launch feel like a campus moment - and then convert it.</span>
                    </div>

                    <div class="brutal-overline mt-12 w-max reveal-text">GTM Execution Phases</div>

                    <div class="brutal-grid-2 reveal-blur" style="transition-delay: 0.1s;">
                        <div class="brutal-grid-item">
                            <div class="brutal-num">01</div>
                            <div class="brutal-item-title">Audience Architecture</div>
                            <div class="brutal-item-desc">Tiered segmentation across 5–7 campuses with hyper-personalized messaging at each touchpoint. (30,000+ students reached).</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">02</div>
                            <div class="brutal-item-title">Micro-Influencer Network</div>
                            <div class="brutal-item-desc">Built and scaled 25–40 campus influencers to unlock organic reach and compress cost-per-reach vs paid channels. (45,000+ organic reach).</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">03</div>
                            <div class="brutal-item-title">Celebrity Amplification</div>
                            <div class="brutal-item-desc">Orchestrated campaigns featuring Abhishek Malhan & Khushboo Patani to spike live engagement and drive cultural credibility.</div>
                        </div>
                        <div class="brutal-grid-item">
                            <div class="brutal-num">04</div>
                            <div class="brutal-item-title">UGC Conversion Engine</div>
                            <div class="brutal-item-desc">Converted on-ground attendees into content distributors - turning footfall into organic amplification. (8,000+ peer-to-peer shares).</div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 w-max reveal-text">Visual Evidence // Live Activation</div>
                    <div class="brutal-contact-sheet reveal-blur" style="transition-delay: 0.3s;">
                        <div class="brutal-img-wrap" style="min-height: 350px;">
                            <div class="brutal-img-meta">ARCHIVE 01 // STAGE</div>
                            <img loading="lazy" src="/assets/hs6.PNG" alt="Stage Moment" />
                        </div>
                        <div class="brutal-img-wrap" style="min-height: 350px;">
                            <div class="brutal-img-meta">ARCHIVE 02 // PANEL</div>
                            <img loading="lazy" src="/assets/hs3.PNG" alt="Panel Discussion" />
                        </div>
                        <div class="brutal-img-wrap" style="min-height: 350px;">
                            <div class="brutal-img-meta">ARCHIVE 03 // CROWD</div>
                            <img loading="lazy" src="/assets/hs5.PNG" alt="Crowd Engagement" />
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 w-max reveal-text">Digital & Physical Scale</div>
                    <div class="brutal-split mt-4 reveal-blur" style="transition-delay: 0.4s;">
                        <div class="brutal-split-left">
                            <div class="brutal-split-title">Pre-Buzz Artifacts</div>
                            <div class="font-['DM_Sans'] font-[600] text-sm mb-6 uppercase">Distributed via Micro-influencer network to 45,000+ students.</div>
                            <div class="brutal-img-wrap mb-6" style="min-height: 120px;">
                                <div class="brutal-img-meta">BANNER // A</div>
                                <img loading="lazy" src="/assets/hs1.jpg" alt="Campaign Banner A" />
                            </div>
                            <div class="brutal-img-wrap" style="min-height: 120px;">
                                <div class="brutal-img-meta">BANNER // B</div>
                                <img loading="lazy" src="/assets/hs2.jpg" alt="Campaign Banner B" />
                            </div>
                        </div>
                        <div class="brutal-split-right" style="background: transparent; color: var(--text-color);">
                            <div class="brutal-split-title">On-Ground Translation</div>
                            <div class="font-['DM_Sans'] font-[600] text-sm mb-6 uppercase">Turning digital hype into physical presence.</div>
                            <div class="brutal-img-wrap h-full" style="min-height: 250px;">
                                <div class="brutal-img-meta">EVIDENCE // SCREENING</div>
                                <img loading="lazy" src="/assets/hs4.PNG" alt="Screening Event" />
                            </div>
                        </div>
                    </div>

                    <div class="brutal-overline mt-16 w-max reveal-text">Campaign Impact</div>

                    <div class="brutal-stats-grid reveal-blur" style="transition-delay: 0.5s;">
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">7L+</div>
                            <div class="brutal-stat-label">Impressions in 72hrs</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">15%</div>
                            <div class="brutal-stat-label">Conversion Rate Peak</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">40K+</div>
                            <div class="brutal-stat-label">Total Engagements</div>
                        </div>
                        <div class="brutal-stat-card">
                            <div class="brutal-stat-big">1.3K+</div>
                            <div class="brutal-stat-label">Attendees Converted</div>
                        </div>
                    </div>
                </div>`
    }
];

// --- 4. LIQUID GLASS CAROUSEL SHOWCASE ---
mountLiquidCarousel('liquid-carousel-root');
// --- END LIQUID GLASS CAROUSEL SHOWCASE ---

// --- TOP RIBBON SYSTEM HUD & FOMO LOGIC ---
const exploredMilestones = new Set();
const TOTAL_MILESTONES = 12;

function triggerExploration(milestone) {
    // milestone tracking kept for internal use; bar/pct now driven by scroll position
    exploredMilestones.add(milestone);
}

// Drive "You've seen" bar & pct from actual scroll progress (start → footer)
const _ribbonBar = document.getElementById('scroll-progress-bar');
const _ribbonPct = document.getElementById('scroll-pct');
if (typeof lenis !== 'undefined' && lenis) {
    lenis.on('scroll', ({ progress }) => {
        const pct = Math.min(100, Math.round(progress * 100));
        if (_ribbonBar) _ribbonBar.style.width = pct + '%';
        if (_ribbonPct) _ribbonPct.textContent = pct + '%';
    });
}

let sessionSeconds = 0;
const timerEl = document.getElementById('session-timer');

setInterval(() => {
    sessionSeconds++;
    const m = Math.floor(sessionSeconds / 60);
    const s = sessionSeconds % 60;
    if (timerEl) timerEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
}, 1000);

// --- HUMANLY HONEST QUOTES ROTATOR ---
const hinglishPhrases = [
    "Built this site myself. Blame me for the bugs.",
    "Started as a Coder, became an AI Engineer, and currently Crafting intelligent Agents",
    "Fastest way to know me: Best Work → Contact.",
    "The blue stayed. Everything else changed.",
    "This website exists because a PDF felt boring.",
    "Most proud of the projects in \"Best Work\"."
];
let hinglishIdx = 0;
const phraseEl = document.getElementById('hinglish-phrase');
if (phraseEl) {
    setInterval(() => {
        gsap.to(phraseEl, {
            y: -10, opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => {
                hinglishIdx = (hinglishIdx + 1) % hinglishPhrases.length;
                phraseEl.innerText = hinglishPhrases[hinglishIdx];
                gsap.set(phraseEl, { y: 10 });
                gsap.to(phraseEl, { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" });
            }
        });
    }, 8000);
}

const clockEl = document.getElementById('live-ist');

function updateIST() {
    const time = new Date().toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour12: false
    });
    if (clockEl) clockEl.textContent = time;
}

updateIST();
setInterval(updateIST, 1000);

// --- DEFERRED SCROLLTRIGGERS ---
navSections.forEach(id => {
    ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => { updateNavState(id); triggerExploration(`section_${id}`); },
        onEnterBack: () => updateNavState(id)
    });
});

// Gates stay closed until the user clicks "ENTER METRO" — no auto-open.

// --- PROJECTS SECTION CREATIVE REVEAL ---
const projTl = gsap.timeline({
    scrollTrigger: {
        trigger: "#experience",
        start: "top 65%",
        once: true
    }
});

projTl.fromTo(".proj-grid-line", { strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 1.5, ease: "power3.inOut", stagger: 0.1 }, 0);
projTl.fromTo("#proj-section-badge", { y: -40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "back.out(2)" }, 0.2);
projTl.fromTo(["#proj-title-word1", "#proj-title-word2"], { y: "110%", rotationZ: 5, opacity: 0 }, { y: "0%", rotationZ: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }, 0.3);
projTl.fromTo("#proj-helper-sticker", { scale: 0.5, opacity: 0, rotationZ: 15 }, { scale: 1, opacity: 1, rotationZ: -2, duration: 0.6, ease: "back.out(1.5)", clearProps: "transform" }, 0.5);
projTl.fromTo("#stack-area", { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.5);
projTl.fromTo(".stack-card", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)", onStart: () => { if (typeof isAudioInit !== 'undefined' && isAudioInit && typeof hoverTickSynth !== 'undefined') hoverTickSynth.triggerAttackRelease("C5", "64n"); } }, 0.7);

// --- CONTACT SECTION ANIMATION ---
gsap.fromTo('.contact-stagger',
    { opacity: 0, y: 15 },
    {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: "#contact",
            start: "top 75%",
        }
    }
);
// --- SPREAD OBSERVER FOR DECKS ---
const spreadObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-spread');
            // Stop observing once spread
            spreadObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.8 });

document.querySelectorAll('.spread-deck, .spread-reels').forEach(el => spreadObserver.observe(el));
