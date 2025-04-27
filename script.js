document.addEventListener("DOMContentLoaded", () => {
  const content     = document.getElementById('content');
  const photoList   = document.querySelector('.photo-list');
  const photoText   = document.getElementById('photo-text');
  const sections    = Array.from(content.querySelectorAll('.section'));
  const photoContainer = document.querySelector('.photo-container');

  // 컨테이너 높이 계산
  const getContainerHeight = () => photoContainer.clientHeight;
  let containerH = getContainerHeight();

  // thresholds: 각 섹션의 offsetTop 값
  const getThresholds = () => sections.map(sec => sec.offsetTop);
  let thresholds = getThresholds();

  // 리사이즈, MathJax 완료 등으로 레이아웃 변경 시 재계산
  const recalc = () => {
    containerH = getContainerHeight();
    thresholds = getThresholds();
  };
  window.addEventListener('resize', recalc);
  window.addEventListener('load', recalc);
  if (window.MathJax) MathJax.startup.promise.then(recalc);

  // 스크롤에 맞춰 idx 결정 및 snap
  content.addEventListener('scroll', () => {
    // 최신 offsets 사용
    thresholds = getThresholds();
    const scrollY = content.scrollTop;
    let idx = 0;
    for (let i = 0; i < thresholds.length; i++) {
      if (scrollY >= thresholds[i]) idx = i;
      else break;
    }
    // 마지막 섹션까지 도달 시 마지막 이미지 보장
    if (scrollY + content.clientHeight >= content.scrollHeight) {
      idx = sections.length - 1;
    }

    // 사진 스냅
    photoList.style.transform = `translateY(-${idx * containerH}px)`;
    photoText.textContent = sections[idx].dataset.text;
  });

  // 초기 트리거 (모든 로드 후)
  window.addEventListener('load', () => content.dispatchEvent(new Event('scroll')));
  if (window.MathJax) MathJax.startup.promise.then(() => content.dispatchEvent(new Event('scroll')));
});
