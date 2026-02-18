import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// --- Lenis Smooth Scroll Setup ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Integrate Lenis with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// --- Navbar Blur Effect on Scroll ---
const navbar = document.getElementById('navbar');

lenis.on('scroll', ({ scroll }) => {
    if (scroll > 50) {
        navbar.classList.add('bg-[#f8f5e6]/80', 'backdrop-blur-md', 'shadow-sm', 'py-2');
        navbar.classList.remove('py-4');
    } else {
        navbar.classList.remove('bg-[#f8f5e6]/80', 'backdrop-blur-md', 'shadow-sm', 'py-2');
        navbar.classList.add('py-4');
    }
});

// --- Sketch Theme Animations ---

// Hero Animations
const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

heroTimeline.fromTo('#hero h2', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2 })
    .fromTo('#hero h1', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
    .fromTo('#hero p', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.8")
    .fromTo('.sketch-btn', { scale: 0.8, opacity: 0, rotation: -5 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)' }, "-=0.6")
    .fromTo('#hero img', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'power2.out' }, "-=1");

// Product Cards Reveal
const boxes = document.querySelectorAll('.sketch-box');
boxes.forEach((box, i) => {
    gsap.fromTo(box,
        {
            y: 50,
            opacity: 0,
            rotation: i % 2 === 0 ? -2 : 2
        },
        {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.8,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: box,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    )
});

// Story Section Image Reveal
gsap.fromTo('#story img',
    { x: -50, opacity: 0 },
    {
        x: 0,
        opacity: 0.9,
        duration: 1,
        scrollTrigger: {
            trigger: '#story',
            start: 'top 70%'
        }
    }
);

// Story Text Reveal
gsap.fromTo('#story div:last-child > *',
    { x: 50, opacity: 0 },
    {
        x: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        scrollTrigger: {
            trigger: '#story',
            start: 'top 70%'
        }
    }
);

// Custom Chai Section Reveal
gsap.fromTo('#custom-chai .container > *',
    { y: 50, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: '#custom-chai',
            start: 'top 70%'
        }
    }
);

// --- Custom Chai Logic ---
const baseOptions = document.querySelectorAll('.base-option');
const spiceSelection = document.getElementById('spice-selection');
const spiceBtns = document.querySelectorAll('.spice-btn');
const maxSpiceText = document.getElementById('max-spice-text');
const addOnPriceDisplay = document.getElementById('add-on-price');
const summaryPrice = document.getElementById('summary-price');

let currentBase = 'plain';
let selectedSpices = [];
let maxSpices = 0;

const basePrices = {
    plain: 450,
    one: 450,
    two: 450
};

const addOnPrices = {
    plain: 0,
    one: 70,
    two: 140
};

function updateSummary() {
    const addOn = addOnPrices[currentBase];
    const total = basePrices[currentBase] + (currentBase === 'plain' ? 0 : addOn);

    if (addOnPriceDisplay) addOnPriceDisplay.textContent = `₹${currentBase === 'plain' ? 0 : addOn}`;
    if (summaryPrice) summaryPrice.textContent = `₹${total}`;

    // Update count in UI
    const maxSpiceDisplay = document.getElementById('max-spice-text');
    if (maxSpiceDisplay) maxSpiceDisplay.textContent = maxSpices;
}

baseOptions.forEach(btn => {
    btn.addEventListener('click', () => {
        baseOptions.forEach(b => {
            b.classList.remove('active', 'border-orange-600', 'bg-orange-50', 'text-orange-900');
            b.classList.add('border-stone-200', 'bg-white');
        });
        btn.classList.add('active', 'border-orange-600', 'bg-orange-50', 'text-orange-900');
        btn.classList.remove('border-stone-200', 'bg-white');

        currentBase = btn.dataset.type;

        if (currentBase === 'plain') {
            maxSpices = 0;
            spiceSelection.classList.add('hidden');
            selectedSpices = [];
            spiceBtns.forEach(sb => sb.classList.remove('active'));
        } else {
            maxSpices = currentBase === 'one' ? 1 : 2;
            spiceSelection.classList.remove('hidden');
            // Trim if needed
            if (selectedSpices.length > maxSpices) {
                selectedSpices = selectedSpices.slice(0, maxSpices);
                spiceBtns.forEach(sb => {
                    if (!selectedSpices.includes(sb.dataset.name)) {
                        sb.classList.remove('active');
                    }
                });
            }
        }

        updateSummary();
    });
});

// Web Audio API Context
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// Pentatonic Scale (C Major) for harmonious sounds
const spiceNotes = {
    'Ginger': 523.25,   // C5
    'Cardamom': 587.33, // D5
    'Tulsi': 659.25,    // E5
    'Cinnamon': 783.99, // G5
    'Pepper': 880.00,   // A5
    'Clove': 1046.50,   // C6
    'Fennel': 1174.66   // D6
};

function playPianoSound(frequency) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const t = audioCtx.currentTime;
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Use Triangle wave for a softer, more instrument-like tone (closer to piano/flute)
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, t);

    // Piano Envelope: Fast attack, quick decay to sustain, then fade
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.3, t + 0.02); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, t + 1.0); // Long smooth decay

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(t);
    oscillator.stop(t + 1.0);
}

spiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const spice = btn.dataset.name;

        // Play distinct piano note for each spice
        if (spiceNotes[spice]) {
            playPianoSound(spiceNotes[spice]);
        }

        if (selectedSpices.includes(spice)) {
            selectedSpices = selectedSpices.filter(s => s !== spice);
            btn.classList.remove('active');
        } else {
            if (selectedSpices.length < maxSpices) {
                selectedSpices.push(spice);
                btn.classList.add('active');
            } else if (maxSpices === 1) {
                spiceBtns.forEach(sb => sb.classList.remove('active'));
                selectedSpices = [spice];
                btn.classList.add('active');
            }
        }
        updateSummary();
    });
});

console.log("Fatafat Chai Sketch Theme Initialized");

// --- Toy Train Animation ---
// Moves the train from top to bottom of #story section via ScrollTrigger scrub
gsap.to('#toy-train', {
    scrollTrigger: {
        trigger: '#story',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
    },
    top: '95%', 
    ease: 'none'
});

// Animate the train orientation slightly on scroll
gsap.to('#toy-train div', {
    scrollTrigger: {
        trigger: '#story',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2
    },
    rotation: 5,
    yoyo: true,
    repeat: 5
});

// Floating Spices Animation (Parallax + Reveal)
const spices = document.querySelectorAll('.spice-float');
if (spices.length > 0) {
    spices.forEach((spice, i) => {
        gsap.fromTo(spice, 
            { y: 50, opacity: 0, scale: 0.5 },
            {
                y: -100,
                opacity: 0.8,
                scale: 1.2,
                rotation: 360,
                duration: 2,
                scrollTrigger: {
                    trigger: '#story',
                    start: `top ${20 + (i * 20)}%`,
                    end: `top ${40 + (i * 20)}%`,
                    scrub: 1.5
                }
            }
        );
    });
}
