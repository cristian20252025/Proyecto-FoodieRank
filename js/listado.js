import { API_URL, getUsuario, estaAutenticado, cerrarSesion } from "./api.js";

// Estado global para almacenar los datos de la API
const globalState = {
  restaurantes: [],
  categorias: [],
  ranking: [],
};

// Elementos del DOM
const listContainer = document.getElementById("restaurantList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const navUsuario = document.getElementById("nav-usuario");
const loader = document.getElementById("loader");
const categoriaList = document.getElementById("categoriaList");
const rankingList = document.getElementById("rankingList");

// --- 1. INICIALIZACIÓN AL CARGAR LA PÁGINA ---
document.addEventListener("DOMContentLoaded", () => {
  gestionarNavbar();
  cargarDatos();
});

// --- 2. GESTIÓN DE AUTENTICACIÓN Y NAVBAR ---
function gestionarNavbar() {
  if (!estaAutenticado()) {
    alert("Debes iniciar sesión para ver los restaurantes.");
    window.location.href = "login-register.html";
    return;
  }

  const usuario = getUsuario(); // { id, nombre, rol }

  // 1. Saludo al usuario
  const saludo = document.createElement("span");
  saludo.className = "nav-saludo";
  saludo.textContent = `Hola, ${usuario.nombre.split(" ")[0]}`;
  saludo.style.cssText = "color: #2d3748; font-weight: 600; margin-right: 15px;";
  navUsuario.appendChild(saludo);

  // 2. Botón "Panel Admin" (condicional)
  if (usuario.rol === "admin") {
    const btnAdmin = document.createElement("a");
    btnAdmin.href = "panel-de-administracion.html";
    btnAdmin.className = "btn btn-outline"; // Re-usamos tu clase de botón
    btnAdmin.textContent = "Panel Admin";
    navUsuario.appendChild(btnAdmin);
  }

  // 3. Botón "Cerrar Sesión"
  const btnCerrarSesion = document.createElement("a");
  btnCerrarSesion.href = "#";
  btnCerrarSesion.className = "btn btn-primary"; // Re-usamos tu clase de botón
  btnCerrarSesion.textContent = "Cerrar Sesión";
  btnCerrarSesion.style.marginLeft = "10px";
  btnCerrarSesion.onclick = (e) => {
    e.preventDefault();
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
      cerrarSesion();
      window.location.href = "login-register.html";
    }
  };
  navUsuario.appendChild(btnCerrarSesion);
}

// --- 3. CARGA DE DATOS DESDE LA API ---
async function cargarDatos() {
  try {
    // Hacemos las 3 peticiones en paralelo para más eficiencia
    const [resRestaurantes, resCategorias, resRanking] = await Promise.all([
      fetch(`${API_URL}/restaurantes`),
      fetch(`${API_URL}/categorias`),
      fetch(`${API_URL}/ranking?top=5`),
    ]);

    if (!resRestaurantes.ok) throw new Error("Error al cargar restaurantes");
    if (!resCategorias.ok) throw new Error("Error al cargar categorías");
    if (!resRanking.ok) throw new Error("Error al cargar ranking");

    // Guardamos los datos en el estado global
    globalState.restaurantes = await resRestaurantes.json();
    globalState.categorias = await resCategorias.json();
    globalState.ranking = await resRanking.json();

    // Ocultamos el loader
    loader.style.display = "none";

    // Renderizamos todo
    renderRestaurantes(globalState.restaurantes);
    renderCategorias(globalState.categorias);
    renderRanking(globalState.ranking);

  } catch (error) {
    console.error(error);
    loader.textContent = "Error al cargar los datos. Intenta recargar la página.";
    loader.style.color = "red";
  }
}

// --- 4. RENDERIZADO ---

/**
 * Renderiza la lista de restaurantes en el DOM
 * @param {Array} lista - La lista de restaurantes a mostrar
 */
function renderRestaurantes(lista) {
  listContainer.innerHTML = "";

  if (lista.length === 0) {
    listContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <p style="font-size: 18px; color: #718096;">😕 No se encontraron restaurantes.</p>
        <p style="color: #a0aec0; margin-top: 10px;">Intenta con otra búsqueda o filtro.</p>
      </div>
    `;
    return;
  }

  lista.forEach((r, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    // Buscamos el score de este restaurante en el ranking
    const rankingData = globalState.ranking.find(rank => rank.restauranteId === r._id);
    const score = rankingData ? rankingData.score.toFixed(2) : "N/A";

    card.innerHTML = `
      <img src="${r.imagen || 'https://via.placeholder.com/300x200'}" alt="${r.nombre}" loading="lazy">
      <div class="card-content">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 5px;">
          <h3>${r.nombre}</h3>
          <span style="font-size: 12px; background: #e6f2ea; color: #38a169; padding: 3px 8px; border-radius: 4px; white-space: nowrap;">
            ${r.categoria}
          </span>
        </div>
        <p>${r.descripcion}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
          <span style="font-size: 14px; color: #4a5568; font-weight: 600;">
            🏆 Score: ${score}
          </span>
          <span style="font-size: 14px; font-weight: 600; color: #38a169;">
            ${r.ubicacion}
          </span>
        </div>
        <a href="detalle-de-restaurante.html?id=${r._id}" class="btn">Ver Detalle</a>
      </div>
    `;
    
    listContainer.appendChild(card);
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

/**
 * Renderiza los botones de filtro de categorías
 * @param {Array} categorias - La lista de categorías
 */
function renderCategorias(categorias) {
  categoriaList.innerHTML = ""; // Limpiar
  
  // Botón "Todos"
  const btnTodos = document.createElement("button");
  btnTodos.className = "filtro-btn active";
  btnTodos.textContent = "Todos";
  btnTodos.onclick = () => {
    // Quitar 'active' de otros botones
    document.querySelectorAll(".filtro-btn").forEach(btn => btn.classList.remove("active"));
    btnTodos.classList.add("active");
    // Renderizar todos los restaurantes
    renderRestaurantes(globalState.restaurantes);
  };
  categoriaList.appendChild(btnTodos);

  // Botones de categorías de la API
  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = "filtro-btn";
    btn.textContent = cat.nombre;
    btn.onclick = () => {
      // Quitar 'active' de otros botones
      document.querySelectorAll(".filtro-btn").forEach(btn => btn.classList.remove("active"));
      btn.classList.add("active");
      // Filtrar y renderizar
      const filtrados = globalState.restaurantes.filter(r => r.categoria === cat.nombre);
      renderRestaurantes(filtrados);
    };
    categoriaList.appendChild(btn);
  });
}

/**
 * Renderiza el widget del Top 5 Ranking
 * @param {Array} ranking - La lista del top 5
 */
function renderRanking(ranking) {
  rankingList.innerHTML = ""; // Limpiar
  
  if (ranking.length === 0) {
    rankingList.innerHTML = "<p>No hay datos de ranking.</p>";
    return;
  }

  ranking.forEach((r, index) => {
    // Buscamos la imagen del restaurante en nuestro estado global
    const restauranteInfo = globalState.restaurantes.find(rest => rest._id === r.restauranteId);
    const imagen = restauranteInfo?.imagen || 'https://via.placeholder.com/100';

    const item = document.createElement("a");
    item.href = `detalle-de-restaurante.html?id=${r.restauranteId}`;
    item.innerHTML = `
      <img src="${imagen}" alt="${r.nombre}">
      <div class="ranking-info">
        <strong>${index + 1}. ${r.nombre}</strong><br>
        <span>Score: ${r.score.toFixed(2)}</span>
      </div>
    `;
    rankingList.appendChild(item);
  });
}

// --- 5. EVENT LISTENERS PARA BÚSQUEDA ---

function buscarRestaurantes() {
  const query = searchInput.value.toLowerCase().trim();
  
  const filtrados = globalState.restaurantes.filter(r => {
    return (
      r.nombre.toLowerCase().includes(query) ||
      r.descripcion.toLowerCase().includes(query) ||
      r.categoria.toLowerCase().includes(query)
    );
  });
  
  renderRestaurantes(filtrados);
  // Desactivar filtros de categoría al buscar
  document.querySelectorAll(".filtro-btn").forEach(btn => btn.classList.remove("active"));
}

searchBtn.addEventListener("click", buscarRestaurantes);
searchInput.addEventListener("input", buscarRestaurantes); // Búsqueda en tiempo real
searchInput.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    buscarRestaurantes();
  }
});