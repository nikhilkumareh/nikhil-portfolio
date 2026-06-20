/* =====================================================
   NIKHIL KUMAR PORTFOLIO
   script.js
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeCounters();
    initializeRevealAnimations();
    initializeNavbar();
    initializeSmoothScroll();
    initializeMobileMenu();
    initializeNetworkBackground();

});

/* =====================================================
   COUNTER ANIMATION
   ===================================================== */

function initializeCounters() {

    const counters = document.querySelectorAll(".counter");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const counter = entry.target;
                const target = +counter.dataset.target;

                let current = 0;

                const increment = target / 100;

                const updateCounter = () => {

                    if (current < target) {

                        current += increment;

                        counter.innerText = Math.ceil(current);

                        requestAnimationFrame(updateCounter);

                    } else {

                        counter.innerText = target + "+";

                    }

                };

                updateCounter();

                observer.unobserve(counter);

            }

        });

    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

}

/* =====================================================
   SCROLL REVEAL ANIMATION
   ===================================================== */

function initializeRevealAnimations() {

    const reveals = document.querySelectorAll(
        ".glass-card, .skill-card, .metric-card, .timeline-item, .project-card, .recognition-card"
    );

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    }, {
        threshold: 0.1
    });

    reveals.forEach(item => {

        item.classList.add("reveal");

        observer.observe(item);

    });

}

/* =====================================================
   NAVBAR EFFECT
   ===================================================== */

function initializeNavbar() {

    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(13,17,23,0.95)";

            navbar.style.boxShadow =
                "0 10px 30px rgba(0,0,0,0.25)";

        } else {

            navbar.style.background =
                "rgba(13,17,23,0.65)";

            navbar.style.boxShadow = "none";

        }

    });

}

/* =====================================================
   SMOOTH SCROLL
   ===================================================== */

function initializeSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(
                this.getAttribute("href")
            );

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}

/* =====================================================
   MOBILE MENU
   ===================================================== */

function initializeMobileMenu() {

    const menuButton =
        document.querySelector(".mobile-menu");

    const navLinks =
        document.querySelector(".nav-links");

    if (!menuButton || !navLinks) return;

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-active");

    });

}

/* =====================================================
   NETWORK BACKGROUND
   ===================================================== */

function initializeNetworkBackground() {

    const canvas =
        document.getElementById("network-canvas");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    let particles = [];

    let mouse = {

        x: null,
        y: null,
        radius: 120

    };

    function resizeCanvas() {

        width = canvas.width =
            window.innerWidth;

        height = canvas.height =
            window.innerHeight;

    }

    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    window.addEventListener(
        "mousemove",
        (event) => {

            mouse.x = event.x;
            mouse.y = event.y;

        }
    );

    class Particle {

        constructor() {

            this.x =
                Math.random() * width;

            this.y =
                Math.random() * height;

            this.vx =
                (Math.random() - 0.5) * 0.6;

            this.vy =
                (Math.random() - 0.5) * 0.6;

            this.radius =
                Math.random() * 2 + 1;

        }

        update() {

            this.x += this.vx;
            this.y += this.vy;

            if (
                this.x < 0 ||
                this.x > width
            ) {
                this.vx *= -1;
            }

            if (
                this.y < 0 ||
                this.y > height
            ) {
                this.vy *= -1;
            }

        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(88,166,255,0.8)";

            ctx.fill();

        }

    }

    function createParticles() {

        particles = [];

        const particleCount =
            Math.min(
                Math.floor(window.innerWidth / 12),
                120
            );

        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(
                new Particle()
            );

        }

    }

    createParticles();

    function connectParticles() {

        for (
            let a = 0;
            a < particles.length;
            a++
        ) {

            for (
                let b = a;
                b < particles.length;
                b++
            ) {

                const dx =
                    particles[a].x -
                    particles[b].x;

                const dy =
                    particles[a].y -
                    particles[b].y;

                const distance =
                    dx * dx + dy * dy;

                if (distance < 12000) {

                    const opacity =
                        1 -
                        distance / 12000;

                    ctx.strokeStyle =
                        `rgba(88,166,255,${opacity * 0.25})`;

                    ctx.lineWidth = 1;

                    ctx.beginPath();

                    ctx.moveTo(
                        particles[a].x,
                        particles[a].y
                    );

                    ctx.lineTo(
                        particles[b].x,
                        particles[b].y
                    );

                    ctx.stroke();

                }

            }

        }

    }

    function connectMouse() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {
            return;
        }

        particles.forEach(particle => {

            const dx =
                particle.x - mouse.x;

            const dy =
                particle.y - mouse.y;

            const distance =
                Math.sqrt(dx * dx + dy * dy);

            if (
                distance < mouse.radius
            ) {

                ctx.beginPath();

                ctx.moveTo(
                    particle.x,
                    particle.y
                );

                ctx.lineTo(
                    mouse.x,
                    mouse.y
                );

                ctx.strokeStyle =
                    "rgba(88,166,255,0.15)";

                ctx.stroke();

            }

        });

    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        particles.forEach(particle => {

            particle.update();
            particle.draw();

        });

        connectParticles();
        connectMouse();

        requestAnimationFrame(
            animate
        );

    }

    animate();

}

/* =====================================================
   END
   ===================================================== */