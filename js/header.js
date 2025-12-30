gsap.registerPlugin()

/* -------------------------------------
   HEADER ANIMATION
------------------------------------- */
function headerAnimation () {
  return gsap
    .timeline({
      defaults: {
        duration: 0.7, // Just slightly faster than original 0.8
        ease: 'power2.out', // Smooth but efficient
        force3D: true
      }
    })
    .from('header', { yPercent: -20, autoAlpha: 0 })
    .from('.logo', { yPercent: -30, autoAlpha: 0 }, '-=0.4')
    .from(
      '.center-info span',
      {
        yPercent: -20,
        autoAlpha: 0,
        stagger: 0.1 // Tightened from 0.15
      },
      '-=0.45'
    )
    .from('.theme-toggle', { yPercent: -20, autoAlpha: 0 }, '-=0.5')
    .from('.talk-btn', { yPercent: -40, autoAlpha: 0 }, '-=0.5')
    .from('.menu-btn', { yPercent: -20, autoAlpha: 0 }, '-=0.5')
}

/* -------------------------------------
   TEXT SPLITTER (SAFE)
------------------------------------- */
function splitTextToSpans (selector) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.querySelector('.text-inner')) return

    const text = el.innerHTML.trim()
    el.innerHTML = `
      <span class="text-mask">
        <span class="text-inner">${text}</span>
      </span>
    `
  })
}

/* -------------------------------------
   HERO ANIMATION (RESPONSIVE)
------------------------------------- */
function heroAnimation () {
  return gsap
    .timeline({
      defaults: {
        duration: 0.75, // Balanced from original 0.9
        ease: 'power3.out', 
        force3D: true
      }
    })
    .from('.hero-top .text-inner', {
      yPercent: 100,
      stagger: 0.07 // Slightly tighter
    })
    .from(
      '.hero-big-name .text-inner',
      {
        yPercent: 100
      },
      '-=0.4'
    )
    .from(
      '.hero-mini-text',
      {
        borderLeftColor: 'rgba(204,204,204,0)',
        duration: 0.5
      },
      '-=0.3'
    )
    .from(
      '.hero-badge',
      {
        scaleX: 0,
        transformOrigin: 'left center'
      },
      '-=0.3'
    )
    .from('.img-orange img', {
      yPercent: 20,
      autoAlpha: 0
    }, '-=0.3')
    .from('.hero-images .circles', {
      autoAlpha: 0,
      duration: 0.5
    }, '-=0.2')
    .from('.img-main img', {
      yPercent: 20,
      autoAlpha: 0
    }, '-=0.3')
    .to('.img-orange, .img-main', {
      boxShadow: '0px 20px 40px rgba(0,0,0,0.3)',
      duration: 0.6
    }, '-=0.2')
}
/* -------------------------------------
   IMAGE WRAPPER (SAFE)
------------------------------------- */
function wrapImages (selector) {
  document.querySelectorAll(selector).forEach(container => {
    const img = container.querySelector('img')
    if (!img || container.querySelector('.img-mask')) return

    const span = document.createElement('span')
    span.className = 'img-mask'
    img.parentNode.insertBefore(span, img)
    span.appendChild(img)
  })
}

/* -------------------------------------
   INIT (DEVICE SAFE)
------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  wrapImages('.img-orange, .img-main')

  splitTextToSpans(`
    .hero-top p,
    .hero-title,
    .hero-title-secondary,
    .hero-mini-text span,
    .hero-big-name
  `)

  // 🚫 Reduced motion support
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set('*', { clearProps: 'all' })
    return
  }

  // 📱 Device safe execution
  const mm = gsap.matchMedia()

  mm.add('(min-width: 0px)', () => {
    const master = gsap.timeline({
      invalidateOnRefresh: true
    })

    master.add(headerAnimation()).add(heroAnimation())

    // Force recalculation after images load
    requestAnimationFrame(() => {
      ScrollTrigger?.refresh?.()
    })
  })
})
