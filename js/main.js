// ===== MENÚ RESPONSIVO MEJORADO =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Animación del icono hamburguesa
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // Cerrar menú al hacer clic en un enlace
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
      }
    });
  });
}

// ===== SMOOTH SCROLL MEJORADO =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ANIMACIÓN DE APARICIÓN AL HACER SCROLL =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observar las tarjetas de características
document.querySelectorAll('.card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(card);
});

// ===== CAMBIO DE NAVBAR AL HACER SCROLL =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===== CONTADOR ANIMADO EN HERO (opcional) =====
const stats = [
  { id: 'restaurants', end: 500, suffix: '+', text: 'Restaurantes' },
  { id: 'users', end: 10000, suffix: '+', text: 'Usuarios' },
  { id: 'orders', end: 50000, suffix: '+', text: 'Pedidos' }
];

function animateCounter(element, start, end, duration, suffix = '') {
  let current = start;
  const increment = (end - start) / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent = Math.floor(end) + suffix;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + suffix;
    }
  }, 16);
}

// ===== VALIDACIÓN DE FORMULARIOS =====
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Hacer funciones globales para uso en otros archivos
window.RestauManageUtils = {
  validateEmail,
  animateCounter
};