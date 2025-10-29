/* =============================
   navbar.js - Componente Navbar
   ============================= */

   import { getUser, logout } from "../js/auth.js";

   export function renderNavbar() {
     const user = getUser();
     const navContainer = document.getElementById("main-nav") || document.getElementById("admin-nav");
     if (!navContainer) return;
   
     navContainer.innerHTML = `
       <ul>
         <li><a href="index.html">Inicio</a></li>
         <li><a href="restaurants.html">Restaurantes</a></li>
         ${
           user
             ? `
             ${user.role === "admin" ? '<li><a href="admin_panel.html">Panel Admin</a></li>' : ""}
             <li><a href="#" id="logout-link">Cerrar sesión</a></li>
           `
             : `
             <li><a href="login.html">Iniciar sesión</a></li>
             <li><a href="register.html">Registrarse</a></li>
           `
         }
       </ul>
     `;
   
     const logoutLink = document.getElementById("logout-link");
     if (logoutLink) logoutLink.addEventListener("click", logout);
   }
   
   document.addEventListener("DOMContentLoaded", renderNavbar);
   