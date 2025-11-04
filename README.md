🍴 FoodieRank - Frontend
📌 Descripción del Proyecto

El frontend de FoodieRank está desarrollado con HTML, CSS y JavaScript puro, sin frameworks.
Su objetivo es ofrecer una interfaz moderna, simple y funcional para que los usuarios puedan registrarse, iniciar sesión, explorar restaurantes, crear reseñas y acceder al panel de administración, consumiendo los endpoints del backend en tiempo real.

🧱 Tecnologías Utilizadas

HTML5

CSS3 (Flexbox y Grid)

JavaScript Puro (ES6+)

Fetch API para consumir la API REST del backend

LocalStorage para almacenar el token JWT

⚙️ Instalación y Ejecución
1️⃣ Clonar el repositorio
git clone https://github.com/tu-usuario/frontend_FoodieRank.git
cd frontend_FoodieRank

2️⃣ Abrir el proyecto

No necesita instalación ni dependencias adicionales.
Puedes abrir directamente el archivo index.html en tu navegador o usar una extensión como Live Server en VSCode.

🧩 Estructura del Proyecto
frontend_FoodieRank/
│
├── css/

│   ├── main.css

│   ├── login.css

│   ├── register.css

│   ├── restaurant.css

│   └── admin.css
│
├── js/

│   ├── auth.js           # Registro, login y logout

│   ├── restaurants.js    # Listado y detalle de restaurantes

│   ├── reviews.js        # Gestión de reseñas

│   ├── admin.js          # Panel administrativo

│   ├── ui.js             # Funciones de interfaz y renderizado

│   └── utils.js          # Configuración y utilidades generales
│
├── pages/

│   ├── index.html        # Página principal

│   ├── login.html

│   ├── register.html

│   ├── restaurant.html   # Detalle de restaurante

│   ├── admin.html        # Panel de administración
│
├── assets/

│   ├── logo.png

│   ├── icons/

│   └── images/
│
└── README.md

🔗 Conexión con el Backend

El frontend se comunica con la API mediante Fetch API, usando una constante global definida en js/utils.js:

const API_URL = 'http://localhost:3000/api/v1';


Asegúrate de que el backend esté corriendo antes de interactuar con el frontend.

👥 Funcionalidades
👤 Usuarios

Registro e inicio de sesión

Autenticación mediante JWT

Cierre de sesión y persistencia de sesión (LocalStorage)

🍽️ Restaurantes

Listado completo de restaurantes

Filtrado por categoría

Detalle individual con descripción, ubicación, platos y reseñas

📝 Reseñas

Creación, edición y eliminación de reseñas

Calificación (1–5 estrellas)

Likes y dislikes en reseñas de otros usuarios

Actualización automática del ranking de restaurantes

🧑‍💼 Panel de Administración

CRUD de categorías

Aprobación o rechazo de nuevos restaurantes y platos

Gestión de usuarios y roles (solo administradores)

💅 Diseño y Usabilidad

Diseño responsive adaptado a móviles, tablets y escritorio.

Uso de CSS Grid y Flexbox para maquetación fluida.

Paleta de colores moderna, con componentes reutilizables (botones, tarjetas, formularios).

Feedback visual en errores o validaciones provenientes del backend.

⚡ Requerimientos

Backend de FoodieRank corriendo localmente (http://localhost:3000)

Navegador moderno compatible con ES6 y Fetch API

🧠 Arquitectura del Frontend

El proyecto sigue una arquitectura simple y modular:

pages/: vistas HTML

js/: scripts organizados por funcionalidad

css/: estilos divididos por contexto

utils.js centraliza configuraciones (como URL del backend y funciones comunes)

🧾 SCRUM y Planeación

Este frontend fue desarrollado bajo la metodología SCRUM, en coordinación con el equipo backend.

Roles del equipo:

Scrum Master: [Michel Rodriguez]

Product Owner: [Cristian Perez]

Herramienta de seguimiento: GitHub Projects / Trello / ClickUp
Documento SCRUM: disponible en el repositorio backend (/docs/SCRUM_Plan.pdf)

🎥 Video de Presentación

🔗 Enlace al video: [Agregar link al video de presentación]

👨‍💻 Créditos

Equipo de desarrollo:

[Michel Rodriguez] – Scrum Master

[Cristian Perez] – Product Owner

🏁 Estado del Proyecto

✅ Interfaz completa y funcional
✅ Conexión estable con el backend
✅ Diseño responsivo
✅ Validaciones de usuario y roles
✅ Proyecto listo para entrega
