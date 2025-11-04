# 🍴 FoodieRank – Frontend

## 📖 Descripción del Proyecto

**FoodieRank** es una aplicación web enfocada en la experiencia gastronómica, donde los usuarios pueden **explorar restaurantes, dejar reseñas, calificar platos y gestionar contenido desde un panel administrativo**.

Este **frontend** está construido con **HTML, CSS y JavaScript puro (ES6+)**, ofreciendo una interfaz moderna, ligera y responsiva que se comunica con un backend RESTful mediante **Fetch API**.

---

## 🧱 Tecnologías Utilizadas

- **HTML5** — Estructura semántica y accesible.  
- **CSS3 (Flexbox y Grid)** — Diseño adaptable a dispositivos móviles, tabletas y escritorio.  
- **JavaScript Puro (ES6+)** — Lógica del cliente y consumo de la API.  
- **Fetch API** — Comunicación con la API REST del backend.  
- **LocalStorage** — Almacenamiento del token JWT y persistencia de sesión.

---

## ⚙️ Instalación y Ejecución

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/frontend_FoodieRank.git
cd frontend_FoodieRank
2️⃣ Ejecutar el proyecto
No requiere dependencias adicionales.
Abre directamente el archivo index.html en tu navegador o utiliza la extensión Live Server en Visual Studio Code.
```

🧩 Estructura del Proyecto

```bash
Copiar código
frontend_FoodieRank/
│
├── css/
│   ├── admin.css              # Estilos del panel administrativo
│   ├── detalle.css            # Estilos de la vista de restaurante
│   ├── listado.css            # Estilos del listado de restaurantes
│   ├── login.css              # Estilos de autenticación
│   └── main.css               # Estilos generales y layout principal
│
├── js/
│   ├── admin.js               # Lógica del panel administrativo
│   ├── api.js                 # Configuración y llamadas a la API
│   ├── auth.js                # Registro, login y logout
│   ├── detalle.js             # Detalle y reseñas de restaurante
│   ├── listado.js             # Listado y filtrado de restaurantes
│   └── main.js                # Funciones generales e inicialización
│
├── detalle-de-restaurante.html   # Página de detalle de restaurante
├── index.html                    # Página principal
├── listado-de-restaurantes.html  # Listado general de restaurantes
├── login-register.html           # Vista de login y registro
├── panel-de-administracion.html  # Panel de administración
│
└── README.md
```
## 🔗 Conexión con el Backend
El proyecto se comunica con el backend mediante una constante global definida en js/api.js:

### js
Copiar código
const API_URL = 'http://localhost:4000/api/v1';
⚠️ Importante: asegúrate de tener el backend de FoodieRank corriendo antes de utilizar el frontend.

## 👥 Funcionalidades
### 👤 Usuarios
Registro e inicio de sesión con validaciones.

Autenticación mediante JWT.

Cierre de sesión y persistencia con LocalStorage.

### 🍽️ Restaurantes
Listado general y filtrado por categorías.

Detalle de cada restaurante con información y reseñas.

Calificaciones y comentarios de usuarios.

### 📝 Reseñas
Crear, editar y eliminar reseñas.

Sistema de calificación (1–5 estrellas).

Likes/dislikes y ranking dinámico.

### 🧑‍💼 Panel de Administración
CRUD de restaurantes, categorías y usuarios.

Gestión de roles (usuarios / administradores).

Aprobación o rechazo de nuevos registros.

### 💅 Diseño y Usabilidad
Diseño responsive con CSS Grid y Flexbox.

Interfaz moderna y limpia, enfocada en la usabilidad.

Componentes reutilizables (botones, formularios, tarjetas).

Feedback visual en validaciones y errores.

Paleta de colores neutra con acentos llamativos.

## ⚡ Requerimientos
Backend de FoodieRank ejecutándose localmente (http://localhost:27017)

Navegador moderno compatible con ES6+ y Fetch API

## 🧠 Arquitectura del Frontend
Carpeta / Archivo	Descripción
/css/	Estilos separados por vistas y funciones.
/js/	Lógica modular para cada sección del sistema.
/index.html	Página principal con acceso a las demás vistas.
/api.js	Centraliza la conexión con la API REST.

## 📅 Metodología de Trabajo (SCRUM)
El desarrollo del frontend siguió la metodología SCRUM, coordinado con el equipo de backend.

### Roles del equipo:

🧑‍🏫 Scrum Master: Michel Rodriguez

👨‍💻 Product Owner: Cristian Perez

Herramientas de gestión: GitHub Projects · Trello · ClickUp
Documento de planeación: /docs/SCRUM_Plan.pdf (en el repositorio backend)

## 🎥 Video de Presentación
🔗 [Agregar enlace al video de presentación]

## 👨‍💻 Créditos

Equipo de desarrollo:

-Michel Rodriguez — Scrum Master

-Cristian Perez — Product Owner

## 🏁 Estado del Proyecto
✅ Interfaz completa y funcional
✅ Conexión estable con el backend
✅ Diseño responsive
✅ Validaciones implementadas
✅ Listo para entrega y despliegue

yaml
Copiar código
