const testimonials = [
  {
    text: "They're like digital magicians!",
    avatar: 'https://picsum.photos/seed/user1/100/100'
  },
  {
    text: 'A total game-changer for us!',
    avatar: 'https://picsum.photos/seed/user2/100/100'
  },
  {
    text: "I can't stop recommending them.",
    avatar: 'https://picsum.photos/seed/user3/100/100'
  },
  {
    text: 'Professional, creative, and timely.',
    avatar: 'https://picsum.photos/seed/user4/100/100'
  },
  {
    text: 'The best investment we made.',
    avatar: 'https://picsum.photos/seed/user5/100/100'
  }
]

const marqueeTrack = document.getElementById('marqueeTrack')

// ✅ Duplicate ONLY twice
const repeated = [...testimonials, ...testimonials]

repeated.forEach(item => {
  const div = document.createElement('div')
  div.className = 'testimonial-item'

  div.innerHTML = `
      <img src="${item.avatar}" class="testimonial-avatar" />
      <span class="testimonial-text">${item.text}</span>
    `
  marqueeTrack.appendChild(div)
})

/* ---------------------------
     START MARQUEE ANIMATION
  ---------------------------- */

let x = 0
const speed = 0.5 // increase = faster

let paused = false

marqueeTrack.addEventListener('mouseenter', () => (paused = true))
marqueeTrack.addEventListener('mouseleave', () => (paused = false))

function animate () {
  if (!paused) {
    x -= speed
    marqueeTrack.style.transform = `translateX(${x}px)`
    if (Math.abs(x) >= marqueeTrack.scrollWidth / 2) x = 0
  }
  requestAnimationFrame(animate)
}

animate()



