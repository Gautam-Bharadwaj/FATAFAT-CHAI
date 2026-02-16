import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// --- Navbar Blur Effect on Scroll ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
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
            trigger: '#story ml-auto', // targeting loosely
            start: 'top 70%'
        }
    }
);

console.log("Fatafat Chai Sketch Theme Initialized");
