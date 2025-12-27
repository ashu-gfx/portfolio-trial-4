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
      const span = document.createElement('span')
      span.classList.add('word')
      span.textContent = word

      fragment.appendChild(span)

      // Preserve spaces between words
      if (index < words.length - 1) {
        fragment.appendChild(document.createTextNode(' '))
      }
    })

    node.parentNode.replaceChild(fragment, node)
  })
}

// Apply to headline
document.querySelectorAll('.section-header1 .title').forEach(el => {
  if (el.dataset.wordsWrapped) return
  wrapWordsPreserveHTML(el)
  el.dataset.wordsWrapped = 'true'
})

gsap.from('.section-header1 .title .word', {
  y: 100,
  opacity: 0,
  stagger: 0.05,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.services-section',
    start: 'top 75%'
  }
})

gsap.from('.number', {
  scrollTrigger: {
    trigger: '.services-section',
    start: 'top 75%',
    once: true
  },
  duration: 1.4,
  ease: 'power2.out',
  stagger: 0.2,

  onStart () {
    this.targets().forEach(el => {
      const raw = el.textContent.trim()
      const endValue = parseInt(raw.replace(/\D/g, ''), 10)

      if (isNaN(endValue)) {
        console.warn('Invalid number:', el)
        return
      }

      el._endValue = endValue
      el.textContent = '0'
    })
  },

  onUpdate () {
    this.targets().forEach(el => {
      if (!el._endValue) return

      const progress = this.progress()
      const current = Math.round(el._endValue * progress)
      el.textContent = current
    })
  }
})
