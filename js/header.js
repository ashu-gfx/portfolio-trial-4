gsap.registerPlugin()

/* -------------------------------------
   HEADER ANIMATION
------------------------------------- */
function headerAnimation () {
  return gsap
    .timeline({
      defaults: {
        duration: 0.8,
        ease: 'power3.inOut',
        force3D: true
      }
    })
    .from('header', { yPercent: -30, autoAlpha: 0 })
    .from('.logo', { yPercent: -40, autoAlpha: 0 }, '-=0.4')
    .from(
      '.center-info span',
      {
        yPercent: -30,
        autoAlpha: 0,
        stagger: 0.15
      },
      '-=0.5'
    )
    .from('.theme-toggle', { yPercent: -20, autoAlpha: 0 }, '-=0.4')
    .from('.talk-btn', { yPercent: -60, autoAlpha: 0 }, '-=0.4')
    .from('.menu-btn', { yPercent: -20, autoAlpha: 0 }, '-=0.4')
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
        duration: 0.9,
        ease: 'power3.out',
        force3D: true
      }
    })
    .from('.hero-top .text-inner', {
      yPercent: 100,
      stagger: 0.08
    })
    .from(
      '.hero-big-name .text-inner',
      {
        yPercent: 120
      },
      '-=0.4'
    )
    .from(
      '.hero-mini-text',
      {
        borderLeftColor: 'rgba(204,204,204,0)',
        duration: 0.6,
        ease: 'power2.out'
      },
      '-=0.4'
    )
    .from(
      '.hero-badge',
      {
        scaleX: 0,
        transformOrigin: 'left center'
      },
      '-=0.4'
    )
    .from('.img-orange img', {
      yPercent: 30,
      autoAlpha: 0
    })
    .from('.hero-images .circles', {
      autoAlpha: 0,
      duration: 0.6
    })
    .from('.img-main img', {
      yPercent: 30,
      autoAlpha: 0
    })
    .to('.img-orange', {
      boxShadow: '0px 20px 40px rgba(0,0,0,0.3)',
      duration: 0.8
    })
    .to('.img-main', {
      boxShadow: '0px 20px 40px rgba(0,0,0,0.4)',
      duration: 0.8
    })
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

// function headerAnimation () {
//   const tl = gsap.timeline({
//     defaults: {
//       duration: 0.8,
//       ease: 'power3.inOut'
//     }
//   })

//   tl.from('header', { y: -20, opacity: 0 })
//     .from('.logo', { y: -30, opacity: 0 }, '-=0.4')
//     .from(
//       '.center-info span',
//       {
//         y: -25,
//         opacity: 0,
//         stagger: 0.15
//       },
//       '-=0.5'
//     )
//     .from('.theme-toggle', { y: -20, opacity: 0 }, '-=0.4')
//     .from('.talk-btn', { y: -60, opacity: 0 }, '-=0.4')
//     .from('.menu-btn', { y: -20, opacity: 0 }, '-=0.4')

//   return tl
// }

// function splitTextToSpans (selector) {
//   document.querySelectorAll(selector).forEach(el => {
//     if (el.querySelector('.text-inner')) return

//     const text = el.innerHTML
//     el.innerHTML = `
//       <span class="text-mask">
//         <span class="text-inner">${text}</span>
//       </span>
//     `
//   })
// }

// function heroAnimation () {
//   const tl = gsap.timeline({
//     defaults: {
//       duration: 0.9,
//       ease: 'power3.out'
//     }
//   })

//   tl.from('.hero-top .text-inner', {
//     y: 100,
//     stagger: 0.08
//   })
//     .from(
//       '.hero-big-name .text-inner',
//       {
//         y: 170
//       },
//       '-=0.4'
//     )

//     .from(
//       '.hero-mini-text',
//       {
//         borderLeftColor: 'rgba(204,204,204,0)',
//         duration: 0.6,
//         ease: 'power2.out'
//       },
//       '-=0.4'
//     )

//     .from(
//       '.hero-badge',
//       {
//         width: '0rem'
//       },
//       '-=0.4'
//     )

//     .from('.img-orange img', {
//       y: 120,
//       autoAlpha: 0
//     })

//     .from('.hero-images .circles', {
//       opacity: 0,
//       duration: 0.6
//     })

//     .from('.img-main img', { y: 120, autoAlpha: 0, delay: 0.15 })

//     .to('.img-orange', {
//       boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.3)',
//       duration: 0.8
//       // ease: 'power3.out'
//     })

//     .to('.img-main', {
//       boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.4)',
//       duration: 0.8
//       // ease: 'power3.out'
//     })

//   return tl
// }

// function wrapImages (selector) {
//   document.querySelectorAll(selector).forEach(container => {
//     const img = container.querySelector('img')
//     if (!img || container.querySelector('.img-mask')) return

//     const span = document.createElement('span')
//     span.classList.add('img-mask')

//     img.parentNode.insertBefore(span, img)
//     span.appendChild(img)
//   })
// }

// wrapImages('.img-orange, .img-main')

// window.addEventListener('load', () => {
//   splitTextToSpans(`
//     .hero-top p,
//     .hero-title,
//     .hero-title-secondary,
//     .hero-mini-text span,
//     .hero-big-name
//   `)

//   const master = gsap.timeline()

//   master.add(headerAnimation()).add(heroAnimation())
// })

// window.addEventListener('load', () => {
//   const tl = gsap.timeline({
//     defaults: {
//       duration: 0.8,
//       ease: 'power3.inOut'
//     }
//   })

//   tl
//     // Header container fade
//     .from('header', {
//       y: -20,
//       opacity: 0
//     })

//     // Logo
//     .from(
//       '.logo',
//       {
//         y: -30,
//         opacity: 0
//       },
//       '-=0.4'
//     )

//     // Center info text (staggered)
//     .from(
//       '.center-info span',
//       {
//         y: -25,
//         opacity: 0,
//         stagger: 0.15
//       },
//       '-=0.5'
//     )

//     // Theme toggle icon
//     .from(
//       '.theme-toggle',
//       {
//         y: -20,
//         opacity: 0
//       },
//       '-=0.4'
//     )

//     // Talk button
//     .from(
//       '.talk-btn',

//       {
//         y: -60,
//         opacity: 0
//       },
//       '-=0.4'
//     )

//     // Menu button (mobile)
//     .from(
//       '.menu-btn',
//       {
//         y: -20,
//         opacity: 0
//       },
//       '-=0.4'
//     )
// })

// // const toggle = document.getElementById('themeToggle')
// // toggle.addEventListener('click', () => {
// //   document.body.classList.toggle('dark')
// // })

// function splitTextToSpans (selector) {
//   document.querySelectorAll(selector).forEach(el => {
//     if (el.querySelector('.text-inner')) return

//     const text = el.innerHTML
//     el.innerHTML = `
//       <span class="text-mask">
//         <span class="text-inner">${text}</span>
//       </span>
//     `
//   })
// }

// splitTextToSpans(`
//   .hero-top p,
//   .hero-title,
//   .hero-title-secondary,
//   .hero-mini-text span,
//   .hero-big-name
// `)

// const tl = gsap.timeline({
//   defaults: {
//     duration: 0.9,
//     ease: 'power3.out'
//   }
// })

// tl.from('.text-inner', {
//   y: 40,
//   stagger: 0.08
// })

// tl.from('.hero-top .text-inner', {
//   y: 40,
//   stagger: 0.08
// }).from(
//   '.hero-big-name .text-inner',
//   {
//     y: 40
//   },
//   '-=0.4'
// )
