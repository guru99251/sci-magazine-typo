document.addEventListener("DOMContentLoaded", () => {
  const content      = document.getElementById('content');       // 우측 본문 스크롤 영역
  const photoList    = document.querySelector('.photo-list');    // 사진 리스트 wrapper
  const photoText    = document.getElementById('photo-text');    // 사진 캡션 텍스트
  const sections     = Array.from(content.querySelectorAll('.section'));
  const containerH   = document.querySelector('.photo-container').clientHeight;

  // 옵저버 설정: 챕터(.section)가 50% 보일 때마다 콜백
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const idx = sections.indexOf(entry.target);
      // 사진 리스트를 딱 idx 위치로 이동
      photoList.style.transform = `translateY(-${idx * containerH}px)`;

      // 텍스트 업데이트
      photoText.textContent = entry.target.dataset.text;
    });
  }, {
    root: content,
    threshold: 0.5
  });

  sections.forEach(sec => observer.observe(sec));

  // 초기 상태: 첫 챕터
  if (sections[0]) {
    photoList.style.transform = `translateY(0)`;
    photoText.textContent     = sections[0].dataset.text;
  }
});