// script.js
document.addEventListener("DOMContentLoaded", () => {
  // 1) 스크롤 대상과 챕터(.section)들 가져오기
  const paragraphContainer = document.getElementById("content");           // .paragraph-container (스크롤 컨테이너) :contentReference[oaicite:0]{index=0}&#8203;:contentReference[oaicite:1]{index=1}
  const sections = paragraphContainer.querySelectorAll(".section");        // 각 챕터 섹션 :contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3}

  // 2) 사진 컨테이너, 사진들, 텍스트 요소 가져오기
  const photoContainer = document.querySelector(".photo-container");       // .photo-container :contentReference[oaicite:4]{index=4}&#8203;:contentReference[oaicite:5]{index=5}
  const photos = photoContainer.querySelectorAll("img.photo");             // 내부 <img class="photo">들 :contentReference[oaicite:6]{index=6}&#8203;:contentReference[oaicite:7]{index=7}
  const photoText = document.getElementById("photo-text");                 // 사진 위에 표시할 텍스트 :contentReference[oaicite:8]{index=8}&#8203;:contentReference[oaicite:9]{index=9}

  // 3) 사진들을 겹치고 숨길 수 있게 스타일 초기화
  photoContainer.style.position = "relative";
  photos.forEach(photo => {
    Object.assign(photo.style, {
      position:   "absolute",
      top:        "0",
      left:       "0",
      width:      "100%",
      height:     "100%",
      objectFit:  "cover",
      transition: "opacity 0.5s ease",
      opacity:    "0"
    });
  });

  // 4) 활성 챕터에 맞춰 사진과 텍스트를 전환하는 함수
  function updatePhoto(imageFile, text) {
    photos.forEach(photo => {
      // <img src="/static/chapterX.jpg"> 형태이므로 includes()로 매칭
      photo.style.opacity = photo.src.includes(imageFile) ? "1" : "0";
    });
    photoText.textContent = text;
  }

  // 5) IntersectionObserver로 챕터가 반쯤 보일 때마다 사진 전환
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const { image, text } = entry.target.dataset;
        updatePhoto(image, text);
      }
    });
  }, {
    root:       paragraphContainer,  // 우측 스크롤 영역을 기준으로 관찰 :contentReference[oaicite:10]{index=10}&#8203;:contentReference[oaicite:11]{index=11}
    threshold:  0.5                  // 섹션이 50% 보였을 때 트리거
  });

  sections.forEach(sec => observer.observe(sec));

  // 6) 초기 로드 시 첫 챕터 이미지 표시
  if (sections[0]) {
    updatePhoto(sections[0].dataset.image, sections[0].dataset.text);
  }
});
