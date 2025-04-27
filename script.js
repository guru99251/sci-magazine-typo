document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById('content');              // 스크롤 대상
  const photoList = document.querySelector('.photo-list');         // 움직일 리스트
  const photoCount = photoList.children.length;
  const containerHeight = document.querySelector('.photo-container').clientHeight;
  const listHeight = containerHeight * photoCount;

  // 스크롤 시 실행
  content.addEventListener('scroll', () => {
    const scrollTop = content.scrollTop;
    const maxScroll = content.scrollHeight - content.clientHeight;
    const ratio = scrollTop / maxScroll;          // 0 ~ 1

    // translateY: 리스트 전체 높이 - 컨테이너 높이 만큼 움직임
    const moveY = (listHeight - containerHeight) * ratio;
    photoList.style.transform = `translateY(-${moveY}px)`;

    // 현재 보여야 할 섹션 인덱스로 텍스트 업데이트 (선택사항)
    const sections = content.querySelectorAll('.section');
    const idx = Math.min(
      photoCount - 1,
      Math.floor(ratio * photoCount)
    );
    const { text } = sections[idx].dataset;
    document.getElementById('photo-text').textContent = text;
  });

  // 초기 위치 세팅
  content.dispatchEvent(new Event('scroll'));
});