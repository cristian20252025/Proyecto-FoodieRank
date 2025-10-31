// ===============================
// PANEL ADMIN - CRUD RESTAURANTES MEJORADO
// ===============================

const form = document.getElementById("formRestaurante");
const tabla = document.getElementById("tablaRestaurantes");

// ===== CARGAR DATOS DESDE LOCALSTORAGE =====
function cargarRestaurantes() {
  const guardados = localStorage.getItem('restaurantes');
  if (guardados) {
    try {
      return JSON.parse(guardados);
    } catch (e) {
      console.error('Error cargando restaurantes:', e);
      return obtenerRestaurantesIniciales();
    }
  }
  return obtenerRestaurantesIniciales();
}

// Datos iniciales expandidos
function obtenerRestaurantesIniciales() {
  return [
    { 
      id: 1, 
      nombre: "La Parrilla de Oro", 
      descripcion: "Carnes a la brasa y platos típicos colombianos", 
      imagen: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
      calificacion: 4.5,
      categoria: "Colombiana",
      precioPromedio: "$40.000"
    },
    { 
      id: 2, 
      nombre: "Sabor Italiano", 
      descripcion: "Pizzas artesanales y pastas al estilo de Roma", 
      imagen: "https://images.unsplash.com/photo-1601924572380-526cd06f6588?auto=format&fit=crop&w=800&q=80",
      calificacion: 4.8,
      categoria: "Italiana",
      precioPromedio: "$35.000"
    },
    { 
      id: 3, 
      nombre: "Delicias del Mar", 
      descripcion: "Especialidad en mariscos frescos y ceviches", 
      imagen: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80",
      calificacion: 4.6,
      categoria: "Mariscos",
      precioPromedio: "$50.000"
    },
    { 
      id: 4, 
      nombre: "Veggie Life", 
      descripcion: "Comida saludable y opciones veganas deliciosas", 
      imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
      calificacion: 4.3,
      categoria: "Vegetariana",
      precioPromedio: "$30.000"
    },
    { 
      id: 5, 
      nombre: "Sushi Master", 
      descripcion: "Sushi tradicional y rolls innovadores", 
      imagen: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80",
      calificacion: 4.9,
      categoria: "Japonesa",
      precioPromedio: "$55.000"
    }
  ];
}

let restaurantes = cargarRestaurantes();

// ===== GUARDAR EN LOCALSTORAGE =====
function guardarRestaurantes() {
  localStorage.setItem('restaurantes', JSON.stringify(restaurantes));
}

// ===== RENDERIZAR TABLA CON ANIMACIÓN =====
function renderTabla() {
  tabla.innerHTML = "";
  
  if (restaurantes.length === 0) {
    tabla.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 40px; color: #718096;">
          📋 No hay restaurantes registrados. Agrega uno nuevo.
        </td>
      </tr>
    `;
    return;
  }
  
  restaurantes.forEach((r, index) => {
    const fila = document.createElement("tr");
    fila.style.opacity = '0';
    fila.style.transform = 'translateX(-20px)';
    
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${r.nombre}</strong></td>
      <td>${r.descripcion}</td>
      <td><img src="${r.imagen}" alt="${r.nombre}" loading="lazy"></td>
      <td>
        <span style="background: #e6f2ea; color: #38a169; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">
          ${r.categoria || 'General'}
        </span>
      </td>
      <td>
        <span style="color: #38a169; font-weight: 600;">
          ${r.precioPromedio || 'N/A'}
        </span>
      </td>
      <td class="acciones">
        <button class="edit" onclick="editar(${r.id})" title="Editar">✏️</button>
        <button class="view" onclick="verDetalle(${r.id})" title="Ver detalle">👁️</button>
        <button class="delete" onclick="eliminar(${r.id})" title="Eliminar">🗑️</button>
      </td>
    `;
    
    tabla.appendChild(fila);
    
    // Animación escalonada
    setTimeout(() => {
      fila.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      fila.style.opacity = '1';
      fila.style.transform = 'translateX(0)';
    }, index * 50);
  });
  
  actualizarEstadisticas();
}

// ===== ESTADÍSTICAS DEL PANEL =====
function actualizarEstadisticas() {
  let statsDiv = document.querySelector('.stats-container');
  
  if (!statsDiv) {
    statsDiv = document.createElement('div');
    statsDiv.className = 'stats-container';
    statsDiv.style.cssText = `
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    `;
    
    const h2 = document.querySelector('.main-container h2');
    h2.after(statsDiv);
  }
  
  const totalRestaurantes = restaurantes.length;
  const categorias = [...new Set(restaurantes.map(r => r.categoria))].length;
  const promedioCalificacion = restaurantes.length > 0 
    ? (restaurantes.reduce((sum, r) => sum + (r.calificacion || 0), 0) / restaurantes.length).toFixed(1)
    : 0;
  
  statsDiv.innerHTML = `
    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <div style="font-size: 32px; font-weight: 900; color: #38a169;">${totalRestaurantes}</div>
      <div style="color: #718096; margin-top: 5px;">Restaurantes</div>
    </div>
    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <div style="font-size: 32px; font-weight: 900; color: #3182ce;">${categorias}</div>
      <div style="color: #718096; margin-top: 5px;">Categorías</div>
    </div>
    <div style="background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
      <div style="font-size: 32px; font-weight: 900; color: #d69e2e;">⭐ ${promedioCalificacion}</div>
      <div style="color: #718096; margin-top: 5px;">Calificación Promedio</div>
    </div>
  `;
}

// ===== AGREGAR CAMPOS AL FORMULARIO =====
function mejorarFormulario() {
  const descripcionInput = document.getElementById("descripcion");
  
  // Campo de categoría
  const categoriaInput = document.createElement("select");
  categoriaInput.id = "categoria";
  categoriaInput.required = true;
  categoriaInput.style.cssText = `
    flex: 1 1 200px;
    padding: 10px;
    border: 1px solid #cfe7d7;
    border-radius: 8px;
    font-size: 14px;
    background: white;
  `;
  
  const categorias = ['Colombiana', 'Italiana', 'Mexicana', 'Japonesa', 'China', 'Americana', 'Vegetariana', 'Mariscos', 'Otra'];
  categoriaInput.innerHTML = '<option value="">Selecciona categoría</option>';
  categorias.forEach(cat => {
    categoriaInput.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
  
  // Campo de calificación
  const calificacionInput = document.createElement("input");
  calificacionInput.type = "number";
  calificacionInput.id = "calificacion";
  calificacionInput.placeholder = "Calificación (1-5)";
  calificacionInput.min = "1";
  calificacionInput.max = "5";
  calificacionInput.step = "0.1";
  calificacionInput.value = "4.0";
  calificacionInput.required = true;
  calificacionInput.style.cssText = `
    flex: 1 1 150px;
    padding: 10px;
    border: 1px solid #cfe7d7;
    border-radius: 8px;
    font-size: 14px;
  `;
  
  // Campo de precio promedio
  const precioInput = document.createElement("input");
  precioInput.type = "text";
  precioInput.id = "precioPromedio";
  precioInput.placeholder = "Precio promedio ($30.000)";
  precioInput.required = true;
  precioInput.style.cssText = `
    flex: 1 1 180px;
    padding: 10px;
    border: 1px solid #cfe7d7;
    border-radius: 8px;
    font-size: 14px;
  `;
  
  descripcionInput.after(categoriaInput);
  categoriaInput.after(calificacionInput);
  calificacionInput.after(precioInput);
}

mejorarFormulario();

// ===== AGREGAR RESTAURANTE MEJORADO =====
let modoEdicion = false;
let idEdicion = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const imagen = document.getElementById("imagen").value.trim();
  const categoria = document.getElementById("categoria").value;
  const calificacion = parseFloat(document.getElementById("calificacion").value);
  const precioPromedio = document.getElementById("precioPromedio").value.trim();

  // Validaciones
  if (!nombre || !descripcion || !imagen || !categoria || !precioPromedio) {
    alert("❌ Por favor completa todos los campos");
    return;
  }
  
  if (calificacion < 1 || calificacion > 5) {
    alert("❌ La calificación debe estar entre 1 y 5");
    return;
  }
  
  if (!imagen.startsWith('http')) {
    alert("❌ La URL de la imagen debe comenzar con http:// o https://");
    return;
  }

  if (modoEdicion) {
    // Actualizar restaurante existente
    const index = restaurantes.findIndex(r => r.id === idEdicion);
    if (index !== -1) {
      restaurantes[index] = {
        ...restaurantes[index],
        nombre,
        descripcion,
        imagen,
        categoria,
        calificacion,
        precioPromedio
      };
      
      alert("✅ Restaurante actualizado correctamente");
      modoEdicion = false;
      idEdicion = null;
      document.querySelector('.btn-primary').textContent = 'Agregar Restaurante';
    }
  } else {
    // Agregar nuevo restaurante
    const nuevo = {
      id: Date.now(),
      nombre,
      descripcion,
      imagen,
      categoria,
      calificacion,
      precioPromedio
    };

    restaurantes.push(nuevo);
    alert("✅ Restaurante agregado exitosamente");
  }

  guardarRestaurantes();
  form.reset();
  document.getElementById("calificacion").value = "4.0";
  renderTabla();
});

// ===== EDITAR RESTAURANTE =====
function editar(id) {
  const r = restaurantes.find((item) => item.id === id);
  if (!r) return;

  // Llenar formulario
  document.getElementById("nombre").value = r.nombre;
  document.getElementById("descripcion").value = r.descripcion;
  document.getElementById("imagen").value = r.imagen;
  document.getElementById("categoria").value = r.categoria || '';
  document.getElementById("calificacion").value = r.calificacion || 4.0;
  document.getElementById("precioPromedio").value = r.precioPromedio || '';
  
  // Cambiar modo a edición
  modoEdicion = true;
  idEdicion = id;
  
  // Cambiar texto del botón
  const btnSubmit = document.querySelector('.btn-primary');
  btnSubmit.textContent = '💾 Actualizar Restaurante';
  btnSubmit.style.background = '#3182ce';
  
  // Scroll al formulario
  form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Highlight del formulario
  form.style.boxShadow = '0 0 0 3px rgba(56, 161, 105, 0.3)';
  setTimeout(() => {
    form.style.boxShadow = 'none';
  }, 2000);
}

// ===== VER DETALLE =====
function verDetalle(id) {
  window.location.href = `detalle-de-restaurante.html?id=${id}`;
}

// ===== ELIMINAR RESTAURANTE CON CONFIRMACIÓN =====
function eliminar(id) {
  const r = restaurantes.find(item => item.id === id);
  if (!r) return;
  
  const confirmacion = confirm(`¿Estás seguro que deseas eliminar "${r.nombre}"?\n\nEsta acción no se puede deshacer.`);
  
  if (confirmacion) {
    restaurantes = restaurantes.filter((r) => r.id !== id);
    guardarRestaurantes();
    renderTabla();
    
    // Mostrar notificación
    mostrarNotificacion('✅ Restaurante eliminado correctamente');
  }
}

// ===== NOTIFICACIONES =====
function mostrarNotificacion(mensaje) {
  const notif = document.createElement('div');
  notif.textContent = mensaje;
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #38a169;
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  
  document.body.appendChild(notif);
  
  setTimeout(() => {
    notif.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .tabla tr:hover {
    background: #f7fafc;
  }
`;
document.head.appendChild(style);

// ===== BÚSQUEDA EN TABLA =====
function agregarBuscadorTabla() {
  const mainContainer = document.querySelector('.main-container');
  const addForm = document.querySelector('.add-form');
  
  const searchDiv = document.createElement('div');
  searchDiv.style.cssText = `
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;
  `;
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = '🔍 Buscar en la tabla...';
  searchInput.style.cssText = `
    flex: 1;
    max-width: 500px;
    padding: 10px 15px;
    border: 1px solid #cfe7d7;
    border-radius: 8px;
    font-size: 14px;
  `;
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filas = tabla.querySelectorAll('tr');
    
    filas.forEach(fila => {
      const texto = fila.textContent.toLowerCase();
      fila.style.display = texto.includes(query) ? '' : 'none';
    });
  });
  
  searchDiv.appendChild(searchInput);
  addForm.after(searchDiv);
}

// ===== EXPORTAR DATOS =====
function agregarBotoneExportar() {
  const mainContainer = document.querySelector('.main-container');
  const tabla = document.querySelector('.tabla');
  
  const btnExportar = document.createElement('button');
  btnExportar.textContent = '📥 Exportar JSON';
  btnExportar.className = 'btn btn-outline';
  btnExportar.style.cssText = `
    margin-left: 10px;
    padding: 10px 15px;
    cursor: pointer;
  `;
  
  btnExportar.addEventListener('click', () => {
    const dataStr = JSON.stringify(restaurantes, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'restaurantes.json';
    link.click();
    URL.revokeObjectURL(url);
    
    mostrarNotificacion('✅ Datos exportados correctamente');
  });
  
  const h2 = mainContainer.querySelector('h2');
  h2.style.display = 'inline-block';
  h2.after(btnExportar);
}

// ===== INICIALIZACIÓN =====
renderTabla();
agregarBuscadorTabla();
agregarBotoneExportar();

// Verificar autenticación
const usuarioActivo = localStorage.getItem('usuarioActivo');
if (!usuarioActivo) {
  if (confirm('⚠️ Debes iniciar sesión para acceder al panel de administración.\n\n¿Deseas ir a la página de login?')) {
    window.location.href = 'login-register.html';
  }
}

// Hacer funciones globales
window.editar = editar;
window.eliminar = eliminar;
window.verDetalle = verDetalle;