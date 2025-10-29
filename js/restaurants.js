/* =============================
   restaurants.js - Listado
   ============================= */

   import { apiGet } from "./api.js";
   import { getToken, getUser } from "./auth.js";
   
   const grid = document.getElementById("restaurants-grid");
   const categoryFilter = document.getElementById("category-filter");
   const sortSelect = document.getElementById("sort-select");
   
   document.addEventListener("DOMContentLoaded", async () => {
     await loadRestaurants();
   });
   
   async function loadRestaurants() {
     try {
       const data = await apiGet("/restaurants", getToken());
       renderRestaurants(data.restaurants);
     } catch (err) {
       grid.innerHTML = `<p class="form-error">${err.message}</p>`;
     }
   }
   
   function renderRestaurants(restaurants) {
     if (!restaurants.length) {
       grid.innerHTML = `<p>No hay restaurantes registrados aún.</p>`;
       return;
     }
   
     grid.innerHTML = restaurants
       .map(
         (r) => `
       <div class="restaurant-card">
         <img src="${r.image || "assets/img/default-restaurant.jpg"}" alt="${r.name}">
         <div class="restaurant-info">
           <h3>${r.name}</h3>
           <p>${r.category || "Sin categoría"}</p>
           <p>⭐ ${r.avgRating || 0} / 5</p>
           <button class="btn" onclick="window.location.href='restaurant_detail.html?id=${r._id}'">Ver detalles</button>
         </div>
       </div>
     `
       )
       .join("");
   }
   