document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP plugin once
  gsap.registerPlugin(ScrollTrigger);

  /**
   * Wraps text content into animatable spans.
   * Handles multiple spaces by collapsing them into single delimiters.
   */
  function wrapWordsForReveal(selector) {
    document.querySelectorAll(selector).forEach(el => {
      // Prevent double-wrapping if the function is called twice
      if (el.querySelector('.text-inner3')) return;

      // Use regex /\s+/ to split by one OR MORE spaces
      // .filter(Boolean) removes any empty strings from the array
      const words = el.textContent.trim().split(/\s+/).filter(Boolean);

      el.innerHTML = words
        .map(
          word => `
          <span class="text-mask3" style="display: inline-block; overflow: hidden; vertical-align: bottom;">
            <span class="text-inner3" style="display: inline-block;">${word}</span>
          </span>
        `
        )
        .join(' '); // Re-inserts a single space between words
    });
  }

  // 1. Prepare the elements
  wrapWordsForReveal('.heading .word3');
  wrapWordsForReveal('.description');
  wrapWordsForReveal('.role');
  wrapWordsForReveal('.company');
  wrapWordsForReveal('.period');

  // 2. Animate Headings
  gsap.fromTo(
    '.heading .text-inner3',
    { y: '100%', autoAlpha: 0 },
    {
      y: '0%',
      autoAlpha: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: '.heading',
        start: 'top 75%',
        once: true
      }
    }
  );

  // 3. Animate Descriptions & Roles (triggered by .layout)
  gsap.fromTo(
    '.description .text-inner3, .role .text-inner3, .company .text-inner3, .period .text-inner3',
    { y: '100%', autoAlpha: 0 },
    {
      y: '0%',
      autoAlpha: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.02, // Faster stagger for longer body text
      scrollTrigger: {
        trigger: '.layout',
        start: 'top 80%',
        once: true
      }
    }
  );

  // 4. Animate Experience Item borders
  gsap.from('.exp-item', {
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
    autoAlpha: 0,
    duration: 1.6,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.layout',
      start: 'top 80%',
      once: true
    }
  });
});