// ===============================
// DETALLE DE RESTAURANTE - LÓGICA MEJORADA
// ===============================

// Obtener ID del restaurante desde la URL
const urlParams = new URLSearchParams(window.location.search);
const restauranteId = parseInt(urlParams.get('id')) || 1;

// Base de datos de restaurantes
const restaurantesDB = {
  1: {
    id: 1,
    nombre: "La Parrilla de Oro",
    descripcion: "Restaurante especializado en carnes a la brasa y platos típicos colombianos con más de 15 años de experiencia.",
    direccion: "Calle 45 #12-34, Bogotá",
    horario: "Lunes a Domingo: 11:00am - 10:00pm",
    telefono: "+57 310 123 4567",
    imagen: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.5,
    categoria: "Colombiana",
    menu: [
      { nombre: "Churrasco Especial", precio: "$45.000", imagen: "https://images.unsplash.com/photo-1551782450-17144c3fa58b?auto=format&fit=crop&w=800&q=80", descripcion: "Carne premium con guarnición" },
      { nombre: "Bandeja Paisa", precio: "$38.000", imagen: "https://images.unsplash.com/photo-1625943536838-c1cc3c6656b3?auto=format&fit=crop&w=800&q=80", descripcion: "Plato tradicional colombiano" },
      { nombre: "Lomo al Trapo", precio: "$50.000", imagen: "https://images.unsplash.com/photo-1598515213641-35cbe32c278a?auto=format&fit=crop&w=800&q=80", descripcion: "Lomo envuelto en trapo" },
      { nombre: "Sobrebarriga", precio: "$42.000", imagen: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", descripcion: "Sobrebarriga en salsa criolla" }
    ]
  },
  2: {
    id: 2,
    nombre: "Sabor Italiano",
    descripcion: "Pizzas artesanales y pastas al estilo de Roma preparadas con ingredientes importados de Italia.",
    direccion: "Carrera 13 #85-32, Bogotá",
    horario: "Martes a Domingo: 12:00pm - 11:00pm",
    telefono: "+57 311 234 5678",
    imagen: "https://images.unsplash.com/photo-1601924572380-526cd06f6588?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.8,
    categoria: "Italiana",
    menu: [
      { nombre: "Pizza Margherita", precio: "$32.000", imagen: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80", descripcion: "Pizza clásica italiana" },
      { nombre: "Pasta Carbonara", precio: "$35.000", imagen: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80", descripcion: "Pasta con salsa carbonara" },
      { nombre: "Lasagna Bolognese", precio: "$38.000", imagen: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=80", descripcion: "Lasagna tradicional" },
      { nombre: "Ravioli Ricotta", precio: "$36.000", imagen: "https://images.unsplash.com/photo-1587740908075-9ea5c0d4e2bc?auto=format&fit=crop&w=800&q=80", descripcion: "Ravioles rellenos" }
    ]
  },
  3: {
    id: 3,
    nombre: "Delicias del Mar",
    descripcion: "Especialidad en mariscos frescos traídos diariamente y ceviches preparados al momento.",
    direccion: "Avenida 19 #120-45, Bogotá",
    horario: "Miércoles a Lunes: 11:30am - 9:30pm",
    telefono: "+57 312 345 6789",
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.6,
    categoria: "Mariscos",
    menu: [
      { nombre: "Ceviche Mixto", precio: "$48.000", imagen: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80", descripcion: "Ceviche de pescado y mariscos" },
      { nombre: "Arroz con Mariscos", precio: "$52.000", imagen: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80", descripcion: "Arroz marinero" },
      { nombre: "Langostinos al Ajillo", precio: "$65.000", imagen: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80", descripcion: "Langostinos frescos" },
      { nombre: "Cazuela de Mariscos", precio: "$58.000", imagen: "https://images.unsplash.com/photo-1563865436874-9aef32095fad?auto=format&fit=crop&w=800&q=80", descripcion: "Variedad de mariscos" }
    ]
  }
};

// Obtener el restaurante o usar datos por defecto
const restaurante = restaurantesDB[restauranteId] || restaurantesDB[1];

// ===== MOSTRAR DATOS DEL RESTAURANTE =====
document.getElementById("nombreRestaurante").textContent = restaurante.nombre;
document.getElementById("descripcionRestaurante").textContent = restaurante.descripcion;
document.getElementById("direccionRestaurante").textContent = restaurante.direccion;
document.getElementById("horarioRestaurante").textContent = restaurante.horario;
document.getElementById("imagenRestaurante").src = restaurante.imagen;
document.getElementById("imagenRestaurante").alt = restaurante.nombre;

// Agregar información adicional
const infoDiv = document.querySelector('.restaurant-info');
const telefonoP = document.createElement('p');
telefonoP.innerHTML = `<strong>📞 Teléfono:</strong> <span>${restaurante.telefono}</span>`;
telefonoP.style.marginBottom = '8px';

const calificacionP = document.createElement('p');
calificacionP.innerHTML = `<strong>⭐ Calificación:</strong> <span>${restaurante.calificacion}/5.0</span>`;
calificacionP.style.marginBottom = '8px';

const categoriaP = document.createElement('p');
categoriaP.innerHTML = `<strong>🍽️ Categoría:</strong> <span>${restaurante.categoria}</span>`;

infoDiv.appendChild(telefonoP);
infoDiv.appendChild(calificacionP);
infoDiv.appendChild(categoriaP);

// ===== MOSTRAR MENÚ CON ANIMACIÓN =====
const menuContainer = document.getElementById("menuRestaurante");
restaurante.menu.forEach((item, index) => {
  const card = document.createElement("div");
  card.classList.add("menu-item");
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  
  card.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}" loading="lazy">
    <div style="padding: 15px;">
      <h4 style="margin-bottom: 5px;">${item.nombre}</h4>
      <p style="font-size: 13px; color: #718096; margin-bottom: 8px;">${item.descripcion}</p>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <p style="font-weight: 700; color: #38a169; font-size: 16px;">${item.precio}</p>
        <button class="btn-agregar" style="background: #38a169; color: white; border: none; padding: 6px 12px; border-radius: 6px; cursor: pointer; font-size: 13px; font-weight: 600;">
          🛒 Agregar
        </button>
      </div>
    </div>
  `;
  
  menuContainer.appendChild(card);
  
  // Animación escalonada
  setTimeout(() => {
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  }, index * 100);
  
  // Funcionalidad de agregar al carrito
  const btnAgregar = card.querySelector('.btn-agregar');
  btnAgregar.addEventListener('click', () => {
    agregarAlCarrito(item);
    btnAgregar.textContent = '✓ Agregado';
    btnAgregar.style.background = '#2f855a';
    setTimeout(() => {
      btnAgregar.textContent = '🛒 Agregar';
      btnAgregar.style.background = '#38a169';
    }, 2000);
  });
});

// ===== CARRITO DE COMPRAS =====
function agregarAlCarrito(item) {
  let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  
  const existente = carrito.find(i => i.nombre === item.nombre);
  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ ...item, cantidad: 1, restaurante: restaurante.nombre });
  }
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  
  let badge = document.querySelector('.carrito-badge');
  if (!badge && total > 0) {
    badge = document.createElement('span');
    badge.className = 'carrito-badge';
    badge.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #e53e3e;
      color: white;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 14px;
      z-index: 1000;
      cursor: pointer;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;
    document.body.appendChild(badge);
    
    badge.addEventListener('click', mostrarCarrito);
  }
  
  if (badge) {
    badge.textContent = total > 0 ? total : '';
    if (total === 0) badge.remove();
  }
}

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  if (carrito.length === 0) {
    alert('Tu carrito está vacío');
    return;
  }
  
  let mensaje = '🛒 TU CARRITO:\n\n';
  let totalGeneral = 0;
  
  carrito.forEach(item => {
    const precio = parseInt(item.precio.replace(/\D/g, ''));
    const subtotal = precio * item.cantidad;
    totalGeneral += subtotal;
    mensaje += `${item.nombre} x${item.cantidad}\n`;
    mensaje += `  ${item.restaurante}\n`;
    mensaje += `  Subtotal: $${subtotal.toLocaleString()}\n\n`;
  });
  
  mensaje += `TOTAL: $${totalGeneral.toLocaleString()}`;
  
  if (confirm(mensaje + '\n\n¿Deseas vaciar el carrito?')) {
    localStorage.removeItem('carrito');
    actualizarContadorCarrito();
  }
}

// ===== RESEÑAS CON CALIFICACIÓN =====
let reseñas = JSON.parse(localStorage.getItem(`reseñas_${restauranteId}`) || '[]');

// Si no hay reseñas guardadas, usar datos de ejemplo
if (reseñas.length === 0) {
  reseñas = [
    { nombre: "Carlos Rodríguez", comentario: "Excelente atención y comida deliciosa. Totalmente recomendado.", calificacion: 5, fecha: "2025-10-28" },
    { nombre: "Laura Martínez", comentario: "El mejor lugar de la zona. La calidad es excepcional.", calificacion: 5, fecha: "2025-10-25" },
    { nombre: "Juan Pérez", comentario: "Buena comida, aunque el servicio podría ser más rápido.", calificacion: 4, fecha: "2025-10-20" }
  ];
}

const reseñasContainer = document.getElementById("reseñasContainer");

function renderStars(rating) {
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= rating ? '⭐' : '☆';
  }
  return stars;
}

function renderReseñas() {
  reseñasContainer.innerHTML = "";
  
  if (reseñas.length === 0) {
    reseñasContainer.innerHTML = '<p style="color: #718096;">Aún no hay reseñas. ¡Sé el primero en opinar!</p>';
    return;
  }
  
  reseñas.forEach((r, index) => {
    const div = document.createElement("div");
    div.classList.add("review");
    div.style.opacity = '0';
    div.style.transform = 'translateX(-20px)';
    
    div.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
        <p style="font-weight: 700; color: #2d3748;">${r.nombre}</p>
        <span style="font-size: 14px;">${renderStars(r.calificacion)}</span>
      </div>
      <p style="color: #4a5568; margin-bottom: 5px;">${r.comentario}</p>
      <p style="font-size: 12px; color: #a0aec0;">${r.fecha || 'Hace poco'}</p>
    `;
    
    reseñasContainer.appendChild(div);
    
    setTimeout(() => {
      div.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      div.style.opacity = '1';
      div.style.transform = 'translateX(0)';
    }, index * 100);
  });
}

renderReseñas();

// ===== FORMULARIO DE RESEÑA MEJORADO =====
const form = document.getElementById("reviewForm");

// Agregar selector de calificación
const h4 = form.querySelector('h4');
const ratingDiv = document.createElement('div');
ratingDiv.style.cssText = 'margin: 10px 0; display: flex; gap: 5px; align-items: center;';
ratingDiv.innerHTML = '<label style="margin-right: 10px;">Tu calificación:</label>';

let calificacionSeleccionada = 5;

for (let i = 1; i <= 5; i++) {
  const star = document.createElement('span');
  star.textContent = '⭐';
  star.style.cssText = 'cursor: pointer; font-size: 24px; transition: transform 0.2s;';
  star.dataset.rating = i;
  
  star.addEventListener('click', () => {
    calificacionSeleccionada = i;
    actualizarEstrellas();
  });
  
  star.addEventListener('mouseenter', () => {
    star.style.transform = 'scale(1.2)';
  });
  
  star.addEventListener('mouseleave', () => {
    star.style.transform = 'scale(1)';
  });
  
  ratingDiv.appendChild(star);
}

function actualizarEstrellas() {
  const stars = ratingDiv.querySelectorAll('span[data-rating]');
  stars.forEach(star => {
    const rating = parseInt(star.dataset.rating);
    star.style.opacity = rating <= calificacionSeleccionada ? '1' : '0.3';
  });
}

h4.after(ratingDiv);
actualizarEstrellas();

form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombreCliente").value.trim();
  const comentario = document.getElementById("comentarioCliente").value.trim();

  if (!nombre || !comentario) {
    alert("❌ Por favor completa todos los campos.");
    return;
  }
  
  if (comentario.length < 10) {
    alert("❌ El comentario debe tener al menos 10 caracteres.");
    return;
  }

  const fechaActual = new Date().toISOString().split('T')[0];
  
  reseñas.unshift({ 
    nombre, 
    comentario, 
    calificacion: calificacionSeleccionada,
    fecha: fechaActual
  });
  
  localStorage.setItem(`reseñas_${restauranteId}`, JSON.stringify(reseñas));
  renderReseñas();

  form.reset();
  calificacionSeleccionada = 5;
  actualizarEstrellas();
  
  alert("✅ Gracias por tu reseña 😊");
});

// Inicializar contador de carrito
actualizarContadorCarrito();