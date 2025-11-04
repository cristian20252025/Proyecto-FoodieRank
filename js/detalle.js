import { API_URL, getUsuario, getToken, estaAutenticado } from "./api.js";

// Estado global de la página
let restauranteId = null;
let calificacionSeleccionada = 5;
const usuario = getUsuario();

// Elementos del DOM
const mainLoader = document.getElementById("main-loader");
const loader = document.getElementById("loader");
const contenidoRestaurante = document.getElementById("contenido-restaurante");
const menuContainer = document.getElementById("menuRestaurante");
const reseñasContainer = document.getElementById("reseñasContainer");
const reviewForm = document.getElementById("reviewForm");
const reviewError = document.getElementById("reviewError");
const starsContainer = document.querySelector(".rating-selector .stars");

// --- 1. INICIALIZACIÓN ---
document.addEventListener("DOMContentLoaded", () => {
  if (!estaAutenticado()) {
    alert("Debes iniciar sesión para ver los detalles.");
    window.location.href = "login-register.html";
    return;
  }

  // Obtener ID del restaurante desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  restauranteId = urlParams.get('id');
  if (!restauranteId) {
    loader.textContent = "Error: No se especificó un restaurante.";
    return;
  }

  // Cargar todos los datos de la página
  cargarPagina();
  
  // Configurar listeners del formulario
  configurarFormularioReseña();
});

// --- 2. CARGA DE DATOS DE LA API ---
async function cargarPagina() {
  try {
    // Hacemos 4 peticiones en paralelo
    const [resRestaurante, resPlatos, resReseñas, resRanking] = await Promise.all([
      fetch(`${API_URL}/restaurantes/${restauranteId}`),
      fetch(`${API_URL}/platos/${restauranteId}`),
      fetch(`${API_URL}/resenas/${restauranteId}`),
      fetch(`${API_URL}/ranking/${restauranteId}`) // Para el score
    ]);

    if (!resRestaurante.ok) throw new Error("Restaurante no encontrado");

    // Procesamos las respuestas
    const restaurante = await resRestaurante.json();
    const platos = resPlatos.ok ? await resPlatos.json() : [];
    const reseñas = resReseñas.ok ? await resReseñas.json() : [];
    const ranking = resRanking.ok ? await resRanking.json() : { score: 0, total_reseñas: 0 };
    
    // Mostramos el contenido
    loader.style.display = "none";
    contenidoRestaurante.style.display = "block";

    // Renderizamos cada sección
    renderRestauranteInfo(restaurante, ranking);
    renderMenu(platos);
    renderReseñas(reseñas);

  } catch (error) {
    loader.textContent = `Error al cargar: ${error.message}`;
    loader.style.color = "red";
  }
}

// --- 3. FUNCIONES DE RENDERIZADO ---

function renderRestauranteInfo(restaurante, ranking) {
  document.getElementById("nombreRestaurante").textContent = restaurante.nombre;
  document.getElementById("descripcionRestaurante").textContent = restaurante.descripcion;
  document.getElementById("categoriaRestaurante").textContent = restaurante.categoria;
  document.getElementById("ubicacionRestaurante").textContent = restaurante.ubicacion;
  document.getElementById("imagenRestaurante").src = restaurante.imagen || 'https://via.placeholder.com/600x400';
  
  // Renderizar score
  const scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = `
    <p><strong>Score Ponderado:</strong> <span style="color: #38a169; font-weight: 700;">${ranking.score.toFixed(2)}</span></p>
    <p><strong>Total de Reseñas:</strong> ${ranking.total_reseñas}</p>
  `;
}

function renderMenu(platos) {
  menuContainer.innerHTML = "";
  if (platos.length === 0) {
    menuContainer.innerHTML = "<p>No hay platos registrados para este restaurante.</p>";
    return;
  }
  
  platos.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("menu-item");
    card.innerHTML = `
      <img src="https://via.placeholder.com/300x200" alt="${item.nombre}" loading="lazy">
      <div style="padding: 15px;">
        <h4 style="margin-bottom: 5px;">${item.nombre}</h4>
        <p style="font-size: 13px; color: #718096; margin-bottom: 8px;">${item.descripcion || 'Sin descripción'}</p>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <p style="font-weight: 700; color: #38a169; font-size: 16px;">$${item.precio.toLocaleString()}</p>
        </div>
      </div>
    `;
    menuContainer.appendChild(card);
  });
}

function renderReseñas(reseñas) {
  reseñasContainer.innerHTML = "";
  if (reseñas.length === 0) {
    reseñasContainer.innerHTML = '<p style="color: #718096;">Aún no hay reseñas. ¡Sé el primero en opinar!</p>';
    return;
  }

  reseñas.forEach(r => {
    const div = document.createElement("div");
    div.classList.add("review");
    
    const fecha = new Date(r.fecha).toLocaleDateString();
    
    // Verificar si el usuario actual es el autor de la reseña
    const esAutor = usuario && usuario.id === r.usuarioId;

    // Verificar si el usuario actual ya dio like o dislike
    const dioLike = r.likedBy.includes(usuario.id);
    const dioDislike = r.dislikedBy.includes(usuario.id);

    div.innerHTML = `
      <div class="review-header">
        <strong>${r.nombreUsuario || 'Usuario'}</strong>
        <span class="review-stars">${"⭐".repeat(r.calificacion)}${"☆".repeat(5 - r.calificacion)}</span>
      </div>
      <p class="review-body">${r.comentario}</p>
      <div class="review-footer">
        <span class="review-date">${fecha}</span>
        <div class="review-actions">
          <button class="btn-like ${dioLike ? 'liked' : ''}" data-id="${r._id}">
            👍 ${r.likedBy.length}
          </button>
          <button class="btn-dislike ${dioDislike ? 'disliked' : ''}" data-id="${r._id}">
            👎 ${r.dislikedBy.length}
          </button>
          ${esAutor ? `<button class="btn-delete" data-id="${r._id}">🗑️ Eliminar</button>` : ''}
        </div>
      </div>
    `;
    reseñasContainer.appendChild(div);
  });
  
  // Añadir Event Listeners a los botones creados
  reseñasContainer.querySelectorAll('.btn-like').forEach(btn => {
    btn.addEventListener('click', () => handleReaccion(btn.dataset.id, 'like'));
  });
  reseñasContainer.querySelectorAll('.btn-dislike').forEach(btn => {
    btn.addEventListener('click', () => handleReaccion(btn.dataset.id, 'dislike'));
  });
  reseñasContainer.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => handleDelete(btn.dataset.id));
  });
}

// --- 4. MANEJO DE FORMULARIO E INTERACCIONES ---

function configurarFormularioReseña() {
  // Lógica del selector de estrellas
  const stars = starsContainer.querySelectorAll('span');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      calificacionSeleccionada = parseInt(star.dataset.value);
      // Actualizar la UI de las estrellas
      stars.forEach(s => {
        s.classList.toggle('selected', parseInt(s.dataset.value) <= calificacionSeleccionada);
      });
    });
  });
  // Seleccionar 5 estrellas por defecto
  stars.forEach(s => s.classList.add('selected'));


  // Listener del formulario
  reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    reviewError.textContent = "";

    const comentario = document.getElementById("comentarioCliente").value;
    const token = getToken();

    if (comentario.length < 10) {
      reviewError.textContent = "El comentario debe tener al menos 10 caracteres.";
      return;
    }

    try {
      const respuesta = await fetch(`${API_URL}/resenas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          comentario,
          calificacion: calificacionSeleccionada,
          restauranteId: restauranteId
        })
      });

      const data = await respuesta.json();
      if (!respuesta.ok) throw new Error(data.error || "No se pudo enviar la reseña");

      // Éxito: limpiar formulario y recargar las reseñas
      reviewForm.reset();
      calificacionSeleccionada = 5;
      stars.forEach(s => s.classList.add('selected'));
      cargarReseñas(); // Función helper para solo recargar reseñas

    } catch (error) {
      reviewError.textContent = error.message;
    }
  });
}

async function handleReaccion(reseñaId, tipo) {
  const token = getToken();
  try {
    const respuesta = await fetch(`${API_URL}/resenas/reaccion/${reseñaId}/${tipo}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!respuesta.ok) {
      const data = await respuesta.json();
      throw new Error(data.error || "No se pudo reaccionar");
    }
    // Recargar solo las reseñas para ver el cambio
    cargarReseñas();
  } catch (error) {
    alert(error.message);
  }
}

async function handleDelete(reseñaId) {
  if (!confirm("¿Estás seguro de que quieres eliminar tu reseña?")) return;
  
  const token = getToken();
  try {
    const respuesta = await fetch(`${API_URL}/resenas/${reseñaId}`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });
    if (!respuesta.ok) {
      const data = await respuesta.json();
      throw new Error(data.error || "No se pudo eliminar");
    }
    // Recargar solo las reseñas
    cargarReseñas();
  } catch (error) {
    alert(error.message);
  }
}

// Función helper para recargar solo la sección de reseñas
async function cargarReseñas() {
  try {
    const res = await fetch(`${API_URL}/resenas/${restauranteId}`);
    const reseñas = res.ok ? await res.json() : [];
    renderReseñas(reseñas);
  } catch (error) {
    reseñasContainer.innerHTML = "<p>Error al recargar reseñas.</p>";
  }
}