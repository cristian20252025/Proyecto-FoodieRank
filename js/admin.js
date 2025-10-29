/* =============================
   admin.js - Panel administrador
   ============================= */

   import { apiGet, apiPost, apiPut, apiDelete } from "./api.js";
   import { getToken } from "./auth.js";
   
   document.addEventListener("DOMContentLoaded", () => {
     loadPendingRestaurants();
     loadCategories();
   });
   
   // Restaurantes pendientes
   async function loadPendingRestaurants() {
     const container = document.getElementById("pending-restaurants");
     try {
       const data = await apiGet("/restaurants/pending", getToken());
       if (!data.length) {
         container.innerHTML = "<p>No hay restaurantes pendientes.</p>";
         return;
       }
       container.innerHTML = data
         .map(
           (r) => `
           <div class="admin-card">
             <span>${r.name}</span>
             <div>
               <button class="btn" onclick="approveRestaurant('${r._id}')">Aprobar</button>
               <button class="btn btn-outline" onclick="rejectRestaurant('${r._id}')">Rechazar</button>
             </div>
           </div>
         `
         )
         .join("");
     } catch (err) {
       container.innerHTML = `<p class="form-error">${err.message}</p>`;
     }
   }
   
   window.approveRestaurant = async (id) => {
     await apiPut(`/restaurants/${id}/approve`, {}, getToken());
     loadPendingRestaurants();
   };
   
   window.rejectRestaurant = async (id) => {
     await apiDelete(`/restaurants/${id}`, getToken());
     loadPendingRestaurants();
   };
   
   // Categorías
   async function loadCategories() {
     const list = document.getElementById("categories-manage");
     const data = await apiGet("/categories", getToken());
     list.innerHTML = data
       .map(
         (c) => `
         <div class="admin-card">
           <span>${c.name}</span>
           <div>
             <button class="btn-outline" onclick="deleteCategory('${c._id}')">Eliminar</button>
           </div>
         </div>`
       )
       .join("");
   }
   
   const form = document.getElementById("category-form");
   if (form) {
     form.addEventListener("submit", async (e) => {
       e.preventDefault();
       const name = document.getElementById("category-name").value.trim();
       await apiPost("/categories", { name }, getToken());
       loadCategories();
     });
   }
   
   window.deleteCategory = async (id) => {
     await apiDelete(`/categories/${id}`, getToken());
     loadCategories();
   };
   