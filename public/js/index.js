window.addEventListener('load', () => {
  const bar = document.querySelector('.top-gradient-bar');
  setTimeout(() => {
    bar.classList.add('visible');
  }, 200);
});

function autoSlider(selector, interval) {
  const slides = document.querySelector(selector);
  let index = 0;

  setInterval(() => {
    index = (index + 1) % slides.children.length;
    slides.style.transform = `translateX(-${index * 100}vw)`;
  }, interval);
}

// Welcome (suave)
autoSlider('.welcome-slider .slides', 3000);

// About (controlado)
const aboutSlides = document.querySelector('.about-slider .slides');
const prev = document.querySelector('.about-slider .prev');
const next = document.querySelector('.about-slider .next');
let aboutIndex = 0;

next.onclick = () => {
  aboutIndex = (aboutIndex + 1) % aboutSlides.children.length;
  aboutSlides.style.transform = `translateX(-${aboutIndex * 100}vw)`;
};

// Esperar a que el DOM esté cargado
console.log("Get DOM?")

const openBtn = document.getElementById('ws-modal');
const modal = document.getElementById('modal-container');
const closeBtn = document.getElementById('close-modal');

// Abrir modal
openBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Evita que el '#' recargue o mueva la página
  modal.style.display = 'flex';
});

// Cerrar modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});


const promoImages = document.querySelectorAll('.promo-slider img');
let promoIndex = 0;

setInterval(() => {
  promoImages[promoIndex].classList.remove('active');
  promoIndex = (promoIndex + 1) % promoImages.length;
  promoImages[promoIndex].classList.add('active');
}, 5000);
