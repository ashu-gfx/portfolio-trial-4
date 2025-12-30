const portfolioItems = [
  {
    id: 'p1',
    title: 'HEED',
    category: 'UI UX Case Study',
    imageUrl: 'images/portfolio images/p1.png',
    videoUrl: 'videos/p1.mp4', // Example video
    tags: ['Figma', 'Photoshop', 'Illustrator']
  },
  ,
  {
    id: 'p2',
    title: 'Fly way',
    category: 'Travel Agency Website Design',
    imageUrl: 'images/portfolio images/p2.png',
    videoUrl: 'videos/p2.mp4',
    tags: ['Figma']
  },
  {
    id: 'p3',
    title: 'HEED',
    category: 'UI UX Case Study',
    imageUrl: 'images/portfolio images/p3.png',
    videoUrl: 'videos/p3.mp4',
    tags: ['Figma', 'Photoshop', 'Illustrator']
  },
  {
    id: 'p4',
    title: 'Fly way',
    category: 'Travel Agency Website Design',
    imageUrl: 'images/portfolio images/p4.png',
    videoUrl: 'videos/p4.mp4',
    tags: ['Figma']
  },
  {
    id: 'p5',
    title: 'HEED',
    category: 'UI UX Case Study',
    imageUrl: 'images/portfolio images/p5.png',
    videoUrl: 'videos/p5.mp4',
    tags: ['Figma', 'Photoshop', 'Illustrator']
  },
  {
    id: 'p6',
    title: 'Fly way',
    category: 'Travel Agency Website Design',
    imageUrl: 'images/portfolio images/p6.png',
    videoUrl: 'videos/p6.mp4',
    tags: ['Figma']
  },
  // {
  //   id: 'p7',
  //   title: 'HEED',
  //   category: 'UI UX Case Study',
  //   imageUrl: 'https://picsum.photos/seed/food/800/600',
  //   videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //   tags: ['Figma', 'Photoshop', 'Illustrator']
  // },
  // {
  //   id: 'p8',
  //   title: 'Fly way',
  //   category: 'Travel Agency Website Design',
  //   imageUrl: 'https://picsum.photos/seed/3dchar/800/600',
  //   videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  //   tags: ['Figma']
  // }
  // Add videoUrl to other items...
]

const grid = document.getElementById('portfolioGrid')

portfolioItems.forEach(item => {
  const div = document.createElement('div');
  div.className = 'portfolio-item';

  div.innerHTML = `
      <div class="portfolio-image-box">
        <video class="portfolio-video" 
               src="${item.videoUrl}" 
               loop 
               playsinline 
               preload="auto" 
               muted>
        </video>
        
        <img src="${item.imageUrl}" alt="${item.title}" class="portfolio-img" />

        <div class="tag-container">
          ${item.tags.map(tag => `<span class="badge2">${tag}</span>`).join('')}
        </div>
      </div>

      <div class="portfolio-info">
        <div>
          <h3 class="item-title">${item.title}</h3>
          <p class="item-category">${item.category}</p>
        </div>
        <div class="arrow-btn">
          <svg class="arrow-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    `;

  const video = div.querySelector('.portfolio-video');

  div.addEventListener('mouseenter', () => {
    video.muted = false; // Turn on sound
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback if browser blocks sound
        video.muted = true;
        video.play();
      });
    }
  });

  div.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
    video.muted = true; // Reset mute state
  });

  grid.appendChild(div);
});