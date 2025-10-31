// ===============================
// LISTADO DE RESTAURANTES - LÓGICA
// ===============================

// Datos simulados (pueden venir de un JSON o API)
const restaurantes = [
  {
    nombre: "La Parrilla de Oro",
    descripcion: "Carnes a la brasa y platos típicos colombianos.",
    imagen: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
  },
  {
    nombre: "Sabor Italiano",
    descripcion: "Pizzas artesanales y pastas al estilo de Roma.",
    imagen: "https://images.unsplash.com/photo-1601924572380-526cd06f6588?auto=format&fit=crop&w=800&q=80"
  },
  {
    nombre: "Delicias del Mar",
    descripcion: "Especialidad en mariscos frescos y ceviches.",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
  },
  {
    nombre: "Veggie Life",
    descripcion: "Comida saludable y opciones veganas deliciosas.",
    imagen: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
  }
];

const listContainer = document.getElementById("restaurantList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Renderizar lista
function renderRestaurantes(lista) {
  listContainer.innerHTML = "";

  if (lista.length === 0) {
    listContainer.innerHTML = "<p>No se encontraron restaurantes.</p>";
    return;
  }

  lista.forEach((r) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${r.imagen}" alt="${r.nombre}">
      <div class="card-content">
        <h3>${r.nombre}</h3>
        <p>${r.descripcion}</p>
        <a href="detalle-de-restaurante.html" class="btn">Ver Detalle</a>
      </div>
    `;
    listContainer.appendChild(card);
  });
}

// Buscar restaurante
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const filtrados = restaurantes.filter(r =>
    r.nombre.toLowerCase().includes(query)
  );
  renderRestaurantes(filtrados);
});

// Buscar en tiempo real
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtrados = restaurantes.filter(r =>
    r.nombre.toLowerCase().includes(query)
  );
  renderRestaurantes(filtrados);
});

// Inicialización
renderRestaurantes(restaurantes);
