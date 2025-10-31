// ===============================
// LISTADO DE RESTAURANTES - LÓGICA MEJORADA
// ===============================

// Datos simulados ampliados
let restaurantes = [
  {
    id: 1,
    nombre: "La Parrilla de Oro",
    descripcion: "Carnes a la brasa y platos típicos colombianos.",
    imagen: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.5,
    categoria: "Colombiana",
    precioPromedio: "$40.000"
  },
  {
    id: 2,
    nombre: "Sabor Italiano",
    descripcion: "Pizzas artesanales y pastas al estilo de Roma.",
    imagen: "https://images.unsplash.com/photo-1601924572380-526cd06f6588?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.8,
    categoria: "Italiana",
    precioPromedio: "$35.000"
  },
  {
    id: 3,
    nombre: "Delicias del Mar",
    descripcion: "Especialidad en mariscos frescos y ceviches.",
    imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.6,
    categoria: "Mariscos",
    precioPromedio: "$50.000"
  },
  {
    id: 4,
    nombre: "Veggie Life",
    descripcion: "Comida saludable y opciones veganas deliciosas.",
    imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.3,
    categoria: "Vegetariana",
    precioPromedio: "$30.000"
  },
  {
    id: 5,
    nombre: "Sushi Master",
    descripcion: "Sushi tradicional y rolls innovadores.",
    imagen: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.9,
    categoria: "Japonesa",
    precioPromedio: "$55.000"
  },
  {
    id: 6,
    nombre: "Taquería El Sabor",
    descripcion: "Tacos auténticos y comida mexicana tradicional.",
    imagen: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.4,
    categoria: "Mexicana",
    precioPromedio: "$28.000"
  },
  {
    id: 7,
    nombre: "Burger House",
    descripcion: "Hamburguesas gourmet con ingredientes premium.",
    imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.2,
    categoria: "Americana",
    precioPromedio: "$32.000"
  },
  {
    id: 8,
    nombre: "Wok Express",
    descripcion: "Comida china auténtica con recetas tradicionales.",
    imagen: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80",
    calificacion: 4.1,
    categoria: "China",
    precioPromedio: "$25.000"
  }
];

const listContainer = document.getElementById("restaurantList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Cargar restaurantes desde localStorage si existen
function cargarRestaurantes() {
  const guardados = localStorage.getItem('restaurantes');
  if (guardados) {
    try {
      restaurantes = JSON.parse(guardados);
    } catch (e) {
      console.error('Error cargando restaurantes:', e);
    }
  }
}

// Guardar restaurantes en localStorage
function guardarRestaurantes() {
  localStorage.setItem('restaurantes', JSON.stringify(restaurantes));
}

// ===== RENDERIZAR ESTRELLAS =====
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '⭐';
  }
  
  if (hasHalfStar) {
    stars += '⭐'; // Podrías usar ½ o ⚝
  }
  
  return stars + ` (${rating})`;
}

// ===== RENDERIZAR LISTA CON ANIMACIÓN =====
function renderRestaurantes(lista) {
  listContainer.innerHTML = "";

  if (lista.length === 0) {
    listContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px;">
        <p style="font-size: 18px; color: #718096;">😕 No se encontraron restaurantes.</p>
        <p style="color: #a0aec0; margin-top: 10px;">Intenta con otra búsqueda</p>
      </div>
    `;
    return;
  }

  lista.forEach((r, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    card.innerHTML = `
      <img src="${r.imagen}" alt="${r.nombre}" loading="lazy">
      <div class="card-content">
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 5px;">
          <h3>${r.nombre}</h3>
          <span style="font-size: 12px; background: #e6f2ea; color: #38a169; padding: 3px 8px; border-radius: 4px; white-space: nowrap;">${r.categoria}</span>
        </div>
        <p>${r.descripcion}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
          <span style="font-size: 14px; color: #4a5568;">${renderStars(r.calificacion)}</span>
          <span style="font-size: 14px; font-weight: 600; color: #38a169;">${r.precioPromedio}</span>
        </div>
        <a href="detalle-de-restaurante.html?id=${r.id}" class="btn">Ver Detalle</a>
      </div>
    `;
    
    listContainer.appendChild(card);
    
    // Animación con delay escalonado
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });
}

// ===== BUSCAR RESTAURANTE MEJORADO =====
function buscarRestaurantes() {
  const query = searchInput.value.toLowerCase().trim();
  
  const filtrados = restaurantes.filter(r => {
    return (
      r.nombre.toLowerCase().includes(query) ||
      r.descripcion.toLowerCase().includes(query) ||
      r.categoria.toLowerCase().includes(query)
    );
  });
  
  renderRestaurantes(filtrados);
}

// Buscar al hacer clic
searchBtn.addEventListener("click", buscarRestaurantes);

// Buscar en tiempo real
searchInput.addEventListener("input", buscarRestaurantes);

// Buscar con Enter
searchInput.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    buscarRestaurantes();
  }
});

// ===== ORDENAR RESTAURANTES =====
function ordenarRestaurantes(criterio) {
  let ordenados = [...restaurantes];
  
  switch(criterio) {
    case 'nombre':
      ordenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    case 'calificacion':
      ordenados.sort((a, b) => b.calificacion - a.calificacion);
      break;
    case 'precio':
      ordenados.sort((a, b) => {
        const precioA = parseInt(a.precioPromedio.replace(/\D/g, ''));
        const precioB = parseInt(b.precioPromedio.replace(/\D/g, ''));
        return precioA - precioB;
      });
      break;
  }
  
  return ordenados;
}

// ===== CREAR FILTROS DINÁMICOS =====
function crearFiltros() {
  const mainContainer = document.querySelector('.main-container');
  const h2 = mainContainer.querySelector('h2');
  
  const filtrosDiv = document.createElement('div');
  filtrosDiv.className = 'filtros-container';
  filtrosDiv.style.cssText = `
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 20px;
  `;
  
  // Obtener categorías únicas
  const categorias = [...new Set(restaurantes.map(r => r.categoria))];
  
  // Botón "Todos"
  const btnTodos = document.createElement('button');
  btnTodos.textContent = 'Todos';
  btnTodos.className = 'filtro-btn active';
  btnTodos.style.cssText = `
    padding: 8px 16px;
    border: 1px solid #38a169;
    background: #38a169;
    color: white;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: 0.3s;
  `;
  
  btnTodos.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach(btn => {
      btn.style.background = 'white';
      btn.style.color = '#38a169';
      btn.classList.remove('active');
    });
    btnTodos.style.background = '#38a169';
    btnTodos.style.color = 'white';
    btnTodos.classList.add('active');
    renderRestaurantes(restaurantes);
  });
  
  filtrosDiv.appendChild(btnTodos);
  
  // Botones de categorías
  categorias.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.className = 'filtro-btn';
    btn.style.cssText = `
      padding: 8px 16px;
      border: 1px solid #38a169;
      background: white;
      color: #38a169;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: 0.3s;
    `;
    
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filtro-btn').forEach(b => {
        b.style.background = 'white';
        b.style.color = '#38a169';
        b.classList.remove('active');
      });
      btn.style.background = '#38a169';
      btn.style.color = 'white';
      btn.classList.add('active');
      
      const filtrados = restaurantes.filter(r => r.categoria === cat);
      renderRestaurantes(filtrados);
    });
    
    btn.addEventListener('mouseenter', () => {
      if (!btn.classList.contains('active')) {
        btn.style.background = '#e6f2ea';
      }
    });
    
    btn.addEventListener('mouseleave', () => {
      if (!btn.classList.contains('active')) {
        btn.style.background = 'white';
      }
    });
    
    filtrosDiv.appendChild(btn);
  });
  
  // Insertar después del h2
  h2.after(filtrosDiv);
}

// ===== INICIALIZACIÓN =====
cargarRestaurantes();
renderRestaurantes(restaurantes);
crearFiltros();

// Verificar si hay usuario activo
const usuarioActivo = localStorage.getItem('usuarioActivo');
const btnAdmin = document.querySelector('.btn-primary');

if (usuarioActivo && btnAdmin) {
  const usuario = JSON.parse(usuarioActivo);
  btnAdmin.textContent = `👤 ${usuario.email.split('@')[0]}`;
  
  // Agregar botón de cerrar sesión
  const btnCerrarSesion = document.createElement('a');
  btnCerrarSesion.href = '#';
  btnCerrarSesion.className = 'btn btn-outline';
  btnCerrarSesion.textContent = 'Cerrar Sesión';
  btnCerrarSesion.style.marginLeft = '10px';
  
  btnCerrarSesion.addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('¿Deseas cerrar sesión?')) {
      localStorage.removeItem('usuarioActivo');
      window.location.href = 'login-register.html';
    }
  });
  
  btnAdmin.after(btnCerrarSesion);
}