document.addEventListener('DOMContentLoaded', () => {
  const rightPane = document.querySelector('.right');
  const leftPane  = document.querySelector('.left');
  const sections  = document.querySelectorAll('.section');

  // 초기 배경 설정
  const firstImg = sections[0].dataset.image;
  leftPane.style.backgroundImage = `url('/src/${firstImg}')`;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target.dataset.image;
        leftPane.style.backgroundImage = `url('/src/${img}')`;
      }
    });
  }, {
    root: rightPane,
    threshold: 0.5
  });

  sections.forEach(sec => io.observe(sec));
});
