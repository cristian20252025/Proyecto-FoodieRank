/* =============================
   main.js - Lógica general
   ============================= */

   import { getUser, logout } from "./auth.js";

   document.addEventListener("DOMContentLoaded", () => {
     // Mostrar año actual en footer
     const yearEl = document.getElementById("current-year");
     if (yearEl) yearEl.textContent = new Date().getFullYear();
   
     // Navbar dinámico
     const navList = document.getElementById("nav-list") || document.getElementById("nav-list-2");
     const user = getUser();
   
     if (navList) {
       navList.innerHTML = `
         <li><a href="index.html">Inicio</a></li>
         <li><a href="restaurants.html">Restaurantes</a></li>
         ${
           user
             ? `<li><a href="#" id="logout-btn">Cerrar sesión</a></li>
                ${user.role === "admin" ? '<li><a href="admin_panel.html">Admin</a></li>' : ""}`
             : `<li><a href="login.html">Iniciar sesión</a></li>
                <li><a href="register.html">Registrarse</a></li>`
         }
       `;
     }
   
     // Logout
     const logoutBtn = document.getElementById("logout-btn");
     if (logoutBtn) logoutBtn.addEventListener("click", logout);
   });
   