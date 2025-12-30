/**
 * 1. WRAP WORDS IN SPANS
 * Preserves HTML structure while wrapping individual words for GSAP animations.
 */
function wrapWordsPreserveHTML (element) {
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )

  const textNodes = []
  while (walker.nextNode()) {
    if (walker.currentNode.textContent.trim()) {
      textNodes.push(walker.currentNode)
    }
  }

  textNodes.forEach(node => {
    const words = node.textContent.split(/\s+/)
    const fragment = document.createDocumentFragment()

    words.forEach((word, index) => {
      if (word.length > 0) {
        const span = document.createElement('span')
        span.classList.add('word')
        span.textContent = word
        fragment.appendChild(span)

        // Add space between words
        if (index < words.length - 1) {
          fragment.appendChild(document.createTextNode(' '))
        }
      }
    })

    node.parentNode.replaceChild(fragment, node)
  })
}

// Initialize Word Wrapping
document.querySelectorAll('.headline h2').forEach(el => {
  if (el.dataset.wordsWrapped) return
  wrapWordsPreserveHTML(el)
  el.dataset.wordsWrapped = 'true'
})

/**
 * 2. GSAP ANIMATIONS
 */

// Headline Text Animation
gsap.from('.headline .word', {
  y: 100,
  opacity: 0,
  stagger: 0.05,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.footer-stats',
    start: 'top 75%'
  }
})

// Number Counter Animation
// We use toArray().forEach to capture the unique end value of each number individually
gsap.utils.toArray('.number').forEach((el, i) => {
  const rawValue = el.textContent.trim()
  const endValue = parseInt(rawValue.replace(/\D/g, ''), 10)

  if (isNaN(endValue)) return

  // Create a proxy object for GSAP to animate
  const counter = { val: 0 }

  gsap.to(counter, {
    val: endValue,
    duration: 1.4,
    ease: 'power2.out',
    delay: i * 0.2, // This replaces the "stagger" behavior in a forEach loop
    scrollTrigger: {
      trigger: '.footer-stats',
      start: 'top 75%',
      once: true // Animation happens only once
    },
    onUpdate: () => {
      // Update text with rounded value
      el.textContent = Math.floor(counter.val)
    },
    onComplete: () => {
      // Final safety check to ensure exact number is set
      el.textContent = endValue
    }
  })
})
