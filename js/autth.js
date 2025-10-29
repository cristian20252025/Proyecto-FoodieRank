/* =============================
   auth.js - Autenticación
   ============================= */

   import { apiPost } from "./api.js";

   // Registro
   const registerForm = document.getElementById("register-form");
   if (registerForm) {
     registerForm.addEventListener("submit", async (e) => {
       e.preventDefault();
       const name = e.target.name.value.trim();
       const email = e.target.email.value.trim();
       const password = e.target.password.value.trim();
   
       try {
         const data = await apiPost("/users/register", { name, email, password });
         alert("Registro exitoso. Ahora puedes iniciar sesión.");
         window.location.href = "login.html";
       } catch (err) {
         document.getElementById("register-error").textContent = err.message;
       }
     });
   }
   
   // Login
   const loginForm = document.getElementById("login-form");
   if (loginForm) {
     loginForm.addEventListener("submit", async (e) => {
       e.preventDefault();
       const email = e.target.email.value.trim();
       const password = e.target.password.value.trim();
   
       try {
         const data = await apiPost("/users/login", { email, password });
         localStorage.setItem("token", data.token);
         localStorage.setItem("user", JSON.stringify(data.user));
         window.location.href = "index.html";
       } catch (err) {
         document.getElementById("login-error").textContent = err.message;
       }
     });
   }
   
   // Cerrar sesión
   export function logout() {
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     window.location.href = "login.html";
   }
   
   // Obtener usuario actual
   export function getUser() {
     return JSON.parse(localStorage.getItem("user"));
   }
   
   // Obtener token
   export function getToken() {
     return localStorage.getItem("token");
   }
   