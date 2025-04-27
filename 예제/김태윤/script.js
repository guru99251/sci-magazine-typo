const photos = document.querySelectorAll('.photo');
const content = document.getElementById('content');

let lastImageIndex = 0;

function showImage(index) {
  photos.forEach((img, i) => {
    img.classList.remove('active');
    if (i === index) {
      img.classList.add('active');
    }
  });
}

content.addEventListener('scroll', () => {
  const scrollTop = content.scrollTop;
  const scrollHeight = content.scrollHeight - content.clientHeight;
  const scrollFraction = scrollTop / scrollHeight;
  const newImageIndex = Math.floor(scrollFraction * photos.length);

  if (newImageIndex !== lastImageIndex && newImageIndex < photos.length) {
    showImage(newImageIndex);
    lastImageIndex = newImageIndex;
  }

  const colorValue = 240 + Math.floor(15 * scrollFraction);
  document.body.style.background = `linear-gradient(to bottom, #ffffff, rgb(${colorValue}, ${colorValue}, 255))`;
});