const slides = document.querySelectorAll('.simple-slider .slide');
const prev = document.querySelector('.slider-prev');
const next = document.querySelector('.slider-next');
let current = 0;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

// Автоматическая смена слайдов каждые 10 секунд
setInterval(nextSlide, 10000);