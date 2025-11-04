import { API_URL, getUsuario, getToken, estaAutenticado } from "./api.js";

// Estado global
let modoEdicionRestaurante = false;
let idEdicionRestaurante = null;
let modoEdicionCategoria = false;
let idEdicionCategoria = null;

const token = getToken();
const usuario = getUsuario();

// Elementos del DOM
const loader = document.getElementById("loader");
const adminContent = document.getElementById("admin-content");

// Formulario Restaurantes
const formRestaurante = document.getElementById("formRestaurante");
const tablaRestaurantes = document.getElementById("tablaRestaurantes");
const categoriaSelect = document.getElementById("categoriaSelect");
const formError = document.getElementById("formError");
const btnSubmitRestaurante = document.getElementById("btnSubmitRestaurante");
// Inputs del formulario de restaurante (para modo edición)
const nombreInput = document.getElementById("nombre");
const descripcionInput = document.getElementById("descripcion");
const ubicacionInput = document.getElementById("ubicacion");
const imagenInput = document.getElementById("imagen");

// Formulario Categorías
const formCategoria = document.getElementById("formCategoria");
const tablaCategorias = document.getElementById("tablaCategorias");
const categoriaError = document.getElementById("categoriaError");
const btnSubmitCategoria = document.getElementById("btnSubmitCategoria");
const categoriaNombreInput = document.getElementById("categoriaNombre");
const categoriaDescripcionInput = document.getElementById("categoriaDescripcion");

// --- NUEVO: Formulario Platos ---
const formPlato = document.getElementById("formPlato");
const tablaPlatos = document.getElementById("tablaPlatos");
const platoRestauranteSelect = document.getElementById("platoRestauranteSelect");
const platoError = document.getElementById("platoError");


// --- 1. INICIALIZACIÓN Y SEGURIDAD ---
document.addEventListener("DOMContentLoaded", () => {
  if (!estaAutenticado() || !usuario || usuario.rol !== "admin") {
    alert("Acceso denegado. Debes ser administrador.");
    window.location.href = "listado-de-restaurantes.html";
    return;
  }

  loader.style.display = "none";
  adminContent.style.display = "block";

  // Cargas iniciales
  cargarCategorias(); // Cargar primero para los <select>
  cargarRestaurantes(); // Cargar después para el <select> de platos
  cargarPlatos(); // <-- NUEVO

  // Listeners de formularios
  formRestaurante.addEventListener("submit", handleRestauranteSubmit);
  formCategoria.addEventListener("submit", handleCategoriaSubmit);
  formPlato.addEventListener("submit", handlePlatoSubmit); // <-- NUEVO
});

// --- 2. CARGA DE DATOS (RESTAURANTES, CATEGORÍAS, PLATOS) ---

async function cargarRestaurantes() {
  try {
    const res = await fetch(`${API_URL}/restaurantes/admin/todos`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al cargar restaurantes");

    const restaurantes = await res.json();
    renderTablaRestaurantes(restaurantes);
    renderRestauranteSelect(restaurantes); // <-- NUEVO: Llenar el select de platos
  } catch (error) {
    tablaRestaurantes.innerHTML = `<tr><td colspan="5">Error: ${error.message}</td></tr>`;
  }
}

async function cargarCategorias() {
  try {
    const res = await fetch(`${API_URL}/categorias`);
    if (!res.ok) throw new Error("Error al cargar categorías");

    const categorias = await res.json();
    renderTablaCategorias(categorias);
    renderCategoriaSelect(categorias); 
  } catch (error) {
    tablaCategorias.innerHTML = `<tr><td colspan="3">Error: ${error.message}</td></tr>`;
  }
}

// --- NUEVA FUNCIÓN ---
async function cargarPlatos() {
  try {
    const res = await fetch(`${API_URL}/platos/admin/todos`, {
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("Error al cargar platos");

    const platos = await res.json();
    renderTablaPlatos(platos);
  } catch (error) {
    tablaPlatos.innerHTML = `<tr><td colspan="4">Error: ${error.message}</td></tr>`;
  }
}

// --- 3. RENDERIZADO DE TABLAS Y SELECTS ---

function renderTablaRestaurantes(restaurantes) {
  tablaRestaurantes.innerHTML = "";
  if (restaurantes.length === 0) {
    tablaRestaurantes.innerHTML = `<tr><td colspan="5">No hay restaurantes registrados.</td></tr>`;
    return;
  }
  
  restaurantes.forEach(r => {
    const fila = document.createElement("tr");
    const estado = r.aprobado
      ? '<span class="status status-aprobado">Aprobado</span>'
      : '<span class="status status-pendiente">Pendiente</span>';
    const botonAprobar = !r.aprobado
      ? `<button class="approve" title="Aprobar" data-id="${r._id}">✔️</button>`
      : '';

    fila.innerHTML = `
      <td><strong>${r.nombre}</strong></td>
      <td>${r.categoria}</td>
      <td>${r.ubicacion}</td>
      <td>${estado}</td>
      <td class="acciones">
        ${botonAprobar}
        <button class="edit" title="Editar" data-id="${r._id}">✏️</button>
        <button class="delete" title="Eliminar" data-id="${r._id}">🗑️</button>
      </td>
    `;
    tablaRestaurantes.appendChild(fila);
  });

  // Añadir listeners
  tablaRestaurantes.querySelectorAll('.approve').forEach(b => b.addEventListener('click', () => handleAprobar(b.dataset.id)));
  tablaRestaurantes.querySelectorAll('.edit').forEach(b => b.addEventListener('click', () => handleEditarRestaurante(b.dataset.id, restaurantes))); // <-- Pasamos 'restaurantes'
  tablaRestaurantes.querySelectorAll('.delete').forEach(b => b.addEventListener('click', () => handleEliminarRestaurante(b.dataset.id)));
}

function renderTablaCategorias(categorias) {
  tablaCategorias.innerHTML = "";
  if (categorias.length === 0) {
    tablaCategorias.innerHTML = `<tr><td colspan="3">No hay categorías registradas.</td></tr>`;
    return;
  }

  categorias.forEach(c => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><strong>${c.nombre}</strong></td>
      <td>${c.descripcion || 'N/A'}</td>
      <td class="acciones">
        <button class="edit" title="Editar" data-id="${c._id}">✏️</button> <button class="delete" title="Eliminar" data-id="${c._id}">🗑️</button>
      </td>
    `;
    tablaCategorias.appendChild(fila);
  });
  
  tablaCategorias.querySelectorAll('.edit').forEach(b => b.addEventListener('click', () => handleEditarCategoria(b.dataset.id, categorias))); // <-- NUEVO
  tablaCategorias.querySelectorAll('.delete').forEach(b => b.addEventListener('click', () => handleEliminarCategoria(b.dataset.id)));
}

// --- NUEVA FUNCIÓN ---
function renderTablaPlatos(platos) {
  tablaPlatos.innerHTML = "";
  if (platos.length === 0) {
    tablaPlatos.innerHTML = `<tr><td colspan="4">No hay platos registrados.</td></tr>`;
    return;
  }

  platos.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><strong>${p.nombre}</strong></td>
      <td>$${p.precio.toLocaleString()}</td>
      <td>${p.restauranteNombre}</td>
      <td class="acciones">
        <button class="delete" title="Eliminar" data-id="${p._id}">🗑️</button>
      </td>
    `;
    tablaPlatos.appendChild(fila);
  });

  tablaPlatos.querySelectorAll('.delete').forEach(b => b.addEventListener('click', () => handleEliminarPlato(b.dataset.id)));
}

function renderCategoriaSelect(categorias) {
  categoriaSelect.innerHTML = '<option value="">-- Selecciona una categoría --</option>';
  categorias.forEach(c => {
    const option = document.createElement("option");
    option.value = c.nombre; 
    option.textContent = c.nombre;
    categoriaSelect.appendChild(option);
  });
}

// --- NUEVA FUNCIÓN ---
function renderRestauranteSelect(restaurantes) {
  platoRestauranteSelect.innerHTML = '<option value="">-- Selecciona un restaurante --</option>';
  // Llenar solo con restaurantes aprobados (o todos, si prefieres)
  restaurantes.forEach(r => {
    const option = document.createElement("option");
    option.value = r._id; // El backend espera el ID
    option.textContent = r.nombre;
    platoRestauranteSelect.appendChild(option);
  });
}

// --- 4. MANEJO DE FORMULARIOS (SUBMIT) ---

async function handleRestauranteSubmit(e) {
  e.preventDefault();
  formError.textContent = "";

  const datos = {
    nombre: nombreInput.value,
    descripcion: descripcionInput.value,
    ubicacion: ubicacionInput.value,
    imagen: imagenInput.value,
    categoria: categoriaSelect.value,
  };

  if (!datos.categoria) {
    formError.textContent = "Debes seleccionar una categoría.";
    return;
  }

  const url = modoEdicionRestaurante 
    ? `${API_URL}/restaurantes/${idEdicionRestaurante}`
    : `${API_URL}/restaurantes`;
  
  const method = modoEdicionRestaurante ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(datos)
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al guardar restaurante");

    formRestaurante.reset();
    modoEdicionRestaurante = false;
    idEdicionRestaurante = null;
    btnSubmitRestaurante.textContent = "Agregar Restaurante";
    cargarRestaurantes();

  } catch (error) {
    formError.textContent = error.message;
  }
}

async function handleCategoriaSubmit(e) {
  e.preventDefault();
  categoriaError.textContent = "";

  const datos = {
    nombre: categoriaNombreInput.value,
    descripcion: categoriaDescripcionInput.value,
  };

  const url = modoEdicionCategoria
    ? `${API_URL}/categorias/${idEdicionCategoria}`
    : `${API_URL}/categorias`;
  
  const method = modoEdicionCategoria ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(datos)
    });
    
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al guardar categoría");

    formCategoria.reset();
    modoEdicionCategoria = false;
    idEdicionCategoria = null;
    btnSubmitCategoria.textContent = "Crear Categoría";
    cargarCategorias(); // Recargar ambas tablas (para el select)

  } catch (error) {
    categoriaError.textContent = error.message;
  }
}

// --- NUEVA FUNCIÓN ---
async function handlePlatoSubmit(e) {
  e.preventDefault();
  platoError.textContent = "";

  const datos = {
    nombre: document.getElementById("platoNombre").value,
    precio: parseFloat(document.getElementById("platoPrecio").value),
    restauranteId: platoRestauranteSelect.value,
  };

  if (!datos.restauranteId) {
    platoError.textContent = "Debes seleccionar un restaurante.";
    return;
  }

  try {
    const res = await fetch(`${API_URL}/platos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(datos)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Error al crear el plato");

    formPlato.reset();
    cargarPlatos(); // Recargar la tabla de platos

  } catch (error) {
    platoError.textContent = error.message;
  }
}


// --- 5. ACCIONES DE BOTONES (APROBAR, EDITAR, ELIMINAR) ---

async function handleAprobar(id) {
  if (!confirm("¿Estás seguro de que quieres aprobar este restaurante?")) return;
  
  try {
    const res = await fetch(`${API_URL}/restaurantes/aprobar/${id}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("No se pudo aprobar");
    
    cargarRestaurantes(); 
  } catch (error) {
    alert(error.message);
  }
}

// --- FUNCIÓN ACTUALIZADA ---
function handleEditarRestaurante(id, restaurantes) {
  const restaurante = restaurantes.find(r => r._id === id);
  if (!restaurante) return;

  // Llenar el formulario
  nombreInput.value = restaurante.nombre;
  descripcionInput.value = restaurante.descripcion;
  ubicacionInput.value = restaurante.ubicacion;
  imagenInput.value = restaurante.imagen;
  categoriaSelect.value = restaurante.categoria;
  
  // Cambiar estado a modo edición
  modoEdicionRestaurante = true;
  idEdicionRestaurante = id;
  btnSubmitRestaurante.textContent = "Actualizar Restaurante";
  window.scrollTo(0, 0); // Subir al inicio de la página
}

// --- NUEVA FUNCIÓN ---
function handleEditarCategoria(id, categorias) {
  const categoria = categorias.find(c => c._id === id);
  if (!categoria) return;

  // Llenar el formulario
  categoriaNombreInput.value = categoria.nombre;
  categoriaDescripcionInput.value = categoria.descripcion;
  
  // Cambiar estado a modo edición
  modoEdicionCategoria = true;
  idEdicionCategoria = id;
  btnSubmitCategoria.textContent = "Actualizar Categoría";
}

async function handleEliminarRestaurante(id) {
  if (!confirm("¿Estás seguro de que quieres ELIMINAR este restaurante? Esta acción es permanente.")) return;

  try {
    const res = await fetch(`${API_URL}/restaurantes/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("No se pudo eliminar");
    
    cargarRestaurantes();
    cargarPlatos(); // Recargar platos por si se eliminó uno de este restaurante

  } catch (error) {
    alert(error.message);
  }
}

async function handleEliminarCategoria(id) {
  if (!confirm("¿Estás seguro de que quieres ELIMINAR esta categoría?")) return;

  try {
    const res = await fetch(`${API_URL}/categorias/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("No se pudo eliminar");
    
    cargarCategorias(); // Recargar la tabla y el select
  } catch (error) {
    alert(error.message);
  }
}

// --- NUEVA FUNCIÓN ---
async function handleEliminarPlato(id) {
  if (!confirm("¿Estás seguro de que quieres ELIMINAR este plato?")) return;

  try {
    const res = await fetch(`${API_URL}/platos/${id}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!res.ok) throw new Error("No se pudo eliminar el plato");
    
    cargarPlatos(); // Recargar la tabla de platos
  } catch (error) {
    alert(error.message);
  }
}