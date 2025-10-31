// ===============================
// DETALLE DE RESTAURANTE - LÓGICA
// ===============================

// Datos simulados
const restaurante = {
  nombre: "La Parrilla de Oro",
  descripcion: "Restaurante especializado en carnes a la brasa y platos típicos colombianos.",
  direccion: "Calle 45 #12-34, Bogotá",
  horario: "Lunes a Domingo: 11:00am - 10:00pm",
  imagen: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
  menu: [
    { nombre: "Churrasco Especial", precio: "$45.000", imagen: "https://images.unsplash.com/photo-1551782450-17144c3fa58b?auto=format&fit=crop&w=800&q=80" },
    { nombre: "Bandeja Paisa", precio: "$38.000", imagen: "https://images.unsplash.com/photo-1625943536838-c1cc3c6656b3?auto=format&fit=crop&w=800&q=80" },
    { nombre: "Lomo al Trapo", precio: "$50.000", imagen: "https://images.unsplash.com/photo-1598515213641-35cbe32c278a?auto=format&fit=crop&w=800&q=80" },
  ]
};

// Mostrar datos del restaurante
document.getElementById("nombreRestaurante").textContent = restaurante.nombre;
document.getElementById("descripcionRestaurante").textContent = restaurante.descripcion;
document.getElementById("direccionRestaurante").textContent = restaurante.direccion;
document.getElementById("horarioRestaurante").textContent = restaurante.horario;
document.getElementById("imagenRestaurante").src = restaurante.imagen;

// Mostrar menú
const menuContainer = document.getElementById("menuRestaurante");
restaurante.menu.forEach(item => {
  const card = document.createElement("div");
  card.classList.add("menu-item");
  card.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}">
    <h4>${item.nombre}</h4>
    <p>${item.precio}</p>
  `;
  menuContainer.appendChild(card);
});

// Reseñas simuladas
let reseñas = [
  { nombre: "Carlos", comentario: "Excelente atención y comida deliciosa." },
  { nombre: "Laura", comentario: "El mejor churrasco que he probado." }
];

const reseñasContainer = document.getElementById("reseñasContainer");

function renderReseñas() {
  reseñasContainer.innerHTML = "";
  reseñas.forEach(r => {
    const div = document.createElement("div");
    div.classList.add("review");
    div.innerHTML = `<p><strong>${r.nombre}:</strong> ${r.comentario}</p>`;
    reseñasContainer.appendChild(div);
  });
}

renderReseñas();

// Formulario de nueva reseña
const form = document.getElementById("reviewForm");
form.addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombreCliente").value.trim();
  const comentario = document.getElementById("comentarioCliente").value.trim();

  if (!nombre || !comentario) {
    alert("Por favor completa todos los campos.");
    return;
  }

  reseñas.push({ nombre, comentario });
  renderReseñas();

  form.reset();
  alert("Gracias por tu reseña 😊");
});
