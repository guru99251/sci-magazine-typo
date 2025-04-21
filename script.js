document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
      root: document.querySelector('.right'),
      threshold: 0.5
    };
    const leftPane = document.querySelector('.left');
    const sections = document.querySelectorAll('.section');
  
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target.getAttribute('data-image');
          leftPane.style.backgroundImage = `url('${img}')`;
        }
      });
    }, observerOptions);
  
    sections.forEach(sec => io.observe(sec));
  });
  