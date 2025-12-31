// 1. Initialize Lenis
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Default easing
  smoothWheel: true
});

// 2. Synchronize Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// 3. Add Lenis to GSAP's RequestAnimationFrame (ticker)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert seconds to milliseconds
});

// 4. Disable lag smoothing for smoother synchronization
gsap.ticker.lagSmoothing(0);