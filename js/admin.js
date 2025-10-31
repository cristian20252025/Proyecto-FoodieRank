// ===============================
// PANEL ADMIN - CRUD RESTAURANTES
// ===============================

const form = document.getElementById("formRestaurante");
const tabla = document.getElementById("tablaRestaurantes");

// Datos iniciales simulados
let restaurantes = [
  { id: 1, nombre: "La Parrilla de Oro", descripcion: "Carnes a la brasa", imagen: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80" },
  { id: 2, nombre: "Sabor Italiano", descripcion: "Pizzas y pastas", imagen: "https://images.unsplash.com/photo-1601924572380-526cd06f6588?auto=format&fit=crop&w=800&q=80" }
];

// Renderizar tabla
function renderTabla() {
  tabla.innerHTML = "";
  restaurantes.forEach((r, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${r.nombre}</td>
      <td>${r.descripcion}</td>
      <td><img src="${r.imagen}" alt="${r.nombre}"></td>
      <td class="acciones">
        <button class="edit" onclick="editar(${r.id})">✏️</button>
        <button class="delete" onclick="eliminar(${r.id})">🗑️</button>
      </td>
    `;
    tabla.appendChild(fila);
  });
}

// Agregar restaurante
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const imagen = document.getElementById("imagen").value.trim();

  if (!nombre || !descripcion || !imagen) {
    alert("Completa todos los campos");
    return;
  }

  const nuevo = {
    id: Date.now(),
    nombre,
    descripcion,
    imagen
  };

  restaurantes.push(nuevo);
  form.reset();
  renderTabla();
  alert("Restaurante agregado exitosamente ✅");
});

// Editar restaurante
function editar(id) {
  const r = restaurantes.find((item) => item.id === id);
  if (!r) return;

  const nuevoNombre = prompt("Editar nombre:", r.nombre);
  const nuevaDesc = prompt("Editar descripción:", r.descripcion);

  if (nuevoNombre && nuevaDesc) {
    r.nombre = nuevoNombre;
    r.descripcion = nuevaDesc;
    renderTabla();
    alert("Restaurante actualizado 👍");
  }
}

// Eliminar restaurante
function eliminar(id) {
  if (confirm("¿Seguro que deseas eliminar este restaurante?")) {
    restaurantes = restaurantes.filter((r) => r.id !== id);
    renderTabla();
  }
}

// Inicializar
renderTabla();
